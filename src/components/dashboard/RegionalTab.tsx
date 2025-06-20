
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { MapPin } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { regionalCustomerGrowthData, regionalSalesByYearData, stateProfitData, getStateColor } from '@/data/mockData';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export function RegionalTab() {
  // Create a map for quick lookup
  const stateProfitMap = Object.fromEntries(
    stateProfitData.map(item => [item.state, item.profit])
  );

  return (
    <div className="space-y-6">
      {/* US Profit Map */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Total Profit by State
          </CardTitle>
          <CardDescription>Geographic visualization of profit distribution across U.S. states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-center gap-6 text-sm bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded border"></div>
                <span className="font-medium">Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded border"></div>
                <span className="font-medium">Low Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-300 rounded border"></div>
                <span className="font-medium">Medium Profit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded border"></div>
                <span className="font-medium">High Profit</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg border p-4" style={{ height: '450px' }}>
            <ComposableMap 
              projection="geoAlbersUsa" 
              width={900} 
              height={400}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup center={[-97, 40]} zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const stateName = geo.properties.name;
                      const profit = stateProfitMap[stateName] || 0;
                      const color = getStateColor(profit);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={color}
                          stroke="#FFFFFF"
                          strokeWidth={1}
                          style={{
                            default: { outline: 'none', cursor: 'pointer' },
                            hover: { outline: 'none', fill: '#374151', cursor: 'pointer' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </CardContent>
      </Card>

      {/* Two charts in a row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Customer Growth by Years */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Regional Customer Growth by Years</CardTitle>
            <CardDescription>New customers acquired by region each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={regionalCustomerGrowthData}
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
                  formatter={(value) => [`${value} customers`, '']}
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
                <Bar dataKey="East" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="West" fill="#10B981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Central" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="South" fill="#EF4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Sales by Years */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Regional Sales by Years</CardTitle>
            <CardDescription>Total sales amount by region each year</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={regionalSalesByYearData}
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
                  formatter={(value) => [formatCurrency(Number(value)), 'Sales']}
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
                <Bar dataKey="East" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="West" fill="#10B981" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Central" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                <Bar dataKey="South" fill="#EF4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
