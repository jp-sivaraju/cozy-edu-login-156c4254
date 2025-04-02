
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, Clock, CreditCard, FileText, History } from 'lucide-react';
import confetti from 'canvas-confetti';

// Mock data for demonstration
const MOCK_FEES_DATA = {
  currentDue: {
    amount: 12500,
    dueDate: "2023-07-15",
    term: "Fall 2023",
    items: [
      { name: "Tuition Fee", amount: 10000 },
      { name: "Development Fee", amount: 1500 },
      { name: "Activity Fee", amount: 1000 }
    ]
  },
  paymentHistory: [
    { id: 1, date: "2023-03-10", amount: 12500, term: "Spring 2023", status: "Paid" },
    { id: 2, date: "2022-12-05", amount: 12000, term: "Winter 2022", status: "Paid" },
    { id: 3, date: "2022-08-15", amount: 12000, term: "Fall 2022", status: "Paid" }
  ],
  concessions: [
    { id: 1, type: "Sibling Discount", percentage: 10, amount: 1250, status: "Applied" },
    { id: 2, type: "Early Payment", percentage: 5, amount: 625, status: "Eligible" }
  ]
};

const Fees = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pay-now");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDueSoon, setIsDueSoon] = useState(false);

  useEffect(() => {
    // Check if fee is due soon (within 5 days)
    const dueDate = new Date(MOCK_FEES_DATA.currentDue.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setIsDueSoon(diffDays > 0 && diffDays <= 5);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success toast
      toast({
        title: "Payment Successful!",
        description: `You've successfully paid ${formatCurrency(MOCK_FEES_DATA.currentDue.amount)} for ${MOCK_FEES_DATA.currentDue.term}`,
      });
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5DC99F', '#5B96F7', '#5DC99F']
      });
    }, 2000);
  };

  const applyConcession = (id: number) => {
    toast({
      title: "Concession Applied",
      description: "Your concession has been applied to your current dues.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Fees & Payments</h1>
      
      {isDueSoon && (
        <div className="mb-6 p-4 bg-edu-yellow rounded-lg flex items-start gap-3">
          <AlertTriangle className="text-amber-700 h-6 w-6 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Payment Due Soon</h3>
            <p className="text-amber-700">
              Your fee payment for {MOCK_FEES_DATA.currentDue.term} is due on {formatDate(MOCK_FEES_DATA.currentDue.dueDate)}. Please make the payment to avoid late fees.
            </p>
          </div>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="pay-now" className="data-[state=active]:bg-edu-yellow data-[state=active]:text-black">
            <CreditCard className="h-4 w-4 mr-2" /> 
            Pay Now
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-edu-blue data-[state=active]:text-white">
            <History className="h-4 w-4 mr-2" /> 
            Payment History
          </TabsTrigger>
          <TabsTrigger value="concessions" className="data-[state=active]:bg-edu-green data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" /> 
            Concessions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pay-now" className="animate-fade-in">
          <Card>
            <CardHeader className="bg-edu-yellow/20 rounded-t-lg">
              <CardTitle className="text-xl">Current Fees Due</CardTitle>
              <CardDescription>
                {MOCK_FEES_DATA.currentDue.term} - Due by {formatDate(MOCK_FEES_DATA.currentDue.dueDate)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  {MOCK_FEES_DATA.currentDue.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-edu-green/30">
                      <span>{item.name}</span>
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between py-3 mt-2 border-t-2 border-edu-green">
                    <span className="font-semibold text-lg">Total Amount</span>
                    <span className="font-bold text-lg">{formatCurrency(MOCK_FEES_DATA.currentDue.amount)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-edu-yellow hover:bg-edu-yellow/90 text-black shadow-md"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-pulse">Processing Payment</span>
                      <span className="ml-2 inline-block animate-spin">⟳</span>
                    </>
                  ) : (
                    <>Pay Now {formatCurrency(MOCK_FEES_DATA.currentDue.amount)}</>
                  )}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Secure payment processing. This usually takes less than a minute.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="animate-fade-in">
          <Card>
            <CardHeader className="bg-edu-blue/10 rounded-t-lg">
              <CardTitle className="text-xl">Payment History</CardTitle>
              <CardDescription>
                View all your previous payments
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {MOCK_FEES_DATA.paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 border border-edu-green rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-medium text-slate-800">{payment.term}</h3>
                      <p className="text-sm text-muted-foreground">
                        Paid on {formatDate(payment.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" /> {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concessions" className="animate-fade-in">
          <Card>
            <CardHeader className="bg-edu-green/10 rounded-t-lg">
              <CardTitle className="text-xl">Available Concessions</CardTitle>
              <CardDescription>
                Fee discounts and concessions you're eligible for
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {MOCK_FEES_DATA.concessions.map((concession) => (
                  <div
                    key={concession.id}
                    className="p-4 border border-edu-green rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-slate-800">{concession.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {concession.percentage}% discount
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          concession.status === 'Applied' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {concession.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-edu-green/30">
                      <span className="text-muted-foreground">Discount Amount</span>
                      <span className="font-medium text-edu-green">{formatCurrency(concession.amount)}</span>
                    </div>
                    {concession.status === 'Eligible' && (
                      <Button
                        onClick={() => applyConcession(concession.id)}
                        className="w-full mt-3 bg-edu-blue hover:bg-edu-blue/90 text-white"
                        size="sm"
                      >
                        Apply Concession
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fees;
