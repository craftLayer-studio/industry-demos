import type {ComponentType, SVGProps} from 'react';
import type {SpecialtyId} from './lib/data';
import {BloomIcon, ChildIcon, FamilyIcon, HeartIcon, MovementIcon, SkinIcon} from './icons';

export const specialtyIcons: Record<SpecialtyId, ComponentType<SVGProps<SVGSVGElement>>> = {
  'family-medicine': FamilyIcon,
  paediatrics: ChildIcon,
  dermatology: SkinIcon,
  cardiology: HeartIcon,
  physiotherapy: MovementIcon,
  'womens-health': BloomIcon,
};
