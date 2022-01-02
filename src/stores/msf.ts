import { FormField, getObjectEntries } from '@finsweet/ts-utils';
import { reactive } from 'petite-vue';

type MSFStore = {
  error: string;
  totalSteps: number;
  currentStep: number;
  fields: { [key: string]: { element: FormField; step: number; valid: boolean } };

  /**
   * Increments the current step.
   */
  incrementStep: () => void;

  /**
   * Decrements the current step.
   */
  decrementStep: () => void;

  /**
   * Moves to a target step.
   * If the direction is forward, it will only proceed if the `currentStep` is valid.
   * @param target The target step.
   */
  goTo: (target: number) => void;
};

export const msfStore = reactive<MSFStore>({
  error: '',
  totalSteps: 0,
  currentStep: 0,
  fields: {},

  incrementStep() {
    this.goTo(this.currentStep + 1);
  },

  decrementStep() {
    this.goTo(this.currentStep - 1);
  },

  goTo(target) {
    const { totalSteps, currentStep, fields } = this;

    if (target < 0 || target >= totalSteps) return;

    if (target > currentStep) {
      this.error = '';

      const currentStepFields = getObjectEntries(fields).filter(([, { step }]) => step === currentStep);

      const stepIsValid = currentStepFields.every(([fieldName, { element }]) => {
        const fieldIsValid = element.checkValidity();

        this.fields[fieldName].valid = fieldIsValid;

        if (!fieldIsValid) this.error ||= `Please, fill the ${element.name} field.`;

        return fieldIsValid;
      });

      if (!stepIsValid) return;
    }

    this.currentStep = target;
  },
});
