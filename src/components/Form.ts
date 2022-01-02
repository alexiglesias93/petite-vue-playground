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
});
