import { PresetLocation } from '../types/restaurant';

export const SHANKAR_RESTAURANT_LOCATION = {
  center: {
    lat: 28.6328,
    lng: 77.2197,
  },
  name: 'Shankar Restaurant',
  address: 'Block B, Inner Circle, Connaught Place, New Delhi 110001',
  phone: '+91 11 4352 8900',
  maxDeliveryRadiusKm: 12,
  maxDineInRadiusMeters: 100,
};

export const PRESET_LOCATIONS: PresetLocation[] = [
  {
    id: 'in_restaurant',
    name: 'Table 4, Shankar Royal Hall',
    lat: 28.6328,
    lng: 77.2197,
    description: 'Inside dining hall (0m distance) - Instant Table Service',
  },
  {
    id: 'connaught_place_barakhamba',
    name: 'Barakhamba Road, CP (0.6 km)',
    lat: 28.6305,
    lng: 77.2255,
    description: 'Central Delhi hub - Express 15-20 min Delivery',
  },
  {
    id: 'khan_market',
    name: 'Khan Market, New Delhi (3.2 km)',
    lat: 28.6003,
    lng: 77.2273,
    description: 'South Central Delhi - 25-30 min Hot Delivery',
  },
  {
    id: 'south_extension',
    name: 'South Extension II (6.8 km)',
    lat: 28.5721,
    lng: 77.2195,
    description: 'South Delhi - 35-40 min Insulated Delivery',
  },
  {
    id: 'delhi_aerocity',
    name: 'Aerocity Hospitality District (14.5 km)',
    lat: 28.5522,
    lng: 77.1215,
    description: 'Beyond Standard Delivery (Catering / Advance Order Only)',
  },
  {
    id: 'cyberhub_gurgaon',
    name: 'DLF CyberHub, Gurugram (24.0 km)',
    lat: 28.4952,
    lng: 77.0895,
    description: 'Outside Standard Delivery Zone',
  },
];

/**
 * Computes great-circle distance between two GPS coordinates using Haversine formula
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100;
}

/**
 * Requests device GPS coordinates from the browser navigator
 */
export async function getLiveDeviceLocation(): Promise<{
  lat: number;
  lng: number;
  addressLabel: string;
  accuracyMeters: number;
}> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          addressLabel: 'Live GPS Location',
          accuracyMeters: Math.round(position.coords.accuracy || 15),
        });
      },
      (error) => {
        let msg = 'Could not retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission was denied. You can select a preset location above.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'GPS signal is currently unavailable.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out. Please try again.';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  });
}
