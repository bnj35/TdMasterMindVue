import { ref } from 'vue';

export default {
  install(app) {
    const codeLength = ref(4);
    const maxAttempts = ref(10);

    app.provide('codeLength', codeLength);
    app.provide('maxAttempts', maxAttempts);
  }
};
