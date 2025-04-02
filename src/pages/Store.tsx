
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Shirt, BookOpen, ChevronDown, AlertTriangle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock API call
const fetchStoreItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    uniforms: [
      {
        id: "uniform1",
        name: "School Shirt (Summer)",
        price: 450,
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/School%20Shirt"
      },
      {
        id: "uniform2",
        name: "School Trousers",
        price: 650,
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/School%20Trousers"
      },
      {
        id: "uniform3",
        name: "School Blazer",
        price: 1200,
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/School%20Blazer"
      },
      {
        id: "uniform4",
        name: "School Tie",
        price: 200,
        sizes: ["Standard"],
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/School%20Tie"
      },
      {
        id: "uniform5",
        name: "Sports T-Shirt",
        price: 350,
        sizes: ["S", "M"],
        inStock: false,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Sports%20T-Shirt"
      }
    ],
    books: [
      {
        id: "book1",
        name: "Mathematics Textbook - Grade 8",
        price: 450,
        subject: "Mathematics",
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Math%20Textbook"
      },
      {
        id: "book2",
        name: "Science Textbook - Grade 8",
        price: 500,
        subject: "Science",
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Science%20Textbook"
      },
      {
        id: "book3",
        name: "English Literature - Grade 8",
        price: 400,
        subject: "English",
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/English%20Textbook"
      },
      {
        id: "book4",
        name: "Social Studies - Grade 8",
        price: 425,
        subject: "Social Studies",
        inStock: true,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Social%20Studies"
      },
      {
        id: "book5",
        name: "Hindi Vyakaran - Grade 8",
        price: 350,
        subject: "Hindi",
        inStock: false,
        imageUrl: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Hindi%20Book"
      }
    ],
    orders: [
      {
        id: "order1",
        date: "2023-09-05",
        items: [
          { id: "uniform1", name: "School Shirt (Summer)", quantity: 2, price: 450, size: "M" },
          { id: "uniform2", name: "School Trousers", quantity: 2, price: 650, size: "M" }
        ],
        status: "delivered",
        total: 2200
      },
      {
        id: "order2",
        date: "2023-10-12",
        items: [
          { id: "book1", name: "Mathematics Textbook - Grade 8", quantity: 1, price: 450 },
          { id: "book3", name: "English Literature - Grade 8", quantity: 1, price: 400 }
        ],
        status: "processing",
        total: 850
      }
    ]
  };
};

const Store = () => {
  const [activeTab, setActiveTab] = useState("uniforms");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [showCart, setShowCart] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['storeItems'],
    queryFn: fetchStoreItems,
  });

  const addToCart = (item: any, type: string) => {
    const size = type === 'uniforms' ? selectedSizes[item.id] || item.sizes[0] : null;
    
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.id === item.id && cartItem.size === size
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Add new item
      setCart([...cart, {
        ...item,
        quantity: 1,
        size,
        type
      }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${item.name}${size ? ` (Size: ${size})` : ''} added to your cart.`,
    });
  };

  const handleSizeChange = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart.",
    });
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const checkout = () => {
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully!",
    });
    setCart([]);
    setShowCart(false);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="text-center py-8">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <p className="text-slate-500">Your cart is empty</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 border border-[#138808]/20 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-4 mt-1">
                  {item.size && (
                    <p className="text-sm text-slate-500">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-[#000080] font-medium">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#138808]/20 rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 h-8"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-[#138808]/20 pt-4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-bold text-[#000080]">₹{calculateTotal()}</p>
          </div>
          
          <Button
            className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
            onClick={checkout}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
          </Button>
        </div>
      </div>
    );
  };

  const renderUniforms = () => {
    if (!data) return null;
    const { uniforms } = data;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniforms.map((item) => (
          <Card key={item.id} className="border-[#138808]/30 overflow-hidden">
            <div className="h-48 bg-slate-100 flex items-center justify-center">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="max-h-full w-auto object-cover" 
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-[#000080] font-bold mb-4">₹{item.price}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="outline"
                    className={`cursor-pointer ${
                      selectedSizes[item.id] === size ? 
                      'border-[#138808] bg-[#138808]/10 text-[#138808]' : 
                      'border-slate-300'
                    }`}
                    onClick={() => handleSizeChange(item.id, size)}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                {item.inStock ? (
                  <Badge className="bg-[#138808]">In Stock</Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-500">Out of Stock</Badge>
                )}
                <Button
                  size="sm"
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item, 'uniforms')}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderBooks = () => {
    if (!data) return null;
    const { books } = data;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((item) => (
          <Card key={item.id} className="border-[#138808]/30 overflow-hidden">
            <div className="h-48 bg-slate-100 flex items-center justify-center">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="max-h-full w-auto object-cover" 
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-slate-500 mb-2">Subject: {item.subject}</p>
              <p className="text-[#000080] font-bold mb-4">₹{item.price}</p>
              
              <div className="flex justify-between items-center">
                {item.inStock ? (
                  <Badge className="bg-[#138808]">In Stock</Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-500">Out of Stock</Badge>
                )}
                <Button
                  size="sm"
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item, 'books')}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderOrders = () => {
    if (!data) return null;
    const { orders } = data;
    
    if (orders.length === 0) {
      return (
        <div className="text-center py-8">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <p className="text-slate-500">No orders found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="border-[#138808]/30">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#000080]">Order #{order.id}</CardTitle>
                <p className="text-sm text-slate-500">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <Badge className={
                order.status === 'delivered' ? 'bg-[#138808]' : 'bg-[#FF9933]'
              }>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#138808]/10">
                {order.items.map((item, index) => (
                  <div key={index} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex gap-3 text-sm text-slate-500">
                        <p>Qty: {item.quantity}</p>
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                    </div>
                    <p className="font-medium text-[#000080]">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-[#138808]/20 flex justify-between items-center bg-[#FF9933]/5">
                <p className="font-semibold">Total</p>
                <p className="font-bold text-[#000080]">₹{order.total}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#138808]">School Store</h1>
            <p className="text-slate-500">
              Purchase uniforms and books
            </p>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              className="relative"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9933] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
            
            {showCart && (
              <div className="absolute right-0 mt-2 w-96 bg-white border border-[#138808]/20 rounded-lg shadow-lg z-50 p-4">
                <h3 className="font-semibold mb-4">Your Cart</h3>
                {renderCart()}
              </div>
            )}
          </div>
        </div>
        
        {!data?.uniforms.some(item => item.inStock) && (
          <Alert className="mb-6 border-[#FF9933] bg-[#FFF9F0]">
            <AlertTriangle className="h-4 w-4 text-[#FF9933]" />
            <AlertDescription className="text-slate-700">
              Some uniform items are currently out of stock. Please check back later.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="uniforms" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="uniforms"
              className={`flex-1 ${activeTab === "uniforms" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Shirt className="h-4 w-4 mr-2" /> Uniforms
            </TabsTrigger>
            <TabsTrigger 
              value="books"
              className={`flex-1 ${activeTab === "books" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <BookOpen className="h-4 w-4 mr-2" /> Books
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className={`flex-1 ${activeTab === "orders" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> My Orders
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load store data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="uniforms" className="mt-0">
                {renderUniforms()}
              </TabsContent>
              
              <TabsContent value="books" className="mt-0">
                {renderBooks()}
              </TabsContent>
              
              <TabsContent value="orders" className="mt-0">
                {renderOrders()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Store;
