'use client';

import {useState} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {Drawer, DrawerHeader} from '@astryxdesign/core/Drawer';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {HStack} from '@astryxdesign/core/HStack';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {Selector} from '@astryxdesign/core/Selector';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {useCart} from './CartContext';
import {BagIcon, MinusIcon, PlusIcon, TrashIcon} from './icons';
import {EXAMPLE_TAX_RATE, cartTotals, itemCount, type CartLine} from './lib/cart';
import {pickupSlots, type PickupSlot} from './lib/hours';
import {formatMoney} from './lib/menu';
import {hasErrors, validateCheckout, type CheckoutField, type Errors} from './lib/validation';
import styles from './restaurant.module.css';

type Step = 'cart' | 'checkout' | 'done';
type Receipt = {lines: CartLine[]; total: number; name: string; pickup: string};

function Totals({subtotal, tax, total}: {subtotal: number; tax: number; total: number}) {
  return (
    <dl className={styles.totals}>
      <div>
        <dt>Subtotal</dt>
        <dd>{formatMoney(subtotal)}</dd>
      </div>
      <div>
        <dt>Example tax ({Math.round(EXAMPLE_TAX_RATE * 100)}%, illustrative only)</dt>
        <dd>{formatMoney(tax)}</dd>
      </div>
      <div className={styles.totalRow}>
        <dt>Total</dt>
        <dd>{formatMoney(total)}</dd>
      </div>
    </dl>
  );
}

