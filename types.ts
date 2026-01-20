
export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  cost?: number;
  deliveryFee?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  sku?: string;
  barcode?: string;
  // حقول جديدة للنموذج المطور
  brand?: string;
  gender?: 'All' | 'Female' | 'Male' | 'Others';
  size?: 'Extra Large' | 'Extra Small' | 'Large' | 'Medium' | 'Small';
  colors?: string[];
  features?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type PaymentMethod = 'e-dinar' | 'bank_card' | 'cash';

export interface Wallet {
  id: string;
  label: string;
  createdAt: string;
}

export interface KonnectSettings {
  apiKey: string;
  wallets: Wallet[];
  activeWalletId: string;
  mode: 'sandbox' | 'live';
  enabledMethods: {
    bankCard: boolean;
    edinar: boolean;
  };
}

export interface Order {
  id: string;
  transactionId?: string;
  customerName: string;
  customerPhone: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  itemsCount: number;
  paymentMethod: PaymentMethod;
  payUrl?: string;
}

export enum Category {
  ALL = 'الكل',
  ELECTRONICS = 'إلكترونيات',
  FASHION = 'موضة',
  HOME = 'أجهزة منزلية',
  OFFICE = 'مكتبية',
  BEAUTY = 'الصحة والجمال'
}
