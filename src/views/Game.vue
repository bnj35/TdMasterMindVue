<script setup>
import { ref, onMounted, inject } from 'vue';
import { useGame } from '../services/useGame';
import CodeField from '../components/CodeField.vue';
import { RouterLink } from 'vue-router';

const { code, generateCode, validateAttempt, attempts, state, codeLength } = useGame();
const pseudo = inject('pseudo',ref(''));

const feedback = ref('');

const handleAttemptSubmit = (attempt) => {
  const result = validateAttempt(attempt);
  feedback.value = `Correctly placed: ${result.correctlyPlaced}, Misplaced: ${result.misplaced}`;
  const firstInput = document.querySelector('input');
  if (firstInput) {
    firstInput.value = '';
    firstInput.focus();
  }
};

onMounted(() => {
  generateCode();
  const firstInput = document.querySelector('input');
  if (firstInput) {
    firstInput.focus();
  }
});
</script>

<template>
  <div id="game">
    <h1>Bienvenue {{ pseudo }}</h1>
    <div v-if="state === 'in_progress'">
      <CodeField :length="codeLength" @submit="handleAttemptSubmit" />
      <ul>
        <li v-for="attempt in attempts" :key="attempt.id">
          {{ attempt.value }} - Correctement placé: {{ attempt.correctlyPlaced }}, correct mais mal placé: {{ attempt.misplaced }}
        </li>
      </ul>
    </div>
    <div v-else-if="state === 'won'">
      <p>Bravo {{ pseudo }}, c'est gagné !</p>
      <RouterLink to="/stats"><button>Voir les statistiques</button></RouterLink>
      <RouterLink to="/"><button>Retour à l'accueil</button></RouterLink>
    </div>
    <div v-else-if="state === 'lost'">
      <p>Sorry {{ pseudo }}, Perdu, plus de chance la prochaine fois</p>
      <RouterLink to="/stats"><button>Voir les statistiques</button></RouterLink>
      <RouterLink to="/"><button>Retour à l'accueil</button></RouterLink>
    </div>
  </div>
</template>