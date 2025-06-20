
// Ship mode data for charts
export const getShipModeData = (totalSales: number, totalOrders: number) => [
  { mode: 'Standard Class', revenue: totalSales * 0.6, orders: Math.floor(totalOrders * 0.6) },
  { mode: 'Second Class', revenue: totalSales * 0.2, orders: Math.floor(totalOrders * 0.2) },
  { mode: 'First Class', revenue: totalSales * 0.15, orders: Math.floor(totalOrders * 0.15) },
  { mode: 'Same Day', revenue: totalSales * 0.05, orders: Math.floor(totalOrders * 0.05) }
];

// Segment data for charts
export const getSegmentData = (totalSales: number) => [
  { segment: 'Consumer', revenue: totalSales * 0.51, percentage: 51 },
  { segment: 'Corporate', revenue: totalSales * 0.31, percentage: 31 },
  { segment: 'Home Office', revenue: totalSales * 0.18, percentage: 18 }
];

// Customer reviews data
export const getCustomerReviewsData = (totalOrders: number) => [
  { rating: '5 Stars', count: Math.floor(totalOrders * 0.45), percentage: 45 },
  { rating: '4 Stars', count: Math.floor(totalOrders * 0.30), percentage: 30 },
  { rating: '3 Stars', count: Math.floor(totalOrders * 0.15), percentage: 15 },
  { rating: '2 Stars', count: Math.floor(totalOrders * 0.07), percentage: 7 },
  { rating: '1 Star', count: Math.floor(totalOrders * 0.03), percentage: 3 }
];

// Yearly customer growth data
export const yearlyCustomerGrowthData = [
  { year: '2014', customers: 312, newCustomers: 312 },
  { year: '2015', customers: 410, newCustomers: 98 },
  { year: '2016', customers: 501, newCustomers: 91 },
  { year: '2017', customers: 593, newCustomers: 92 }
];

// Yearly orders growth data
export const yearlyOrdersGrowthData = [
  { year: '2014', orders: 1000 },
  { year: '2015', orders: 1200 },
  { year: '2016', orders: 1500 },
  { year: '2017', orders: 1800 }
];

// Regional orders by year data
export const regionalOrdersByYearData = [
  { year: '2014', Central: 250, East: 300, South: 200, West: 250 },
  { year: '2015', Central: 300, East: 350, South: 250, West: 300 },
  { year: '2016', Central: 375, East: 400, South: 325, West: 400 },
  { year: '2017', Central: 450, East: 500, South: 400, West: 450 }
];

// Regional customer growth by years
export const regionalCustomerGrowthData = [
  { year: '2014', East: 78, West: 89, Central: 72, South: 73 },
  { year: '2015', East: 24, West: 28, Central: 23, South: 23 },
  { year: '2016', East: 22, West: 25, Central: 21, South: 23 },
  { year: '2017', East: 23, West: 25, Central: 22, South: 22 }
];

// Regional sales by year data
export const regionalSalesByYearData = [
  { year: '2014', East: 678781.24, West: 725457.82, Central: 501239.89, South: 391721.91 },
  { year: '2015', East: 735463.44, West: 793629.49, Central: 550542.21, South: 432102.37 },
  { year: '2016', East: 780542.33, West: 868379.95, Central: 595431.77, South: 484267.93 },
  { year: '2017', East: 827463.52, West: 934582.77, Central: 633259.44, South: 522904.61 }
];

// Order table data
export const orderTableData = [
  {
    orderId: 'CA-2017-152156',
    customerName: 'Claire Gute',
    orderDate: '2017-11-08',
    shipMode: 'Second Class',
    totalRevenue: 261.96,
    totalProfit: 41.91,
    profitRatio: 16.0,
    rating: 4
  },
  {
    orderId: 'CA-2017-152156',
    customerName: 'Darrin Van Huff',
    orderDate: '2017-11-08',
    shipMode: 'Second Class',
    totalRevenue: 731.94,
    totalProfit: 219.58,
    profitRatio: 30.0,
    rating: 5
  },
  {
    orderId: 'CA-2017-138688',
    customerName: "Sean O'Donnell",
    orderDate: '2017-06-12',
    shipMode: 'Second Class',
    totalRevenue: 14.62,
    totalProfit: 6.87,
    profitRatio: 47.0,
    rating: 3
  },
  {
    orderId: 'US-2016-108966',
    customerName: 'Brosina Hoffman',
    orderDate: '2016-10-11',
    shipMode: 'Standard Class',
    totalRevenue: 957.58,
    totalProfit: -383.03,
    profitRatio: -40.0,
    rating: 2
  },
  {
    orderId: 'US-2015-108966',
    customerName: 'Andrew Allen',
    orderDate: '2015-10-11',
    shipMode: 'Standard Class',
    totalRevenue: 22.37,
    totalProfit: 2.52,
    profitRatio: 11.3,
    rating: 4
  }
];

