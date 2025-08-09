
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdminStats {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export interface AdminOrder {
  id: string;
  user_id: string;
  customer_name?: string;
  total_amount: number;
  status: string;
  created_at: string;
  meal_type: string;
  order_type: string;
}

export const useAdminData = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all orders first
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      // Fetch user profiles separately to avoid join issues
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        // Don't throw error here, just log it as profiles might not exist
      }

      // Create a map of user_id to name for quick lookup
      const userNameMap = new Map();
      if (profilesData) {
        profilesData.forEach(profile => {
          userNameMap.set(profile.id, profile.name);
        });
      }

      // Format orders with user names
      const formattedOrders = (ordersData || []).map(order => ({
        id: order.id,
        user_id: order.user_id,
        customer_name: userNameMap.get(order.user_id) || 'Unknown User',
        total_amount: order.total_amount || 0,
        status: order.status,
        created_at: order.created_at,
        meal_type: order.meal_type,
        order_type: order.order_type
      }));

      setOrders(formattedOrders);

      // Calculate stats
      const totalOrders = formattedOrders.length;
      const uniqueUsers = new Set(formattedOrders.map(order => order.user_id)).size;
      const totalRevenue = formattedOrders.reduce((sum, order) => sum + order.total_amount, 0);

      setStats({
        totalOrders,
        totalUsers: uniqueUsers,
        totalRevenue
      });

    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError('Failed to fetch admin data');
      toast.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const resetAllData = async () => {
    try {
      // Delete all order items first (due to foreign key constraints)
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (itemsError) {
        console.error('Error deleting order items:', itemsError);
        throw itemsError;
      }

      // Delete all orders
      const { error: ordersError } = await supabase
        .from('orders')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (ordersError) {
        console.error('Error deleting orders:', ordersError);
        throw ordersError;
      }

      // Delete all order history
      const { error: historyError } = await supabase
        .from('order_history')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (historyError) {
        console.error('Error deleting order history:', historyError);
        throw historyError;
      }

      toast.success('All data reset successfully');
      fetchAdminData(); // Refresh the data
    } catch (err: any) {
      console.error('Error resetting data:', err);
      toast.error('Failed to reset data');
    }
  };

  // Set up real-time subscription for orders
  useEffect(() => {
    fetchAdminData();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('admin-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          console.log('Order data changed, refreshing...');
          fetchAdminData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stats,
    orders,
    loading,
    error,
    resetAllData,
    refreshData: fetchAdminData
  };
};
