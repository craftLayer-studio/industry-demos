/**
 * Original SVG illustrations for the Keystone Build Co. demo, drawn in the
 * style of architectural section drawings: cut walls in solid black, earth
 * hatching, grid markers and dimension lines. All decorative (aria-hidden).
 */

const INK = 'var(--ks-black)';
const PAPER = '#FFFFFF';
const YELLOW = 'var(--ks-yellow)';
const YELLOW_DEEP = 'var(--ks-yellow-deep)';
const CONCRETE = 'var(--ks-concrete-deep)';
const BRICK = 'var(--ks-brick)';
const TIMBER = 'var(--ks-timber)';
const SKY = 'var(--ks-sky)';

function Hatch({id, color = INK, gap = 8}: {id: string; color?: string; gap?: number}) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2={gap} stroke={color} strokeWidth="1.6" />
    </pattern>
  );
}

function Hazard({id}: {id: string}) {
  return (
    <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="16" height="16" fill={YELLOW} />
      <rect width="8" height="16" fill={INK} />
    </pattern>
  );
}

function Label({x, y, children, anchor = 'start'}: {x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end'}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-family-code)"
      fontSize="10"
      fontWeight="600"
      letterSpacing="1"
      fill={INK}>
      {children}
    </text>
  );
}

/** Hero: a full house section with a loft dormer, rear extension and scaffold. */
export function HeroSection({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 600 470" className={className} aria-hidden="true" focusable="false">
      <defs>
        <Hatch id="hs-earth" />
        <Hatch id="hs-brick" color={BRICK} gap={6} />
        <Hazard id="hs-hazard" />
      </defs>

      {/* grid markers */}
      {[
        [150, 'A'],
        [380, 'B'],
        [520, 'C'],
      ].map(([x, l]) => (
        <g key={l as string}>
          <line x1={x as number} y1="30" x2={x as number} y2="372" stroke={INK} strokeWidth="1" strokeDasharray="2 5" />
          <circle cx={x as number} cy="20" r="11" fill={PAPER} stroke={INK} strokeWidth="2" />
          <Label x={x as number} y={24} anchor="middle">
            {l as string}
          </Label>
        </g>
      ))}

      {/* sky panes behind glazing */}
      <rect x="456" y="300" width="50" height="66" fill={SKY} />

      {/* rooms */}
      <rect x="150" y="262" width="230" height="110" fill={PAPER} />
      <rect x="150" y="158" width="230" height="100" fill={PAPER} />
      <polygon points="150,154 265,66 380,154" fill={PAPER} />
      {/* new extension, highlighted */}
      <rect x="380" y="290" width="140" height="82" fill="var(--ks-yellow-soft)" />

      {/* ground and earth */}
      <rect x="0" y="372" width="600" height="98" fill="url(#hs-earth)" opacity="0.5" />
      <rect x="0" y="370" width="600" height="6" fill={INK} />

      {/* foundations */}
      {[144, 374, 514].map(x => (
        <rect key={x} x={x - 6} y="376" width="24" height="44" fill={CONCRETE} stroke={INK} strokeWidth="2" />
      ))}

      {/* cut walls: brick hatch with black outline */}
      <rect x="140" y="150" width="12" height="222" fill="url(#hs-brick)" stroke={INK} strokeWidth="2.5" />
      <rect x="374" y="150" width="12" height="222" fill="url(#hs-brick)" stroke={INK} strokeWidth="2.5" />
      <rect x="514" y="286" width="12" height="86" fill="url(#hs-brick)" stroke={INK} strokeWidth="2.5" />

      {/* floor slabs */}
      <rect x="140" y="256" width="246" height="8" fill={INK} />
      <rect x="140" y="150" width="246" height="8" fill={INK} />
      <rect x="374" y="282" width="156" height="10" fill={INK} />

      {/* roof */}
      <polyline points="122,166 265,56 408,166" fill="none" stroke={INK} strokeWidth="9" strokeLinejoin="miter" />
      {/* dormer: cut through the rear roof slope */}
      <polygon points="306,92 372,92 372,140 352,142" fill={PAPER} />
      <rect x="300" y="88" width="76" height="7" fill={INK} />
      <rect x="364" y="88" width="9" height="16" fill={INK} />
      <rect x="364" y="104" width="9" height="20" fill={SKY} stroke={INK} strokeWidth="2" />
      <rect x="364" y="124" width="9" height="12" fill={INK} />
      {/* roof lantern */}
      <polygon points="430,282 440,264 480,264 490,282" fill={SKY} stroke={INK} strokeWidth="2.5" />

      {/* rear glazing */}
      <rect x="456" y="300" width="50" height="66" fill="none" stroke={INK} strokeWidth="2.5" />
      <line x1="481" y1="300" x2="481" y2="366" stroke={INK} strokeWidth="2" />

      {/* stairs */}
      <polyline
        points="190,372 190,358 204,358 204,344 218,344 218,330 232,330 232,316 246,316 246,302 260,302 260,288 274,288 274,274 288,274 288,262"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
      />
      <polyline
        points="250,256 250,244 262,244 262,232 274,232 274,220 286,220 286,208 298,208 298,196 310,196 310,184 322,184 322,172 334,172 334,158"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeDasharray="4 3"
      />

      {/* furniture silhouettes */}
      <rect x="166" y="226" width="56" height="12" fill={INK} />
      <rect x="166" y="214" width="12" height="24" fill={INK} />
      <rect x="186" y="134" width="40" height="8" fill={TIMBER} stroke={INK} strokeWidth="1.5" />
      <rect x="398" y="336" width="34" height="30" fill={TIMBER} stroke={INK} strokeWidth="2" />

      {/* labels */}
      <Label x={196} y={124}>
        LOFT
      </Label>
      <Label x={300} y={210}>
        BED 2
      </Label>
      <Label x={300} y={318}>
        LIVING
      </Label>
      <Label x={392} y={308}>
        NEW EXT.
      </Label>

      {/* dimension line over the extension */}
      <g stroke={INK} strokeWidth="1.5">
        <line x1="386" y1="246" x2="514" y2="246" />
        <line x1="386" y1="240" x2="386" y2="252" />
        <line x1="514" y1="240" x2="514" y2="252" />
      </g>
      <rect x="426" y="237" width="48" height="16" fill={YELLOW} />
      <Label x={450} y={249} anchor="middle">
        4.0 m
      </Label>

      {/* scaffold */}
      <g stroke={INK} strokeWidth="3">
        <line x1="70" y1="370" x2="70" y2="140" />
        <line x1="112" y1="370" x2="112" y2="140" />
        {[300, 230, 160].map(y => (
          <line key={y} x1="62" y1={y} x2="122" y2={y} />
        ))}
        <line x1="70" y1="370" x2="112" y2="300" strokeWidth="2" />
        <line x1="70" y1="300" x2="112" y2="230" strokeWidth="2" />
        <line x1="70" y1="230" x2="112" y2="160" strokeWidth="2" />
      </g>
      {[300, 230, 160].map(y => (
        <rect key={y} x="60" y={y - 7} width="64" height="6" fill={TIMBER} stroke={INK} strokeWidth="1.5" />
      ))}
      {/* hazard barrier */}
      <rect x="20" y="344" width="110" height="14" fill="url(#hs-hazard)" stroke={INK} strokeWidth="2" />
      <rect x="28" y="358" width="6" height="12" fill={INK} />
      <rect x="116" y="358" width="6" height="12" fill={INK} />
    </svg>
  );
}

