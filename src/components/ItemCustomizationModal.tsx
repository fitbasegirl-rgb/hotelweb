import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Utensils, AlertCircle, Sparkles } from 'lucide-react';
import { MenuItem, SpiceLevel } from '../types/restaurant';

interface Props {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    portion: 'full' | 'half',
    spiceLevel: SpiceLevel,
    quantity: number,
    specialInstructions?: string
  ) => void;
}

const SPICE_OPTIONS: { level: SpiceLevel; label: string; flames: number; desc: string }[] = [
  { level: 0, label: 'Mild', flames: 1, desc: 'Gentle aromatic spices, creamy & soothing' },
  { level: 1, label: 'Medium', flames: 2, desc: 'Classic royal Mughal balance with gentle warmth' },
  { level: 2, label: 'Spicy', flames: 3, desc: 'Zesty tandoori punch with roasted red chilies' },
  { level: 3, label: 'Royal Hot', flames: 4, desc: 'Authentic fiery Rajputana & Lucknowi heat' },
];

export const ItemCustomizationModal: React.FC<Props> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [portion, setPortion] = useState<'full' | 'half'>('full');
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(item.spiceLevel ?? 1);
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  if (!isOpen) return null;

  const unitPrice = portion === 'half' && item.halfPrice ? item.halfPrice : item.price;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(item, portion, spiceLevel, quantity, specialInstructions.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 text-stone-100 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image preview */}
        <div className="relative h-44 sm:h-52 w-full shrink-0 bg-stone-950 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase ${
                item.dietary === 'veg'
                  ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-700/60'
                  : 'bg-rose-950/90 text-rose-400 border border-rose-700/60'
              }`}
            >
              {item.dietary === 'veg' ? '● Pure Veg' : '▲ Non-Veg'}
            </span>
            {item.isBestseller && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/90 text-stone-950 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Bestseller
              </span>
            )}
          </div>

          {/* Title in header */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg sm:text-xl font-serif-display font-bold text-white drop-shadow-md">
              {item.name}
            </h3>
            {item.hindiName && (
              <p className="text-xs text-amber-300 font-medium">{item.hindiName}</p>
            )}
          </div>
        </div>

        {/* Scrollable customization options */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-5 flex-1">
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {item.description}
          </p>

          {/* Portion Size */}
          {item.halfPrice && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Choose Portion Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPortion('full')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    portion === 'full'
                      ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-800/40 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">Full Portion</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">₹{item.price}</span>
                  </div>
                  <span className="text-[11px] text-stone-400">Standard serving (Serves 2)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPortion('half')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    portion === 'half'
                      ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-800/40 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold">Half Portion</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">₹{item.halfPrice}</span>
                  </div>
                  <span className="text-[11px] text-stone-400">Single serving (Serves 1)</span>
                </button>
              </div>
            </div>
          )}

          {/* Spice Level Selection */}
          {!item.isAlcoholic && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Spice Level Preference
                </label>
                <span className="text-xs text-stone-400 font-medium">
                  {SPICE_OPTIONS[spiceLevel].label}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SPICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setSpiceLevel(opt.level)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      spiceLevel === opt.level
                        ? 'border-amber-400 bg-amber-500/15 text-white ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-800/30 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: opt.flames }).map((_, i) => (
                        <Flame key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra mint chutney, less oil, well done naan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Allergens warning */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="p-3 rounded-xl bg-stone-800/40 border border-stone-800 flex items-start gap-2.5 text-xs text-stone-400">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Contains: <strong className="text-stone-300">{item.allergens.join(', ')}</strong>. Please notify server if you have severe dietary allergies.
              </span>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-stone-800/90 rounded-xl p-1 border border-stone-700">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sm w-5 text-center text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="p-2 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-mono font-bold text-base">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
