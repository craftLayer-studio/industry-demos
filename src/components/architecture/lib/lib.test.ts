import {describe, expect, it} from 'vitest';
import {axonometric, boundsOf, project, sortVolumes, volumeFaces} from './iso';
import {archiveSummary, countByType, DEFAULT_ARCHIVE_FILTERS, drawingRef, filterProjects, isFiltered} from './archive';
import {BUDGET_BANDS, feeByStage, formatRange, indicativeFee, roundFee, STAGE_SHARES} from './fees';
import {EMPTY_BRIEF, firstInvalidStep, isValidEmail, isValidPhone, validateBrief, validateBriefStep} from './brief';
import {DESIGN_STAGES} from './stages';
import {projects, TYPES} from './projects';

describe('isometric geometry', () => {
  it('projects the origin to the origin and height straight up', () => {
    expect(project([0, 0, 0])).toEqual([0, 0]);
    expect(project([0, 0, 3])).toEqual([0, -3]);
    expect(project([1, 1, 0])).toEqual([0, 1]);
  });

  it('draws three faces for a flat box and adds glazing', () => {
    expect(volumeFaces({x: 0, y: 0, w: 2, d: 2, h: 2}).map(f => f.kind)).toEqual(['right', 'left', 'top']);
    const glazed = volumeFaces({x: 0, y: 0, w: 2, d: 2, h: 2, glaze: ['x', 'y']});
    expect(glazed.filter(f => f.kind === 'glass')).toHaveLength(2);
  });

  it('gives a gable roof a five-point gable wall and a ridge above the eaves', () => {
    const faces = volumeFaces({x: 0, y: 0, w: 4, d: 6, h: 3, roof: 'gable', rise: 2});
    const gable = faces.find(f => f.kind === 'left')!;
    expect(gable.points).toHaveLength(5);
    const b = boundsOf(faces);
    expect(b.minY).toBeLessThan(project([0, 0, 3])[1]);
  });

  it('paints lower volumes first, then back to front', () => {
    const order = sortVolumes([
      {x: 5, y: 5, w: 1, d: 1, h: 1},
      {x: 0, y: 0, z: 3, w: 1, d: 1, h: 1},
      {x: 0, y: 0, w: 1, d: 1, h: 1},
    ]);
    expect(order.map(v => `${v.x}${v.z ?? 0}`)).toEqual(['00', '50', '03']);
  });

  it('builds a padded viewBox for every archive project', () => {
    for (const p of projects) {
      const {faces, viewBox} = axonometric(p.massing);
      expect(faces.length).toBeGreaterThan(2);
      const [, , w, h] = viewBox.split(' ').map(Number);
      expect(w).toBeGreaterThan(0);
      expect(h).toBeGreaterThan(0);
    }
  });
});

describe('project archive filters', () => {
  it('returns everything by default', () => {
    expect(filterProjects(projects, DEFAULT_ARCHIVE_FILTERS)).toHaveLength(projects.length);
    expect(isFiltered(DEFAULT_ARCHIVE_FILTERS)).toBe(false);
  });

  it('filters by type and sector together', () => {
    const ext = filterProjects(projects, {type: 'extension', sector: 'all'});
    expect(ext.length).toBeGreaterThan(0);
    expect(ext.every(p => p.type === 'extension')).toBe(true);
    const homesExt = filterProjects(projects, {type: 'extension', sector: 'homes'});
    expect(homesExt.every(p => p.type === 'extension' && p.sector === 'homes')).toBe(true);
    expect(homesExt.length).toBeLessThan(ext.length);
    expect(filterProjects(projects, {type: 'residential', sector: 'retail'})).toEqual([]);
  });

  it('counts types within the chosen sector', () => {
    const all = countByType(projects, 'all');
    expect(all.all).toBe(projects.length);
    expect(TYPES.reduce((n, t) => n + all[t.value], 0)).toBe(projects.length);
    const retail = countByType(projects, 'retail');
    expect(retail.all).toBe(projects.filter(p => p.sector === 'retail').length);
    expect(retail.residential).toBe(0);
  });

  it('summarises results honestly', () => {
    expect(archiveSummary(1, {type: 'interior', sector: 'all'})).toBe('Showing 1 fictional interior project.');
    expect(archiveSummary(3, {type: 'all', sector: 'homes'})).toBe('Showing 3 fictional projects in homes.');
    expect(archiveSummary(0, {type: 'residential', sector: 'retail'})).toBe(
      'No fictional residential projects in retail match these filters.',
    );
  });

  it('numbers drawings from the archive order', () => {
    expect(drawingRef(projects, projects[0].id)).toBe('OS-01');
    expect(drawingRef(projects, projects[10].id)).toBe('OS-11');
  });

  it('has unique ids', () => {
    expect(new Set(projects.map(p => p.id)).size).toBe(projects.length);
  });
});

