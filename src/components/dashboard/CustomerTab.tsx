
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
          <CardDescription>Highest revenue generating customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.topCustomers.slice(0, 8).map((customer: any, index: number) => (
                <TableRow key={customer.customer}>
                  <TableCell className="font-medium">{customer.customer}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(customer.sales)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
