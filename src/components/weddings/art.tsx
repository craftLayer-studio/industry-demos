/**
 * Original line-art illustrations for the fictional Hollin Barn: the barn on
 * its hill, botanical sprigs, space icons and a stylised route map. All
 * drawn here in SVG; no photos or remote images.
 */
import type {SVGProps} from 'react';

type Art = SVGProps<SVGSVGElement>;

/** Wordmark emblem: a barn gable inside a laurel ring. */
export function HollinMark(props: Art) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="24" cy="24" r="22" stroke="var(--hollin-gold)" strokeWidth="1.2" />
      <path d="M13 33V22l11-9 11 9v11" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 33v-7h8v7M24 19.5v2" stroke="var(--hollin-olive)" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 30c-2-4-1.5-9 1-12.5M39 30c2-4 1.5-9-1-12.5" stroke="var(--hollin-gold)" strokeWidth="1" strokeLinecap="round" />
      <path d="M9.6 25.5l-2.6-1.4M9.4 21.5l-2.3-2M38.4 25.5l2.6-1.4M38.6 21.5l2.3-2" stroke="var(--hollin-gold)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/** Hero scene: rolling hills, the barn, an oak, a festoon of lights and wildflowers. */
export function BarnScene(props: Art) {
  const ink = 'var(--hollin-olive-deep)';
  const gold = 'var(--hollin-gold)';
  return (
    <svg viewBox="0 0 640 520" fill="none" aria-hidden="true" focusable="false" {...props}>
      {/* sun / moon disc */}
      <circle cx="470" cy="150" r="74" fill="var(--hollin-gold-soft)" />
      <circle cx="470" cy="150" r="74" stroke={gold} strokeWidth="1" strokeDasharray="2 6" />
      {/* distant hills */}
      <path d="M0 330c80-40 160-58 250-40s150 30 230 4 120-34 160-24v250H0z" fill="var(--hollin-olive-soft)" />
      <path d="M0 330c80-40 160-58 250-40s150 30 230 4 120-34 160-24" stroke={ink} strokeWidth="1.2" strokeOpacity=".55" />
      {/* field rows */}
      <path d="M0 400c120-30 260-40 400-26 90 9 170 8 240-6v152H0z" fill="var(--hollin-linen-deep)" />
      <path d="M0 400c120-30 260-40 400-26 90 9 170 8 240-6" stroke={ink} strokeWidth="1.2" />
      <path d="M40 440c120-22 240-28 360-18M90 472c110-16 220-20 330-12M160 500c90-10 180-12 270-6" stroke={ink} strokeOpacity=".35" strokeWidth="1" />

      {/* barn */}
      <g stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M180 384V262l84-66 84 66v122" fill="var(--hollin-paper)" />
        <path d="M164 274l100-80 100 80" />
        <path d="M348 384V292h112v92" fill="var(--hollin-paper)" />
        <path d="M340 300l14-24h98l16 24" />
        {/* doors */}
        <path d="M236 384v-74h56v74M264 310v74" />
        <path d="M236 310l56 74M292 310l-56 74" strokeOpacity=".5" strokeWidth="1" />
        {/* loft window */}
        <path d="M250 262v-22a14 14 0 0128 0v22z" fill="var(--hollin-gold-soft)" />
        <path d="M264 226v36M250 248h28" strokeWidth="1" />
        {/* side windows */}
        <path d="M372 316h28v24h-28zM418 316h28v24h-28z" fill="var(--hollin-gold-soft)" />
        <path d="M386 316v24M432 316v24" strokeWidth="1" />
        {/* boards */}
        <path d="M196 384V280M212 384V268M316 384V268M332 384V280" strokeOpacity=".3" strokeWidth="1" />
        {/* cupola */}
        <path d="M256 202v-18h16v18M252 184l12-12 12 12" />
        <path d="M264 172v-14M258 160h12" strokeWidth="1.2" />
      </g>

      {/* festoon lights */}
      <path d="M160 300c40 30 70 34 80 34M460 300c30 22 60 30 92 30" stroke={ink} strokeWidth="1" />
      {[
        [172, 309], [188, 319], [206, 327], [224, 332], [474, 310], [492, 319], [512, 325], [532, 329],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y + 5} r="3.2" fill={gold} />
      ))}

      {/* oak tree */}
      <g stroke={ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M560 396v-80M560 344l-22-20M560 334l20-22" />
        <path
          d="M512 300c-18-6-22-34 0-42-6-26 26-40 42-24 10-22 46-18 50 6 26-2 34 30 14 42 12 20-10 40-30 32-12 16-40 14-50 0-16 8-34-2-26-14z"
          fill="var(--hollin-olive-soft)"
        />
      </g>

      {/* wildflowers in the foreground */}
      <g stroke={ink} strokeWidth="1.2" strokeLinecap="round">
        <path d="M70 520c4-40 10-70 24-96M94 424c-10-4-18-2-22 6M84 470c10-8 20-8 28-2" />
        <path d="M118 520c-2-34 2-58 12-80M130 440c6-6 14-8 20-4" />
        <path d="M590 520c-4-30-2-56 8-78M598 442c-8-6-16-6-22 0M594 484c8-6 16-6 22 0" />
      </g>
      <g fill={gold}>
        <circle cx="94" cy="420" r="5" />
        <circle cx="131" cy="436" r="4" />
        <circle cx="599" cy="438" r="5" />
      </g>
      <g fill="var(--hollin-blush)" stroke={ink} strokeWidth="1">
        <circle cx="72" cy="432" r="4" />
        <circle cx="150" cy="436" r="3.5" />
        <circle cx="576" cy="444" r="4" />
      </g>

      {/* birds */}
      <path d="M380 120q8-8 16 0q8-8 16 0M418 96q6-6 12 0q6-6 12 0" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** A trailing botanical sprig used as a section ornament. */
export function Sprig(props: Art) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 30c30-4 70-16 112-22" stroke="var(--hollin-olive)" strokeWidth="1.2" strokeLinecap="round" />
      {[18, 38, 58, 78, 98].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} ${28 - i * 3.6}c2-10 10-14 16-12-2 8-8 12-16 12z`}
            fill="var(--hollin-olive-soft)"
            stroke="var(--hollin-olive)"
            strokeWidth="1"
          />
          <path
            d={`M${x} ${28 - i * 3.6}c6 6 14 8 18 4-4-6-12-6-18-4z`}
            fill="var(--hollin-gold-soft)"
            stroke="var(--hollin-gold)"
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

/** Ceremony: an arbour arch with trailing flowers. */
export function ArbourIcon(props: Art) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M14 58V30a18 18 0 0136 0v28M20 58V31a12 12 0 0124 0v27" stroke="var(--hollin-olive)" strokeWidth="1.6" />
      <path d="M10 58h44" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="var(--hollin-gold)">
        <circle cx="18" cy="22" r="2.4" />
        <circle cx="26" cy="14.5" r="2.4" />
        <circle cx="38" cy="14.5" r="2.4" />
        <circle cx="46" cy="22" r="2.4" />
      </g>
      <g fill="var(--hollin-blush)" stroke="var(--hollin-olive)" strokeWidth=".8">
        <circle cx="32" cy="12" r="2.6" />
        <circle cx="15" cy="30" r="2.2" />
        <circle cx="49" cy="30" r="2.2" />
      </g>
    </svg>
  );
}

/** Dining: a long table with candles. */
export function TableIcon(props: Art) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M6 34h52M12 34v20M52 34v20M6 34l4-4h44l4 4" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M22 30V18M32 30V14M42 30V18" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="var(--hollin-gold)">
        <path d="M22 15c-2-2-1-5 0-6 1 1 2 4 0 6zM32 11c-2-2-1-5 0-6 1 1 2 4 0 6zM42 15c-2-2-1-5 0-6 1 1 2 4 0 6z" />
      </g>
      <path d="M14 44c4 2 8 2 12 0M38 44c4 2 8 2 12 0" stroke="var(--hollin-sage)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Evening: a hanging lantern. */
export function LanternIcon(props: Art) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M32 4v8M26 12h12" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 18l2-6h12l2 6M22 18h20v28H22zM24 46l-2 6h20l-2-6" stroke="var(--hollin-olive)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M32 26c-5 6-3 12 0 13 3-1 5-7 0-13z" fill="var(--hollin-gold)" />
      <path d="M10 32h4M50 32h4M14 20l3 3M50 20l-3 3M14 44l3-3M50 44l-3-3" stroke="var(--hollin-gold)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** Stylised, fictional route map for "Getting here". */
export function RouteMap(props: Art) {
  const ink = 'var(--hollin-olive-deep)';
  return (
    <svg viewBox="0 0 480 340" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="1" y="1" width="478" height="338" rx="10" fill="var(--hollin-paper)" stroke="var(--hollin-rule)" />
      {/* contour lines */}
      <g stroke="var(--hollin-olive-soft)" strokeWidth="1.4">
        <path d="M40 300c40-60 120-80 180-60s120 10 160-40 80-60 90-60" />
        <path d="M20 250c50-50 120-70 180-50s110 0 150-40 70-70 110-70" />
        <path d="M60 330c50-40 130-50 190-30s120 0 170-30" />
      </g>
      {/* river */}
      <path d="M0 120c60 10 90 50 140 50s80-40 140-30 120 70 200 60" stroke="var(--hollin-sage)" strokeWidth="6" strokeLinecap="round" />
      {/* main road and lane */}
      <path d="M30 40c60 40 110 90 170 110s130 30 250 20" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M260 158c10 40 30 80 60 110" stroke={ink} strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" />
      {/* railway */}
      <path d="M40 220c80-6 160-2 240-20s140-40 190-36" stroke={ink} strokeWidth="1.4" />
      <path d="M40 220c80-6 160-2 240-20s140-40 190-36" stroke={ink} strokeWidth="5" strokeDasharray="1 9" />
      {/* station */}
      <rect x="128" y="203" width="16" height="16" rx="3" fill="var(--hollin-paper)" stroke={ink} strokeWidth="1.6" />
      {/* barn pin */}
      <g transform="translate(320 268)">
        <circle r="18" fill="var(--hollin-gold-soft)" stroke="var(--hollin-gold)" strokeWidth="1.4" />
        <path d="M-9 7v-9l9-7 9 7v9z" fill="var(--hollin-paper)" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      {/* trees */}
      <g fill="var(--hollin-olive-soft)" stroke="var(--hollin-olive)" strokeWidth="1">
        <circle cx="370" cy="250" r="8" />
        <circle cx="384" cy="262" r="6" />
        <circle cx="90" cy="280" r="7" />
        <circle cx="410" cy="70" r="9" />
      </g>
      {/* labels */}
      <g fill={ink} fontFamily="var(--font-family-body)" fontSize="12" letterSpacing=".04em">
        <text x="150" y="240">Ashby Halt</text>
        <text x="268" y="312">Hollin Barn</text>
        <text x="300" y="150">B-road from Wendlebury</text>
        <text x="34" y="34">Market town</text>
        <text x="282" y="216">Hollin Lane</text>
      </g>
    </svg>
  );
}
