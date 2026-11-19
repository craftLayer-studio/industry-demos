import type {Project} from './lib/projects';
import styles from './ostrander.module.css';

const S = 10; // drawing units per metre

/** Original ground-floor plan line drawing with a scale bar and north point. */
export function PlanDrawing({plan, label}: {plan: Project['plan']; label: string}) {
  const pad = 14;
  const footer = 22;
  const w = plan.w * S;
  const h = plan.h * S;
  const vbW = w + pad * 2;
  const vbH = h + pad * 2 + footer;
  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={styles.plan}
      role="img"
      aria-label={label}
      focusable="false">
      <g transform={`translate(${pad} ${pad})`}>
        {plan.rooms.map((r, i) => {
          const fs = Math.min(5.5, Math.max(3.2, (r.w * S) / Math.max(4, (r.label?.length ?? 4) * 0.62) / 1.4));
          return (
            <g key={i}>
              <rect
                x={r.x * S}
                y={r.y * S}
                width={r.w * S}
                height={r.h * S}
                className={r.accent ? styles.planRoomAccent : styles.planRoom}
              />
              {r.label ? (
                <text
                  x={(r.x + r.w / 2) * S}
                  y={(r.y + r.h / 2) * S}
                  className={styles.planLabel}
                  fontSize={fs}
                  textAnchor="middle"
                  dominantBaseline="middle">
                  {r.label.toUpperCase()}
                </text>
              ) : null}
            </g>
          );
        })}
        <rect x={0} y={0} width={w} height={h} className={styles.planOutline} />
      </g>
      {/* Scale bar: 5 m in 1 m ticks */}
      <g transform={`translate(${pad} ${pad + h + 10})`} className={styles.planScale}>
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={i * S} y={0} width={S} height={2.4} className={i % 2 ? styles.planScaleOn : styles.planScaleOff} />
        ))}
        <text x={0} y={9} fontSize={4} className={styles.planLabel}>0</text>
        <text x={5 * S} y={9} fontSize={4} className={styles.planLabel} textAnchor="middle">5 m</text>
      </g>
      {/* North point */}
      <g transform={`translate(${vbW - pad - 4} ${pad + h + 10})`} className={styles.planNorth}>
        <circle cx={0} cy={2} r={5} />
        <path d="M0 -2 L2.6 5 L0 3.4 L-2.6 5 Z" />
      </g>
    </svg>
  );
}
