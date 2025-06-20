
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatCurrency } from '@/utils/formatters';
import { yearlyCustomerGrowthData, getCustomerReviewsData } from '@/data/mockData';

interface CustomerTabProps {
  analyticsData: any;
}

export function CustomerTab({ analyticsData }: CustomerTabProps) {
  const customerReviewsData = getCustomerReviewsData(analyticsData.totalOrders);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer KPIs */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{analyticsData.uniqueCustomers}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">Total Customer</div>
                <div className="text-xs text-green-600 font-medium">PY 147 YoY 0.68%</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">6</div>
                <div className="text-sm font-medium text-gray-700">Avg. Orders Per Customer</div>
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
            <ResponsiveContainer width="100%" height={250}>
              <LineChart 
                data={yearlyCustomerGrowthData}
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
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3B82F6', strokeWidth: 2 }}
                />
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={analyticsData.salesByRegion}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="region" 
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
                <Bar 
                  dataKey="sales" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={customerReviewsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="rating" 
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
                  formatter={(value) => [`${value} reviews`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Highest revenue generating customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Customer Name</TableHead>
                  <TableHead className="font-semibold">Total Orders</TableHead>
                  <TableHead className="font-semibold">Total Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.topCustomers.slice(0, 8).map((customer: any, index: number) => (
                  <TableRow key={customer.customer} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{customer.customer}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(customer.sales)}</TableCell>
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
