
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
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

  const yearlyGrowthData = [
    { year: '2014', customers: 85, orders: 1000 },
    { year: '2015', customers: 95, orders: 1200 },
    { year: '2016', customers: 78, orders: 1500 },
    { year: '2017', customers: 105, orders: 1800 }
  ];

  // Customer Reviews Data - based on rating distribution
  const customerReviewsData = [
    { rating: '5 Stars', count: Math.floor(analyticsData.totalOrders * 0.45), percentage: 45 },
    { rating: '4 Stars', count: Math.floor(analyticsData.totalOrders * 0.30), percentage: 30 },
    { rating: '3 Stars', count: Math.floor(analyticsData.totalOrders * 0.15), percentage: 15 },
    { rating: '2 Stars', count: Math.floor(analyticsData.totalOrders * 0.07), percentage: 7 },
    { rating: '1 Star', count: Math.floor(analyticsData.totalOrders * 0.03), percentage: 3 }
  ];

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

          {/* Bottom Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Revenue */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Category Revenue Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={analyticsData.salesByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="sales"
                      nameKey="category"
                      label={({ category, sales }) => `${category}: ${formatCompactNumber(sales)}`}
                    >
                      {analyticsData.salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Segment Revenue */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Segment Revenue Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      nameKey="segment"
                      label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Region Revenue Distribution */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Region Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={analyticsData.salesByRegion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="sales" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Customer Growth */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Regional Customer Growth by Years</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
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

            {/* Yearly Growth */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Yearly Orders Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={yearlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

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
                  <LineChart data={yearlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={3} />
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
                  <BarChart data={customerReviewsData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="rating" type="category" width={70} />
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

          {/* Ship Mode Revenue */}
          <Card>
            <CardHeader>
              <CardTitle>Ship Mode Revenue Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={shipModeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mode" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
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

          {/* Product Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Profit by Category and Sub-category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.salesByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="profit" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Products by Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.product} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{product.product}</div>
                        <div className="text-xs text-gray-600">Profit: {formatCurrency(product.profit)}</div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="font-semibold text-sm">{formatCurrency(product.sales)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
