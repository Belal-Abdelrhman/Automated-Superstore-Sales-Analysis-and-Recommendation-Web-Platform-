
export interface UserInfo {
  fullName: string;
  jobTitle: string;
}

export interface SuperstoreData {
  'order id': string;
  'order date': string;
  'ship date': string;
  'ship mode': string;
  'customer id': string;
  'customer name': string;
  segment: string;
  country: string;
  city: string;
  state: string;
  'postal code': string;
  region: string;
  'product id': string;
  category: string;
  'sub-category': string;
  'product name': string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
  'days to ship': number;
  rating: number;
}

export interface AnalyticsData {
  totalSales: number;
  totalProfit: number;
  totalOrders: number;
  avgProfitPerOrder: number;
  uniqueCustomers: number;
  salesByRegion: Array<{ region: string; sales: number; profit: number }>;
  salesByCategory: Array<{ category: string; sales: number; profit: number }>;
  topProducts: Array<{ product: string; sales: number; profit: number }>;
  topCustomers: Array<{ customer: string; sales: number; orders: number }>;
  monthlyTrends: Array<{ month: string; sales: number; profit: number }>;
}

export interface ProductRecommendation {
  productName: string;
  category: string;
  subCategory: string;
  avgSales: number;
  popularityScore: number;
}
