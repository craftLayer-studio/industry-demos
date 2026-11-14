'use client';

import {useEffect, useRef, useState, type FormEvent} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Drawer, DrawerHeader} from '@astryxdesign/core/Drawer';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {TextInput} from '@astryxdesign/core/TextInput';
import {BagArt, BeanArt} from './art';
import {useShop} from './ShopContext';
import {CheckIcon, MinusIcon, PlusIcon, TrashIcon} from './icons';
import {
  BAG_SIZES,
  FREE_SHIPPING_FROM,
  GRINDS,
  MAX_QTY,
  cartTotals,
  itemCount,
  lineTotal,
  unitPrice,
  type CartLine,
} from './lib/cart';
import {COFFEES, formatMoney} from './lib/catalog';
import {firstError, hasErrors, validateCheckout, type CheckoutField, type Errors} from './lib/validation';
import styles from './coffee.module.css';

type Step = 'cart' | 'checkout' | 'done';
type Receipt = {count: number; total: number; email: string};

function Totals({lines}: {lines: CartLine[]}) {
  const t = cartTotals(lines);
  return (
    <dl className={styles.totals}>
      <div>
        <dt>Subtotal</dt>
        <dd>{formatMoney(t.subtotal)}</dd>
      </div>
      <div>
        <dt>Shipping (sample flat rate)</dt>
        <dd>{t.shipping === 0 ? 'Free' : formatMoney(t.shipping)}</dd>
      </div>
      <div className={styles.totalRow}>
        <dt>Total</dt>
        <dd>{formatMoney(t.total)}</dd>
      </div>
    </dl>
  );
}

