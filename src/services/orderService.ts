import { Order } from '../types/restaurant';
import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

export const INITIAL_REAL_ORDERS: Order[] = [
  {
    id: 'ord_sample_9841',
    orderNumber: 'SHK-892401',
    userId: 'guest',
    customerName: 'Aditya Verma',
    customerPhone: '+91 98110 54321',
    bookingType: 'delivery',
    items: [
      {
        cartItemId: 'shankar_butter_chicken_full_spice1_',
        menuItem: {
          id: 'shankar_butter_chicken',
          name: 'Shankar Murgh Makhani (Butter Chicken)',
          hindiName: 'शंकर मुर्ग मखनी',
          menuSection: 'all_day',
          category: 'curries',
          description:
            'Tandoor-smoked chicken simmered in a velvety reduction of sun-ripened tomatoes, churned butter, and fragrant fenugreek.',
          price: 495,
          halfPrice: 295,
          dietary: 'non-veg',
          spiceLevel: 1,
          rating: 4.9,
          reviewsCount: 382,
          image: '/src/assets/images/dish_butter_chicken_curry_1792103747214.webp',
        },
        portion: 'full',
        spiceLevel: 1,
        quantity: 1,
        unitPrice: 495,
        itemTotal: 495,
      },
      {
        cartItemId: 'dum_biryani_full_spice2_',
        menuItem: {
          id: 'dum_biryani',
          name: 'Nawabi Murgh Dum Biryani',
          hindiName: 'नवाबी मुर्ग दम बिरयानी',
          menuSection: 'all_day',
          category: 'rice_biryani',
          description:
            'Aged long-grain basmati sealed in earthen deg with fragrant saffron, mace, and succulent chicken.',
          price: 475,
          dietary: 'non-veg',
          spiceLevel: 2,
          rating: 4.95,
          reviewsCount: 420,
          image: '/src/assets/images/dish_royal_dum_biryani_1792103749027.webp',
        },
        portion: 'full',
        spiceLevel: 2,
        quantity: 1,
        unitPrice: 475,
        itemTotal: 475,
      },
    ],
    subtotal: 970,
    gstAmount: 48.5,
    deliveryFee: 0,
    discountAmount: 50,
    discountCode: 'ROYAL50',
    grandTotal: 968.5,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'cooking',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    estimatedDeliveryMinutes: 20,
    deliveryAddress: 'Flat 4B, Barakhamba Road, Connaught Place, New Delhi',
    geofenceDistanceKm: 0.6,
  },
];

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const results: Order[] = [];
    snapshot.forEach((d) => {
      results.push(d.data() as Order);
    });
    if (results.length > 0) return results;
  } catch (err) {
    console.warn('Firestore fetch orders fallback to local state:', err);
  }

  // Local storage fallback
  try {
    const raw = localStorage.getItem('shankar_orders');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage order read error:', e);
  }

  return INITIAL_REAL_ORDERS;
}

export async function saveOrderToFirestore(order: Order, userId?: string): Promise<boolean> {
  try {
    const orderDoc = doc(db, 'orders', order.id);
    const payload = userId ? { ...order, userId } : order;
    await setDoc(orderDoc, payload);
    return true;
  } catch (err) {
    console.warn('Firestore write fallback to local storage:', err);
    try {
      const raw = localStorage.getItem('shankar_orders');
      const list: Order[] = raw ? JSON.parse(raw) : [];
      list.unshift(order);
      localStorage.setItem('shankar_orders', JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  }
}
