import styles from './clinic.module.css';

/** Stylised, entirely fictional street map. No third-party map embed. */
export function MapIllustration() {
  return (
    <svg className={styles.map} viewBox="0 0 640 420" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Stylised map of the fictional Northstar Clinic location</title>
      <desc id="map-desc">
        Illustration only: the clinic sits on Harbour Lane beside Brookfield Park, with the river to the south and the
        Line 4 tram stop one block north. The streets are invented.
      </desc>
      <rect className={styles.mapLand} width="640" height="420" />
      {/* River */}
      <path className={styles.mapWater} d="M0 330c80-30 160-10 240 6s170 18 250-14 120-30 150-24v122H0Z" />
      {/* Park */}
      <rect className={styles.mapPark} x="52" y="150" width="170" height="120" rx="18" />
      <circle className={styles.mapPark} cx="560" cy="80" r="46" />
      {/* Blocks */}
      <g className={styles.mapBlock}>
        <rect x="52" y="34" width="170" height="86" rx="12" />
        <rect x="252" y="34" width="150" height="86" rx="12" />
        <rect x="432" y="34" width="80" height="86" rx="12" />
        <rect x="252" y="150" width="150" height="120" rx="12" />
        <rect x="432" y="150" width="176" height="120" rx="12" />
      </g>
      {/* Roads */}
      <g className={styles.mapRoad} strokeWidth="14">
        <path d="M0 135h640" />
        <path d="M237 0v300" />
        <path d="M417 0v300" />
        <path d="M0 285c120 0 300-4 640-4" />
      </g>
      <g className={styles.mapLabel}>
        <text x="70" y="128" fontSize="13">HARBOUR LANE</text>
        <text x="80" y="214" fontSize="13">Brookfield Park</text>
        <text x="460" y="370" fontSize="13">River Lumen</text>
        <text x="455" y="128" fontSize="13">Line 4 tram stop</text>
      </g>
      {/* Tram stop */}
      <circle cx="440" cy="135" r="7" className={styles.mapPin} />
      {/* Clinic pin */}
      <g transform="translate(327 150)">
        <path className={styles.mapPin} d="M0 40C-18 22-26 10-26-4a26 26 0 0 1 52 0C26 10 18 22 0 40Z" />
        <path className={styles.mapPinMark} d="M0-18 4-8 14-4 4 0 0 10-4 0-14-4-4-8Z" />
      </g>
      <g transform="translate(262 200)">
        <rect className={styles.mapCard} x="0" y="0" width="130" height="40" rx="12" />
        <text className={styles.mapPinLabel} x="65" y="26" textAnchor="middle">
          Northstar
        </text>
      </g>
    </svg>
  );
}
