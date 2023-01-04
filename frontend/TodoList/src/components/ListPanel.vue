<script setup lang="ts">

import ListList from '@/components/ListList.vue';


</script>

<template>
  <div id="list-panel">
    <div class="list-panel-container">
      <h1>Lists</h1>
      <ListList />
    </div>
    <div class="divider"></div>
  </div>

</template>

<style scoped>
#list-panel {
  display: grid;
  grid-template-columns: auto 1px;
  height: 100%;
  flex-grow: 0;
}

.list-panel-container {
  height: 100%;
  display: inline-block;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px
}

.divider {
  height: 100%;
  display: inline-block;
  border-right: 1px solid darkgray;
}
</style>