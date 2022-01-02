import { createApp } from 'petite-vue';
import { msfStore } from './stores/msf';
import { Form } from './components/Form';
import { Tabs } from './components/Tabs';

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  createApp({
    // Components
    Form,
    Tabs,

    // Stores
    msfStore,
  }).mount();
});