export type ArtKind = 'extension' | 'loft' | 'kitchen' | 'renovation' | 'wrap' | 'dormer';

/** Smaller section drawings for service tabs and sample project cards. */
export function ServiceArt({kind, id, className}: {kind: ArtKind; id: string; className?: string}) {
  const hatch = `${id}-hatch`;
  const brick = `${id}-brick`;
  const hazard = `${id}-hazard`;
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true" focusable="false">
      <defs>
        <Hatch id={hatch} gap={7} />
        <Hatch id={brick} color={BRICK} gap={5} />
        <Hazard id={hazard} />
      </defs>
      <rect width="320" height="220" fill="var(--ks-concrete)" />
      <rect x="0" y="186" width="320" height="34" fill={`url(#${hatch})`} opacity="0.45" />
      <rect x="0" y="184" width="320" height="4" fill={INK} />
      {kind === 'kitchen' ? <KitchenScene hazard={hazard} /> : <HouseScene kind={kind} brick={brick} hazard={hazard} />}
    </svg>
  );
}

function HouseScene({kind, brick, hazard}: {kind: Exclude<ArtKind, 'kitchen'>; brick: string; hazard: string}) {
  const isExt = kind === 'extension' || kind === 'wrap';
  const isLoft = kind === 'loft' || kind === 'dormer';
  const isReno = kind === 'renovation';
  return (
    <g>
      {/* rooms */}
      <rect x="60" y="124" width="130" height="60" fill={PAPER} />
      <rect x="60" y="70" width="130" height="50" fill={PAPER} />
      <polygon points="60,68 125,22 190,68" fill={isLoft ? 'var(--ks-yellow-soft)' : PAPER} />

      {/* walls and slabs */}
      <rect x="54" y="66" width="8" height="118" fill={`url(#${brick})`} stroke={INK} strokeWidth="2" />
      <rect x="188" y="66" width="8" height="118" fill={`url(#${brick})`} stroke={INK} strokeWidth="2" />
      <rect x="54" y="118" width="142" height="6" fill={INK} />
      <rect x="54" y="66" width="142" height="6" fill={INK} />
      <polyline points="42,76 125,14 208,76" fill="none" stroke={INK} strokeWidth="6" />

      {kind === 'dormer' ? (
        <g>
          <polygon points="128,37 183,37 183,70 150,47" fill="var(--ks-yellow-soft)" />
          <rect x="128" y="34" width="58" height="5" fill={INK} />
          <rect x="181" y="34" width="6" height="36" fill={INK} />
          <rect x="164" y="44" width="12" height="18" fill={SKY} stroke={INK} strokeWidth="1.5" />
        </g>
      ) : null}
      {kind === 'loft' ? (
        <g>
          <rect x="88" y="40" width="22" height="7" fill={SKY} stroke={INK} strokeWidth="1.5" transform="rotate(-36 99 43)" />
          <rect x="142" y="40" width="22" height="7" fill={SKY} stroke={INK} strokeWidth="1.5" transform="rotate(36 153 43)" />
        </g>
      ) : null}
      {isLoft ? (
        <g>
          <rect x="80" y="56" width="30" height="7" fill={TIMBER} stroke={INK} strokeWidth="1.2" />
          <polyline points="150,118 150,110 158,110 158,102 166,102 166,94 174,94 174,86 182,86 182,72" fill="none" stroke={INK} strokeWidth="2" />
        </g>
      ) : null}

      {isExt ? (
        <g>
          <rect x="196" y="134" width={kind === 'wrap' ? 96 : 84} height="50" fill="var(--ks-yellow-soft)" />
          <rect x="192" y="128" width={kind === 'wrap' ? 106 : 94} height="7" fill={INK} />
          <rect x={kind === 'wrap' ? 290 : 278} y="128" width="7" height="56" fill={`url(#${brick})`} stroke={INK} strokeWidth="2" />
          <polygon points="222,128 228,116 250,116 256,128" fill={SKY} stroke={INK} strokeWidth="2" />
          <rect x="230" y="142" width="34" height="40" fill={SKY} stroke={INK} strokeWidth="2" />
          <line x1="247" y1="142" x2="247" y2="182" stroke={INK} strokeWidth="1.5" />
          {kind === 'wrap' ? (
            <line x1="196" y1="192" x2="292" y2="192" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
          ) : null}
        </g>
      ) : (
        <g>
          <rect x="216" y="150" width="12" height="34" fill={INK} />
          <rect x="250" y="150" width="12" height="34" fill={INK} />
          <rect x="210" y="140" width="58" height="12" fill={`url(#${hazard})`} stroke={INK} strokeWidth="1.5" />
        </g>
      )}

      {isReno ? (
        <g fill="none" strokeWidth="2.5" strokeLinecap="round">
          {/* new wiring (yellow) and pipework (brick) runs */}
          <polyline points="74,178 74,132 176,132 176,80 100,80" stroke={YELLOW_DEEP} />
          <polyline points="84,178 84,140 166,140 166,90" stroke={BRICK} strokeDasharray="6 4" />
          <circle cx="100" cy="80" r="4" fill={YELLOW} stroke={INK} strokeWidth="1.5" />
          <rect x="150" y="160" width="24" height="16" fill={PAPER} stroke={INK} strokeWidth="2" />
        </g>
      ) : (
        <g>
          <rect x="72" y="160" width="38" height="10" fill={INK} />
          <rect x="72" y="150" width="9" height="20" fill={INK} />
          <rect x="72" y="104" width="30" height="7" fill={TIMBER} stroke={INK} strokeWidth="1.2" />
        </g>
      )}

      {/* grid marker */}
      <circle cx="24" cy="24" r="10" fill={PAPER} stroke={INK} strokeWidth="2" />
      <Label x={24} y={28} anchor="middle">
        {kind === 'renovation' ? 'R' : isLoft ? 'L' : 'E'}
      </Label>
    </g>
  );
}

