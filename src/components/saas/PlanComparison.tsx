import {Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from '@astryxdesign/core/Table';
import {Heading} from '@astryxdesign/core/Heading';
import {CheckIcon, DashIcon} from './icons';
import styles from './saas.module.css';

type Cell = string | boolean;
type Row = {feature: string; starter: Cell; team: Cell; scale: Cell};
type Group = {title: string; rows: Row[]};

const groups: Group[] = [
  {
    title: 'Usage',
    rows: [
      {feature: 'Seats included', starter: '3', team: '5', scale: '15'},
      {feature: 'Events included each month', starter: '100k', team: '1M', scale: '10M'},
      {feature: 'Data history', starter: '30 days', team: '13 months', scale: 'Unlimited'},
    ],
  },
  {
    title: 'Analysis',
    rows: [
      {feature: 'Funnels and retention', starter: true, team: true, scale: true},
      {feature: 'Weekly written digest', starter: true, team: true, scale: true},
      {feature: 'Live event stream', starter: true, team: true, scale: true},
      {feature: 'Anomaly alerts', starter: false, team: true, scale: true},
      {feature: 'Experiment readouts', starter: false, team: true, scale: true},
    ],
  },
  {
    title: 'Team and control',
    rows: [
      {feature: 'Roles and permissions', starter: false, team: 'Basic', scale: 'Custom'},
      {feature: 'Single sign-on', starter: false, team: false, scale: true},
      {feature: 'Audit log', starter: false, team: false, scale: true},
      {feature: 'Data region choice', starter: false, team: true, scale: true},
    ],
  },
];

function Value({v}: {v: Cell}) {
  if (v === true)
    return (
      <span className={styles.cellYes}>
        <CheckIcon />
        <span className={styles.visuallyHidden}>Included</span>
      </span>
    );
  if (v === false)
    return (
      <span className={styles.cellNo}>
        <DashIcon />
        <span className={styles.visuallyHidden}>Not included</span>
      </span>
    );
  return <span className={styles.cellText}>{v}</span>;
}

export function PlanComparison() {
  return (
    <div className={styles.comparison}>
      <Heading level={3} className={styles.comparisonTitle} id="compare-heading">
        Compare plans
      </Heading>
      <div className={styles.compareFrame}>
        <Table dividers="rows" className={styles.compareTable} aria-labelledby="compare-heading">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Feature</TableHeaderCell>
              <TableHeaderCell>Starter</TableHeaderCell>
              <TableHeaderCell>Team</TableHeaderCell>
              <TableHeaderCell>Scale</TableHeaderCell>
            </TableRow>
          </TableHeader>
          {groups.map(g => (
            <TableBody key={g.title}>
              <TableRow>
                <TableHeaderCell scope="rowgroup" className={styles.groupCell}>
                  {g.title}
                </TableHeaderCell>
                <TableCell className={styles.groupCell}>{''}</TableCell>
                <TableCell className={styles.groupCell}>{''}</TableCell>
                <TableCell className={styles.groupCell}>{''}</TableCell>
              </TableRow>
              {g.rows.map(r => (
                <TableRow key={r.feature}>
                  <TableHeaderCell scope="row" className={styles.rowHeader}>
                    {r.feature}
                  </TableHeaderCell>
                  <TableCell className={styles.valueCell}>
                    <Value v={r.starter} />
                  </TableCell>
                  <TableCell className={styles.valueCell}>
                    <Value v={r.team} />
                  </TableCell>
                  <TableCell className={styles.valueCell}>
                    <Value v={r.scale} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
}
