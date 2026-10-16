import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ChefHat,
  Truck,
  Sparkles,
  ShoppingBag,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types/restaurant';
import { RESTAURANT_CONTACT_INFO } from '../data/menuData';

interface Props {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<Props> = ({ order, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#10b981'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDineIn = order.bookingType === 'dine_in';
  const isTakeaway = order.bookingType === 'takeaway';

  const getStatusStage = () => {
    switch (order.orderStatus) {
      case 'placed':
        return 1;
      case 'confirmed':
        return 2;
      case 'cooking':
        return 3;
      case 'out_for_delivery':
      case 'ready_at_table':
        return 4;
      case 'completed':
        return 5;
      default:
        return 1;
    }
  };

  const currentStage = getStatusStage();

  const stages = [
    { num: 1, label: 'Received', icon: ShoppingBag },
    { num: 2, label: 'Kitchen Confirmed', icon: CheckCircle2 },
    { num: 3, label: 'Tandoor & Dum Cooking', icon: ChefHat },
    {
      num: 4,
      label: isDineIn ? 'Serving at Table' : isTakeaway ? 'Ready for Pickup' : 'Express Delivery',
      icon: isDineIn ? CheckCircle2 : Truck,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Order Confirmed
              </span>
              <h2 className="text-base sm:text-lg font-serif-display font-bold text-white flex items-center gap-2">
                Order #{order.orderNumber}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-sm">
          {/* Estimated arrival banner */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-medium">
                  {isDineIn ? 'Estimated Table Arrival' : 'Estimated Delivery Time'}
                </p>
                <p className="text-base font-bold text-amber-300">
                  {order.estimatedDeliveryMinutes || 25} - {(order.estimatedDeliveryMinutes || 25) + 10} mins
                </p>
              </div>
            </div>

            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold uppercase">
              {order.orderStatus.replace('_', ' ')}
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400">
              Live Kitchen Progress
            </h4>
            <div className="grid grid-cols-4 gap-1.5 relative">
              {stages.map((st) => {
                const Icon = st.icon;
                const isCompleted = currentStage >= st.num;
                const isCurrent = currentStage === st.num;
                return (
                  <div
                    key={st.num}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      isCompleted
                        ? 'border-amber-400/60 bg-amber-500/10 text-amber-300'
                        : 'border-stone-800 bg-stone-800/30 text-stone-500'
                    } ${isCurrent ? 'ring-1 ring-amber-400 animate-pulse' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium leading-tight">
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery or Table Destination */}
          <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-800 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-semibold text-stone-200">
                {isDineIn ? `Table ${order.tableNumber || 'Selected'}` : 'Delivery Destination'}
              </p>
              <p className="text-stone-400">
                {isDineIn
                  ? 'Main Royal Heritage Dining Hall, Shankar Restaurant'
                  : order.deliveryAddress || 'Central Delhi'}
              </p>
              {order.geofenceDistanceKm !== undefined && (
                <p className="text-[11px] text-amber-400/90 font-mono">
                  Verified Kitchen Geofence: {order.geofenceDistanceKm} km from master tandoor
                </p>
              )}
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400">
              Ordered Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            <div className="rounded-xl border border-stone-800 divide-y divide-stone-800/60 overflow-hidden bg-stone-950/40">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-stone-200 mr-2 font-mono">
                      {item.quantity}x
                    </span>
                    <span className="text-stone-300 font-medium">
                      {item.menuItem.name}
                    </span>
                    <span className="text-stone-500 ml-1.5 capitalize">
                      ({item.portion})
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-400">
                    ₹{item.itemTotal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment receipt */}
          <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({order.discountCode})</span>
                <span>-₹{order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-400">
              <span>GST & Royal Hospitality Cess (5%)</span>
              <span>₹{order.gstAmount}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
            </div>
            <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
              <span>Grand Total</span>
              <span className="text-amber-400">₹{order.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-3">
          <a
            href={`tel:${RESTAURANT_CONTACT_INFO.phonePrimary || RESTAURANT_CONTACT_INFO.phoneDirect}`}
            className="flex-1 py-2.5 px-3 rounded-xl border border-stone-700 hover:border-amber-400/50 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Restaurant</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Back to Dining</span>
          </button>
        </div>
      </div>
    </div>
  );
};
