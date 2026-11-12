import Link from 'next/link';
import {demos} from '@/lib/demos';
import {REPO_URL, STUDIO_URL} from '@/lib/paths';

// Placeholder index. Replaced by the integration pass.
export default function DemosIndex() {
  return (
    <main id="main">
      <h1>CraftLayer Studio industry demos</h1>
      <ul>
        {demos.map(d => (
          <li key={d.slug}>
            <Link href={d.href}>{d.name}</Link> ({d.industry})
          </li>
        ))}
      </ul>
      <p>
        <a href={STUDIO_URL}>CraftLayer Studio</a> · <a href={REPO_URL}>Source</a>
      </p>
    </main>
  );
}
