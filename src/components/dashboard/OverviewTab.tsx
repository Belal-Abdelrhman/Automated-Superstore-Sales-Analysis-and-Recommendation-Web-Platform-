
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
          <ResponsiveContainer width="100%" height={350}>
            <LineChart 
              data={analyticsData.monthlyTrends}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
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
                formatter={(value) => formatCurrency(Number(value))}
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
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                name="Total Revenue"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3} 
                name="Total Profit"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Category Revenue */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Category Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomPieLabel}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="sales"
                  nameKey="category"
                >
                  {analyticsData.salesByCategory.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segment Revenue */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Segment Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={CustomPieLabel}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="segment"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Region Revenue Distribution */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Region Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart 
                data={analyticsData.salesByRegion}
                margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fontSize: 10, fill: '#666' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={50}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="sales" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ship Mode Revenue */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ship Mode Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart 
                data={shipModeData}
                margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="mode" 
                  tick={{ fontSize: 9, fill: '#666' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Reviews Chart */}
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart 
                data={customerReviewsData}
                margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="rating" 
                  tick={{ fontSize: 9, fill: '#666' }} 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} reviews`, 'Count']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#F59E0B" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
