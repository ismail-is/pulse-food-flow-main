import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { 
  Calendar, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin,
  Clock,
  Star,
  Plus,
  Edit
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { orders, loading, fetchOrderItems } = useOrders();
  const [activeTab, setActiveTab] = useState('overview');
  const [orderItemsMap, setOrderItemsMap] = useState<{ [key: string]: any[] }>({});

  // Get user display name from metadata or email
  const getUserDisplayName = () => {
    if (!user) return 'User';
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };

  // Load order items for recent orders
  useEffect(() => {
    const loadOrderItems = async () => {
      const recentOrders = orders.slice(0, 5);
      const itemsMap: { [key: string]: any[] } = {};
      
      for (const order of recentOrders) {
        try {
          const items = await fetchOrderItems(order.id);
          itemsMap[order.id] = items;
        } catch (error) {
          console.error('Error loading items for order:', order.id, error);
          itemsMap[order.id] = [];
        }
      }
      
      setOrderItemsMap(itemsMap);
    };

    if (orders.length > 0) {
      loadOrderItems();
    }
  }, [orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatOrderType = (orderType: string) => {
    switch (orderType) {
      case 'one-time': return 'One-time Order';
      case 'weekly': return 'Weekly Subscription';
      case 'monthly': return 'Monthly Subscription';
      default: return orderType;
    }
  };

  const formatMealType = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'Breakfast';
      case 'lunch': return 'Lunch';
      case 'dinner': return 'Dinner';
      case 'breakfast-lunch': return 'Breakfast + Lunch';
      case 'lunch-dinner': return 'Lunch + Dinner';
      case 'breakfast-dinner': return 'Breakfast + Dinner';
      case 'all-meals': return 'All Meals';
      default: return mealType;
    }
  };

  // Get upcoming deliveries from orders
  const upcomingDeliveries = orders
    .filter(order => ['confirmed', 'preparing'].includes(order.status))
    .slice(0, 3)
    .map(order => ({
      id: order.id,
      date: new Date(order.start_date).toLocaleDateString(),
      time: order.delivery_time,
      items: orderItemsMap[order.id]?.map(item => item.item_name) || [],
      status: order.status,
      orderType: formatOrderType(order.order_type),
      mealType: formatMealType(order.meal_type)
    }));

  // Get current subscription (active weekly/monthly order)
  const currentSubscription = orders.find(order => 
    order.is_active && ['weekly', 'monthly'].includes(order.order_type)
  );

  const subscriptionData = currentSubscription ? {
    plan: formatMealType(currentSubscription.meal_type),
    calories: '1500-1800 kcal', // Default, could be stored in order data
    mealsPerDay: 3, // Default, could be calculated from order items
    daysPerWeek: 5, // Default, could be stored in order data
    nextBilling: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    amount: `${currentSubscription.total_amount || 349} SAR`,
    status: 'active'
  } : null;

  const favoritesMeals = [
    {
      id: 1,
      name: 'Mediterranean Chicken Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
      calories: 380,
      rating: 5
    },
    {
      id: 2,
      name: 'Grilled Salmon with Quinoa',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
      calories: 420,
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {getUserDisplayName()}!</h1>
          <p className="text-gray-600 mt-2">Manage your meal plans and track your progress</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Package },
                { id: 'subscription', name: 'Subscription', icon: Calendar },
                { id: 'favorites', name: 'Favorites', icon: Heart },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Next Delivery</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {upcomingDeliveries.length > 0 ? upcomingDeliveries[0].date : 'None'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-lg font-semibold text-gray-900">{orders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Heart className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Plan</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {subscriptionData ? 'Active' : 'None'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                      <p className="text-lg font-semibold text-gray-900">4.8/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Button onClick={() => window.location.href = '/menu'} className="bg-green-600 hover:bg-green-700">
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                            <p className="text-sm text-gray-600">{formatOrderType(order.order_type)}</p>
                            <p className="text-sm text-gray-600">{formatMealType(order.meal_type)}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                            {order.total_amount && (
                              <p className="text-sm font-semibold text-green-600">
                                {order.total_amount} SAR
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Items: {orderItemsMap[order.id]?.length || 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Deliveries */}
            {upcomingDeliveries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingDeliveries.map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Clock className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{delivery.date}</p>
                            <p className="text-sm text-gray-600">{delivery.time}</p>
                            <p className="text-sm text-gray-600">{delivery.mealType}</p>
                            {delivery.items.length > 0 && (
                              <p className="text-sm text-gray-600">
                                {delivery.items.slice(0, 2).join(', ')}
                                {delivery.items.length > 2 && `... +${delivery.items.length - 2} more`}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-8">
            {/* Current Subscription */}
            {subscriptionData ? (
              <Card>
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">{subscriptionData.plan}</h3>
                      <div className="space-y-2">
                        <p><span className="text-gray-600">Calories:</span> {subscriptionData.calories}</p>
                        <p><span className="text-gray-600">Meals per day:</span> {subscriptionData.mealsPerDay}</p>
                        <p><span className="text-gray-600">Days per week:</span> {subscriptionData.daysPerWeek}</p>
                        <p><span className="text-gray-600">Status:</span> 
                          <Badge className="ml-2" variant="default">Active</Badge>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4">Billing Information</h4>
                      <div className="space-y-2">
                        <p><span className="text-gray-600">Amount:</span> {subscriptionData.amount}/week</p>
                        <p><span className="text-gray-600">Next billing:</span> {subscriptionData.nextBilling}</p>
                        <div className="pt-4 space-y-2">
                          <Button className="w-full" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Modify Plan
                          </Button>
                          <Button className="w-full" variant="outline">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Update Payment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Active Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You don't have an active subscription plan</p>
                    <Button onClick={() => window.location.href = '/subscription'} className="bg-green-600 hover:bg-green-700">
                      Browse Subscription Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium">Primary Address</p>
                        <p className="text-sm text-gray-600">123 King Fahd Road, Riyadh 12345</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium">Delivery Time</p>
                        <p className="text-sm text-gray-600">12:00 PM - 2:00 PM</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Change
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritesMeals.map((meal) => (
                    <div key={meal.id} className="border rounded-lg overflow-hidden">
                      <img src={meal.image} alt={meal.name} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{meal.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                          <div className="flex items-center">
                            {[...Array(meal.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Next Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        defaultValue={getUserDisplayName()} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Dietary Preferences</h3>
                  <div className="space-y-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((diet) => (
                      <label key={diet} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-sm">{diet}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-2">
                    {[
                      'Email notifications for deliveries',
                      'SMS updates for order status',
                      'WhatsApp notifications',
                      'Marketing emails'
                    ].map((notification) => (
                      <label key={notification} className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 mr-2" />
                        <span className="text-sm">{notification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
