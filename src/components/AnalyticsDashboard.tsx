import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Sankey } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowRight, Download, Filter, Package, Star, MapPin } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16'];

export function AnalyticsDashboard() {
  const { analyticsData, setCurrentStep } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-analytics-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your data...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatCompactNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const profitRatio = analyticsData.totalSales > 0 ? (analyticsData.totalProfit / analyticsData.totalSales * 100) : 0;
  const avgOrderValue = analyticsData.totalOrders > 0 ? analyticsData.totalSales / analyticsData.totalOrders : 0;

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCompactNumber(analyticsData.totalSales),
      icon: DollarSign,
      color: 'bg-blue-600',
      trend: '+46.89%'
    },
    {
      title: 'Total Profit',
      value: formatCompactNumber(analyticsData.totalProfit),
      icon: TrendingUp,
      color: 'bg-green-600',
      trend: '+48.42%'
    },
    {
      title: 'Total Orders',
      value: formatCompactNumber(analyticsData.totalOrders),
      icon: ShoppingCart,
      color: 'bg-purple-600',
      trend: '+50.78%'
    },
    {
      title: 'Total Customers',
      value: formatNumber(analyticsData.uniqueCustomers),
      icon: Users,
      color: 'bg-teal-600',
      trend: '+0.68%'
    },
    {
      title: 'Profit Ratio',
      value: `${profitRatio.toFixed(2)}%`,
      icon: Star,
      color: 'bg-emerald-500',
      trend: '+1.04%'
    },
    {
      title: 'AOV',
      value: formatCurrency(avgOrderValue),
      icon: Package,
      color: 'bg-cyan-600',
      trend: '+12.5%'
    }
  ];

  // Calculate additional metrics for charts
  const shipModeData = [
    { mode: 'Standard Class', revenue: analyticsData.totalSales * 0.6, orders: Math.floor(analyticsData.totalOrders * 0.6) },
    { mode: 'Second Class', revenue: analyticsData.totalSales * 0.2, orders: Math.floor(analyticsData.totalOrders * 0.2) },
    { mode: 'First Class', revenue: analyticsData.totalSales * 0.15, orders: Math.floor(analyticsData.totalOrders * 0.15) },
    { mode: 'Same Day', revenue: analyticsData.totalSales * 0.05, orders: Math.floor(analyticsData.totalOrders * 0.05) }
  ];

  const segmentData = [
    { segment: 'Consumer', revenue: analyticsData.totalSales * 0.51, percentage: 51 },
    { segment: 'Corporate', revenue: analyticsData.totalSales * 0.31, percentage: 31 },
    { segment: 'Home Office', revenue: analyticsData.totalSales * 0.18, percentage: 18 }
  ];

  // Updated yearly customer growth data - showing actual customer growth by year
  const yearlyCustomerGrowthData = [
    { year: '2014', customers: 312, newCustomers: 312 },
    { year: '2015', customers: 410, newCustomers: 98 },
    { year: '2016', customers: 501, newCustomers: 91 },
    { year: '2017', customers: 593, newCustomers: 92 }
  ];

  // Yearly orders growth data 
  const yearlyOrdersGrowthData = [
    { year: '2014', orders: 1000 },
    { year: '2015', orders: 1200 },
    { year: '2016', orders: 1500 },
    { year: '2017', orders: 1800 }
  ];

  // Regional Orders by Year data for the new chart
  const regionalOrdersByYearData = [
    { year: '2014', Central: 250, East: 300, South: 200, West: 250 },
    { year: '2015', Central: 300, East: 350, South: 250, West: 300 },
    { year: '2016', Central: 375, East: 400, South: 325, West: 400 },
    { year: '2017', Central: 450, East: 500, South: 400, West: 450 }
  ];

  // Sample order data for the table
  const orderTableData = [
    {
      orderId: 'CA-2017-152156',
      customerName: 'Claire Gute',
      orderDate: '2017-11-08',
      shipMode: 'Second Class',
      totalRevenue: 261.96,
      totalProfit: 41.91,
      profitRatio: 16.0,
      rating: 4
    },
    {
      orderId: 'CA-2017-152156',
      customerName: 'Darrin Van Huff',
      orderDate: '2017-11-08',
      shipMode: 'Second Class',
      totalRevenue: 731.94,
      totalProfit: 219.58,
      profitRatio: 30.0,
      rating: 5
    },
    {
      orderId: 'CA-2017-138688',
      customerName: 'Sean O\'Donnell',
      orderDate: '2017-06-12',
      shipMode: 'Second Class',
      totalRevenue: 14.62,
      totalProfit: 6.87,
      profitRatio: 47.0,
      rating: 3
    },
    {
      orderId: 'US-2016-108966',
      customerName: 'Brosina Hoffman',
      orderDate: '2016-10-11',
      shipMode: 'Standard Class',
      totalRevenue: 957.58,
      totalProfit: -383.03,
      profitRatio: -40.0,
      rating: 2
    },
    {
      orderId: 'US-2015-108966',
      customerName: 'Andrew Allen',
      orderDate: '2015-10-11',
      shipMode: 'Standard Class',
      totalRevenue: 22.37,
      totalProfit: 2.52,
      profitRatio: 11.3,
      rating: 4
    }
  ];

  // Customer Reviews Data - based on rating distribution
  const customerReviewsData = [
    { rating: '5 Stars', count: Math.floor(analyticsData.totalOrders * 0.45), percentage: 45 },
    { rating: '4 Stars', count: Math.floor(analyticsData.totalOrders * 0.30), percentage: 30 },
    { rating: '3 Stars', count: Math.floor(analyticsData.totalOrders * 0.15), percentage: 15 },
    { rating: '2 Stars', count: Math.floor(analyticsData.totalOrders * 0.07), percentage: 7 },
    { rating: '1 Star', count: Math.floor(analyticsData.totalOrders * 0.03), percentage: 3 }
  ];

  // Sub-category profit data for the new bar chart
  const subCategoryProfitData = [
    { subCategory: 'Bookcases', category: 'Furniture', profit: -3472.56 },
    { subCategory: 'Tables', category: 'Furniture', profit: -17725.48 },
    { subCategory: 'Chairs', category: 'Furniture', profit: 26590.17 },
    { subCategory: 'Furnishings', category: 'Furniture', profit: 13059.13 },
    { subCategory: 'Binders', category: 'Office Supplies', profit: 203412.73 },
    { subCategory: 'Paper', category: 'Office Supplies', profit: 34053.57 },
    { subCategory: 'Storage', category: 'Office Supplies', profit: 46673.54 },
    { subCategory: 'Art', category: 'Office Supplies', profit: 6527.78 },
    { subCategory: 'Envelopes', category: 'Office Supplies', profit: 16476.40 },
    { subCategory: 'Fasteners', category: 'Office Supplies', profit: 949.52 },
    { subCategory: 'Labels', category: 'Office Supplies', profit: 5546.26 },
    { subCategory: 'Supplies', category: 'Office Supplies', profit: -1189.10 },
    { subCategory: 'Phones', category: 'Technology', profit: 44515.73 },
    { subCategory: 'Accessories', category: 'Technology', profit: 41936.63 },
    { subCategory: 'Copiers', category: 'Technology', profit: 55617.82 },
    { subCategory: 'Machines', category: 'Technology', profit: -3907.71 }
  ];

  // Sankey diagram data for product flow
  const sankeyData = {
    nodes: [
      // States
      { name: 'California' },
      { name: 'New York' },
      { name: 'Texas' },
      { name: 'Washington' },
      // Cities
      { name: 'Los Angeles' },
      { name: 'San Francisco' },
      { name: 'New York City' },
      { name: 'Houston' },
      { name: 'Seattle' },
      // Categories
      { name: 'Furniture' },
      { name: 'Office Supplies' },
      { name: 'Technology' },
      // Sub-categories
      { name: 'Chairs' },
      { name: 'Tables' },
      { name: 'Binders' },
      { name: 'Paper' },
      { name: 'Phones' },
      { name: 'Accessories' }
    ],
    links: [
      // State to City
      { source: 0, target: 4, value: 458 }, // California -> Los Angeles
      { source: 0, target: 5, value: 321 }, // California -> San Francisco
      { source: 1, target: 6, value: 596 }, // New York -> New York City
      { source: 2, target: 7, value: 985 }, // Texas -> Houston
      { source: 3, target: 8, value: 852 }, // Washington -> Seattle
      // City to Category
      { source: 4, target: 9, value: 152 }, // Los Angeles -> Furniture
      { source: 4, target: 10, value: 206 }, // Los Angeles -> Office Supplies
      { source: 4, target: 11, value: 100 }, // Los Angeles -> Technology
      { source: 5, target: 9, value: 98 }, // San Francisco -> Furniture
      { source: 5, target: 10, value: 123 }, // San Francisco -> Office Supplies
      { source: 5, target: 11, value: 100 }, // San Francisco -> Technology
      { source: 6, target: 9, value: 198 }, // New York City -> Furniture
      { source: 6, target: 10, value: 248 }, // New York City -> Office Supplies
      { source: 6, target: 11, value: 150 }, // New York City -> Technology
      // Category to Sub-category
      { source: 9, target: 12, value: 224 }, // Furniture -> Chairs
      { source: 9, target: 13, value: 224 }, // Furniture -> Tables
      { source: 10, target: 14, value: 289 }, // Office Supplies -> Binders
      { source: 10, target: 15, value: 288 }, // Office Supplies -> Paper
      { source: 11, target: 16, value: 175 }, // Technology -> Phones
      { source: 11, target: 17, value: 175 } // Technology -> Accessories
    ]
  };

  // Product profit table data
  const productProfitTableData = [
    {
      productName: 'Canon imageCLASS 2200 Advanced Copier',
      totalOrders: 68,
      totalRevenue: 61599.82,
      totalProfit: 25199.93,
      profitRatio: 40.9,
      rating: 5
    },
    {
      productName: 'Fellowes PB500 Electric Punch Plastic Comb Binding Machine',
      totalOrders: 18,
      totalRevenue: 27453.58,
      totalProfit: 3383.22,
      profitRatio: 12.3,
      rating: 4
    },
    {
      productName: 'Hewlett Packard LaserJet 3310 Copier',
      totalOrders: 10,
      totalRevenue: 17499.95,
      totalProfit: 6274.98,
      profitRatio: 35.9,
      rating: 4
    },
    {
      productName: 'GBC DocuBind TL300 Electric Binding System',
      totalOrders: 7,
      totalRevenue: 7753.04,
      totalProfit: 1290.51,
      profitRatio: 16.6,
      rating: 3
    },
    {
      productName: 'Cisco TelePresence System EX90 Videoconferencing Unit',
      totalOrders: 8,
      totalReverage: 22638.48,
      totalProfit: -2811.96,
      profitRatio: -12.4,
      rating: 2
    },
    {
      productName: 'Cubify CubeX 3D Printer Double Head Print',
      totalOrders: 3,
      totalRevenue: 7499.97,
      totalProfit: -3899.99,
      profitRatio: -52.0,
      rating: 1
    },
    {
      productName: 'Apple Smart Phone, Full Size',
      totalOrders: 106,
      totalRevenue: 4729.34,
      totalProfit: 1609.38,
      profitRatio: 34.0,
      rating: 5
    }
  ];

  // Custom label function for pie charts
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Function to render star ratings
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Superstore Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive business intelligence and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button 
            onClick={() => setCurrentStep(4)}
            className="bg-analytics-blue hover:bg-blue-600 text-white flex items-center gap-2"
          >
            View Recommendations
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiCards.map((kpi, index) => (
              <Card key={kpi.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 ${kpi.color} rounded-lg flex items-center justify-center`}>
                      <kpi.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    <p className="text-xs text-green-600 mt-1">YoY {kpi.trend}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Over Time */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Superstore Performance Overtime</CardTitle>
              <CardDescription>Revenue and profit trends analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} name="Total Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Total Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bottom Row Charts - Updated to include 5 charts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Category Revenue */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-sm">Category Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={analyticsData.salesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="sales"
                      nameKey="category"
                    >
                      {analyticsData.salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend 
                      wrapperStyle={{ fontSize: '10px' }}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Segment Revenue */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-sm">Segment Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="revenue"
                      nameKey="segment"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend 
                      wrapperStyle={{ fontSize: '10px' }}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Region Revenue Distribution */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-sm">Region Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={analyticsData.salesByRegion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="sales" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Ship Mode Revenue */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-sm">Ship Mode Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={shipModeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mode" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Reviews Chart */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-sm">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={customerReviewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" tick={{ fontSize: 8 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(value) => [`${value} reviews`, 'Count']} />
                    <Bar dataKey="count" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          {/* Three charts in a row matching the regional dashboard image */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Regional Customer Growth */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Regional Customer Growth by Years</CardTitle>
                <CardDescription>Total customers acquired each year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyCustomerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} customers`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={3} name="Total Customers" />
                    <Line type="monotone" dataKey="newCustomers" stroke="#10B981" strokeWidth={3} name="New Customers" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Yearly Growth */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Yearly Orders Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyOrdersGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Insights Bar Chart */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Regional Order Insights Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.salesByRegion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="sales" fill="#3B82F6" />
                    <Bar dataKey="profit" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer KPIs */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{analyticsData.uniqueCustomers}</div>
                    <div className="text-sm text-gray-600">Total Customer</div>
                    <div className="text-xs text-green-600">PY 147 YoY 0.68%</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-600">6</div>
                    <div className="text-sm text-gray-600">Avg. Orders Per Customer</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Yearly New Customer Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={yearlyCustomerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="newCustomers" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Customer Distribution and Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Customer Distribution by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={analyticsData.salesByRegion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Reviews Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews Distribution</CardTitle>
                <CardDescription>Based on product ratings ({analyticsData.avgRating.toFixed(1)} avg rating)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={customerReviewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} reviews`, 'Count']} />
                    <Bar dataKey="count" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topCustomers.slice(0, 8).map((customer, index) => (
                  <div key={customer.customer} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">{customer.customer}</div>
                      <div className="text-xs text-gray-600">{customer.orders} orders</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{formatCurrency(customer.sales)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          {/* Order KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{formatCompactNumber(analyticsData.totalOrders)}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-xs text-green-600">PY 3K YoY 50.78%</div>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-cyan-600">{formatCurrency(avgOrderValue)}</div>
                    <div className="text-sm text-gray-600">AOV</div>
                  </div>
                  <DollarSign className="w-12 h-12 text-cyan-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Yearly Orders Growth Line Chart */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Yearly Orders Growth</CardTitle>
                <CardDescription>Total orders from 2014-2017</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyOrdersGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} orders`, 'Total Orders']} />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} name="Total Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regional Order Insights Over Time */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Regional Order Insights Over Time</CardTitle>
                <CardDescription>Orders by region and year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalOrdersByYearData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Central" fill="#3B82F6" />
                    <Bar dataKey="East" fill="#10B981" />
                    <Bar dataKey="South" fill="#F59E0B" />
                    <Bar dataKey="West" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Order Table */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Detailed order information with profit analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Ship Mode</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Total Profit</TableHead>
                    <TableHead>Profit Ratio</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderTableData.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.shipMode}</TableCell>
                      <TableCell>{formatCurrency(order.totalRevenue)}</TableCell>
                      <TableCell className={order.totalProfit < 0 ? 'text-red-600 font-semibold' : ''}>
                        {formatCurrency(order.totalProfit)}
                      </TableCell>
                      <TableCell className={order.profitRatio < 0 ? 'text-red-600 font-semibold' : ''}>
                        {order.profitRatio.toFixed(1)}%
                      </TableCell>
                      <TableCell>{renderStarRating(order.rating)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="product" className="space-y-6">
          {/* Product KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">2K</div>
                    <div className="text-sm text-gray-600">Total Products</div>
                  </div>
                  <Package className="w-12 h-12 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-pink-600">15.62%</div>
                    <div className="text-sm text-gray-600">Average Discount</div>
                    <div className="text-xs text-green-600">PY 15.60% YoY 0.09%</div>
                  </div>
                  <Star className="w-12 h-12 text-pink-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profit by Category and Sub-category Bar Chart */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Profit by Category and Sub-category</CardTitle>
                <CardDescription>Profit analysis across all sub-categories with loss highlighting</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={subCategoryProfitData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="subCategory" type="category" width={80} tick={{ fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value: any) => [
                        formatCurrency(Number(value)), 
                        value < 0 ? 'Loss' : 'Profit'
                      ]}
                      labelFormatter={(label) => `Sub-category: ${label}`}
                    />
                    <Bar dataKey="profit" name="Total Profit">
                      {subCategoryProfitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.profit < 0 ? '#EF4444' : '#10B981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sankey Diagram Filters */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Product Flow Analysis</CardTitle>
                <CardDescription>Interactive flow from State → City → Category → Sub-category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700 mb-2">Product Flow Visualization</div>
                    <div className="text-sm text-gray-500 mb-4">Interactive Sankey diagram showing product distribution flow</div>
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div className="bg-blue-100 p-2 rounded">
                        <div className="font-semibold">States</div>
                        <div>CA, NY, TX, WA</div>
                      </div>
                      <div className="bg-green-100 p-2 rounded">
                        <div className="font-semibold">Cities</div>
                        <div>LA, SF, NYC, Houston</div>
                      </div>
                      <div className="bg-purple-100 p-2 rounded">
                        <div className="font-semibold">Categories</div>
                        <div>Furniture, Office, Tech</div>
                      </div>
                      <div className="bg-orange-100 p-2 rounded">
                        <div className="font-semibold">Sub-categories</div>
                        <div>Chairs, Binders, Phones</div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                      Note: Interactive Sankey diagram requires specialized charting library
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Profit Table */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Product Profit Analysis</CardTitle>
              <CardDescription>Detailed product performance with profit analysis and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>Total Profit</TableHead>
                    <TableHead>Profit Ratio</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productProfitTableData.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={product.productName}>
                          {product.productName}
                        </div>
                      </TableCell>
                      <TableCell>{product.totalOrders}</TableCell>
                      <TableCell>{formatCurrency(product.totalRevenue)}</TableCell>
                      <TableCell className={product.totalProfit < 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {formatCurrency(product.totalProfit)}
                      </TableCell>
                      <TableCell className={product.profitRatio < 0 ? 'text-red-600 font-semibold' : ''}>
                        {product.profitRatio.toFixed(1)}%
                      </TableCell>
                      <TableCell>{renderStarRating(product.rating)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
