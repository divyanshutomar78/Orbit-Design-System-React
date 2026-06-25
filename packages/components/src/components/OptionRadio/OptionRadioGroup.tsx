import type { ComponentPropsWithoutRef } from 'react';

import {
  RadioGroup as RadioGroupPrimitive,
  RadioGroupItem,
} from '../../primitives/radio-group';

export type OptionRadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive>;

/** Radix-powered radio group — compose with `OptionRadio` items or `RadioGroupItem`. */
export function OptionRadioGroup(props: OptionRadioGroupProps) {
  return <RadioGroupPrimitive {...props} />;
}

export { RadioGroupItem as OptionRadioItem };
