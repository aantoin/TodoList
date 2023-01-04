<script setup lang="ts">
import ListItemPanel from '@/components/ListItemPanel.vue';
import ListPanel from '@/components/ListPanel.vue';
import LoginModal from '@/components/LoginModal.vue';


</script>

<template>
  <div class="list-panel-container">
    <ListPanel />
    <ListItemPanel />
  </div>

</template>

<style scoped>
.list-panel-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>