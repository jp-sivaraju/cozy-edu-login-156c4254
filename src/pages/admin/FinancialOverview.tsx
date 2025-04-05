
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, PieChart, ArrowUpRight, DollarSign, UserCheck, FileText, 
  Download, Filter, Calendar, TrendingUp, TrendingDown, Search 
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  TricolorCard, GlassCard, PremiumCard 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from 'recharts';

interface ChartData {
  name: string;
  [key: string]: any;
}

// Financial data
const financialData: ChartData[] = [
  { name: 'Apr', income: 320000, expenses: 240000, profit: 80000, value: 320000 },
  { name: 'May', income: 380000, expenses: 260000, profit: 120000, value: 380000 },
  { name: 'Jun', income: 450000, expenses: 290000, profit: 160000, value: 450000 },
  { name: 'Jul', income: 420000, expenses: 270000, profit: 150000, value: 420000 },
  { name: 'Aug', income: 520000, expenses: 320000, profit: 200000, value: 520000 },
  { name: 'Sep', income: 590000, expenses: 350000, profit: 240000, value: 590000 },
];

const feeCollectionData: ChartData[] = [
  { name: 'Paid', value: 76 },
  { name: 'Pending', value: 18 },
  { name: 'Defaulters', value: 6 },
];

const paymentMethodData: ChartData[] = [
  { name: 'Online', value: 65 },
  { name: 'Bank Transfer', value: 20 },
  { name: 'Cash', value: 12 },
  { name: 'Cheque', value: 3 },
];

const COLORS = ['#138808', '#FF9933', '#000080', '#FF5733'];

// Income distribution by category
const incomeDistributionData = [
  { name: 'Tuition Fees', value: 68 },
  { name: 'Transport', value: 12 },
  { name: 'Books & Materials', value: 10 },
  { name: 'Misc Fees', value: 6 },
  { name: 'Canteen', value: 4 },
];

const expenseBreakdownData = [
  { name: 'Salaries', value: 55 },
  { name: 'Infrastructure', value: 16 },
  { name: 'Operations', value: 12 },
  { name: 'Transport', value: 10 },
  { name: 'Materials', value: 7 },
];

// Recent transactions
const recentTransactions = [
  { id: 'TXN-45321', date: '2023-09-05', studentName: 'Rahul Sharma', amount: 15200, type: 'Tuition Fee', status: 'success' },
  { id: 'TXN-45322', date: '2023-09-05', studentName: 'Ananya Patel', amount: 8500, type: 'Transport Fee', status: 'success' },
  { id: 'TXN-45323', date: '2023-09-04', studentName: 'Vikram Singh', amount: 12500, type: 'Tuition Fee', status: 'success' },
  { id: 'TXN-45324', date: '2023-09-04', studentName: 'Priya Desai', amount: 15200, type: 'Tuition Fee', status: 'pending' },
  { id: 'TXN-45325', date: '2023-09-04', studentName: 'Arjun Kumar', amount: 7600, type: 'Books & Materials', status: 'success' },
  { id: 'TXN-45326', date: '2023-09-03', studentName: 'Nisha Mehta', amount: 8500, type: 'Transport Fee', status: 'failed' },
];

// Pending invoices
const pendingInvoices = [
  { id: 'INV-23051', studentName: 'Aditya Shah', class: 'Class 9A', amount: 15200, dueDate: '2023-09-15', status: 'pending' },
  { id: 'INV-23052', studentName: 'Zara Khan', class: 'Class 8B', amount: 15200, dueDate: '2023-09-15', status: 'pending' },
  { id: 'INV-23053', studentName: 'Rohan Joshi', class: 'Class 10A', amount: 15200, dueDate: '2023-09-15', status: 'overdue' },
  { id: 'INV-23054', studentName: 'Meera Iyer', class: 'Class 7C', amount: 15200, dueDate: '2023-09-20', status: 'pending' },
];

// Statistic cards
const statCards = [
  { title: 'Total Revenue', value: '₹3,245,000', trend: '+12.5%', isPositive: true },
  { title: 'Outstanding Amount', value: '₹824,200', trend: '-3.2%', isPositive: true },
  { title: 'Fee Collection Rate', value: '87.4%', trend: '+2.1%', isPositive: true },
  { title: 'Defaulters', value: '63 students', trend: '-5.3%', isPositive: true },
];

