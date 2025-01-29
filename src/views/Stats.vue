<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const stats = ref([]);

onMounted(() => {
  stats.value = JSON.parse(localStorage.getItem('stats') || '[]');
});

const topPlayers = computed(() => {
  const playerStats = {};

  stats.value.forEach(stat => {
    if (!playerStats[stat.pseudo]) {
      playerStats[stat.pseudo] = { wins: 0, total: 0 };
    }
    playerStats[stat.pseudo].total++;
    if (stat.result === 'won') {
      playerStats[stat.pseudo].wins++;
    }
  });

  const players = Object.keys(playerStats).map(pseudo => ({
    pseudo,
    ratio: playerStats[pseudo].wins / playerStats[pseudo].total,
  }));

  return players.sort((a, b) => b.ratio - a.ratio).slice(0, 3);
});
</script>

<template>
  <div id="stats-page">
    <section id="top-players" class="section">
      <h2>Top 3 Players</h2>
      <ul>
        <li v-if="!topPlayers.length">
          No stats available
        </li>
        <li v-for="player in topPlayers" :key="player.pseudo" class="player">
          {{ player.pseudo }} - Win Ratio: {{ (player.ratio * 100).toFixed(2) }}%
        </li>
        <li>
          <router-link to="/"><button>Retour à l'accueil</button></router-link>
        </li>
      </ul>
    </section>
    <section id="stats" class="section">
      <h1>Statistics</h1>
      <ul>
        <li v-for="stat in stats" :key="stat.id" id="stat">
          <div class="stat-details">
            <h3>Pseudo:</h3> <p>{{ stat.pseudo }}</p>
            <h3>Code à trouver: </h3><p>{{ stat.code }}</p>
            <h3>Résultat: </h3><p>{{ stat.result }}</p>
          <div v-if="stat.result === 'lost'" class="last-attempt">
            <h4>Dernière combinaison: </h4><p>{{ stat.lastAttempt.value }}</p>
            <h4>Correctement placé: </h4><p>{{ stat.lastAttempt.correctlyPlaced }}</p>
            <h4>Correct mais mal placé:</h4><p> {{ stat.lastAttempt.misplaced }}</p>
          </div>
        </div>
        </li>
        <li v-if="!stats.length">No stats available</li>
      </ul>
    </section>
  </div>
</template>