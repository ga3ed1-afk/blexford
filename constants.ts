
import { Product, Category, Order } from './types';

export const APP_NAME = "جين ستور";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "آيفون 15 برو - 256 جيجابايت - تيتانيوم طبيعي",
    price: 4299.000,
    originalPrice: 4599.000,
    category: "إلكترونيات",
    description: "أحدث هاتف من آبل مع معالج A17 Pro وكاميرا احترافية بدقة 48 ميجابكسل.",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 128,
    discount: 7,
    sku: "IP15P-256-NT",
    barcode: "194253839212"
  },
  {
    id: 2,
    title: "حذاء رياضي Adidas Ultraboost Light - أسود",
    price: 580.000,
    originalPrice: 650.000,
    category: "موضة",
    description: "حذاء الجري الأكثر راحة واستجابة، مصمم للنشاط اليومي والأداء العالي.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviews: 85,
    discount: 11,
    sku: "ADI-UL-BLK",
    barcode: "406674729102"
  },
  {
    id: 3,
    title: "ماكينة قهوة Nespresso Essenza Mini - رمادي",
    price: 450.000,
    category: "أجهزة منزلية",
    description: "تصميم صغير وعصري لتحضير قهوة إسبريسو مثالية في ثوانٍ.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviews: 210,
    sku: "NES-EM-GRY",
    barcode: "763005447212"
  },
  {
    id: 4,
    title: "سماعات Sony WH-1000XM5 لإلغاء الضجيج",
    price: 1150.000,
    originalPrice: 1250.000,
    category: "إلكترونيات",
    description: "أفضل تجربة إلغاء ضجيج في العالم مع جودة صوت استثنائية.",
    image: "https://images.unsplash.com/photo-1618366712277-707730e80718?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 340,
    discount: 8,
    sku: "SON-XM5-SLV",
    barcode: "4548736132581"
  },
  {
    id: 5,
    title: "تلفاز Samsung 55\" QLED 4K Smart TV",
    price: 2899.000,
    originalPrice: 3200.000,
    category: "إلكترونيات",
    description: "ألوان نابضة بالحياة وتجربة سينمائية في منزلك مع تقنية كوانتوم دوت.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    reviews: 56,
    discount: 9,
    sku: "SAM-Q60B-55",
    barcode: "880609420192"
  },
  {
    id: 6,
    title: "ساعة Apple Watch Series 9 - 45mm",
    price: 1650.000,
    category: "إلكترونيات",
    description: "ميزات صحية متطورة وشاشة ساطعة وتفاعل جديد كلياً بدون لمس.",
    image: "https://images.unsplash.com/photo-1544117518-2b0415804128?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviews: 112,
    sku: "AW9-45-ALUM",
    barcode: "194253702192"
  },
  {
    id: 7,
    title: "قلاية هوائية Philips XXL Smart Sensing",
    price: 980.000,
    category: "أجهزة منزلية",
    description: "اطهِ أطباقك المفضلة بدهون أقل بنسبة 90% مع سعة عائلية كبيرة.",
    image: "https://images.unsplash.com/photo-1584915664155-2141093a28ff?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviews: 89,
    sku: "PHI-AF-XXL",
    barcode: "871010393212"
  },
  {
    id: 8,
    title: "كراس أكسفورد A4 - 96 صفحة (ورق فاخر)",
    price: 8.500,
    category: "مكتبية",
    description: "كراس حلزوني عالي الجودة من أكسفورد، ورق Optik Paper لا ينفذ منه الحبر.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 150,
    sku: "OX-NB-A4-96",
    barcode: "619000000001"
  }
];

// Fix: Changed 'credit_card' to 'bank_card' to match PaymentMethod union type.
export const MOCK_ORDERS: Order[] = [
  { id: '1201', customerName: 'أحمد بن صالح', customerPhone: '21000000', date: '2024-05-15', total: 4299.000, status: 'pending', itemsCount: 1, paymentMethod: 'bank_card' },
  { id: '1202', customerName: 'مريم بن عمار', customerPhone: '22000000', date: '2024-05-14', total: 580.000, status: 'delivered', itemsCount: 1, paymentMethod: 'cash' },
];

export const CATEGORIES = ["الكل", "إلكترونيات", "موضة", "أجهزة منزلية", "مكتبية", "الصحة والجمال"];
