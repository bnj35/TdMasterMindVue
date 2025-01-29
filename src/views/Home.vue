<script setup>
import { onMounted, onUnmounted, inject, ref } from 'vue';
import { useGame } from '../services/useGame';
import { useRouter } from 'vue-router';

const { code, generateCode } = useGame();
const router = useRouter();

const pseudo = inject('pseudo', ref(''));
const codeLength = inject('codeLength');
const maxAttempts = inject('maxAttempts');

const saveSettings = () => {
  codeLength.value = parseInt(codeLength.value);
  maxAttempts.value = parseInt(maxAttempts.value);
  router.push({ name: 'game' });
};

const logout = () => {
  pseudo.value = '';
  router.push({ name: 'home' });
};

let intervalId;
const showAnimation = ref(true);

onMounted(() => {
  generateCode();
  intervalId = setInterval(() => {
    generateCode();
    showAnimation.value = !showAnimation.value;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="home">
    <header>
      <img src="../assets/logo.png" alt="megamind" width="150">
      <div class="header-content">
        <transition name="fade">
          <p v-if="showAnimation" class="code">{{ code }}</p>
        </transition>
        <h1>MegaMind</h1>
      </div>
    </header>
    <section>
      <h2>Règles du Jeu</h2>
      <p>
        Le but du jeu est de deviner le code secret en un minimum de tentatives.
      </p>
    </section>
    <section id="settings">
      <h2>Entrez votre pseudo</h2>
      <input v-model="pseudo" placeholder="Enter your pseudo" type="text"/>
      <h2>Choisissez la taille du code</h2>
      <input type="number" v-model="codeLength" min="2" max="10" id="taille"/>
      <h2>Choisissez le nombre de tentatives max</h2>
      <input type="number" v-model="maxAttempts" min="5" max="20" id="tent"/>
    </section>
    <button @click="saveSettings">Commencer la partie</button>

    <section>
      <h2>Statistiques</h2>
      <div id="stats">
        <router-link to="/stats"><button>Voir les statistiques</button></router-link>
        <button @click="logout">Se déconnecter</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 20px;
}

.code {
  font-size: 2em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>