export function CartDrawer() {
  const {cart, dispatch, isCartOpen, setCartOpen} = useShop();
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors<CheckoutField>>({});
  const [attempted, setAttempted] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const totals = cartTotals(cart);
  const count = itemCount(cart);
  const progress = Math.min(100, Math.round((totals.subtotal / FREE_SHIPPING_FROM) * 100));

  useEffect(() => {
    if (step === 'done') doneRef.current?.focus();
  }, [step]);

  const onOpenChange = (open: boolean) => {
    setCartOpen(open);
    if (!open) {
      if (step === 'done') {
        setReceipt(null);
        setName('');
        setEmail('');
      }
      setStep('cart');
      setErrors({});
      setAttempted(false);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const found = validateCheckout({name, email});
    setErrors(found);
    if (hasErrors(found)) {
      const first = firstError(found, ['name', 'email']);
      formRef.current?.querySelector<HTMLInputElement>(`[data-field="${first}"] input`)?.focus();
      return;
    }
    setReceipt({count, total: totals.total, email: email.trim()});
    dispatch({type: 'clear'});
    setStep('done');
  };

  const revalidate = (next: {name: string; email: string}) => {
    if (attempted) setErrors(validateCheckout(next));
  };

  let content;
  let footer = null;

  if (step === 'done' && receipt) {
    content = (
      <div className={styles.cartDone} role="status">
        <span className={styles.doneIcon}>
          <CheckIcon />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className={styles.doneTitle}>
          Demo checkout complete
        </h3>
        <p className={styles.bodyText}>
          <strong>Demo only: nothing was ordered or charged.</strong> No payment was taken, no coffee will be roasted
          and no email was sent to {receipt.email}. In a real shop this is where you would see an order number for{' '}
          {receipt.count} {receipt.count === 1 ? 'bag' : 'bags'} ({formatMoney(receipt.total)}).
        </p>
        <Button label="Back to the shop" variant="primary" onClick={() => onOpenChange(false)} />
      </div>
    );
  } else if (cart.length === 0) {
    content = (
      <div className={styles.cartEmpty}>
        <EmptyState
          title="Your cart is empty"
          description="Open any coffee in the shop to choose a size and grind."
          icon={<BeanArt className={styles.emptyBean} />}
          headingLevel={3}
          actions={<Button label="Browse coffees" href="#shop" onClick={() => onOpenChange(false)} />}
        />
      </div>
    );
  } else if (step === 'checkout') {
    content = (
      <form ref={formRef} onSubmit={submit} noValidate id="bw-checkout" className={styles.checkoutForm}>
        <Banner
          status="info"
          title="Demo checkout"
          description="No payment details are asked for and nothing is sent. Use a made-up address like name@example.com."
        />
        <FormLayout defaultOptionality="required">
          <div data-field="name">
            <TextInput
              label="Full name"
              value={name}
              onChange={v => {
                setName(v);
                revalidate({name: v, email});
              }}
              autoComplete="name"
              status={errors.name ? {type: 'error', message: errors.name} : undefined}
              width="100%"
            />
          </div>
          <div data-field="email">
            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={v => {
                setEmail(v);
                revalidate({name, email: v});
              }}
              autoComplete="email"
              placeholder="name@example.com"
              status={errors.email ? {type: 'error', message: errors.email} : undefined}
              width="100%"
            />
          </div>
        </FormLayout>
        <Totals lines={cart} />
      </form>
    );
    footer = (
      <div className={styles.drawerActions}>
        <Button label="Back to cart" variant="ghost" onClick={() => setStep('cart')} />
        <Button label="Place demo order" variant="primary" type="submit" form="bw-checkout" />
      </div>
    );
  } else {
    content = (
      <div className={styles.cartBody}>
        <div className={styles.shipMeter}>
          <p className={styles.smallText} aria-live="polite">
            {totals.toFreeShipping === 0
              ? 'You have reached the sample free-shipping threshold.'
              : `Add ${formatMoney(totals.toFreeShipping)} more for free shipping (sample threshold ${formatMoney(FREE_SHIPPING_FROM)}).`}
          </p>
          <ProgressBar label="Progress to free shipping" value={progress} max={100} />
        </div>
        <ul className={styles.cartList}>
          {cart.map(line => {
            const coffee = COFFEES.find(c => c.id === line.coffeeId);
            if (!coffee) return null;
            const size = BAG_SIZES.find(s => s.value === line.size)?.label;
            const grind = GRINDS.find(g => g.value === line.grind)?.label;
            return (
              <li key={line.key} className={styles.cartLine}>
                <BagArt coffee={coffee} className={styles.cartThumb} showName={false} />
                <div className={styles.cartLineInfo}>
                  <p className={styles.cartLineName}>{coffee.name}</p>
                  <p className={styles.smallText}>
                    {size} · {grind} · {formatMoney(unitPrice(coffee, line.size))} each
                  </p>
                  <div className={styles.qtyRow}>
                    <IconButton
                      label={`Decrease ${coffee.name} quantity`}
                      icon={<Icon icon={MinusIcon} />}
                      size="sm"
                      onClick={() => dispatch({type: 'setQty', key: line.key, qty: line.qty - 1})}
                    />
                    <span className={styles.qtyValue} aria-label={`Quantity ${line.qty}`}>
                      {line.qty}
                    </span>
                    <IconButton
                      label={`Increase ${coffee.name} quantity`}
                      icon={<Icon icon={PlusIcon} />}
                      size="sm"
                      isDisabled={line.qty >= MAX_QTY}
                      onClick={() => dispatch({type: 'setQty', key: line.key, qty: line.qty + 1})}
                    />
                    <IconButton
                      label={`Remove ${coffee.name} from cart`}
                      icon={<Icon icon={TrashIcon} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => dispatch({type: 'remove', key: line.key})}
                    />
                  </div>
                </div>
                <p className={styles.cartLineTotal}>{formatMoney(lineTotal(line))}</p>
              </li>
            );
          })}
        </ul>
        <Totals lines={cart} />
        <p className={styles.finePrint}>Sample prices and shipping. This concept shop never takes payment.</p>
      </div>
    );
    footer = (
      <div className={styles.drawerActions}>
        <Button label="Keep shopping" variant="ghost" onClick={() => onOpenChange(false)} />
        <Button label="Demo checkout" variant="primary" onClick={() => setStep('checkout')} />
      </div>
    );
  }

  const title = step === 'done' ? 'Thanks' : step === 'checkout' ? 'Checkout' : 'Your cart';

  return (
    <Drawer
      isOpen={isCartOpen}
      onOpenChange={onOpenChange}
      label={title}
      purpose={step === 'checkout' ? 'form' : 'info'}
      width={440}>
      <Layout
        header={
          <DrawerHeader
            title={title}
            subtitle={step === 'cart' && count > 0 ? `${count} ${count === 1 ? 'bag' : 'bags'} · concept demo` : 'Concept demo'}
            onOpenChange={onOpenChange}
          />
        }
        content={<LayoutContent>{content}</LayoutContent>}
        footer={footer ? <LayoutFooter hasDivider>{footer}</LayoutFooter> : undefined}
      />
    </Drawer>
  );
}
