<script setup>
import { computed, defineEmits, ref, onMounted, inject, defineProps } from 'vue';

const length = defineProps(['length']);


const codeLength = inject('codeLength');

const emits = defineEmits(['submit']);

const attempt = ref(Array(codeLength).fill(''));

const inputFields = computed(() => Array.from({ length: codeLength.value }, (_, i) => i + 1));

const handleSubmit = () => {
  emits('submit', attempt.value.join(''));
  attempt.value = Array(codeLength.value).fill('');
};

const handleInput = (event, index) => {
  if (event.target.value.length === 1 && index < codeLength.value - 1) {
    const nextInput = document.querySelector(`#input-${index + 1}`);
    if (nextInput) {
      nextInput.focus();
    }
  }
};

onMounted(() => {
  const firstInput = document.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
});
</script>

<template>
  <div class="input-field">
    <div v-for="index in inputFields" :key="index">
      <input type="number"
        :id="'input-' + (index - 1)"
        v-model="attempt[index - 1]"
        maxlength="1"
        @input="handleInput($event, index - 1)"
      />
    </div>
  </div>
  <button @click="handleSubmit">Valider</button>
</template>
