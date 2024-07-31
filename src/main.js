import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import messages from '@/i18n'
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import router from './router';


const i18n = createI18n({
    locale: localStorage.getItem('preferred-language') || 'en',
    legacy: false,
    messages,
  });
  
  const app = createApp(App);
  app.use(i18n);
  app.use(router);
  app.mount('#app');