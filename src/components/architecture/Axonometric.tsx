import {axonometric, pointsAttr, project, type Volume} from './lib/iso';
import styles from './ostrander.module.css';

type Props = {
  volumes: readonly Volume[];
  /** Accessible description. Omit to mark the drawing decorative. */
  label?: string;
  /** Draw a faint isometric ground grid under the model. */
  hasGround?: boolean;
  className?: string;
};

/** Original isometric line drawing generated from a simple massing model. */
export function Axonometric({volumes, label, hasGround = false, className}: Props) {
  const {faces, viewBox} = axonometric(volumes, hasGround ? 2.5 : 1.5);
  const xs = volumes.map(v => v.x + v.w);
  const ys = volumes.map(v => v.y + v.d);
  const gx = Math.ceil(Math.max(...xs)) + 2;
  const gy = Math.ceil(Math.max(...ys)) + 2;
  const ground: [number, number][][] = [];
  if (hasGround) {
    for (let x = -1; x <= gx; x += 2) ground.push([project([x, -1, 0]), project([x, gy, 0])]);
    for (let y = -1; y <= gy; y += 2) ground.push([project([-1, y, 0]), project([gx, y, 0])]);
  }
  return (
    <svg
      viewBox={viewBox}
      className={`${styles.axo} ${className ?? ''}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      preserveAspectRatio="xMidYMid meet">
      {hasGround ? (
        <g className={styles.axoGround}>
          {ground.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
          ))}
        </g>
      ) : null}
      {faces.map((f, i) => (
        <polygon
          key={i}
          points={pointsAttr(f.points)}
          className={`${styles.face} ${styles[`face_${f.kind}`]} ${f.accent ? styles.faceAccent : ''}`}
        />
      ))}
    </svg>
  );
}
