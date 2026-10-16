import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  ChevronDown,
  ChevronRight,
  Menu as MenuIcon,
  X,
  Phone,
  ClipboardList,
  Utensils,
  Sun,
  Wine,
  Coffee,
  Sparkles,
  Calendar,
  UtensilsCrossed,
  MapPin,
  HelpCircle,
  Briefcase,
  AlertCircle,
  Compass,
  ShoppingBag
} from 'lucide-react';
import { UserProfile, MenuSectionType, GeofenceState } from '../types/restaurant';
import { PalaceLogo } from './PalaceLogo';

interface Props {
  cartCount: number;
  cartTotal: number;
  isCartBouncing: boolean;
  ordersCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenReservations: () => void;
  onOpenAuth: () => void;
  onOpenCallToOrder: () => void;
  onOpenExplore: (tab: 'gallery' | 'buffet_vs_thali') => void;
  onOpenCatering: () => void;
  onOpenVisitUs: (tab: 'location' | 'about_us') => void;
  onOpenHelp: (tab: 'faqs' | 'contact' | 'careers' | 'allergen_guide') => void;
  onSelectMenuSection: (section: MenuSectionType) => void;
  user: UserProfile;
  geofenceState?: GeofenceState;
}

export const Navbar: React.FC<Props> = ({
  cartCount,
  cartTotal,
  isCartBouncing,
  ordersCount,
  onOpenCart,
  onOpenOrders,
  onOpenReservations,
  onOpenAuth,
  onOpenCallToOrder,
  onOpenExplore,
  onOpenCatering,
  onOpenVisitUs,
  onOpenHelp,
  onSelectMenuSection,
  user,
  geofenceState
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdown when user clicks anywhere outside of the nav
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Toggle dropdown on click and hold open
  const handleDropdownToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown((prev: string | null) => (prev === id ? null : id));
  };

  const handleMenuClick = (section: MenuSectionType) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onSelectMenuSection(section);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Condition specified by user:
  // "don't show orders section only phone and sign in option and after do sign in and orders something then sign in should disappear and ordered item list should show"
  const hasSignedInAndOrdered = user.isLoggedIn && ordersCount > 0;

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all font-sans-body">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-6 py-2 sm:py-2.5 relative"
        ref={navContainerRef}
      >
        {/* Brand Wordmark (Always on the Left) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group whitespace-nowrap shrink-0"
        >
          <PalaceLogo size="md" />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-serif-display font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 group-hover:from-white group-hover:to-amber-200 transition-all">
              Shankar Restaurant
            </span>
            <span className="text-[9px] uppercase tracking-widest text-amber-500/80 font-medium -mt-0.5 hidden sm:block">
              Royal Palace & Indian Dining
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Click-to-Hold Dropdown Menus */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold tracking-wide uppercase text-stone-300">
          {/* 1. MENU (3 sub menus: All Day, Lunch, Bar Menu) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownToggle('menu', e)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                activeDropdown === 'menu'
                  ? 'text-amber-400 bg-stone-800 ring-1 ring-amber-400/40'
                  : 'hover:text-amber-400 hover:bg-stone-800/60'
              }`}
            >
              <span>Menu</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'menu' ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'menu' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-60 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 space-y-1 animate-slide-up z-50"
              >
                <button
                  type="button"
                  onClick={() => handleMenuClick('all_day')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">All Day Menu</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Full spread curries, biryani & tandoor
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleMenuClick('lunch')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Lunch Menu</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Royal Thalis, express bowls & kathi wraps
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleMenuClick('bar')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Wine className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Bar Menu</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Smoked craft cocktails, beers & wines
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 2. EXPLORE (Gallery, Buffet vs Thali) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownToggle('explore', e)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                activeDropdown === 'explore'
                  ? 'text-amber-400 bg-stone-800 ring-1 ring-amber-400/40'
                  : 'hover:text-amber-400 hover:bg-stone-800/60'
              }`}
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'explore' ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'explore' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-60 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 space-y-1 animate-slide-up z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenExplore('gallery');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Gallery</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Photos of dining hall, tandoor & dishes
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenExplore('buffet_vs_thali');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Buffet vs. Thali</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Ayurvedic Thali vs Weekend Buffet guide
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 3. QUICK LINKS (Order, Reservations, Catering) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownToggle('quick_links', e)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                activeDropdown === 'quick_links'
                  ? 'text-amber-400 bg-stone-800 ring-1 ring-amber-400/40'
                  : 'hover:text-amber-400 hover:bg-stone-800/60'
              }`}
            >
              <span>Quick Links</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'quick_links' ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'quick_links' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-60 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 space-y-1 animate-slide-up z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenCart();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Order Online</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Immediate takeout & direct delivery
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenReservations();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Reservations</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Book tables in dining hall or baithak
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenCatering();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Catering</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Weddings, corporate & outdoor live tandoor
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 4. VISIT US (Location, About Us) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownToggle('visit_us', e)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                activeDropdown === 'visit_us'
                  ? 'text-amber-400 bg-stone-800 ring-1 ring-amber-400/40'
                  : 'hover:text-amber-400 hover:bg-stone-800/60'
              }`}
            >
              <span>Visit Us</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'visit_us' ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'visit_us' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-60 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 space-y-1 animate-slide-up z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenVisitUs('location');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Location</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Connaught Place hub, parking & metro
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenVisitUs('about_us');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">About Us</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Our 50-year heritage & culinary ethos
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 5. HELP (FAQs, Contact, Careers, Allergen Guide) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => handleDropdownToggle('help', e)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none ${
                activeDropdown === 'help'
                  ? 'text-amber-400 bg-stone-800 ring-1 ring-amber-400/40'
                  : 'hover:text-amber-400 hover:bg-stone-800/60'
              }`}
            >
              <span>Help</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'help' ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {activeDropdown === 'help' && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 w-64 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 space-y-1 animate-slide-up z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenHelp('faqs');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">FAQs</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Dietary, parking & reservation answers
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenHelp('contact');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Contact</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Phone concierge & messaging form
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenHelp('careers');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Careers</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Join chefs, mixologists & hospitality team
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDropdown(null);
                    onOpenHelp('allergen_guide');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs text-stone-200 hover:bg-amber-400/10 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Allergen Guide</span>
                    <span className="text-[10px] text-stone-400 block normal-case font-normal">
                      Gluten, dairy, nut & Jain matrix
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 6. TABLE RESERVATIONS */}
          <button
            type="button"
            onClick={() => {
              setActiveDropdown(null);
              onOpenReservations();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-stone-300 hover:text-amber-400 hover:bg-stone-800/60 transition-colors cursor-pointer select-none"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Table</span>
          </button>
        </nav>

        {/* Action Buttons Cluster & Mobile Hamburger on the Right Side */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Phone button: Always visible for direct call */}
          <button
            type="button"
            onClick={onOpenCallToOrder}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 text-stone-300 hover:text-amber-400 rounded-xl hover:bg-stone-800 transition-colors cursor-pointer text-xs font-semibold"
            title="Call Shankar Restaurant"
            aria-label="Call Shankar Restaurant"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Call</span>
          </button>

          {/* Cart Button: Direct 1-tap cart access on mobile & desktop */}
          <button
            type="button"
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl transition-all cursor-pointer font-medium text-xs ${
              cartCount > 0
                ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20 active:scale-95'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            } ${isCartBouncing ? 'ring-2 ring-amber-300 scale-105' : ''}`}
            title="View Food Cart"
            aria-label={`View Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center gap-1 font-mono font-bold text-[11px]">
                <span className="bg-stone-950 text-amber-300 px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {cartCount}
                </span>
                {cartTotal > 0 && <span className="hidden xs:inline">₹{cartTotal}</span>}
              </span>
            )}
          </button>

          {/* Conditional Orders vs Sign In Logic */}
          {hasSignedInAndOrdered ? (
            <button
              type="button"
              onClick={onOpenOrders}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/40 hover:bg-amber-500/25 transition-all text-xs font-bold cursor-pointer"
              title="View Ordered Items List"
              aria-label="View Orders"
            >
              <ClipboardList className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline">Ordered</span>
              <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 font-bold text-[10px] flex items-center justify-center font-mono">
                {ordersCount}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="w-9 h-9 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-amber-400 border border-stone-700/80 hover:border-amber-400/50 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95 group"
              title={user.isLoggedIn ? (user.name || 'Member Profile') : 'Account Profile'}
              aria-label="Account Profile"
            >
              {user.isLoggedIn && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-6 h-6 rounded-lg object-cover ring-1 ring-amber-400"
                />
              ) : (
                <User className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              )}
            </button>
          )}

          {/* Universal Hamburger Navigation Button (Visible & interactive on all screen sizes) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-amber-300 bg-stone-800/90 hover:bg-stone-800 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer shadow-xs active:scale-95 text-xs font-semibold"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            )}
            <span className="hidden sm:inline font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* Modern Slide-Over Navigation Sheet (Works seamlessly across all viewports) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed backdrop with smooth click-to-dismiss */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over panel container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <div className="w-screen max-w-[340px] sm:max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col text-stone-100 overflow-hidden animate-slide-left">
              {/* Drawer Top Header */}
              <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <PalaceLogo size="sm" />
                  <div>
                    <h3 className="font-serif-display font-bold text-base text-amber-300 leading-tight">
                      Shankar Restaurant
                    </h3>
                    <span className="text-[10px] text-amber-500/80 uppercase tracking-widest font-medium block">
                      Royal Palace & Dining
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-sans-body">
                {/* Geofence Kitchen Verification Chip */}
                {geofenceState && (
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Kitchen: <strong className="text-amber-300 font-mono">{geofenceState.distanceKm} km</strong>
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        geofenceState.isInsideDineInRadius
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : geofenceState.isInsideDeliveryRadius
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {geofenceState.isInsideDineInRadius
                        ? 'Dining Hall'
                        : geofenceState.isInsideDeliveryRadius
                        ? 'Delivery Zone'
                        : 'Outside Range'}
                    </span>
                  </div>
                )}

                {/* Primary Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="p-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Food Cart ({cartCount})</span>
                    </div>
                    {cartTotal > 0 && <span className="font-mono text-[11px]">₹{cartTotal}</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenReservations();
                    }}
                    className="p-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-white font-semibold text-xs border border-stone-700/80 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Book Table</span>
                  </button>
                </div>

                {/* 1. Menu Collections */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-1">
                    Menu Collections
                  </span>
                  <div className="space-y-1 pt-1">
                    <button
                      type="button"
                      onClick={() => handleMenuClick('all_day')}
                      className="w-full p-2.5 rounded-xl bg-stone-800/40 hover:bg-stone-800 border border-stone-800/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
                          <Coffee className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-white block group-hover:text-amber-300">
                            All Day Menu
                          </span>
                          <span className="text-[10px] text-stone-400">Curries, Tandoor & Biryanis</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMenuClick('lunch')}
                      className="w-full p-2.5 rounded-xl bg-stone-800/40 hover:bg-stone-800 border border-stone-800/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
                          <Sun className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-white block group-hover:text-amber-300">
                            Royal Lunch Specials
                          </span>
                          <span className="text-[10px] text-stone-400">Maha Thalis & Express Bowls</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMenuClick('bar')}
                      className="w-full p-2.5 rounded-xl bg-stone-800/40 hover:bg-stone-800 border border-stone-800/80 flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
                          <Wine className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-white block group-hover:text-amber-300">
                            Bar & Spirits
                          </span>
                          <span className="text-[10px] text-stone-400">Craft Cocktails, Beers & Wines</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>

                {/* 2. Experiences & Heritage */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-1">
                    Explore & Dining
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenExplore('gallery');
                      }}
                      className="p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-stone-200">Photo Gallery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenExplore('buffet_vs_thali');
                      }}
                      className="p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-stone-200">Buffet vs Thali</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenCatering();
                      }}
                      className="p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center gap-2 cursor-pointer"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-stone-200">Royal Catering</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenVisitUs('about_us');
                      }}
                      className="p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-stone-200">Heritage Story</span>
                    </button>
                  </div>
                </div>

                {/* 3. Location, Timings & Support */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-1">
                    Guest Services
                  </span>
                  <div className="space-y-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenVisitUs('location');
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center justify-between text-xs text-stone-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        Connaught Place Location & Hours
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenHelp('faqs');
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center justify-between text-xs text-stone-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        FAQs & Policies
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenHelp('allergen_guide');
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center justify-between text-xs text-stone-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        Allergen Matrix & Dietary Guide
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenHelp('careers');
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-800/30 hover:bg-stone-800 text-left border border-stone-800 flex items-center justify-between text-xs text-stone-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                        Careers & Culinary Brigade
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions: User Account & Concierge Call */}
              <div className="p-4 bg-stone-950 border-t border-stone-800 space-y-2.5">
                {user.isLoggedIn ? (
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-amber-400 font-mono">
                          {user.loyaltyPoints} Royal Points
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenOrders();
                        }}
                        className="px-2 py-1 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-semibold cursor-pointer flex items-center gap-1"
                        title="View Orders"
                      >
                        <ClipboardList className="w-3.5 h-3.5" />
                        <span>Orders</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAuth();
                        }}
                        className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-xs cursor-pointer"
                        title="Account"
                      >
                        <User className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-98"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In / Member Rewards (+100 Pts)</span>
                  </button>
                )}

                {/* Direct Telephone Concierge */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCallToOrder();
                  }}
                  className="w-full py-2 px-3 rounded-xl border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Concierge: +91 11 4352 8900</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
