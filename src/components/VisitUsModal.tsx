import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Car,
  Compass,
  Train,
  ShieldCheck,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { GeofenceState } from '../types/restaurant';
import { RESTAURANT_CONTACT_INFO } from '../data/menuData';
import { SHANKAR_RESTAURANT_LOCATION } from '../services/locationService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'location' | 'about_us';
  geofenceState: GeofenceState;
  onOpenReservations: () => void;
}

export const VisitUsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'location',
  geofenceState,
  onOpenReservations,
}) => {
  const [activeTab, setActiveTab] = useState<'location' | 'about_us'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/40 border-b border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
              Shankar Heritage & Hospitality
            </span>
            <h2 className="text-lg sm:text-xl font-serif-display font-bold text-white">
              {activeTab === 'location' ? 'Visit Shankar Restaurant' : 'The Royal Heritage & Legacy'}
            </h2>
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

        {/* Tab switcher */}
        <div className="px-4 sm:px-6 pt-3 flex gap-2 border-b border-stone-800 bg-stone-950/40">
          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'location'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Location & Timings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about_us')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'about_us'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage Story
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-sm">
          {activeTab === 'location' ? (
            <div className="space-y-6">
              {/* Geofence status strip */}
              <div className="p-3.5 rounded-xl bg-stone-800/50 border border-stone-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-xs text-stone-400">Your Proximity: </span>
                    <span className="text-xs font-bold text-amber-300 font-mono">
                      {geofenceState.distanceKm} km away
                    </span>
                  </div>
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
                    ? 'Inside Dining Hall'
                    : geofenceState.isInsideDeliveryRadius
                    ? 'Within Delivery Radius'
                    : 'Beyond Delivery Range'}
                </span>
              </div>

              {/* Address card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    Address & Directions
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans-body">
                    {SHANKAR_RESTAURANT_LOCATION.address}
                  </p>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-2">
                    <Train className="w-3.5 h-3.5 text-amber-400" />
                    Rajiv Chowk Metro Gate 2 (120 meters walk)
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      SHANKAR_RESTAURANT_LOCATION.name + ' ' + SHANKAR_RESTAURANT_LOCATION.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium underline mt-2"
                  >
                    Open in Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    Opening Hours
                  </div>
                  <div className="text-xs text-stone-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Royal Lunch & Buffet:</span>
                      <span className="font-medium text-white">12:00 PM – 03:45 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">High Tea & Spirits:</span>
                      <span className="font-medium text-white">04:00 PM – 06:45 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Grand Royal Dinner:</span>
                      <span className="font-medium text-white">07:00 PM – 11:45 PM</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-2">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    Complimentary Valet Parking available at Gate B
                  </div>
                </div>
              </div>

              {/* Guidelines */}
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 space-y-3">
                <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Guest Etiquette & Reservations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-300">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-semibold text-white block mb-0.5">Dress Code</span>
                    Smart casuals or elegant ethnic Indian attire.
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-semibold text-white block mb-0.5">Table Holding</span>
                    Tables held for 15 minutes past booking time.
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
                    <span className="font-semibold text-white block mb-0.5">Catering & Events</span>
                    Private Maharaja banquets accommodate up to 150 guests.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-xs text-stone-300 leading-relaxed font-sans-body">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-amber-500/20 space-y-2">
                <h3 className="text-base font-serif-display font-bold text-amber-300">
                  Crafting Royal Indian Culinary Heritage Since 1958
                </h3>
                <p>
                  Founded under the venerable culinary patronage of Master Chef Pandit Shankar Nath in historic Connaught Place, Shankar Restaurant began as an ode to undiluted Awadhi, Punjabi, and Mughlai culinary traditions.
                </p>
                <p>
                  Every spice in our tandoor is stone-ground on traditional sil-batta slabs each morning. We never use artificial food colorings, preservatives, or pre-cooked frozen curries.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950/40 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Clay Tandoor & Earthen Degs
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    Biryanis sealed with whole-wheat dough and slow-simmered over fragrant wood charcoal embers for up to 6 hours.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/40 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Churned Desi Ghee & Farm Cream
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    Sourced directly from indigenous dairy farms, imparting authentic aroma and silky mouthfeel to our heritage curries.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-400 hidden sm:block">
            Concierge: <span className="text-white font-mono">{RESTAURANT_CONTACT_INFO.phonePrimary || RESTAURANT_CONTACT_INFO.phoneDirect}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReservations();
              }}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-semibold text-xs text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
