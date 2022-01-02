import { FormField, getObjectEntries } from '@finsweet/ts-utils';
import { reactive } from 'petite-vue';

type MSFStore = {
  totalSteps: number;
  currentStep: number;
  fields: { [key: string]: { element: FormField; step: number; valid: boolean } };
  error: string;

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
  totalSteps: 0,
  currentStep: 0,
  fields: {},
  error: '',

  incrementStep() {
    const nextStep = this.currentStep + 1;
    this.goTo(nextStep);
  },

  decrementStep() {
    const previousStep = this.currentStep - 1;
    this.goTo(previousStep);
  },

  goTo(target) {
    if (target < 0 || target > this.totalSteps) return;

    if (target > this.currentStep) {
      this.error = '';

      const currentStepFields = getObjectEntries(this.fields).filter(([, { step }]) => step === this.currentStep);

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
