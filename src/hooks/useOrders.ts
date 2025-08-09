
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

export type MealType = Database['public']['Enums']['meal_type'];
export type OrderType = Database['public']['Enums']['order_type'];
export type OrderStatus = Database['public']['Enums']['order_status'];
export type DietPreference = Database['public']['Enums']['diet_preference'];

export interface Order {
  id: string;
  user_id: string;
  meal_type: MealType;
  order_type: OrderType;
  delivery_time: string;
  start_date: string;
  total_amount?: number;
  status: OrderStatus;
  notes?: string;
  diet_preferences: DietPreference[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  item_name: string;
  item_category: string;
  meal_time: MealType;
  quantity: number;
  price?: number;
  created_at: string;
}

export interface CreateOrderData {
  meal_type: MealType;
  order_type: OrderType;
  delivery_time: string;
  start_date: string;
  total_amount?: number;
  notes?: string;
  diet_preferences: DietPreference[];
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  category: string;
  quantity: number;
  image?: string;
  details?: any;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }
      
      setOrders(data as Order[] || []);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) {
        console.error('Error fetching order items:', error);
        throw error;
      }
      
      return data || [];
    } catch (err) {
      console.error('Error fetching order items:', err);
      return [];
    }
  };

  const createOrder = async (orderData: CreateOrderData, cartItems: CartItem[]): Promise<Order | null> => {
    if (!user) {
      toast.error('Please login to place an order');
      return null;
    }

    console.log('Creating order for user:', user.id);
    console.log('Order data:', orderData);
    console.log('Cart items:', cartItems);

    setLoading(true);
    setError(null);

    try {
      // First ensure user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Creating user profile...');
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User'
          });

        if (createProfileError) {
          console.error('Error creating user profile:', createProfileError);
          throw new Error('Failed to create user profile');
        }
      }

      // Create the order
      const orderInsertData = {
        user_id: user.id,
        meal_type: orderData.meal_type,
        order_type: orderData.order_type,
        delivery_time: orderData.delivery_time,
        start_date: orderData.start_date,
        total_amount: orderData.total_amount,
        notes: orderData.notes,
        diet_preferences: orderData.diet_preferences,
        status: 'pending' as OrderStatus,
        is_active: true
      };

      console.log('Inserting order with data:', orderInsertData);

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderInsertData)
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      console.log('Order created successfully:', order);

      // Create order items
      if (cartItems.length > 0) {
        const orderItemsData = cartItems.map(item => {
          // Parse price to get numeric value
          const priceValue = typeof item.price === 'string' 
            ? parseFloat(item.price.replace(/[^\d.]/g, '')) 
            : parseFloat(String(item.price));

          return {
            order_id: order.id,
            item_name: item.name,
            item_category: item.category || 'food',
            meal_time: orderData.meal_type,
            quantity: item.quantity || 1,
            price: priceValue || 0
          };
        });

        console.log('Creating order items:', orderItemsData);

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsData);

        if (itemsError) {
          console.error('Error creating order items:', itemsError);
          toast.error('Order created but some items may not have been saved properly');
        } else {
          console.log('Order items created successfully');
        }
      }

      await fetchOrders(); // Refresh orders list
      toast.success('Order created successfully!');
      return order as Order;
    } catch (err: any) {
      console.error('Error creating order:', err);
      setError('Failed to create order');
      toast.error(`Failed to create order: ${err.message || 'Unknown error'}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
      
      await fetchOrders(); // Refresh orders list
      toast.success('Order status updated');
    } catch (err: any) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'cancelled' as OrderStatus, 
          is_active: false,
          updated_at: new Date().toISOString() 
        })
        .eq('id', orderId);

      if (error) throw error;
      
      await fetchOrders(); // Refresh orders list
      toast.success('Order cancelled successfully');
    } catch (err: any) {
      console.error('Error cancelling order:', err);
      toast.error('Failed to cancel order');
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return {
    orders,
    orderItems,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    fetchOrders,
    fetchOrderItems
  };
};
