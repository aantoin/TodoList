<script setup lang="ts">
import { computed } from "vue"

type CardData = {
  header: String,
  items: String[],
}

const props = defineProps<{
  cards: CardData[],
}>()


</script>

<template>
  <div class="tech-cards">
    <div v-for="card in props.cards" class="tech-card">
      <h4>{{ card.header }}</h4>
      <div>
        <ul>
          <li v-for="item in card.items">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-cards {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.tech-card {
  width: 25%;
  background-color: white;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
}

h4 {
  text-align: center;
  background-color: lightgray;
  padding: 10px;
  font-size: 24px;
}

ul {
  list-style: none;
  margin: 0px;
  padding: 10px;
}
</style>