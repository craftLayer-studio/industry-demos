import styles from './clinic.module.css';

/** Decorative illustration: a calm clinic facade under a north star. */
export function HeroArt() {
  return (
    <svg className={styles.heroArt} viewBox="0 0 560 480" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="northstar-hero-clip">
          <rect x="0" y="0" width="560" height="480" rx="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#northstar-hero-clip)">
      <rect className={styles.artBackdrop} x="0" y="0" width="560" height="480" rx="32" />
      <circle className={styles.artSky} cx="430" cy="110" r="120" />
      <circle className={styles.artSeaglass} cx="90" cy="420" r="150" />
      <path className={styles.artSand} d="M0 392c90-26 170-30 280-12s200 10 280-16v84a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32Z" />

      </g>

      {/* Building */}
      <rect className={styles.artCard} x="118" y="150" width="324" height="250" rx="22" />
      <rect className={styles.artSeaglass} x="118" y="150" width="324" height="58" rx="22" />
      <rect className={styles.artSeaglass} x="118" y="186" width="324" height="22" />
      <g className={styles.artSeaglassStrong}>
        <rect x="150" y="236" width="56" height="44" rx="10" />
        <rect x="222" y="236" width="56" height="44" rx="10" />
        <rect x="354" y="236" width="56" height="44" rx="10" />
        <rect x="150" y="300" width="56" height="44" rx="10" />
        <rect x="354" y="300" width="56" height="44" rx="10" />
      </g>
      <rect className={styles.artAccent} x="236" y="304" width="88" height="96" rx="14" />
      <rect className={styles.artOnAccent} x="276" y="316" width="8" height="72" rx="4" opacity="0.5" />
      <rect className={styles.artSky} x="296" y="236" width="44" height="44" rx="10" />

      {/* Star emblem */}
      <circle className={styles.artAccent} cx="280" cy="150" r="44" />
      <path
        className={styles.artOnAccent}
        d="M280 118 286.5 143.5 312 150 286.5 156.5 280 182 273.5 156.5 248 150 273.5 143.5Z"
      />

      {/* Plants */}
      <ellipse className={styles.artSeaglassStrong} cx="104" cy="380" rx="26" ry="40" />
      <ellipse className={styles.artSeaglass} cx="460" cy="378" rx="24" ry="36" />
      <rect className={styles.artInk} x="102" y="384" width="4" height="34" rx="2" opacity="0.35" />
      <rect className={styles.artInk} x="458" y="384" width="4" height="34" rx="2" opacity="0.35" />

      {/* Request card */}
      <g>
        <rect className={styles.artCard} x="330" y="38" width="200" height="86" rx="18" />
        <rect className={styles.artLine} x="330.5" y="38.5" width="199" height="85" rx="17.5" />
        <circle className={styles.artSeaglass} cx="362" cy="81" r="18" />
        <path className={styles.artAccent} d="M354 81.5 359.5 87 371 75l2.5 2.5-14 14-8-8Z" />
        <text className={styles.artText} x="390" y="76" fontSize="15">
          Request sent
        </text>
        <text className={styles.artSubtext} x="390" y="97" fontSize="13">
          Demo only
        </text>
      </g>

      {/* Hours chip */}
      <g>
        <rect className={styles.artCard} x="30" y="70" width="176" height="64" rx="18" />
        <rect className={styles.artLine} x="30.5" y="70.5" width="175" height="63" rx="17.5" />
        <circle className={styles.artCoral} cx="60" cy="102" r="12" />
        <text className={styles.artText} x="82" y="98" fontSize="14">
          Open weekdays
        </text>
        <text className={styles.artSubtext} x="82" y="117" fontSize="12">
          8:00 – 18:00
        </text>
      </g>
    </svg>
  );
}
