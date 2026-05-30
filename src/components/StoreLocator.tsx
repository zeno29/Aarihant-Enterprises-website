import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Landmark, Plus, Settings, ShieldCheck, X } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { LOCATIONS } from '../data/products';
import { StoreLocation } from '../types';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey =
  Boolean(API_KEY) &&
  !API_KEY.startsWith('YOUR_') &&
  API_KEY.trim() !== '';

// Camera controller that smooth pans to focus on selected location
function MapCameraControl({ selectedLocation }: { selectedLocation: StoreLocation | null }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !selectedLocation || typeof selectedLocation.lat === 'undefined' || typeof selectedLocation.lng === 'undefined') return;
    map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    map.setZoom(15);
  }, [map, selectedLocation]);

  return null;
}

export default function StoreLocator() {
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation | null>(null);

  // Admin section toggles & form state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newHours, setNewHours] = useState('Mon-Sat: 10:30 AM - 8:30 PM');
  const [newEmail, setNewEmail] = useState('');
  
  // Real coordinates configuration
  const [newLat, setNewLat] = useState('25.451500');
  const [newLng, setNewLng] = useState('81.836200');

  // Simulated coordinate offsets for the retro fallback SVG map
  const [newCoordinateX, setNewCoordinateX] = useState(50);
  const [newCoordinateY, setNewCoordinateY] = useState(50);

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Load locations from localStorage and merge with default LOCATIONS
  useEffect(() => {
    const saved = localStorage.getItem('aarihant_showrooms');
    let loaded: StoreLocation[] = [...LOCATIONS];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) {
          // Filter out obsolete hardcoded default locations
          const validSaved = parsed.filter((item: StoreLocation) => 
            LOCATIONS.some(loc => loc.id === item.id) || item.id.startsWith('shop-')
          );
          
          const merged = [...validSaved];
          LOCATIONS.forEach(loc => {
            if (!merged.some((m: StoreLocation) => m.id === loc.id)) {
              merged.push(loc);
            }
          });
          loaded = merged;
          saveToLocalStorage(loaded);
        }
      } catch (e) {
        console.error('Failed to parse saved branches');
      }
    }
    setLocations(loaded);
    setSelectedLocation(loaded[0] || null);
  }, []);

  const saveToLocalStorage = (newLocs: StoreLocation[]) => {
    localStorage.setItem('aarihant_showrooms', JSON.stringify(newLocs));
  };

  // Add Showroom Handler
  const handleAddShowroom = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!newName.trim() || !newAddress.trim() || !newPhone.trim()) {
      setFormError('Shop Name, Physical Address, and Phone Number are required.');
      return;
    }

    const parsedLat = parseFloat(newLat);
    const parsedLng = parseFloat(newLng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      setFormError('Please enter valid numerical coordinate values for Latitude & Longitude.');
      return;
    }

    const uniqueId = `shop-${Date.now()}`;
    const newShop: StoreLocation = {
      id: uniqueId,
      name: newName.trim(),
      address: newAddress.trim(),
      phone: newPhone.trim(),
      hours: newHours.trim() || 'Mon-Sat: 10:30 AM - 8:30 PM',
      email: newEmail.trim() || 'info@aarihant.com',
      coordinates: { x: newCoordinateX, y: newCoordinateY },
      lat: parsedLat,
      lng: parsedLng
    };

    const updatedLocations = [...locations, newShop];
    setLocations(updatedLocations);
    saveToLocalStorage(updatedLocations);
    setSelectedLocation(newShop);

    // Reset Form Fields
    setNewName('');
    setNewAddress('');
    setNewPhone('');
    setNewHours('Mon-Sat: 10:30 AM - 8:30 PM');
    setNewEmail('');
    setNewLat('25.451500');
    setNewLng('81.836200');
    setNewCoordinateX(Math.floor(Math.random() * 60) + 20);
    setNewCoordinateY(Math.floor(Math.random() * 60) + 20);

    setFormSuccess('Showroom branch added successfully to the interactive registry!');
    setTimeout(() => setFormSuccess(''), 4000);
  };

  // Showrooms are persistent and cannot be deleted by standard users.

  // Fallback map click coordinate helper
  const handleFallbackMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdminOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    
    // Bounds boundary checks
    const boundedX = Math.max(5, Math.min(95, x));
    const boundedY = Math.max(5, Math.min(95, y));
    
    setNewCoordinateX(boundedX);
    setNewCoordinateY(boundedY);

    // Approximate mapping Prayagraj latitude/longitude relative bounds
    const approxLat = 25.4560 - (boundedY / 100) * 0.012;
    const approxLng = 81.8280 + (boundedX / 100) * 0.018;
    setNewLat(approxLat.toFixed(6));
    setNewLng(approxLng.toFixed(6));
  };

  // Google Map Click Listener to easily configure new shops
  const handleGoogleMapClick = (e: any) => {
    if (!isAdminOpen || !e.detail.latLng) return;
    const { lat, lng } = e.detail.latLng;
    setNewLat(lat.toFixed(6));
    setNewLng(lng.toFixed(6));
  };

  return (
    <section className="py-20 bg-[#060e20] scroll-mt-24" id="support">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Location Selectors */}
          <div className="space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-[#00dbe7] uppercase tracking-[0.2em] mb-3 block">
                  Official Retail Ecosystem
                </span>
                <h2 className="font-display-lg text-[32px] sm:text-[40px] text-white font-extrabold mb-4 tracking-tight">
                  Our Showrooms
                </h2>
              </div>

              {/* Toggle Showrooms admin */}
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isAdminOpen 
                    ? 'bg-[#00f2ff] text-[#00164e] shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                    : 'bg-[#171f33] border border-[#3a494b]/50 text-[#b9cacb] hover:text-white hover:border-[#00dbe7]/50'
                }`}
              >
                <Settings className={`w-4 h-4 ${isAdminOpen ? 'animate-spin' : ''}`} />
                {isAdminOpen ? 'Close Settings' : 'Manage Showrooms'}
              </button>
            </div>

            <p className="text-[#b9cacb]/80 font-light text-sm sm:text-base leading-relaxed">
              Step into our fully integrated computing showrooms. Select your high performance gaming hardware, standard office units, or diagnostic devices with direct corporate pricing, localized warranty backup, and immediate support.
            </p>

            {/* Admin Management Section Panel */}
            {isAdminOpen && (
              <div className="glass-panel p-6 rounded-2xl border border-[#00dbe7]/40 bg-[#131b2e]/90 shadow-[0_0_25px_rgba(0,242,255,0.05)] space-y-6 animate-in slide-in-from-top-4 duration-300">
                <div className="flex justify-between items-center border-b border-[#3a494b]/30 pb-3">
                  <span className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00f2ff]" />
                    Register New Showroom Branch
                  </span>
                  <button onClick={() => setIsAdminOpen(false)} className="text-[#b9cacb] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddShowroom} className="space-y-4">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 text-xs text-red-400 font-medium">
                      ⚠️ {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="bg-[#00f2ff]/10 border border-[#00dbe7]/40 rounded-xl px-4 py-2 text-xs text-[#00f2ff] font-medium">
                      ✓ {formSuccess}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Showroom Name *
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        maxLength={50}
                        placeholder="e.g. Asus Pride Cell - Katra"
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white placeholder-[#b9cacb]/30 focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Phone Contact *
                      </label>
                      <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        maxLength={25}
                        placeholder="e.g. +91 94500 12345"
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white placeholder-[#b9cacb]/30 focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                      Full Physical Address *
                    </label>
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      maxLength={120}
                      placeholder="e.g. Shop 45, Indira Bhawan, Civil Lines, Prayagraj, UP 211001"
                      className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white placeholder-[#b9cacb]/30 focus:outline-none focus:border-[#00dbe7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        value={newHours}
                        onChange={(e) => setNewHours(e.target.value)}
                        maxLength={50}
                        placeholder="e.g. Mon-Sat: 10:30 AM - 8:30 PM"
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Official Store Email
                      </label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        maxLength={80}
                        placeholder="e.g. sales@computercastle.co.in"
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white placeholder-[#b9cacb]/30 focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Map Latitude
                      </label>
                      <input
                        type="text"
                        value={newLat}
                        onChange={(e) => setNewLat(e.target.value)}
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#b9cacb] uppercase mb-1">
                        Map Longitude
                      </label>
                      <input
                        type="text"
                        value={newLng}
                        onChange={(e) => setNewLng(e.target.value)}
                        className="w-full bg-[#060e20] border border-[#3a494b]/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#00dbe7]"
                      />
                    </div>
                  </div>

                  <div className="bg-[#060e20] border border-[#3a494b]/30 rounded-xl p-3 text-xs text-[#b9cacb] space-y-1">
                    <span className="text-white font-mono font-bold block mb-0.5">Map Location Configuration guidance:</span>
                    <p className="leading-relaxed">
                      💡 {hasValidKey ? 'Click directly anywhere on the live Google Map on the right' : 'Click on the mock blueprint grid on the right'} to capture and pre-fill perfect geographical coordinates automatically!
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00f2ff] text-[#00164e] py-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] hover:bg-white transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Save Showroom Location
                  </button>
                </form>
              </div>
            )}

            {/* Location Cards lists */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {locations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`glass-panel p-5 rounded-2xl flex gap-5 transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'border-[#00dbe7] bg-[#171f33]/90 shadow-[0_0_20px_rgba(0,242,255,0.06)]'
                        : 'border-[#849495]/15 hover:border-[#849495]/40 hover:bg-[#131b2e]/60'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid card selection trigger
                        const destination = loc.lat && loc.lng ? `${loc.lat},${loc.lng}` : encodeURIComponent(loc.address);
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank', 'noopener,noreferrer');
                      }}
                      title="Get directions on Google Maps"
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative group ${
                        isSelected 
                          ? 'bg-[#00f2ff]/20 text-[#00f2ff] hover:bg-[#00f2ff]/30 shadow-[0_0_15px_rgba(0,242,255,0.35)] border border-[#00f2ff]/30' 
                          : 'bg-[#222a3d]/50 text-[#b9cacb] hover:text-[#00f2ff] hover:bg-[#00f2ff]/10 border border-[#849495]/10 hover:border-[#00f2ff]/30'
                      }`}
                    >
                      <MapPin className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-12" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-white text-sm sm:text-base font-bold mb-1 truncate">{loc.name}</h3>
                      </div>
                      <p className="text-[#b9cacb]/90 text-xs mb-2 font-light leading-relaxed">{loc.address}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-mono font-medium text-[#b9cacb]/70">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#00dbe7]" />
                          {loc.hours}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#00dbe7]" />
                          {loc.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {locations.length === 0 && (
                <div className="text-center py-10 border border-dashed border-[#3a494b]/30 rounded-xl">
                  <p className="text-xs text-[#b9cacb]/50">No locations listed. Create one above!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Real Interactive Google Map or Elegant Installation Setup Screen */}
          <div>
            <div className="glass-panel p-6 rounded-2xl border border-[#849495]/15 shadow-xl relative overflow-hidden flex flex-col justify-between">
              
              <div className="mb-4">
                <span className="text-[10px] font-mono font-bold text-[#b9cacb]/50 uppercase tracking-widest block mb-1">
                  Active Display Position
                </span>
                <h3 className="text-white font-bold flex items-center gap-2 text-sm sm:text-base">
                  <Landmark className="w-5 h-5 text-[#00dbe7]" />
                  {selectedLocation ? selectedLocation.name : 'No showrooms selected'}
                </h3>
              </div>

              {/* MAP BODY */}
              <div className="h-[380px] bg-[#060e20] rounded-xl relative border border-[#3a494b]/60 overflow-hidden relative select-none">
                
                {hasValidKey ? (
                  /* --- REAL INTERACTIVE GOOGLE MAPS BLOCK --- */
                  <APIProvider apiKey={API_KEY} version="weekly">
                    <Map
                      defaultCenter={selectedLocation && selectedLocation.lat ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : { lat: 25.4515, lng: 81.8362 }}
                      defaultZoom={14}
                      mapId="AARIHANT_STORES_MAP_ID"
                      onClick={handleGoogleMapClick}
                      gestureHandling="cooperative"
                      disableDefaultUI={false}
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      style={{ width: '100%', height: '100%' }}
                    >
                      {/* Place markers for each store location */}
                      {locations.map((loc) => {
                        const isSelected = selectedLocation && loc.id === selectedLocation.id;
                        if (typeof loc.lat === 'undefined' || typeof loc.lng === 'undefined') return null;
                        
                        return (
                          <AdvancedMarker 
                            key={loc.id} 
                            position={{ lat: loc.lat, lng: loc.lng }}
                            onClick={() => setSelectedLocation(loc)}
                          >
                            <Pin 
                              background={isSelected ? "#00f2ff" : "#1e40af"} 
                              borderColor="#ffffff" 
                              glyphColor="#ffffff" 
                            />
                          </AdvancedMarker>
                        );
                      })}

                      {/* Live feedback of clicks for admin coordinate placement */}
                      {isAdminOpen && (
                        <AdvancedMarker position={{ lat: parseFloat(newLat), lng: parseFloat(newLng) }}>
                          <Pin background="#ea580c" borderColor="#fff" glyphColor="#fff" scale={1.2} />
                        </AdvancedMarker>
                      )}

                      {/* Smooth Center-Panning logic component */}
                      <MapCameraControl selectedLocation={selectedLocation} />
                    </Map>
                  </APIProvider>
                ) : (
                  /* --- HIGH FIDELITY RETRO BLUEPRINT FALLBACK (WITH INTEGRATION GUIDE) --- */
                  <div 
                    onClick={handleFallbackMapClick}
                    className={`absolute inset-0 w-full h-full relative overflow-hidden flex flex-col justify-between ${
                      isAdminOpen ? 'cursor-crosshair border-2 border-dashed border-[#00f2ff]/60' : 'pointer-events-none'
                    }`}
                  >
                    {/* Simulated Geographic Grid Blueprint */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,105,111,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,105,111,0.06)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
                    
                    {/* Abstract vector road routes drawings to simulate map topology */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M-50,150 Q150,50 500,200 T1050,100" fill="none" stroke="#849495" strokeWidth="4" />
                      <path d="M150,-50 L250,500" fill="none" stroke="#849495" strokeWidth="2" />
                      <path d="M350,-50 L100,500" fill="none" stroke="#849495" strokeWidth="2" strokeDasharray="5,5" />
                      <circle cx="50%" cy="50%" r="120" fill="none" stroke="#00dbe7" strokeWidth="1" strokeDasharray="4,8" />
                    </svg>

                    {/* Simulated Glow Points for Locations */}
                    {locations.map((loc) => {
                      const isSelected = selectedLocation && loc.id === selectedLocation.id;
                      return (
                        <div
                          key={loc.id}
                          className="absolute duration-500 transition-all pointer-events-auto cursor-pointer"
                          style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLocation(loc);
                          }}
                        >
                          {/* Outermost pulsing circle */}
                          <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
                            isSelected 
                              ? 'w-12 h-12 bg-[#00f2ff]/20 border border-[#00dbe7]/50 animate-ping'
                              : 'w-6 h-6 bg-[#013fb9]/15 border border-[#013fb9]/30'
                          }`}></div>
                          
                          {/* Pin Central node */}
                          <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.8)]' : 'bg-[#013fb9]'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>

                          {/* Tooltip Label indicating Store Position */}
                          <div className={`absolute left-4 -translate-y-1/2 bg-[#171f33] border border-[#3a494b] text-[10px] font-mono font-bold text-white px-2.5 py-1 rounded transition-opacity duration-300 shadow-lg whitespace-nowrap ${
                            isSelected ? 'opacity-100' : 'opacity-40'
                          }`}>
                            {loc.name.split('-')[1]?.trim() || loc.name.split(' ')[2] || 'Store'}
                          </div>
                        </div>
                      );
                    })}

                    {/* Placing Marker Outline Preview */}
                    {isAdminOpen && (
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-[#00f2ff] bg-[#00f2ff]/10 flex items-center justify-center animate-pulse pointer-events-none"
                        style={{ left: `${newCoordinateX}%`, top: `${newCoordinateY}%` }}
                      >
                        <MapPin className="w-4 h-4 text-[#00f2ff]" />
                      </div>
                    )}

                    {/* Integrated dynamic instructions context overlay */}
                    <div className="absolute inset-x-4 top-12 bottom-12 bg-[#061022]/95 border border-[#1e2e4a]/60 rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center text-center pointer-events-auto shadow-2xl">
                      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 text-[#00dbe7]">
                        <Settings className="w-5 h-5 animate-pulse" />
                      </div>
                      <h3 className="text-white text-xs sm:text-sm font-bold tracking-tight mb-2">
                        Interactive Google Maps Setup Requested
                      </h3>
                      <p className="text-[11px] text-[#b9cacb]/85 max-w-[340px] leading-relaxed mb-3">
                        A real Google Map requires your private API key to display the coordinates on-site in beautiful satellite views.
                      </p>
                      
                      <div className="text-[10px] text-[rgba(255,255,255,0.7)] text-left bg-black/35 rounded-lg p-2.5 max-w-[340px] font-mono leading-relaxed border border-white/5 space-y-1.5">
                        <span className="text-[#00f2ff] font-bold block mb-1 border-b border-white/10 pb-1">🔧 CONFIGURE SECRETS PIN:</span>
                        <p>1. Open <strong className="text-white font-semibold">Settings</strong> (⚙️ top-right gear icon)</p>
                        <p>2. Select <strong className="text-white font-semibold">Secrets</strong></p>
                        <p>3. Create <code className="bg-white/10 px-1 py-0.5 rounded text-white text-[9px] font-bold">GOOGLE_MAPS_PLATFORM_KEY</code></p>
                        <p>4. Input your Google Maps API Key & save</p>
                      </div>
                    </div>

                    {/* Tech Metadata footer on simulated UI map */}
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between font-mono text-[9px] text-[#b9cacb]/40">
                      <span>BLUEPRINT VECTOR GRID GRAPH</span>
                      <span>MAPPED VIA PRESETS</span>
                    </div>

                  </div>
                )}

              </div>

              {/* Informative Help Text if in admin mode */}
              {isAdminOpen && (
                <p className="text-[10px] text-center font-mono text-[#00f2ff] mt-2 animate-pulse">
                  🎯 Click directly on the map to define the exact pin target position.
                </p>
              )}

              {/* Real Phone & Email active touchpoints */}
              {selectedLocation && (
                <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-mono text-[#b9cacb]/80 text-center">
                  <a
                    href={`tel:${selectedLocation.phone.replace(/[^0-9+]/g, '')}`}
                    className="bg-surface-container-high/30 py-3 rounded-lg border border-[#3a494b]/30 hover:border-[#00dbe7]/50 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#00dbe7]" />
                    Call Branch
                  </a>
                  <a
                    href={`mailto:${selectedLocation.email}`}
                    className="bg-surface-container-high/30 py-3 rounded-lg border border-[#3a494b]/30 hover:border-[#00dbe7]/50 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#00dbe7]" />
                    Email Branch
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
