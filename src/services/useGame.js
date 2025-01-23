import { ref, inject } from 'vue';

export function useGame() {
  const codeLength = inject('codeLength');
  const maxAttempts = inject('maxAttempts');
  const pseudo = inject('pseudo');
  const code = ref('');
  const attempts = ref([]);
  const state = ref('in_progress');

  function generateCode() {
    const digits = [];
    while (digits.length < codeLength.value) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    code.value = digits.join('');
  }

  function validateAttempt(attempt) {
    if (state.value !== 'in_progress') return;

    const attemptArray = attempt.split('').map(Number);
    const codeArray = code.value.split('').map(Number);

    let correctlyPlaced = 0;
    let misplaced = 0;

    const codeCopy = [...codeArray];
    const attemptCopy = [...attemptArray];

    for (let i = 0; i < codeLength.value; i++) {
      if (attemptCopy[i] === codeCopy[i]) {
        correctlyPlaced++;
        codeCopy[i] = attemptCopy[i] = null;
      }
    }

    for (let i = 0; i < codeLength.value; i++) {
      if (attemptCopy[i] !== null) {
        const index = codeCopy.indexOf(attemptCopy[i]);
        if (index !== -1) {
          misplaced++;
          codeCopy[index] = null;
        }
      }
    }

    attempts.value.push({
      id: attempts.value.length + 1,
      value: attempt,
      correctlyPlaced,
      misplaced,
    });

    if (correctlyPlaced === codeLength.value) {
      state.value = 'won';
      saveGameResult('won');
    } else if (attempts.value.length >= maxAttempts.value) {
      state.value = 'lost';
      saveGameResult('lost');
    }

    return { correctlyPlaced, misplaced };
  }

  function saveGameResult(result) {
    const stats = JSON.parse(localStorage.getItem('stats') || '[]');
    stats.push({
      id: stats.length + 1,
      pseudo: pseudo.value,
      code: code.value,
      result,
      lastAttempt: attempts.value[attempts.value.length - 1],
    });
    localStorage.setItem('stats', JSON.stringify(stats));
  }

  return {
    code,
    generateCode,
    validateAttempt,
    attempts,
    state,
  };
}