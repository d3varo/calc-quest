import React from 'react';
import { IllustrationType } from '../types/game';

interface Props {
  type: IllustrationType;
}

export const HandDrawnIllustration: React.FC<Props> = ({ type }) => {
  if (type === 'limit_rocket') {
    return (
      <div className="w-full bg-amber-50/50 rounded-2xl border-2 border-dashed border-amber-300 p-4 sm:p-5 my-3 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Sketsa Konsep: Kecepatan Sesaat via Limit
          </span>
          <span className="text-[11px] font-mono text-amber-700 bg-amber-150 px-2 py-0.5 rounded border border-amber-300">
            Δt ⟶ 0
          </span>
        </div>

        {/* Hand-drawn SVG visual for Rocket and Limit */}
        <div className="w-full flex justify-center">
          <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto select-none" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}>
            {/* Soft grid lines */}
            <defs>
              <pattern id="grid-rocket" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="540" height="220" fill="url(#grid-rocket)" rx="8" />

            {/* Axes */}
            <path d="M 50 185 L 500 185" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
            <path d="M 50 185 L 50 30" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
            <text x="505" y="190" fill="#78350f" fontSize="12" fontWeight="700" fontFamily="sans-serif">Waktu t (detik)</text>
            <text x="35" y="24" fill="#78350f" fontSize="12" fontWeight="700" fontFamily="sans-serif">Ketinggian s(t)</text>

            {/* Parabolic Position Curve s(t) = 5t^2 + 10t */}
            <path
              d="M 50 185 Q 180 150 280 100 T 460 35"
              fill="none"
              stroke="#d97706"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="320" y="55" fill="#b45309" fontSize="11" fontWeight="600" fontStyle="italic">
              s(t) = 5t² + 10t
            </text>

            {/* Secant lines collapsing to tangent */}
            {/* Secant (dashed light) */}
            <line x1="160" y1="155" x2="330" y2="78" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
            <text x="335" y="82" fill="#d97706" fontSize="10">t + Δt</text>

            {/* Point at t = 2 */}
            <circle cx="210" cy="132" r="5" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <line x1="210" y1="132" x2="210" y2="185" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="195" y="200" fill="#78350f" fontSize="11" fontWeight="700">t = 2s</text>

            {/* Tangent line at t = 2 (slope = v(2) = 30) */}
            <line x1="130" y1="180" x2="310" y2="70" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Slope triangle */}
            <path d="M 210 132 L 270 132 L 270 95" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="278" y="118" fill="#0369a1" fontSize="10" fontWeight="700">Δs</text>
            <text x="235" y="145" fill="#0369a1" fontSize="10" fontWeight="700">Δt ⟶ 0</text>

            {/* Instantaneous velocity label */}
            <rect x="230" y="25" width="165" height="30" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="240" y="45" fill="#92400e" fontSize="11" fontWeight="700">
              v(2) = lim Δs/Δt = 30 m/s
            </text>

            {/* Hand-drawn Rocket Sketch (Flying upward right) */}
            <g transform="translate(420, 30) rotate(35)">
              {/* Rocket body */}
              <path d="M 0 0 C 10 -25, 20 -25, 30 0 L 25 35 L 5 35 Z" fill="#ffffff" stroke="#78350f" strokeWidth="2" strokeLinejoin="round" />
              {/* Nose cone tip */}
              <path d="M 5 -10 C 12 -25, 18 -25, 25 -10 Z" fill="#ef4444" stroke="#78350f" strokeWidth="1.5" />
              {/* Window */}
              <circle cx="15" cy="10" r="4.5" fill="#38bdf8" stroke="#78350f" strokeWidth="1.5" />
              {/* Fins */}
              <path d="M 5 25 L -5 38 L 5 35 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 25 25 L 35 38 L 25 35 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
              {/* Flame thrust */}
              <path d="M 8 36 Q 15 50 22 36 Q 15 44 8 36 Z" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
            </g>
          </svg>
        </div>
        <p className="text-xs text-amber-900 mt-1 font-medium text-center">
          Garis singgung (tangent) pada t = 2 merepresentasikan kecepatan sesaat tepat saat interval waktu Δt mendekati 0.
        </p>
      </div>
    );
  }

  if (type === 'turunan_racecar') {
    return (
      <div className="w-full bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-300 p-4 sm:p-5 my-3 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            Sketsa Konsep: Laju Perubahan Kecepatan (Turunan / dv/dt)
          </span>
          <span className="text-[11px] font-mono text-indigo-700 bg-indigo-150 px-2 py-0.5 rounded border border-indigo-300">
            a(t) = v'(t)
          </span>
        </div>

        {/* Hand-drawn SVG visual for Racecar and Derivative */}
        <div className="w-full flex justify-center">
          <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto select-none" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}>
            {/* Grid */}
            <defs>
              <pattern id="grid-car" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="540" height="220" fill="url(#grid-car)" rx="8" />

            {/* Axes */}
            <path d="M 50 185 L 500 185" stroke="#312e81" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
            <path d="M 50 185 L 50 30" stroke="#312e81" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
            <text x="495" y="190" fill="#312e81" fontSize="12" fontWeight="700" fontFamily="sans-serif">Waktu t (detik)</text>
            <text x="35" y="24" fill="#312e81" fontSize="12" fontWeight="700" fontFamily="sans-serif">Kecepatan v(t) (m/s)</text>

            {/* Curve v(t) = 3t^2 - 4t + 10 */}
            <path
              d="M 50 165 Q 120 170 200 145 T 460 30"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="270" y="50" fill="#4338ca" fontSize="11" fontWeight="600" fontStyle="italic">
              v(t) = 3t² - 4t + 10
            </text>

            {/* Point at t = 4 */}
            <circle cx="340" cy="98" r="5" fill="#4338ca" stroke="#312e81" strokeWidth="2" />
            <line x1="340" y1="98" x2="340" y2="185" stroke="#4338ca" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="325" y="200" fill="#312e81" fontSize="11" fontWeight="700">t = 4 detik</text>

            {/* Tangent line at t = 4 showing steep slope (a = 20) */}
            <line x1="260" y1="165" x2="420" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

            {/* Rate of change triangle: dv / dt */}
            <path d="M 340 98 L 400 98 L 400 48" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
            <text x="408" y="75" fill="#b91c1c" fontSize="10" fontWeight="700">Δv</text>
            <text x="360" y="112" fill="#b91c1c" fontSize="10" fontWeight="700">Δt</text>

            {/* Result callout */}
            <rect x="180" y="20" width="170" height="32" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
            <text x="190" y="41" fill="#312e81" fontSize="11" fontWeight="700">
              Laju dv/dt = a(4) = 20 m/s²
            </text>

            {/* Hand-drawn Racecar Sketch */}
            <g transform="translate(65, 120)">
              {/* Car body */}
              <path d="M 0 25 C 10 18, 25 15, 45 15 L 75 15 C 90 15, 105 20, 115 25 L 115 32 L 0 32 Z" fill="#ffffff" stroke="#312e81" strokeWidth="2" strokeLinejoin="round" />
              {/* Cabin/Cockpit */}
              <path d="M 35 15 L 48 5 L 72 5 L 82 15 Z" fill="#38bdf8" stroke="#312e81" strokeWidth="1.5" />
              {/* Wheels */}
              <circle cx="25" cy="32" r="8" fill="#334155" stroke="#312e81" strokeWidth="2" />
              <circle cx="25" cy="32" r="3" fill="#cbd5e1" />
              <circle cx="95" cy="32" r="8" fill="#334155" stroke="#312e81" strokeWidth="2" />
              <circle cx="95" cy="32" r="3" fill="#cbd5e1" />
              {/* Rear spoiler */}
              <path d="M 2 15 L -4 6 L 14 6 L 8 15 Z" fill="#ef4444" stroke="#312e81" strokeWidth="1.5" />
              {/* Speed motion lines */}
              <line x1="-15" y1="20" x2="-6" y2="20" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-22" y1="26" x2="-8" y2="26" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <p className="text-xs text-indigo-950 mt-1 font-medium text-center">
          Gradien kemiringan garis singgung kurva v(t) adalah laju perubahan kecepatan terhadap waktu, yang merupakan percepatan mobil balap!
        </p>
      </div>
    );
  }

  // type === 'integral_drone'
  return (
    <div className="w-full bg-emerald-50/50 rounded-2xl border-2 border-dashed border-emerald-300 p-4 sm:p-5 my-3 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Sketsa Konsep: Akumulasi Luas di Bawah Kurva (Integral)
        </span>
        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-150 px-2 py-0.5 rounded border border-emerald-300">
          s = ∫ v(t) dt
        </span>
      </div>

      {/* Hand-drawn SVG visual for Drone and Integral Area Accumulation */}
      <div className="w-full flex justify-center">
        <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto select-none" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}>
          {/* Grid */}
          <defs>
            <pattern id="grid-drone" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.15" />
            </pattern>
            {/* Hand-drawn hatched shading for accumulated area */}
            <pattern id="hatch-area" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#059669" strokeWidth="1.8" opacity="0.45" />
            </pattern>
          </defs>
          <rect width="540" height="220" fill="url(#grid-drone)" rx="8" />

          {/* Axes */}
          <path d="M 60 185 L 500 185" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
          <path d="M 60 185 L 60 30" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" strokeDasharray="1,1" />
          <text x="495" y="190" fill="#064e3b" fontSize="12" fontWeight="700" fontFamily="sans-serif">Waktu t (s)</text>
          <text x="45" y="24" fill="#064e3b" fontSize="12" fontWeight="700" fontFamily="sans-serif">v(t) (m/s)</text>

          {/* Shaded Area under v(t) = 6t + 2 from t = 0 to t = 5 */}
          {/* t = 0: v(0) = 2 (mapped to y=175) */}
          {/* t = 5: v(5) = 32 (mapped to x=380, y=55) */}
          <path
            d="M 60 185 L 60 175 L 380 55 L 380 185 Z"
            fill="url(#hatch-area)"
          />
          <path
            d="M 60 185 L 60 175 L 380 55 L 380 185 Z"
            fill="#a7f3d0"
            fillOpacity="0.25"
          />

          {/* Curve v(t) = 6t + 2 */}
          <line x1="60" y1="175" x2="430" y2="35" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
          <text x="210" y="100" fill="#047857" fontSize="12" fontWeight="700" fontStyle="italic">
            v(t) = 6t + 2
          </text>

          {/* Boundary markers */}
          <line x1="60" y1="175" x2="60" y2="185" stroke="#064e3b" strokeWidth="2" />
          <text x="52" y="200" fill="#064e3b" fontSize="11" fontWeight="700">t = 0</text>

          <line x1="380" y1="55" x2="380" y2="185" stroke="#064e3b" strokeWidth="2" strokeDasharray="3,3" />
          <text x="368" y="200" fill="#064e3b" fontSize="11" fontWeight="700">t = 5</text>

          {/* Area label callout */}
          <g transform="translate(140, 125)">
            <rect x="0" y="0" width="165" height="40" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            <text x="12" y="16" fill="#065f46" fontSize="10" fontWeight="700">Luas Diarsir = Akumulasi Jarak</text>
            <text x="12" y="32" fill="#047857" fontSize="12" fontWeight="800">s = ∫₀⁵ (6t+2)dt = 85 meter</text>
          </g>

          {/* Hand-drawn Drone Expedition Sketch */}
          <g transform="translate(410, 45)">
            {/* Central drone body */}
            <circle cx="20" cy="20" r="10" fill="#ffffff" stroke="#064e3b" strokeWidth="2" />
            <circle cx="20" cy="20" r="4" fill="#10b981" />
            {/* 4 Rotor Arms */}
            <line x1="13" y1="13" x2="-2" y2="-2" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="27" y1="13" x2="42" y2="-2" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="13" y1="27" x2="-2" y2="42" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="27" y1="27" x2="42" y2="42" stroke="#064e3b" strokeWidth="2.5" strokeLinecap="round" />
            {/* Propeller Blades (spinning ellipses) */}
            <ellipse cx="-2" cy="-2" rx="10" ry="2.5" fill="none" stroke="#059669" strokeWidth="1.5" transform="rotate(-30 -2 -2)" />
            <ellipse cx="42" cy="-2" rx="10" ry="2.5" fill="none" stroke="#059669" strokeWidth="1.5" transform="rotate(30 42 -2)" />
            <ellipse cx="-2" cy="42" rx="10" ry="2.5" fill="none" stroke="#059669" strokeWidth="1.5" transform="rotate(30 -2 42)" />
            <ellipse cx="42" cy="42" rx="10" ry="2.5" fill="none" stroke="#059669" strokeWidth="1.5" transform="rotate(-30 42 42)" />
          </g>
        </svg>
      </div>
      <p className="text-xs text-emerald-950 mt-1 font-medium text-center">
        Setiap potongan kecil kecepatan dikalikan waktu (v · dt) dijumlahkan secara kontinu oleh integral membentuk total jarak 85 meter!
      </p>
    </div>
  );
};
