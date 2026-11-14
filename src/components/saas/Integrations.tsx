import {Heading} from '@astryxdesign/core/Heading';
import {Section} from './Section';
import {ChatIcon, DatabaseIcon, DeviceIcon, FlagIcon, ServerIcon, TicketIcon, WebhookIcon, CodeIcon} from './icons';
import styles from './saas.module.css';

const categories = [
  {Icon: DeviceIcon, title: 'Web and mobile SDKs', body: 'Lightweight client libraries for browsers and native apps, with automatic page and screen views.'},
  {Icon: ServerIcon, title: 'Server-side events', body: 'Send events from your backend over a simple HTTP API when they should not depend on the browser.'},
  {Icon: DatabaseIcon, title: 'Warehouse export', body: 'Scheduled exports of raw events and computed metrics to the data warehouse you already run.'},
  {Icon: ChatIcon, title: 'Team chat', body: 'Digests and alerts posted to the channels where your team already discusses the product.'},
  {Icon: TicketIcon, title: 'Issue trackers', body: 'Turn a surprising drop-off into a ticket with the chart and the affected cohort attached.'},
  {Icon: FlagIcon, title: 'Feature flags', body: 'Read flag exposure events so experiments and staged rollouts show up in every view.'},
  {Icon: WebhookIcon, title: 'Webhooks', body: 'Push alerts and cohort changes to any URL, for anything the built-in categories do not cover.'},
  {Icon: CodeIcon, title: 'Query API', body: 'Read the same numbers the dashboard shows, for internal tools and scheduled reports.'},
];

export function Integrations() {
  return (
    <Section
      id="integrations"
      eyebrow="Integrations"
      title="Fits around the tools you already use"
      lead="Pulsegrid is designed to connect by category, not to replace your stack. This concept names no third-party products and implies no partnerships."
      tone="raised">
      <ul className={styles.integrationGrid}>
        {categories.map(c => (
          <li key={c.title} className={styles.integration}>
            <span className={styles.integrationIcon}>
              <c.Icon />
            </span>
            <Heading level={3} className={styles.cardTitle}>
              {c.title}
            </Heading>
            <p className={styles.smallText}>{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
