import { SuperstoreData, AnalyticsData, ProductRecommendation } from '@/types';

export function processSuperstoreData(data: any[]): AnalyticsData {
  console.log('Processing Superstore data:', data.length, 'records');
  console.log('Sample data row:', data[0]);
  
  // Clean and normalize the data
  const cleanedData = data.map(row => {
    // Handle different possible column name formats
    const normalizeKey = (key: string) => key.toLowerCase().trim();
    const normalizedRow: any = {};
    
    Object.keys(row).forEach(key => {
      normalizedRow[normalizeKey(key)] = row[key];
    });
    
    return {
      'order id': normalizedRow['order id'] || normalizedRow['order_id'] || '',
      'order date': normalizedRow['order date'] || normalizedRow['order_date'] || '',
      'ship date': normalizedRow['ship date'] || normalizedRow['ship_date'] || '',
      'ship mode': normalizedRow['ship mode'] || normalizedRow['ship_mode'] || '',
      'customer id': normalizedRow['customer id'] || normalizedRow['customer_id'] || '',
      'customer name': normalizedRow['customer name'] || normalizedRow['customer_name'] || '',
      segment: normalizedRow['segment'] || '',
      country: normalizedRow['country'] || '',
      city: normalizedRow['city'] || '',
      state: normalizedRow['state'] || '',
      'postal code': normalizedRow['postal code'] || normalizedRow['postal_code'] || '',
      region: normalizedRow['region'] || '',
      'product id': normalizedRow['product id'] || normalizedRow['product_id'] || '',
      category: normalizedRow['category'] || '',
      'sub-category': normalizedRow['sub-category'] || normalizedRow['sub_category'] || '',
      'product name': normalizedRow['product name'] || normalizedRow['product_name'] || '',
      sales: parseFloat(normalizedRow['sales']) || 0,
      quantity: parseInt(normalizedRow['quantity']) || 0,
      discount: parseFloat(normalizedRow['discount']) || 0,
      profit: parseFloat(normalizedRow['profit']) || 0,
      'days to ship': parseInt(normalizedRow['days to ship'] || normalizedRow['days_to_ship']) || 0,
      rating: parseFloat(normalizedRow['rating']) || 0
    };
  }).filter(row => row.sales > 0); // Filter out invalid rows

  console.log('Cleaned data sample:', cleanedData[0]);
  console.log('Valid records after cleaning:', cleanedData.length);
  
  // Calculate basic metrics
  const totalSales = cleanedData.reduce((sum, row) => sum + row.sales, 0);
  const totalProfit = cleanedData.reduce((sum, row) => sum + row.profit, 0);
  const totalOrders = cleanedData.length;
  const avgProfitPerOrder = totalOrders > 0 ? totalProfit / totalOrders : 0;
  const uniqueCustomers = new Set(cleanedData.map(row => row['customer id'])).size;

  console.log('Basic metrics:', { totalSales, totalProfit, totalOrders, uniqueCustomers });

  // Sales by Region
  const regionMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row.region) {
      const current = regionMap.get(row.region) || { sales: 0, profit: 0 };
      regionMap.set(row.region, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit
      });
    }
  });
  const salesByRegion = Array.from(regionMap.entries()).map(([region, data]) => ({
    region,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit)
  }));

  // Sales by Category
  const categoryMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row.category) {
      const current = categoryMap.get(row.category) || { sales: 0, profit: 0 };
      categoryMap.set(row.category, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit
      });
    }
  });
  const salesByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit)
  }));

  // Top Products
  const productMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row['product name']) {
      const current = productMap.get(row['product name']) || { sales: 0, profit: 0 };
      productMap.set(row['product name'], {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit
      });
    }
  });
  const topProducts = Array.from(productMap.entries())
    .map(([product, data]) => ({
      product,
      sales: Math.round(data.sales),
      profit: Math.round(data.profit)
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  // Top Customers
  const customerMap = new Map<string, { sales: number; orders: number }>();
  cleanedData.forEach(row => {
    if (row['customer name']) {
      const current = customerMap.get(row['customer name']) || { sales: 0, orders: 0 };
      customerMap.set(row['customer name'], {
        sales: current.sales + row.sales,
        orders: current.orders + 1
      });
    }
  });
  const topCustomers = Array.from(customerMap.entries())
    .map(([customer, data]) => ({
      customer,
      sales: Math.round(data.sales),
      orders: data.orders
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  // Monthly Trends
  const monthMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row['order date']) {
      try {
        const date = new Date(row['order date']);
        if (!isNaN(date.getTime())) {
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const current = monthMap.get(monthKey) || { sales: 0, profit: 0 };
          monthMap.set(monthKey, {
            sales: current.sales + row.sales,
            profit: current.profit + row.profit
          });
        }
      } catch (error) {
        console.warn('Invalid date format:', row['order date']);
      }
    }
  });
  const monthlyTrends = Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      sales: Math.round(data.sales),
      profit: Math.round(data.profit)
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const result = {
    totalSales: Math.round(totalSales),
    totalProfit: Math.round(totalProfit),
    totalOrders,
    avgProfitPerOrder: Math.round(avgProfitPerOrder),
    uniqueCustomers,
    salesByRegion,
    salesByCategory,
    topProducts,
    topCustomers,
    monthlyTrends
  };

  console.log('Final analytics result:', result);
  return result;
}

export function generateProductRecommendations(
  data: SuperstoreData[],
  customerId: string
): ProductRecommendation[] {
  console.log('Generating recommendations for customer:', customerId);
  
  // Get customer's purchase history
  const customerPurchases = data.filter(row => row['customer id'] === customerId);
  const purchasedProducts = new Set(customerPurchases.map(row => row['product name']));
  
  // Find similar customers (same segment and region)
  const customer = customerPurchases[0];
  if (!customer) return [];
  
  const similarCustomers = data.filter(row => 
    row.segment === customer.segment && 
    row.region === customer.region &&
    row['customer id'] !== customerId
  );
  
  // Calculate product popularity among similar customers
  const productStats = new Map<string, { 
    sales: number; 
    count: number; 
    category: string; 
    subCategory: string 
  }>();
  
  similarCustomers.forEach(row => {
    if (!purchasedProducts.has(row['product name'])) {
      const current = productStats.get(row['product name']) || { 
        sales: 0, 
        count: 0, 
        category: row.category, 
        subCategory: row['sub-category'] 
      };
      productStats.set(row['product name'], {
        sales: current.sales + row.sales,
        count: current.count + 1,
        category: row.category,
        subCategory: row['sub-category']
      });
    }
  });
  
  // Generate recommendations
  return Array.from(productStats.entries())
    .map(([productName, stats]) => ({
      productName,
      category: stats.category,
      subCategory: stats.subCategory,
      avgSales: stats.sales / stats.count,
      popularityScore: stats.count
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 8);
}

export function validateSuperstoreData(data: any[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!Array.isArray(data) || data.length === 0) {
    errors.push('File is empty or invalid format');
    return { isValid: false, errors };
  }
  
  const requiredColumns = [
    'order id', 'order date', 'ship date', 'ship mode', 'customer id',
    'customer name', 'segment', 'country', 'city', 'state', 'postal code',
    'region', 'product id', 'category', 'sub-category', 'product name',
    'sales', 'quantity', 'discount', 'profit', 'days to ship', 'rating'
  ];
  
  const firstRow = data[0];
  const fileColumns = Object.keys(firstRow).map(col => col.toLowerCase());
  
  const missingColumns = requiredColumns.filter(col => 
    !fileColumns.includes(col.toLowerCase().replace(/[\s_]/g, ' ')) &&
    !fileColumns.includes(col.toLowerCase().replace(/[\s]/g, '_'))
  );
  
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }
  
  return { isValid: errors.length === 0, errors };
}
