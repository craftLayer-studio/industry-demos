'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {useToast} from '@astryxdesign/core/Toast';
import {BagArt, OriginArt} from './art';
import {RoastScale} from './RoastScale';
import {useShop} from './ShopContext';
import {BAG_SIZES, GRINDS, MAX_QTY, clampQty, unitPrice, type BagSize, type Grind} from './lib/cart';
import {PROCESS_LABELS, ROAST_LABELS, formatMoney, getCoffee, type Coffee} from './lib/catalog';
import styles from './coffee.module.css';

function ProductBody({coffee, onAdded}: {coffee: Coffee; onAdded: () => void}) {
  const {dispatch, setToastDismiss} = useShop();
  const showToast = useToast();
  const [size, setSize] = useState<BagSize>('250g');
  const [grind, setGrind] = useState<Grind>('whole');
  const [qty, setQty] = useState(1);

  const unit = unitPrice(coffee, size);
  const sizeLabel = BAG_SIZES.find(s => s.value === size)?.label ?? size;
  const grindLabel = GRINDS.find(g => g.value === grind)?.label ?? grind;

  const add = () => {
    dispatch({type: 'add', coffeeId: coffee.id, size, grind, qty});
    onAdded();
    const dismiss = showToast({
      body: `Added ${qty} × ${coffee.name} (${sizeLabel}, ${grindLabel.toLowerCase()}) to your demo cart. Open the cart from the header.`,
      uniqueID: 'bw-cart-add',
    });
    setToastDismiss(dismiss);
  };

  return (
    <div className={styles.productDialog}>
      <div className={styles.dialogArt}>
        <OriginArt coffee={coffee} className={styles.dialogOrigin} />
        <BagArt coffee={coffee} className={styles.dialogBag} />
        <p className={styles.originCaption}>Abstract illustration of the {coffee.region} growing region.</p>
      </div>
      <div className={styles.dialogInfo}>
        <p className={styles.dialogDesc}>{coffee.description}</p>
        <div>
          <p className={styles.filterLabel}>Tasting notes</p>
          <ul className={styles.noteChips}>
            {coffee.notes.map(n => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <dl className={styles.specList}>
          <div>
            <dt>Origin</dt>
            <dd>
              {coffee.origin}, {coffee.region}
            </dd>
          </div>
          <div>
            <dt>Process</dt>
            <dd>{PROCESS_LABELS[coffee.process]}</dd>
          </div>
          <div>
            <dt>Altitude</dt>
            <dd>{coffee.altitude}</dd>
          </div>
          <div>
            <dt>Roast</dt>
            <dd>
              <RoastScale value={coffee.roastScale} label={ROAST_LABELS[coffee.roast]} />
            </dd>
          </div>
        </dl>

        <div className={styles.dialogControls}>
          <div>
            <p className={styles.filterLabel} id={`size-${coffee.id}`}>
              Bag size
            </p>
            <SegmentedControl label="Bag size" value={size} onChange={v => setSize(v as BagSize)} layout="fill" size="sm">
              {BAG_SIZES.map(s => (
                <SegmentedControlItem key={s.value} value={s.value} label={s.label} />
              ))}
            </SegmentedControl>
          </div>
          <Selector
            label="Grind"
            options={GRINDS}
            value={grind}
            onChange={v => setGrind((v ?? 'whole') as Grind)}
            width="100%"
          />
          <NumberInput
            label="Quantity"
            value={qty}
            onChange={v => setQty(clampQty(v))}
            min={1}
            max={MAX_QTY}
            step={1}
            isIntegerOnly
            hasNumberSteppers
            units="bags"
            isWheelEnabled={false}
            width="100%"
          />
        </div>

        <div className={styles.dialogBuy}>
          <p className={styles.dialogPrice} aria-live="polite">
            <span className={styles.dialogPriceValue}>{formatMoney(unit * qty)}</span>
            <span className={styles.dialogPriceNote}>
              {qty} × {formatMoney(unit)} · sample price
            </span>
          </p>
          <Button label="Add to cart" variant="primary" size="lg" onClick={add} />
        </div>
      </div>
    </div>
  );
}

export function ProductDialog() {
  const {productId, closeProduct} = useShop();
  const [last, setLast] = useState<Coffee | null>(null);
  const current = productId ? getCoffee(productId) ?? null : null;
  if (current && current !== last) setLast(current);
  const coffee = current ?? last;

  return (
    <Dialog isOpen={Boolean(current)} onOpenChange={open => (!open ? closeProduct() : undefined)} width={880} maxHeight="90dvh">
      {coffee ? (
        <>
          <DialogHeader
            title={coffee.name}
            subtitle={`${coffee.origin} · ${PROCESS_LABELS[coffee.process]} · ${ROAST_LABELS[coffee.roast]} roast`}
            onOpenChange={open => (!open ? closeProduct() : undefined)}
          />
          <ProductBody key={coffee.id + String(Boolean(current))} coffee={coffee} onAdded={closeProduct} />
        </>
      ) : null}
    </Dialog>
  );
}
