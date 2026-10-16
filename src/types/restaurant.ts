export type SpiceLevel = 0 | 1 | 2 | 3; // 0: Mild, 1: Medium, 2: Spicy, 3: Royal Extra Hot

export type MenuSectionType = 'all_day' | 'lunch_specials' | 'lunch' | 'bar';

export type BookingType = 'delivery' | 'dine_in' | 'takeaway';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  menuSection: MenuSectionType;
  category: string;
  description: string;
  price: number;
  halfPrice?: number;
  dietary: 'veg' | 'non-veg' | 'vegan';
  spiceLevel: SpiceLevel;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  image: string;
  prepTimeMinutes?: number;
  allergens?: string[];
  calories?: number;
  isAlcoholic?: boolean;
  volumeOrServing?: string;
  alcoholPercentage?: number | string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  portion: 'full' | 'half';
  spiceLevel: SpiceLevel;
  quantity: number;
  unitPrice?: number;
  itemTotal: number;
  specialInstructions?: string;
}

export interface GeofenceCoordinates {
  lat: number;
  lng: number;
  addressLabel?: string;
  accuracyMeters?: number;
}

export interface GeofenceState {
  userCoords: GeofenceCoordinates | null;
  distanceKm: number;
  distanceMeters: number;
  isInsideDeliveryRadius: boolean;
  isInsideDineInRadius: boolean;
  status: 'idle' | 'requesting' | 'acquired' | 'denied' | 'simulated' | 'granted';
  errorMessage: string | null;
  lastCheckedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  displayName?: string;
  phoneNumber?: string;
  authProvider?: 'google' | 'email' | 'phone' | 'guest';
  isLoggedIn: boolean;
  savedAddresses: string[];
  loyaltyPoints: number;
  recentOrdersCount: number;
}

export interface TableBookingDetails {
  id?: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  tableNumber?: string;
  seatingArea: string;
  specialOccasion?: string;
  specialRequests?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customer?: {
    name: string;
    phone: string;
    address?: string;
    tableNumber?: string;
  };
  tableDetails?: TableBookingDetails;
  bookingType: BookingType;
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  deliveryFee: number;
  discountAmount: number;
  discountCode?: string;
  grandTotal: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'pay_at_counter' | string;
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'placed' | 'confirmed' | 'cooking' | 'out_for_delivery' | 'ready_at_table' | 'completed';
  createdAt: string;
  estimatedDeliveryMinutes?: number;
  estimatedTimeMinutes?: number;
  deliveryAddress?: string;
  tableNumber?: string;
  geofenceDistanceKm?: number;
  geofenceVerification?: {
    verified: boolean;
    distanceKm: number;
    userLocationLabel: string;
  };
  turnstileToken?: string;
}

export interface CloudflareTurnstileState {
  status: 'idle' | 'verifying' | 'verified' | 'failed' | 'interactive' | 'challenge_required';
  token: string | null;
  challengeScore?: number;
  botScore?: number;
  cfRayId?: string;
  challengeType?: string;
  verifiedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  caption?: string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  experience?: string;
  experienceRequired?: string;
  description: string;
  location?: string;
  requirements?: string[];
}

export interface AllergenRow {
  dishName: string;
  menuSection?: string;
  category?: string;
  dietary?: string;
  gluten?: boolean;
  dairy?: boolean;
  nuts?: boolean;
  soy?: boolean;
  eggs?: boolean;
  crustacean?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  nutFree?: boolean;
  vegan?: boolean;
  jainFriendly?: boolean;
  notes?: string;
}

export interface PresetLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
}