function KitchenScene({hazard}: {hazard: string}) {
  return (
    <g>
      {/* back wall */}
      <rect x="24" y="24" width="272" height="160" fill={PAPER} />
      {/* steel beam (knock-through) */}
      <rect x="24" y="24" width="272" height="14" fill={INK} />
      <rect x="24" y="38" width="272" height="5" fill={`url(#${hazard})`} />
      {/* wall units */}
      <rect x="40" y="58" width="110" height="34" fill="var(--ks-concrete)" stroke={INK} strokeWidth="2" />
      <line x1="76" y1="58" x2="76" y2="92" stroke={INK} strokeWidth="1.5" />
      <line x1="113" y1="58" x2="113" y2="92" stroke={INK} strokeWidth="1.5" />
      {/* window */}
      <rect x="176" y="58" width="74" height="54" fill={SKY} stroke={INK} strokeWidth="2.5" />
      <line x1="213" y1="58" x2="213" y2="112" stroke={INK} strokeWidth="2" />
      {/* base units and worktop */}
      <rect x="34" y="130" width="252" height="8" fill={TIMBER} stroke={INK} strokeWidth="2" />
      <rect x="40" y="138" width="240" height="46" fill="var(--ks-concrete)" stroke={INK} strokeWidth="2" />
      {[100, 160, 220].map(x => (
        <line key={x} x1={x} y1="138" x2={x} y2="184" stroke={INK} strokeWidth="1.5" />
      ))}
      {/* hob */}
      <rect x="56" y="124" width="30" height="6" fill={INK} />
      {/* pendants */}
      {[120, 200].map(x => (
        <g key={x}>
          <line x1={x} y1="43" x2={x} y2="106" stroke={INK} strokeWidth="1.5" />
          <path d={`M${x - 10} 116 L${x + 10} 116 L${x + 6} 106 L${x - 6} 106 Z`} fill={YELLOW} stroke={INK} strokeWidth="1.5" />
        </g>
      ))}
      <Label x={40} y={52}>
        RSJ ABOVE
      </Label>
    </g>
  );
}

/** Small keystone brand mark. */
export function KeystoneMark({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" fill={YELLOW} />
      <path d="M10 8 H30 L25 32 H15 Z" fill={INK} />
      <rect x="4" y="32" width="32" height="4" fill={INK} />
    </svg>
  );
}
