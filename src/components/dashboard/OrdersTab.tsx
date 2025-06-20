
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
                  <TableCell><StarRating rating={order.rating} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
