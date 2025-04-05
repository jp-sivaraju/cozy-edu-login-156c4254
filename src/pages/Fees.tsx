
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, Clock, CreditCard, FileText, History, IndianRupee, Receipt, CreditCard as CreditCardIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import DashboardLayout from '@/components/layouts/DashboardLayout';

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
  ],
  feeStructure: [
    { grade: "Nursery to KG", tuition: 8000, development: 1200, activity: 800, total: 10000 },
    { grade: "Grades 1-5", tuition: 10000, development: 1500, activity: 1000, total: 12500 },
    { grade: "Grades 6-8", tuition: 12000, development: 1800, activity: 1200, total: 15000 },
    { grade: "Grades 9-10", tuition: 15000, development: 2000, activity: 1500, total: 18500 },
    { grade: "Grades 11-12", tuition: 18000, development: 2500, activity: 2000, total: 22500 }
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
        colors: ['#FF9933', '#FFFFFF', '#138808']
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
    <DashboardLayout>
      <div className="container p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-[#FF9933]">Fees & Payments</h1>
          <p className="text-[#000080] mb-8 text-lg">Manage your school fee payments</p>
          
          {isDueSoon && (
            <div className="mb-6 p-4 bg-[#FF9933]/10 rounded-lg flex items-start gap-3 border border-[#FF9933]/20">
              <AlertTriangle className="text-[#FF9933] h-6 w-6 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#FF9933]">Payment Due Soon</h3>
                <p className="text-[#000080]/80">
                  Your fee payment for {MOCK_FEES_DATA.currentDue.term} is due on {formatDate(MOCK_FEES_DATA.currentDue.dueDate)}. Please make the payment to avoid late fees.
                </p>
              </div>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="pay-now" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white">
                <CreditCard className="h-4 w-4 mr-2" /> 
                Pay Now
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-[#000080] data-[state=active]:text-white">
                <History className="h-4 w-4 mr-2" /> 
                Payment History
              </TabsTrigger>
              <TabsTrigger value="concessions" className="data-[state=active]:bg-[#138808] data-[state=active]:text-white">
                <Receipt className="h-4 w-4 mr-2" /> 
                Concessions
              </TabsTrigger>
              <TabsTrigger value="structure" className="data-[state=active]:bg-[#FF9933] data-[state=active]:text-white">
                <IndianRupee className="h-4 w-4 mr-2" /> 
                Fee Structure
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pay-now" className="animate-fade-in">
              <Card className="border-[#138808]/10">
                <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-transparent rounded-t-xl">
                  <CardTitle className="text-xl text-[#000080]">Current Fees Due</CardTitle>
                  <CardDescription>
                    {MOCK_FEES_DATA.currentDue.term} - Due by {formatDate(MOCK_FEES_DATA.currentDue.dueDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      {MOCK_FEES_DATA.currentDue.items.map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-[#138808]/30">
                          <span className="text-[#000080]">{item.name}</span>
                          <span className="font-medium text-[#000080]">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                      
                      <div className="flex justify-between py-3 mt-2 border-t-2 border-[#138808]">
                        <span className="font-semibold text-lg text-[#000080]">Total Amount</span>
                        <span className="font-bold text-lg text-[#FF9933]">{formatCurrency(MOCK_FEES_DATA.currentDue.amount)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      className="w-full"
                      variant="tricolor"
                      size="lg"
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
                    
                    <div className="text-center text-sm text-[#000080]/60 flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Secure payment processing. This usually takes less than a minute.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <Card className="border-[#138808]/10">
                <CardHeader className="bg-gradient-to-r from-[#000080]/10 to-transparent rounded-t-xl">
                  <CardTitle className="text-xl text-[#000080]">Payment History</CardTitle>
                  <CardDescription>
                    View all your previous payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {MOCK_FEES_DATA.paymentHistory.map((payment) => (
                      <div
                        key={payment.id}
                        className="p-4 border border-[#138808]/20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:shadow-md transition-all"
                      >
                        <div>
                          <h3 className="font-medium text-[#000080]">{payment.term}</h3>
                          <p className="text-sm text-[#000080]/60">
                            Paid on {formatDate(payment.date)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#000080]">{formatCurrency(payment.amount)}</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#138808]/10 text-[#138808]">
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
              <Card className="border-[#138808]/10">
                <CardHeader className="bg-gradient-to-r from-[#138808]/10 to-transparent rounded-t-xl">
                  <CardTitle className="text-xl text-[#000080]">Available Concessions</CardTitle>
                  <CardDescription>
                    Fee discounts and concessions you're eligible for
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {MOCK_FEES_DATA.concessions.map((concession) => (
                      <div
                        key={concession.id}
                        className="p-4 border border-[#138808]/20 rounded-lg bg-white hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-[#000080]">{concession.type}</h3>
                            <p className="text-sm text-[#000080]/60">
                              {concession.percentage}% discount
                            </p>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              concession.status === 'Applied' ? 'bg-[#138808]/10 text-[#138808]' : 'bg-[#FF9933]/10 text-[#FF9933]'
                            }`}>
                              {concession.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-[#138808]/30">
                          <span className="text-[#000080]/60">Discount Amount</span>
                          <span className="font-medium text-[#138808]">{formatCurrency(concession.amount)}</span>
                        </div>
                        {concession.status === 'Eligible' && (
                          <Button
                            onClick={() => applyConcession(concession.id)}
                            className="w-full mt-3"
                            variant="premium-green"
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
            
            <TabsContent value="structure" className="animate-fade-in">
              <Card className="border-[#138808]/10">
                <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-transparent rounded-t-xl">
                  <CardTitle className="text-xl text-[#000080]">Fee Structure</CardTitle>
                  <CardDescription>
                    Academic year 2023-2024 fee structure
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-[#138808]">
                          <th className="text-left py-3 px-4 font-semibold text-[#000080]">Grade</th>
                          <th className="text-right py-3 px-4 font-semibold text-[#000080]">Tuition Fee</th>
                          <th className="text-right py-3 px-4 font-semibold text-[#000080]">Development Fee</th>
                          <th className="text-right py-3 px-4 font-semibold text-[#000080]">Activity Fee</th>
                          <th className="text-right py-3 px-4 font-semibold text-[#000080]">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#138808]/20">
                        {MOCK_FEES_DATA.feeStructure.map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-[#000080]">{item.grade}</td>
                            <td className="text-right py-3 px-4">{formatCurrency(item.tuition)}</td>
                            <td className="text-right py-3 px-4">{formatCurrency(item.development)}</td>
                            <td className="text-right py-3 px-4">{formatCurrency(item.activity)}</td>
                            <td className="text-right py-3 px-4 font-semibold text-[#FF9933]">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#138808]/5 rounded-lg border border-[#138808]/20 text-sm text-[#000080]/80">
                    <p className="font-semibold mb-2">Additional Information:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fees are payable in three installments (Term-wise)</li>
                      <li>Late payment fees of ₹500 will be charged after due dates</li>
                      <li>Annual fees must be cleared by March 31st of the academic year</li>
                      <li>10% discount on full year payment if paid before April 30th</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Fees;