const FinancialOverview: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('monthly');
  
  const formatIndianRupee = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#000080]">Financial Overview</h1>
          <p className="text-slate-600 mt-1">Comprehensive financial analytics and management</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Filter by Date</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="tricolor" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <GlassCard key={index} className="hover:translate-y-[-5px] transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-[#000080] mt-1">{stat.value}</h3>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center
                  ${stat.isPositive ? 'bg-[#138808]/10 text-[#138808]' : 'bg-red-100 text-red-600'}`}
                >
                  {stat.isPositive ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {stat.trend}
                </div>
              </div>
            </CardContent>
          </GlassCard>
        ))}
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue, Expenses & Profit Trend */}
            <TricolorCard className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Expenses</CardTitle>
                <CardDescription>Monthly financial trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={financialData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value) => formatIndianRupee(Number(value))} />
                      <Legend />
                      <Area type="monotone" dataKey="income" name="Income" stroke="#FF9933" fill="#FF9933" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#138808" fill="#138808" fillOpacity={0.4} />
                      <Area type="monotone" dataKey="profit" name="Profit" stroke="#000080" fill="#000080" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TricolorCard>

            {/* Fee Collection Status */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Status</CardTitle>
                <CardDescription>Overall fee payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={feeCollectionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {feeCollectionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#138808]"></div>
                  <span className="text-sm">Paid: 76%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF9933]"></div>
                  <span className="text-sm">Pending: 18%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#000080]"></div>
                  <span className="text-sm">Defaulters: 6%</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Income Distribution</CardTitle>
                <CardDescription>Breakdown by categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={incomeDistributionData}
                      margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" fill="#FF9933">
                        {incomeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`#FF9933${(90 - index * 15).toString(16)}`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Allocation by categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={expenseBreakdownData}
                      margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" fill="#138808">
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`#138808${(90 - index * 15).toString(16)}`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Fee Collection Trend</CardTitle>
                <CardDescription>Monthly collection analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value) => formatIndianRupee(Number(value))} />
                      <Legend />
                      <Bar dataKey="income" name="Collections" fill="#138808" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Fee payment channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <GlassCard>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Requires immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs bg-slate-50 text-slate-700 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">Invoice ID</th>
                      <th scope="col" className="px-6 py-3">Student Name</th>
                      <th scope="col" className="px-6 py-3">Class</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Due Date</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingInvoices.map((invoice, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                        <td className="px-6 py-4">{invoice.studentName}</td>
                        <td className="px-6 py-4">{invoice.class}</td>
                        <td className="px-6 py-4">{formatIndianRupee(invoice.amount)}</td>
                        <td className="px-6 py-4">{invoice.dueDate}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${invoice.status === 'pending' ? 'bg-[#FF9933]/10 text-[#FF9933]' : 'bg-red-100 text-red-600'}`}>
                            {invoice.status === 'pending' ? 'Pending' : 'Overdue'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">Send Reminder</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Invoices
              </Button>
            </CardFooter>
          </GlassCard>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
                <CardDescription>Monthly expense analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value) => formatIndianRupee(Number(value))} />
                      <Legend />
                      <Bar dataKey="expenses" name="Expenses" fill="#FF9933" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Distribution by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={expenseBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PremiumCard>
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
                <CardDescription>Annual budget utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Salaries', budget: 1800000, spent: 1400000, remaining: 400000 },
                    { category: 'Infrastructure', budget: 500000, spent: 320000, remaining: 180000 },
                    { category: 'Operations', budget: 400000, spent: 280000, remaining: 120000 },
                    { category: 'Materials', budget: 200000, spent: 150000, remaining: 50000 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm font-medium">
                          {formatIndianRupee(item.spent)} / {formatIndianRupee(item.budget)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-[#138808]" 
                          style={{ width: `${(item.spent / item.budget) * 100}%` }}>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </PremiumCard>

            <PremiumCard>
              <CardHeader>
                <CardTitle>Expense Approvals</CardTitle>
                <CardDescription>Pending authorization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'EXP-1023', department: 'Admin', purpose: 'Office Supplies', amount: 24500, status: 'pending' },
                    { id: 'EXP-1024', department: 'Library', purpose: 'New Books', amount: 35000, status: 'pending' },
                    { id: 'EXP-1025', department: 'Science Lab', purpose: 'Equipment', amount: 45000, status: 'pending' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                      <div>
                        <p className="font-medium">{item.id}: {item.purpose}</p>
                        <p className="text-sm text-slate-600">{item.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatIndianRupee(item.amount)}</p>
                        <div className="flex space-x-2 mt-1">
                          <Button variant="saffron" size="sm">Approve</Button>
                          <Button variant="outline" size="sm">Reject</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All Requests
                </Button>
              </CardFooter>
            </PremiumCard>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <TricolorCard>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs bg-slate-50 text-slate-700 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">Transaction ID</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Student</th>
                      <th scope="col" className="px-6 py-3">Amount</th>
                      <th scope="col" className="px-6 py-3">Type</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">{transaction.id}</td>
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.studentName}</td>
                        <td className="px-6 py-4">{formatIndianRupee(transaction.amount)}</td>
                        <td className="px-6 py-4">{transaction.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium 
                            ${transaction.status === 'success' ? 'bg-[#138808]/10 text-[#138808]' : 
                              transaction.status === 'pending' ? 'bg-[#FF9933]/10 text-[#FF9933]' : 
                              'bg-red-100 text-red-600'}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Transactions
              </Button>
            </CardFooter>
          </TricolorCard>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Distribution</CardTitle>
                <CardDescription>By payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={paymentMethodData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" fill="#000080">
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <GlassCard>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Financial management tools</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="tricolor" className="h-auto py-6 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Fee Receipts</span>
                </Button>
                <Button variant="premium-green" className="h-auto py-6 flex flex-col items-center justify-center">
                  <UserCheck className="h-6 w-6 mb-2" />
                  <span>Fee Concessions</span>
                </Button>
                <Button variant="glass-saffron" className="h-auto py-6 flex flex-col items-center justify-center">
                  <DollarSign className="h-6 w-6 mb-2" />
                  <span>Fee Structure</span>
                </Button>
                <Button variant="glass-blue" className="h-auto py-6 flex flex-col items-center justify-center">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Generate Reports</span>
                </Button>
              </CardContent>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialOverview;
