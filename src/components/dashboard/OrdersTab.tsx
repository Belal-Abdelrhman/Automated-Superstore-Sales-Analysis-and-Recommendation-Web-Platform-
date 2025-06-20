
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShoppingCart, DollarSign } from 'lucide-react';
import { StarRating } from './charts/StarRating';
import { formatCurrency, formatCompactNumber } from '@/utils/formatters';
import { yearlyOrdersGrowthData, regionalOrdersByYearData, orderTableData } from '@/data/mockData';

interface OrdersTabProps {
  analyticsData: any;
}

export function OrdersTab({ analyticsData }: OrdersTabProps) {
  const avgOrderValue = analyticsData.totalOrders > 0 ? analyticsData.totalSales / analyticsData.totalOrders : 0;

  return (
    <div className="space-y-6">
      {/* Order KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{formatCompactNumber(analyticsData.totalOrders)}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Total Orders</div>
                <div className="text-xs text-green-600 font-medium">PY 3K YoY 50.78%</div>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-cyan-600 mb-2">{formatCurrency(avgOrderValue)}</div>
                <div className="text-sm font-medium text-gray-700">AOV</div>
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
            <ResponsiveContainer width="100%" height={350}>
              <LineChart 
                data={yearlyOrdersGrowthData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} orders`, 'Total Orders']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  name="Total Orders"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2 }}
                />
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
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={regionalOrdersByYearData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="rect"
                />
                <Bar dataKey="Central" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="East" fill="#10B981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="South" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="West" fill="#EF4444" radius={[2, 2, 0, 0]} />
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
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer Name</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">Ship Mode</TableHead>
                  <TableHead className="font-semibold">Total Revenue</TableHead>
                  <TableHead className="font-semibold">Total Profit</TableHead>
                  <TableHead className="font-semibold">Profit Ratio</TableHead>
                  <TableHead className="font-semibold">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderTableData.map((order, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.shipMode}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(order.totalRevenue)}</TableCell>
                    <TableCell className={`font-medium ${order.totalProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(order.totalProfit)}
                    </TableCell>
                    <TableCell className={`font-medium ${order.profitRatio < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {order.profitRatio.toFixed(1)}%
                    </TableCell>
                    <TableCell><StarRating rating={order.rating} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
