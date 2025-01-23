import { ref, provide } from 'vue';

export default {
  install(app) {
    const pseudo = ref('');
    app.provide('pseudo', pseudo);
  }
};