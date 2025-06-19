import { SuperstoreData, AnalyticsData, ProductRecommendation } from '@/types';

export function processSuperstoreData(data: any[]): AnalyticsData {
  console.log('Processing Superstore data:', data.length, 'records');
  console.log('Sample data row:', data[0]);
  console.log('Available columns:', Object.keys(data[0] || {}));
  
  // Clean and normalize the data
  const cleanedData = data.map(row => {
    // Handle different possible column name formats
    const normalizeKey = (key: string) => key.toLowerCase().trim().replace(/[\s_-]+/g, ' ');
    const normalizedRow: any = {};
    
    Object.keys(row).forEach(key => {
      const normalizedKey = normalizeKey(key);
      normalizedRow[normalizedKey] = row[key];
    });
    
    // Map all columns with various possible formats
    const getValue = (possibleKeys: string[]) => {
      for (const key of possibleKeys) {
        const normalizedKey = normalizeKey(key);
        if (normalizedRow[normalizedKey] !== undefined && normalizedRow[normalizedKey] !== '') {
          return normalizedRow[normalizedKey];
        }
      }
      return '';
    };

    const getNumericValue = (possibleKeys: string[], defaultValue = 0) => {
      const value = getValue(possibleKeys);
      const parsed = parseFloat(value);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    const getIntValue = (possibleKeys: string[], defaultValue = 0) => {
      const value = getValue(possibleKeys);
      const parsed = parseInt(value);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    return {
      'order id': getValue(['order id', 'order_id', 'orderid']),
      'order date': getValue(['order date', 'order_date', 'orderdate']),
      'ship date': getValue(['ship date', 'ship_date', 'shipdate']),
      'ship mode': getValue(['ship mode', 'ship_mode', 'shipmode']),
      'customer id': getValue(['customer id', 'customer_id', 'customerid']),
      'customer name': getValue(['customer name', 'customer_name', 'customername']),
      segment: getValue(['segment']),
      country: getValue(['country']),
      city: getValue(['city']),
      state: getValue(['state']),
      'postal code': getValue(['postal code', 'postal_code', 'postalcode', 'zip code', 'zip_code', 'zipcode']),
      region: getValue(['region']),
      'product id': getValue(['product id', 'product_id', 'productid']),
      category: getValue(['category']),
      'sub-category': getValue(['sub-category', 'sub_category', 'subcategory', 'sub category']),
      'product name': getValue(['product name', 'product_name', 'productname']),
      sales: getNumericValue(['sales']),
      quantity: getIntValue(['quantity']),
      discount: getNumericValue(['discount']),
      profit: getNumericValue(['profit']),
      'days to ship': getIntValue(['days to ship', 'days_to_ship', 'daystoship']),
      rating: getNumericValue(['rating'])
    };
  }).filter(row => row.sales > 0 && row['order id']); // Filter out invalid rows

  console.log('Cleaned data sample:', cleanedData[0]);
  console.log('Valid records after cleaning:', cleanedData.length);
  
  // Calculate basic metrics
  const totalSales = cleanedData.reduce((sum, row) => sum + row.sales, 0);
  const totalProfit = cleanedData.reduce((sum, row) => sum + row.profit, 0);
  const totalQuantity = cleanedData.reduce((sum, row) => sum + row.quantity, 0);
  const totalDiscount = cleanedData.reduce((sum, row) => sum + (row.sales * row.discount), 0);
  const totalOrders = cleanedData.length;
  const avgProfitPerOrder = totalOrders > 0 ? totalProfit / totalOrders : 0;
  const uniqueCustomers = new Set(cleanedData.map(row => row['customer id'])).size;
  const uniqueProducts = new Set(cleanedData.map(row => row['product id'])).size;
  const avgDiscount = totalSales > 0 ? (totalDiscount / totalSales) * 100 : 0;
  const avgRating = cleanedData.length > 0 ? cleanedData.reduce((sum, row) => sum + row.rating, 0) / cleanedData.length : 0;

  console.log('Basic metrics:', { totalSales, totalProfit, totalOrders, uniqueCustomers, uniqueProducts, avgDiscount });

  // Sales by Region
  const regionMap = new Map<string, { sales: number; profit: number; orders: number; customers: Set<string> }>();
  cleanedData.forEach(row => {
    if (row.region) {
      const current = regionMap.get(row.region) || { sales: 0, profit: 0, orders: 0, customers: new Set() };
      regionMap.set(row.region, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit,
        orders: current.orders + 1,
        customers: current.customers.add(row['customer id'])
      });
    }
  });
  const salesByRegion = Array.from(regionMap.entries()).map(([region, data]) => ({
    region,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit),
    orders: data.orders,
    customers: data.customers.size
  }));

  // Sales by Category
  const categoryMap = new Map<string, { sales: number; profit: number; quantity: number }>();
  cleanedData.forEach(row => {
    if (row.category) {
      const current = categoryMap.get(row.category) || { sales: 0, profit: 0, quantity: 0 };
      categoryMap.set(row.category, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit,
        quantity: current.quantity + row.quantity
      });
    }
  });
  const salesByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit),
    quantity: data.quantity
  }));

  // Sales by Sub-Category
  const subCategoryMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row['sub-category']) {
      const current = subCategoryMap.get(row['sub-category']) || { sales: 0, profit: 0 };
      subCategoryMap.set(row['sub-category'], {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit
      });
    }
  });
  const salesBySubCategory = Array.from(subCategoryMap.entries()).map(([subCategory, data]) => ({
    subCategory,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit)
  }));

  // Sales by Segment
  const segmentMap = new Map<string, { sales: number; profit: number; customers: Set<string> }>();
  cleanedData.forEach(row => {
    if (row.segment) {
      const current = segmentMap.get(row.segment) || { sales: 0, profit: 0, customers: new Set() };
      segmentMap.set(row.segment, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit,
        customers: current.customers.add(row['customer id'])
      });
    }
  });
  const salesBySegment = Array.from(segmentMap.entries()).map(([segment, data]) => ({
    segment,
    sales: Math.round(data.sales),
    profit: Math.round(data.profit),
    customers: data.customers.size
  }));

  // Sales by Ship Mode
  const shipModeMap = new Map<string, { sales: number; orders: number; avgDaysToShip: number; totalDays: number }>();
  cleanedData.forEach(row => {
    if (row['ship mode']) {
      const current = shipModeMap.get(row['ship mode']) || { sales: 0, orders: 0, avgDaysToShip: 0, totalDays: 0 };
      shipModeMap.set(row['ship mode'], {
        sales: current.sales + row.sales,
        orders: current.orders + 1,
        avgDaysToShip: 0, // Will calculate after
        totalDays: current.totalDays + row['days to ship']
      });
    }
  });
  const salesByShipMode = Array.from(shipModeMap.entries()).map(([shipMode, data]) => ({
    shipMode,
    sales: Math.round(data.sales),
    orders: data.orders,
    avgDaysToShip: data.orders > 0 ? Math.round(data.totalDays / data.orders) : 0
  }));

  // Top Products
  const productMap = new Map<string, { sales: number; profit: number; quantity: number; orders: number }>();
  cleanedData.forEach(row => {
    if (row['product name']) {
      const current = productMap.get(row['product name']) || { sales: 0, profit: 0, quantity: 0, orders: 0 };
      productMap.set(row['product name'], {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit,
        quantity: current.quantity + row.quantity,
        orders: current.orders + 1
      });
    }
  });
  const topProducts = Array.from(productMap.entries())
    .map(([product, data]) => ({
      product,
      sales: Math.round(data.sales),
      profit: Math.round(data.profit),
      quantity: data.quantity,
      orders: data.orders
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 20);

  // Top Customers
  const customerMap = new Map<string, { sales: number; orders: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row['customer name']) {
      const current = customerMap.get(row['customer name']) || { sales: 0, orders: 0, profit: 0 };
      customerMap.set(row['customer name'], {
        sales: current.sales + row.sales,
        orders: current.orders + 1,
        profit: current.profit + row.profit
      });
    }
  });
  const topCustomers = Array.from(customerMap.entries())
    .map(([customer, data]) => ({
      customer,
      sales: Math.round(data.sales),
      orders: data.orders,
      profit: Math.round(data.profit)
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 20);

  // Monthly Trends
  const monthMap = new Map<string, { sales: number; profit: number; orders: number; quantity: number }>();
  cleanedData.forEach(row => {
    if (row['order date']) {
      try {
        let date;
        // Try different date formats
        if (row['order date'].includes('/')) {
          const parts = row['order date'].split('/');
          if (parts.length === 3) {
            // Assume MM/DD/YYYY or DD/MM/YYYY
            date = new Date(parts[2], parts[0] - 1, parts[1]);
            if (isNaN(date.getTime())) {
              date = new Date(parts[2], parts[1] - 1, parts[0]);
            }
          }
        } else {
          date = new Date(row['order date']);
        }
        
        if (!isNaN(date.getTime())) {
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const current = monthMap.get(monthKey) || { sales: 0, profit: 0, orders: 0, quantity: 0 };
          monthMap.set(monthKey, {
            sales: current.sales + row.sales,
            profit: current.profit + row.profit,
            orders: current.orders + 1,
            quantity: current.quantity + row.quantity
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
      profit: Math.round(data.profit),
      orders: data.orders,
      quantity: data.quantity
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Sales by State (Top 10)
  const stateMap = new Map<string, { sales: number; profit: number }>();
  cleanedData.forEach(row => {
    if (row.state) {
      const current = stateMap.get(row.state) || { sales: 0, profit: 0 };
      stateMap.set(row.state, {
        sales: current.sales + row.sales,
        profit: current.profit + row.profit
      });
    }
  });
  const salesByState = Array.from(stateMap.entries())
    .map(([state, data]) => ({
      state,
      sales: Math.round(data.sales),
      profit: Math.round(data.profit)
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  const result = {
    totalSales: Math.round(totalSales),
    totalProfit: Math.round(totalProfit),
    totalOrders,
    totalQuantity,
    avgProfitPerOrder: Math.round(avgProfitPerOrder),
    uniqueCustomers,
    uniqueProducts,
    avgDiscount: Math.round(avgDiscount * 100) / 100,
    avgRating: Math.round(avgRating * 100) / 100,
    salesByRegion,
    salesByCategory,
    salesBySubCategory,
    salesBySegment,
    salesByShipMode,
    salesByState,
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
  console.log('Customer purchases found:', customerPurchases.length);
  
  if (customerPurchases.length === 0) {
    console.log('No purchases found for customer:', customerId);
    return [];
  }
  
  const purchasedProducts = new Set(customerPurchases.map(row => row['product name']));
  
  // Find similar customers (same segment and region)
  const customer = customerPurchases[0];
  if (!customer) return [];
  
  console.log('Customer info:', {
    segment: customer.segment,
    region: customer.region,
    totalPurchases: customerPurchases.length
  });
  
  const similarCustomers = data.filter(row => 
    row.segment === customer.segment && 
    row.region === customer.region &&
    row['customer id'] !== customerId
  );
  
  console.log('Similar customers found:', similarCustomers.length);
  
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
      // Ensure sales is properly converted to number
      const salesValue = typeof row.sales === 'string' ? parseFloat(row.sales) : row.sales;
      productStats.set(row['product name'], {
        sales: current.sales + (isNaN(salesValue) ? 0 : salesValue),
        count: current.count + 1,
        category: row.category,
        subCategory: row['sub-category']
      });
    }
  });
  
  console.log('Product stats calculated:', productStats.size);
  
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
