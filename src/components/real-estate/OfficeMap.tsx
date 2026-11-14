/** Stylised, fictional street map of Wealdbury with the office marked. */
export function OfficeMap({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 480 340"
      className={className}
      role="img"
      aria-label="Stylised map of fictional Wealdbury. The office is on Corn Exchange Street, just north of Market Square, between the river and the station.">
      <rect width="480" height="340" fill="var(--ashgrove-map-land)" />
      {/* River and estuary */}
      <path
        d="M-10,300 C80,270 120,300 190,262 S300,200 340,214 S440,250 500,226 V350 H-10 Z"
        fill="var(--ashgrove-map-water)"
      />
      <path d="M190,262 C210,230 196,190 214,150 S250,80 236,-10" fill="none" stroke="var(--ashgrove-map-water)" strokeWidth="10" />
      {/* Parks */}
      <path d="M30,40 h110 v70 h-110 z" fill="var(--ashgrove-map-park)" rx="6" />
      <circle cx="390" cy="96" r="46" fill="var(--ashgrove-map-park)" />
      {/* Blocks */}
      <g fill="var(--ashgrove-map-block)">
        <rect x="160" y="40" width="50" height="60" />
        <rect x="250" y="40" width="70" height="50" />
        <rect x="250" y="110" width="40" height="40" />
        <rect x="320" y="160" width="60" height="40" />
        <rect x="40" y="140" width="80" height="50" />
        <rect x="40" y="210" width="60" height="40" />
        <rect x="130" y="200" width="50" height="40" />
        <rect x="250" y="170" width="50" height="30" />
        <rect x="400" y="170" width="60" height="40" />
      </g>
      {/* Roads */}
      <g stroke="var(--ashgrove-map-road)" strokeLinecap="round" fill="none">
        <path d="M0,125 H480" strokeWidth="12" />
        <path d="M230,0 V340" strokeWidth="9" />
        <path d="M140,125 L150,330" strokeWidth="7" />
        <path d="M300,125 C320,150 360,150 380,140 S440,140 480,150" strokeWidth="7" />
        <path d="M20,200 H230" strokeWidth="6" />
        <path d="M230,160 H470" strokeWidth="6" />
      </g>
      {/* Railway */}
      <path d="M0,20 C140,30 300,10 480,30" fill="none" stroke="var(--ashgrove-slate)" strokeWidth="3" />
      <path d="M0,20 C140,30 300,10 480,30" fill="none" stroke="var(--ashgrove-map-land)" strokeWidth="1.5" strokeDasharray="6 6" />
      <rect x="340" y="10" width="44" height="16" rx="2" fill="var(--ashgrove-ink)" />
      <text x="362" y="22" textAnchor="middle" fontSize="10" fill="var(--ashgrove-paper)" fontFamily="var(--font-family-body)">
        Station
      </text>
      {/* Market Square */}
      <rect x="196" y="140" width="68" height="44" fill="var(--ashgrove-stone-deep)" stroke="var(--ashgrove-line)" strokeWidth="1" />
      <g fontFamily="var(--font-family-body)" fill="var(--ashgrove-ink)" fontSize="11">
        <text x="230" y="166" textAnchor="middle">Market Sq.</text>
        <text x="85" y="80" textAnchor="middle">Water meadows</text>
        <text x="390" y="100" textAnchor="middle">The Green</text>
        <text x="70" y="318">The Saltings</text>
        <text x="330" y="290">Estuary</text>
        <text x="20" y="118">Corn Exchange St</text>
      </g>
      {/* Office pin */}
      <g transform="translate(250 112)">
        <circle r="22" fill="var(--ashgrove-terracotta)" opacity="0.18" />
        <path d="M0,10 C-10,-2 -12,-6 -12,-12 a12,12 0 0 1 24,0 c0,6 -2,10 -12,22 Z" transform="translate(0 -10)" fill="var(--ashgrove-terracotta)" stroke="var(--ashgrove-paper)" strokeWidth="2" />
        <circle cx="0" cy="-22" r="4" fill="var(--ashgrove-paper)" />
      </g>
      <g transform="translate(446 300)" fontFamily="var(--font-family-body)">
        <path d="M0,-18 L6,0 L0,-4 L-6,0 Z" fill="var(--ashgrove-ink)" />
        <text y="14" textAnchor="middle" fontSize="11" fill="var(--ashgrove-ink)">N</text>
      </g>
    </svg>
  );
}
