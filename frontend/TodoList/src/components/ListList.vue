<script setup lang="ts">

import { useListStore } from '@/stores/list';
import { ref, onBeforeMount, nextTick } from 'vue';

const listStore = useListStore()

onBeforeMount(() => {
  listStore.fetchLists();
})

const newListActive = ref(false);
const newListInput = ref();

const activateAddNewList = () => {
  newListActive.value = true;
  nextTick(() => newListInput.value.focus());
}
const createList = () => {
  let name = newListInput.value.textContent.trim()
  if (name) {
    let newList = { id: -1, user: -1, items: [], name: name }
    if (name) listStore.createList(newList)
  }
  newListInput.value.innerHTML = ''
}

</script>

<template>
  <div>
    <ul>
      <li v-for="list in listStore.lists" :key="list.id" @click="listStore.selectList(list.id)"
        :class="{ active: listStore.selectedList && listStore.selectedList.id === list.id }">{{ list.name }}</li>
      <li @click="activateAddNewList" :class="{ editing: newListActive }">
        <span ref="newListInput" v-if="newListActive" :contenteditable="newListActive"
          @focusout="createList(); newListActive = false" @keypress.enter.prevent="createList"></span>
        <template v-if="!newListActive">+ New List</template>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
}

li {
  padding: 5px 5px;
}

li:hover {
  cursor: pointer;
  background-color: darkgray;
}

li.editing {
  background-color: white;
  cursor: text;
}

li.editing span {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>