// Product profit table data
export const productProfitTableData = [
  {
    productName: 'Canon imageCLASS 2200 Advanced Copier',
    totalOrders: 68,
    totalRevenue: 61599.82,
    totalProfit: 25199.93,
    profitRatio: 40.9,
    rating: 5
  },
  {
    productName: 'Fellowes PB500 Electric Punch Plastic Comb Binding Machine',
    totalOrders: 18,
    totalRevenue: 27453.58,
    totalProfit: 3383.22,
    profitRatio: 12.3,
    rating: 4
  },
  {
    productName: 'Hewlett Packard LaserJet 3310 Copier',
    totalOrders: 10,
    totalRevenue: 17499.95,
    totalProfit: 6274.98,
    profitRatio: 35.9,
    rating: 4
  },
  {
    productName: 'GBC DocuBind TL300 Electric Binding System',
    totalOrders: 7,
    totalRevenue: 7753.04,
    totalProfit: 1290.51,
    profitRatio: 16.6,
    rating: 3
  },
  {
    productName: 'Cisco TelePresence System EX90 Videoconferencing Unit',
    totalOrders: 8,
    totalRevenue: 22638.48,
    totalProfit: -2811.96,
    profitRatio: -12.4,
    rating: 2
  },
  {
    productName: 'Cubify CubeX 3D Printer Double Head Print',
    totalOrders: 3,
    totalRevenue: 7499.97,
    totalProfit: -3899.99,
    profitRatio: -52.0,
    rating: 1
  },
  {
    productName: 'Apple Smart Phone, Full Size',
    totalOrders: 106,
    totalRevenue: 4729.34,
    totalProfit: 1609.38,
    profitRatio: 34.0,
    rating: 5
  }
];

// Sub-category profit data
export const subCategoryProfitData = [
  { subCategory: 'Copiers', category: 'Technology', profit: 55617.82 },
  { subCategory: 'Phones', category: 'Technology', profit: 44515.73 },
  { subCategory: 'Accessories', category: 'Technology', profit: 41936.63 },
  { subCategory: 'Storage', category: 'Office Supplies', profit: 46673.54 },
  { subCategory: 'Paper', category: 'Office Supplies', profit: 34053.57 },
  { subCategory: 'Chairs', category: 'Furniture', profit: 26590.17 },
  { subCategory: 'Binders', category: 'Office Supplies', profit: 20341.27 },
  { subCategory: 'Envelopes', category: 'Office Supplies', profit: 16476.40 },
  { subCategory: 'Furnishings', category: 'Furniture', profit: 13059.13 },
  { subCategory: 'Art', category: 'Office Supplies', profit: 6527.78 },
  { subCategory: 'Labels', category: 'Office Supplies', profit: 5546.26 },
  { subCategory: 'Fasteners', category: 'Office Supplies', profit: 949.52 },
  { subCategory: 'Supplies', category: 'Office Supplies', profit: -1189.10 },
  { subCategory: 'Bookcases', category: 'Furniture', profit: -3472.56 },
  { subCategory: 'Machines', category: 'Technology', profit: -3907.71 },
  { subCategory: 'Tables', category: 'Furniture', profit: -17725.48 }
];

// State profit data
export const stateProfitData = [
  { state: "California", profit: 76381.39 },
  { state: "New York", profit: 74039.78 },
  { state: "Washington", profit: 33402.65 },
  { state: "Michigan", profit: 25045.05 },
  { state: "Indiana", profit: 24532.29 },
  { state: "Illinois", profit: 19703.88 },
  { state: "Connecticut", profit: 17809.83 },
  { state: "Delaware", profit: 17614.29 },
  { state: "Kentucky", profit: 14662.37 },
  { state: "Utah", profit: 11992.18 },
  { state: "Virginia", profit: 10780.68 },
  { state: "Wisconsin", profit: 10298.05 },
  { state: "New Hampshire", profit: 9781.88 },
  { state: "Massachusetts", profit: 9294.07 },
  { state: "Georgia", profit: 8465.05 },
  { state: "Maryland", profit: 7990.48 },
  { state: "Rhode Island", profit: 7575.59 },
  { state: "Minnesota", profit: 6753.94 },
  { state: "Montana", profit: 6170.49 },
  { state: "Vermont", profit: 5906.17 },
  { state: "Nevada", profit: 3609.68 },
  { state: "Alabama", profit: 3186.30 },
  { state: "Arizona", profit: 2842.54 },
  { state: "Florida", profit: 2819.65 },
  { state: "New Mexico", profit: 1982.47 },
  { state: "Louisiana", profit: 1903.90 },
  { state: "Tennessee", profit: 1838.96 },
  { state: "New Jersey", profit: 1614.82 },
  { state: "Arkansas", profit: 1402.52 },
  { state: "South Carolina", profit: 1237.64 },
  { state: "Iowa", profit: 1148.90 },
  { state: "Missouri", profit: 1069.93 },
  { state: "Oregon", profit: 1010.60 },
  { state: "Maine", profit: 673.58 },
  { state: "West Virginia", profit: 508.18 },
  { state: "Oklahoma", profit: 407.68 },
  { state: "Mississippi", profit: 177.62 },
  { state: "Nebraska", profit: 146.91 },
  { state: "Colorado", profit: 132.12 },
  { state: "Kansas", profit: 37.56 },
  { state: "North Dakota", profit: -919.70 },
  { state: "Pennsylvania", profit: -3582.26 },
  { state: "Ohio", profit: -4310.33 },
  { state: "North Carolina", profit: -6518.20 },
  { state: "Texas", profit: -25729.38 }
];

// Chart colors
export const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16'];

// Get color for state based on profit
export const getStateColor = (profit: number) => {
  if (profit < 0) return '#EF4444'; // Red for losses
  if (profit === 0) return '#E5E7EB'; // Gray for no data
  if (profit < 5000) return '#FEF3C7'; // Light yellow for low profit
  if (profit < 15000) return '#A7F3D0'; // Light green for medium profit
  if (profit < 30000) return '#6EE7B7'; // Medium green for good profit
  if (profit < 50000) return '#34D399'; // Darker green for high profit
  return '#10B981'; // Darkest green for highest profit
};
