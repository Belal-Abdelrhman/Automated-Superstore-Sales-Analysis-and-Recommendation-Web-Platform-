
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, ArrowRight, Download, Filter } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

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

  const kpiCards = [
    {
      title: 'Total Sales',
      value: formatCurrency(analyticsData.totalSales),
      icon: DollarSign,
      color: 'bg-analytics-blue',
      trend: '+12.5%'
    },
    {
      title: 'Total Profit',
      value: formatCurrency(analyticsData.totalProfit),
      icon: TrendingUp,
      color: 'bg-analytics-green',
      trend: '+8.2%'
    },
    {
      title: 'Total Orders',
      value: formatNumber(analyticsData.totalOrders),
      icon: ShoppingCart,
      color: 'bg-purple-500',
      trend: '+15.3%'
    },
    {
      title: 'Unique Customers',
      value: formatNumber(analyticsData.uniqueCustomers),
      icon: Users,
      color: 'bg-orange-500',
      trend: '+6.7%'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights from your Superstore data</p>
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

      {/* Filters */}
      <Card className="mb-8 animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="min-w-48">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {analyticsData.salesByRegion.map((region) => (
                    <SelectItem key={region.region} value={region.region}>
                      {region.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-48">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {analyticsData.salesByCategory.map((category) => (
                    <SelectItem key={category.category} value={category.category}>
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, index) => (
          <Card key={kpi.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className="text-sm text-green-600 mt-1">{kpi.trend} from last period</p>
                </div>
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales by Region */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>Revenue distribution across different regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.salesByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              {analyticsData.salesByRegion.sort((a, b) => b.sales - a.sales)[0]?.region} generates the highest revenue 
              with {formatCurrency(analyticsData.salesByRegion.sort((a, b) => b.sales - a.sales)[0]?.sales || 0)} in sales.
            </p>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {analyticsData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              {analyticsData.salesByCategory.sort((a, b) => b.sales - a.sales)[0]?.category} is the top-performing category,
              accounting for the largest share of total sales.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>Monthly Sales & Profit Trends</CardTitle>
          <CardDescription>Track performance over time to identify seasonal patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analyticsData.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Sales"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            Sales and profit trends show seasonal patterns with peak performance typically 
            occurring during the holiday season months.
          </p>
        </CardContent>
      </Card>

      {/* Top Performers Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best-selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.slice(0, 5).map((product, index) => (
                <div key={product.product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${COLORS[index % COLORS.length]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-48" title={product.product}>
                        {product.product}
                      </p>
                      <p className="text-sm text-gray-600">
                        Profit: {formatCurrency(product.profit)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(product.sales)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Highest value customers by total purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCustomers.slice(0, 5).map((customer, index) => (
                <div key={customer.customer} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${COLORS[index % COLORS.length]} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.customer}</p>
                      <p className="text-sm text-gray-600">
                        {customer.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(customer.sales)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
