
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Plus, Edit, Trash2 } from 'lucide-react';

const Delivery = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 King Fahd Road, Al Olaya, Riyadh 12345',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Prince Sultan Road, Al Malaz, Riyadh 11564',
      isDefault: false
    }
  ]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('12:00-14:00');
  const [deliveryDays, setDeliveryDays] = useState(['monday', 'wednesday', 'friday']);

  const timeSlots = [
    { value: '09:00-11:00', label: '9:00 AM - 11:00 AM' },
    { value: '12:00-14:00', label: '12:00 PM - 2:00 PM' },
    { value: '15:00-17:00', label: '3:00 PM - 5:00 PM' },
    { value: '18:00-20:00', label: '6:00 PM - 8:00 PM' }
  ];

  const days = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' }
  ];

  const deliveryZones = [
    { name: 'Riyadh Central', areas: ['Al Olaya', 'Al Malaz', 'King Fahd District'] },
    { name: 'Riyadh North', areas: ['Al Nakheel', 'Al Sahafa', 'Hittin'] },
    { name: 'Riyadh East', areas: ['Al Naseem', 'Al Ramal', 'Al Yasmin'] },
    { name: 'Riyadh West', areas: ['Al Hamra', 'Al Shifa', 'Al Zahra'] }
  ];

  const toggleDeliveryDay = (day: string) => {
    setDeliveryDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Delivery Preferences</h1>
          <p className="text-gray-600 mt-2">Manage your delivery addresses and schedule</p>
        </div>

        <div className="space-y-8">
          {/* Delivery Addresses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Delivery Addresses</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{address.type}</h3>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add New Address Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="addressType">Address Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zone">Delivery Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryZones.map((zone) => (
                          <SelectItem key={zone.name} value={zone.name}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    placeholder="Enter your street address"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="building">Building/Villa</Label>
                    <Input
                      id="building"
                      placeholder="Building number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Input
                      id="floor"
                      placeholder="Floor number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="apartment">Apartment</Label>
                    <Input
                      id="apartment"
                      placeholder="Apartment number"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Input
                    id="instructions"
                    placeholder="e.g., Ring doorbell twice, leave at door"
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Address
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Delivery Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Time Slot Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Preferred Time Slot
                </Label>
                <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Delivery Days */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Delivery Days
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {days.map((day) => (
                    <Button
                      key={day.value}
                      variant={deliveryDays.includes(day.value) ? 'default' : 'outline'}
                      onClick={() => toggleDeliveryDay(day.value)}
                      className="w-full"
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {deliveryDays.length} days per week
                </p>
              </div>

              <Button className="bg-green-600 hover:bg-green-700">
                Save Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Zones Info */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deliveryZones.map((zone) => (
                  <div key={zone.name} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-2">{zone.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Covered areas:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {zone.areas.map((area) => (
                        <li key={area}>• {area}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Delivery Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Free delivery for all subscription orders</li>
                  <li>• Delivery time window: 2 hours</li>
                  <li>• SMS notification 30 minutes before delivery</li>
                  <li>• Contact customer service for special delivery requests</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
