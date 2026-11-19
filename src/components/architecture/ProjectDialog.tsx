'use client';

import {Button} from '@astryxdesign/core/Button';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {Heading} from '@astryxdesign/core/Heading';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {Text} from '@astryxdesign/core/Text';
import {Axonometric} from './Axonometric';
import {PlanDrawing} from './PlanDrawing';
import {useStudio} from './StudioProvider';
import {drawingRef} from './lib/archive';
import {projectById, projects, sectorLabel, typeLabel} from './lib/projects';
import styles from './ostrander.module.css';

/** Project drawing sheet: axonometric, plan, key facts and design moves. */
export function ProjectDialog({projectId, onClose}: {projectId: string | null; onClose: () => void}) {
  const project = projectId ? projectById(projectId) : undefined;
  return (
    <Dialog
      isOpen={Boolean(project)}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      width={980}
      maxHeight="92dvh"
      padding={0}>
      {project ? <SheetBody id={project.id} onClose={onClose} /> : <span />}
    </Dialog>
  );
}

function SheetBody({id, onClose}: {id: string; onClose: () => void}) {
  const {startBrief} = useStudio();
  const p = projectById(id)!;
  const ref = drawingRef(projects, p.id);
  return (
    <div className={styles.sheet}>
      <DialogHeader
        className={styles.dialogHeader}
        title={p.title}
        subtitle={`${ref} · ${typeLabel(p.type)} · ${p.place}`}
        onOpenChange={open => {
          if (!open) onClose();
        }}
      />
      <div className={styles.sheetBody}>
        <div className={styles.sheetDrawings}>
          <figure className={styles.sheetFigure}>
            <div className={styles.sheetFigureArt}>
              <Axonometric volumes={p.massing} hasGround label={`Axonometric line drawing of ${p.title}. New work is drawn in red.`} />
            </div>
            <figcaption>Axonometric · new work in red · illustrative</figcaption>
          </figure>
          <figure className={styles.sheetFigure}>
            <div className={styles.sheetFigureArt}>
              <PlanDrawing plan={p.plan} label={`Simplified ground-floor plan of ${p.title}, showing ${p.plan.rooms.map(r => r.label).filter(Boolean).join(', ')}.`} />
            </div>
            <figcaption>Plan · simplified · illustrative</figcaption>
          </figure>
        </div>

        <Text as="p" type="large" textWrap="pretty" className={styles.sheetSummary}>
          {p.summary}
        </Text>

        <MetadataList columns="multi">
          <MetadataListItem label="Type">{typeLabel(p.type)}</MetadataListItem>
          <MetadataListItem label="Sector">{sectorLabel(p.sector)}</MetadataListItem>
          <MetadataListItem label="Area (sample)">{p.areaM2} m²</MetadataListItem>
          <MetadataListItem label="Drawn to">{p.stage}</MetadataListItem>
        </MetadataList>

        <div className={styles.sheetColumns}>
          <section aria-labelledby={`${p.id}-brief`}>
            <Heading level={3} id={`${p.id}-brief`} className={styles.sheetHeading}>
              The brief
            </Heading>
            <Text as="p">{p.brief}</Text>
            <Heading level={3} className={`${styles.sheetHeading} ${styles.sheetHeadingSpaced}`}>
              Materials
            </Heading>
            <ul className={styles.dashList}>
              {p.materials.map(m => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby={`${p.id}-moves`}>
            <Heading level={3} id={`${p.id}-moves`} className={styles.sheetHeading}>
              Three moves
            </Heading>
            <ol className={styles.moveList}>
              {p.moves.map(m => (
                <li key={m}>{m}</li>
              ))}
            </ol>
          </section>
        </div>
        <p className={styles.sheetNote}>Fictional project: this building, its site and its client do not exist.</p>
      </div>
      <div className={styles.sheetFooter}>
        <Button label="Close" variant="ghost" onClick={onClose} />
        <Button
          label="Start a similar brief"
          variant="primary"
          onClick={() => startBrief({type: p.type, source: p.title})}
        />
      </div>
    </div>
  );
}
