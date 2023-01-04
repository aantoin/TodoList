

<script setup lang="ts">

const props = defineProps({
  vgrow: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="app-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.app-container {
  width: 1000px;
  margin: 0px auto;
  padding: 0px 10px;
  background-color: rgb(233, 233, 233);
  flex-grow: v-bind('props.vgrow');
}
</style>