import styles from './advisory.module.css';

/** Stylised, entirely fictional street plan. No third-party map embed. */
export function OfficeMap() {
  return (
    <svg className={styles.map} viewBox="0 0 640 400" role="img" aria-labelledby="hr-map-title hr-map-desc">
      <title id="hr-map-title">Stylised map of the fictional Halden &amp; Rowe office</title>
      <desc id="hr-map-desc">
        Illustration only: the office is on Ledger Row, facing Exchange Square, with the canal to the south and Market
        Street station two blocks west. All streets are invented.
      </desc>
      <rect className={styles.mapLand} width="640" height="400" />
      <path className={styles.mapWater} d="M0 322c90-18 170 10 260 4s180-30 260-20 90 14 120 10v84H0Z" />
      <rect className={styles.mapPark} x="300" y="150" width="120" height="96" />
      <g className={styles.mapBlock}>
        <rect x="24" y="24" width="140" height="102" />
        <rect x="188" y="24" width="88" height="102" />
        <rect x="300" y="24" width="120" height="102" />
        <rect x="444" y="24" width="172" height="102" />
        <rect x="24" y="150" width="140" height="120" />
        <rect x="188" y="150" width="88" height="120" />
        <rect x="444" y="150" width="172" height="120" />
      </g>
      <g className={styles.mapRoad} strokeWidth="12">
        <path d="M0 138h640" />
        <path d="M176 0v290" />
        <path d="M288 0v290" />
        <path d="M432 0v290" />
        <path d="M0 282h640" />
      </g>
      <g className={styles.mapLabel} fontSize="11">
        <text x="24" y="134" dy="-12">LEDGER ROW</text>
        <text x="314" y="203">EXCHANGE</text>
        <text x="324" y="219">SQUARE</text>
        <text x="470" y="360">CANAL WALK</text>
        <text x="186" y="300" dy="10">MARKET ST</text>
      </g>
      {/* Station */}
      <g transform="translate(176 138)">
        <circle r="9" className={styles.mapCard} />
        <text className={styles.mapLabel} x="0" y="4" fontSize="10" textAnchor="middle">
          M
        </text>
      </g>
      {/* Office pin */}
      <g transform="translate(360 112)">
        <circle r="22" className={styles.mapPinRing} />
        <circle r="13" className={styles.mapPin} />
      </g>
      <g transform="translate(380 54)">
        <rect className={styles.mapCard} x="0" y="0" width="150" height="36" />
        <text className={styles.mapPinLabel} x="75" y="24" textAnchor="middle">
          Halden &amp; Rowe
        </text>
      </g>
      {/* Compass */}
      <g transform="translate(596 352)" className={styles.mapCompass}>
        <circle r="18" />
        <path d="M0-14 5 0 0 14-5 0Z" />
      </g>
      <text x="596" y="326" className={styles.mapLabel} fontSize="11" textAnchor="middle">
        N
      </text>
    </svg>
  );
}
