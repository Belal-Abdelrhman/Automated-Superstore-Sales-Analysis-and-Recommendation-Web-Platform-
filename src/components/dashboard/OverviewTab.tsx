
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { KPICards } from './KPICards';
import { CustomPieLabel } from './charts/CustomPieLabel';
import { formatCurrency } from '@/utils/formatters';
import { getShipModeData, getSegmentData, getCustomerReviewsData, COLORS } from '@/data/mockData';

interface OverviewTabProps {
  analyticsData: any;
}

export function OverviewTab({ analyticsData }: OverviewTabProps) {
  const shipModeData = getShipModeData(analyticsData.totalSales, analyticsData.totalOrders);
  const segmentData = getSegmentData(analyticsData.totalSales);
  const customerReviewsData = getCustomerReviewsData(analyticsData.totalOrders);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPICards analyticsData={analyticsData} />

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
                  label={CustomPieLabel}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="sales"
                  nameKey="category"
                >
                  {analyticsData.salesByCategory.map((entry: any, index: number) => (
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
                  label={CustomPieLabel}
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
    </div>
  );
}
