import { simulateEvent, TABS_CSS_CLASSES } from '@finsweet/ts-utils';
import { msfStore } from '../stores/msf';

import type { FormField, TabPaneElement, TabsElement, TabsContentElement } from '@finsweet/ts-utils';
import type { Component } from '../types';

export const Tabs: Component = () => ({
  /**
   * Stores the data from all tabs.
   * @param tabsContent The {@link TabsContentElement}.
   */
  storeData(tabsContent: TabsContentElement) {
    const tabPanes = tabsContent.querySelectorAll<TabPaneElement>(`.${TABS_CSS_CLASSES.tabPane}`);

    msfStore.totalSteps = tabPanes.length;

    tabPanes.forEach((tabPane, step) => {
      const formFields = tabPane.querySelectorAll<FormField>('input, select, textarea');

      for (const element of formFields) {
        msfStore.fields[element.name] = {
          step,
          element,
          valid: true,
        };
      }
    });
  },

  /**
   * Moves to a target step's Tab.
   * @param targetStep The target step.
   * @param tabs The {@link TabsElement}.
   */
  switchTab(targetStep: number, { children }: TabsElement) {
    simulateEvent(children[targetStep], 'click');
  },
});
