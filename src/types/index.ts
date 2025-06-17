
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
  totalQuantity: number;
  avgProfitPerOrder: number;
  uniqueCustomers: number;
  uniqueProducts: number;
  avgDiscount: number;
  avgRating: number;
  salesByRegion: Array<{ region: string; sales: number; profit: number; orders: number; customers: number }>;
  salesByCategory: Array<{ category: string; sales: number; profit: number; quantity: number }>;
  salesBySubCategory: Array<{ subCategory: string; sales: number; profit: number }>;
  salesBySegment: Array<{ segment: string; sales: number; profit: number; customers: number }>;
  salesByShipMode: Array<{ shipMode: string; sales: number; orders: number; avgDaysToShip: number }>;
  salesByState: Array<{ state: string; sales: number; profit: number }>;
  topProducts: Array<{ product: string; sales: number; profit: number; quantity: number; orders: number }>;
  topCustomers: Array<{ customer: string; sales: number; orders: number; profit: number }>;
  monthlyTrends: Array<{ month: string; sales: number; profit: number; orders: number; quantity: number }>;
}

export interface ProductRecommendation {
  productName: string;
  category: string;
  subCategory: string;
  avgSales: number;
  popularityScore: number;
}