export function CartDrawer() {
  const {cart, dispatch, isOpen, setOpen} = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [slots, setSlots] = useState<PickupSlot[]>([]);
  const [name, setName] = useState('');
  const [pickup, setPickup] = useState('');
  const [errors, setErrors] = useState<Errors<CheckoutField>>({});
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const totals = cartTotals(cart);
  const count = itemCount(cart);

  const close = (open: boolean) => {
    setOpen(open);
    if (!open) {
      if (step === 'done') {
        setReceipt(null);
        setName('');
        setPickup('');
      }
      setStep('cart');
      setErrors({});
      setSubmitted(false);
    }
  };

  const startCheckout = () => {
    setSlots(pickupSlots(new Date()));
    setStep('checkout');
  };

  const revalidate = (next: {name: string; pickup: string}) => {
    if (submitted) setErrors(validateCheckout(next, new Date()));
  };

  const placeOrder = () => {
    setSubmitted(true);
    const found = validateCheckout({name, pickup}, new Date());
    setErrors(found);
    if (hasErrors(found)) return;
    setReceipt({
      lines: cart.lines,
      total: totals.total,
      name: name.trim(),
      pickup: slots.find((s) => s.value === pickup)?.label ?? pickup,
    });
    dispatch({type: 'clear'});
    setStep('done');
  };

  const title = step === 'cart' ? 'Your order' : step === 'checkout' ? 'Pickup details' : 'Demo order complete';

  let content;
  let footer = null;
  if (step === 'done' && receipt) {
    content = (
      <VStack gap={4}>
        <Banner
          status="success"
          title="Demo confirmation: no order was placed"
          description="Juniper Kitchen is a fictional restaurant. No order was sent, no kitchen was notified and no payment was taken."
          collapsible={false}
        />
        <Text as="p">
          Thanks, {receipt.name}. In a real build, this is where you would see your pickup time ({receipt.pickup}) and a
          receipt.
        </Text>
        <ul className={styles.receipt}>
          {receipt.lines.map((line) => (
            <li key={line.id}>
              <span>
                {line.quantity} × {line.name}
              </span>
              <span>{formatMoney(line.price * line.quantity)}</span>
            </li>
          ))}
          <li className={styles.totalRow}>
            <span>Example total</span>
            <span>{formatMoney(receipt.total)}</span>
          </li>
        </ul>
      </VStack>
    );
    footer = <Button variant="primary" label="Done" width="100%" onClick={() => close(false)} />;
  } else if (step === 'checkout') {
    content = (
      <form
        id="checkout-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder();
        }}>
        <VStack gap={5}>
          <Text as="p" color="secondary">
            Choose when you would like to collect your order. Pickup times follow our opening hours.
          </Text>
          <Selector
            label="Pickup time"
            isRequired
            placeholder={slots.length ? 'Choose a time' : 'No pickup times available'}
            options={slots}
            value={pickup}
            onChange={(value) => {
              setPickup(value ?? '');
              revalidate({name, pickup: value ?? ''});
            }}
            status={errors.pickup ? {type: 'error', message: errors.pickup} : undefined}
            statusVariant="detached"
            width="100%"
          />
          <TextInput
            label="Name for the order"
            isRequired
            autoComplete="name"
            value={name}
            onChange={(value) => {
              setName(value);
              revalidate({name: value, pickup});
            }}
            status={errors.name ? {type: 'error', message: errors.name} : undefined}
            statusVariant="detached"
            width="100%"
          />
          <Divider />
          <Totals {...totals} />
          <Text type="supporting">Demo only: placing this order will not charge you or contact a restaurant.</Text>
        </VStack>
      </form>
    );
    footer = (
      <HStack gap={2} justify="end" wrap="wrap">
        <Button label="Back to order" onClick={() => setStep('cart')} />
        <Button variant="primary" type="submit" form="checkout-form" label="Place demo order" />
      </HStack>
    );
  } else if (count === 0) {
    content = (
      <EmptyState
        icon={<Icon icon={BagIcon} size="lg" />}
        title="Your order is empty"
        description="Add a few dishes from the menu to start a pickup order."
        headingLevel={3}
        actions={<Button label="Browse the menu" href="#menu" onClick={() => close(false)} />}
      />
    );
  } else {
    content = (
      <VStack gap={4}>
        <ul className={styles.cartList}>
          {cart.lines.map((line) => (
            <li key={line.id} className={styles.cartLine}>
              <VStack gap={0.5} className={styles.cartLineText}>
                <Text weight="medium">{line.name}</Text>
                <Text type="supporting" hasTabularNumbers>
                  {formatMoney(line.price)} each
                </Text>
              </VStack>
              <HStack gap={1} align="center" className={styles.stepper}>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<Icon icon={MinusIcon} />}
                  label={`Decrease ${line.name}`}
                  onClick={() => dispatch({type: 'decrement', id: line.id})}
                />
                <span className={styles.qtyValue} aria-live="polite">
                  <VisuallyHidden>Quantity </VisuallyHidden>
                  {line.quantity}
                </span>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<Icon icon={PlusIcon} />}
                  label={`Increase ${line.name}`}
                  onClick={() =>
                    dispatch({type: 'add', item: {id: line.id, name: line.name, price: line.price}})
                  }
                />
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<Icon icon={TrashIcon} />}
                  label={`Remove ${line.name}`}
                  onClick={() => dispatch({type: 'remove', id: line.id})}
                />
              </HStack>
            </li>
          ))}
        </ul>
        <Divider />
        <Totals {...totals} />
      </VStack>
    );
    footer = (
      <HStack gap={2} justify="between" wrap="wrap">
        <Button variant="ghost" label="Clear order" onClick={() => dispatch({type: 'clear'})} />
        <Button variant="primary" label="Checkout" onClick={startCheckout} />
      </HStack>
    );
  }

  return (
    <Drawer isOpen={isOpen} onOpenChange={close} label={title} purpose={step === 'checkout' ? 'form' : 'info'} width={440}>
      <Layout
        header={<DrawerHeader title={title} subtitle="Concept demo · pickup only" onOpenChange={close} />}
        content={<LayoutContent>{content}</LayoutContent>}
        footer={footer ? <LayoutFooter hasDivider>{footer}</LayoutFooter> : undefined}
      />
    </Drawer>
  );
}