describe('illustrative fees', () => {
  it('rounds to the nearest £500', () => {
    expect(roundFee(12_240)).toBe(12_000);
    expect(roundFee(12_260)).toBe(12_500);
  });

  it('applies the sample rates to the band bounds', () => {
    expect(indicativeFee('extension', '100-250k')).toEqual({low: 12_000, high: 40_000});
    expect(indicativeFee('commercial', '500k-1m')).toEqual({low: 40_000, high: 120_000});
  });

  it('never goes below the sample minimum fee', () => {
    expect(indicativeFee('residential', 'under-100k').low).toBe(18_000);
    expect(indicativeFee('extension', 'under-100k')).toEqual({low: 6_000, high: 16_000});
  });

  it('leaves the top band open-ended', () => {
    const r = indicativeFee('interior', 'over-1m');
    expect(r.high).toBeNull();
    expect(formatRange(r)).toBe('From £100,000');
  });

  it('formats ranges', () => {
    expect(formatRange({low: 12_000, high: 40_000})).toBe('£12,000 to £40,000');
    expect(formatRange({low: 6_000, high: 6_000})).toBe('£6,000');
  });

  it('stage shares add up to the whole fee', () => {
    expect(STAGE_SHARES.reduce((n, s) => n + s.share, 0)).toBeCloseTo(1);
    const split = feeByStage({low: 20_000, high: 40_000});
    expect(split).toHaveLength(STAGE_SHARES.length);
    expect(split[3]).toMatchObject({low: 6_000, high: 12_000});
    expect(feeByStage({low: 100_000, high: null}).every(s => s.high === null)).toBe(true);
  });

  it('keeps budget bands contiguous', () => {
    for (let i = 1; i < BUDGET_BANDS.length; i++) {
      expect(BUDGET_BANDS[i].min).toBe(BUDGET_BANDS[i - 1].max);
    }
  });
});

describe('brief validation', () => {
  it('requires a choice on each step', () => {
    expect(validateBriefStep(0, EMPTY_BRIEF)).toEqual({type: 'Choose the kind of project.'});
    expect(validateBriefStep(1, EMPTY_BRIEF)).toEqual({budget: 'Choose a construction budget band.'});
    expect(Object.keys(validateBriefStep(2, EMPTY_BRIEF))).toEqual(['timeline', 'planning']);
    expect(Object.keys(validateBriefStep(3, EMPTY_BRIEF))).toEqual(['name', 'email']);
  });

  it('checks email and optional phone formats', () => {
    expect(isValidEmail('sam@example.com')).toBe(true);
    expect(isValidEmail('sam@example')).toBe(false);
    expect(isValidPhone('')).toBe(true);
    expect(isValidPhone('+44 20 7946 0000')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('call me')).toBe(false);
  });

  it('limits the note length', () => {
    expect(validateBriefStep(0, {...EMPTY_BRIEF, type: 'interior', note: 'x'.repeat(401)}).note).toMatch(/under 400/);
  });

  it('finds the first incomplete step', () => {
    expect(firstInvalidStep(EMPTY_BRIEF)).toBe(0);
    const done = {
      ...EMPTY_BRIEF,
      type: 'extension' as const,
      budget: '100-250k' as const,
      timeline: 'asap' as const,
      planning: 'not-started' as const,
      name: 'Sam Example',
      email: 'sam@example.com',
    };
    expect(firstInvalidStep(done)).toBe(-1);
    expect(validateBrief(done)).toEqual({});
    expect(firstInvalidStep({...done, email: 'nope'})).toBe(3);
  });
});

describe('design stages', () => {
  it('covers stages 0 to 7 in order', () => {
    expect(DESIGN_STAGES.map(s => s.n)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
});
