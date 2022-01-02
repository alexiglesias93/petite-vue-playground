import { isFormField } from '@finsweet/ts-utils';
import { msfStore } from '../stores/msf';
import type { Component } from '../types';

export const Form: Component = () => ({
  /**
   * Handles keyboard events on the form.
   * @param e The {@link KeyboardEvent}
   */
  handleKeydown(e: KeyboardEvent) {
    if (e.key !== 'Enter' || msfStore.currentStep === msfStore.totalSteps - 1) return;

    e.preventDefault();

    msfStore.incrementStep();
  },

  /**
   * Handles input events on the form.
   * @param e The event.
   */
  handleInput({ target }: Event) {
    if (!isFormField(target)) return;

    const valid = target.checkValidity();

    if (valid) msfStore.fields[target.name].valid = valid;
  },
});
