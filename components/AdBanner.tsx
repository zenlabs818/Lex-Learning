
import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

const AdBanner: React.FC<AdBannerProps> = ({ slot, format = 'auto' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense push failed - this is expected in development without a real key:", e);
    }
  }, []);

  return (
    <div className="ad-container my-6 mx-5 rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
      <div className="absolute top-2 left-4 flex items-center space-x-1 opacity-40">
        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
        <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Partner Content</span>
      </div>
      
      {/* Real AdSense Placement */}
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', minHeight: '100px' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // REPLACE THIS with your real AdSense ID
           data-ad-slot={slot}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
      
      {/* Dev/Fallback visual - remove in production if desired, though AdSense typically fills this area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-200 pointer-events-none group-hover:text-slate-300 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-1"><rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"/></svg>
        <span className="text-[8px] font-black uppercase tracking-tighter">Academic Ad Network</span>
      </div>
    </div>
  );
};

export default AdBanner;
