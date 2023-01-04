<script setup lang="ts">

import { useListStore } from '@/stores/list';
import type { ListStyleProperty } from 'csstype';
import { ref, nextTick, onBeforeUnmount } from 'vue';

const listStore = useListStore();

const newItemActive = ref(false);
const newItemValue = ref('');
const newItemInput = ref();
const editedItem = ref<number>();
const editedItemInput = ref();
const listNameInput = ref();
const renameListActive = ref(false);

const activateAddNewItem = () => {
  newItemActive.value = true;
  nextTick(() => {
    newItemInput.value.focus();
  })

}

const addNewItem = () => {
  if (listStore.selectedList && newItemValue.value) {
    let newItem = { id: -1, todolist: listStore.selectedList.id, content: newItemValue.value }
    listStore.selectedList.items.push(newItem);
    listStore.createListItem(newItem);
  }
  newItemValue.value = '';
}
const deleteItem = (item: any) => {
  if (item.id >= 0) listStore.deleteListItem(item)
}
const setEditedItem = (itemID: number) => {
  editedItem.value = itemID
  nextTick(() => editedItemInput.value[0].focus())
}
const updateItem = (item: any) => {
  editedItem.value = undefined;
  if (item.id >= 0) listStore.patchListItem(item);
}
const enableRenameList = () => {
  nextTick(() => nextTick(() => listNameInput.value.focus()));
  renameListActive.value = true;
}
const renameList = (list: any) => {
  if (renameListActive.value) {
    renameListActive.value = false;
    list.name = listNameInput.value.textContent;
    if (list.id >= 0) listStore.patchList(list);
    listNameInput.value.blur()
  }
}


onBeforeUnmount(() => {
  listStore.selectedList = undefined;
})
</script>

<template>
  <div id="list-item-panel">
    <div class="list-header">
      <h1 ref="listNameInput" :class="{ active: renameListActive }" :contenteditable="renameListActive"
        @focusout="renameList(listStore.selectedList)" @keypress.enter.prevent="renameList(listStore.selectedList)">{{
    listStore.selectedList?.name
}}</h1>
      <div @click="enableRenameList">Rename</div>
      <div>Delete</div>
    </div>
    <div class="list-items-container">
      <ul v-if="listStore.selectedList">
        <li v-for="item in listStore.selectedList.items" :key="item.id" class="item">
          <div class="item-content">
            <span v-if="editedItem !== item.id">{{ item.content }}</span>
            <input v-if="editedItem === item.id" ref="editedItemInput" v-model="item.content"
              @keypress.enter="updateItem(item)" @focusout="updateItem(item)" />
          </div>
          <div @click="setEditedItem(item.id)"><font-awesome-icon icon="fa-regular fa-pen-to-square" /></div>
          <div @click="deleteItem(item)"><font-awesome-icon icon="fa-regular fa-trash-can" /></div>
        </li>
        <li @click="activateAddNewItem" :class="{ active: newItemActive }">
          <template v-if="!newItemActive">+ New Item</template>
          <template v-if="newItemActive"><input ref="newItemInput" @keypress.enter="addNewItem"
              @focusout="() => { addNewItem(); newItemActive=false}" v-model.trim="newItemValue" /></template>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
#list-item-panel {
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0px 10px;
}

.list-header {
  display: flex;
  width: 100%;
  align-items: center;
}

h1 {
  flex-grow: 1;
}

h1.active {
  background-color: white;
}

.list-header div {
  padding: 5px;
  margin-left: 10px;
}

.list-header div:hover {
  cursor: pointer;
  background-color: darkgray;
}

.list-items-container {
  width: 100%;
}

ul {
  padding: 0px;
  margin: 0px;
  list-style: none;
  width: 100%;
}

li {
  padding: 5px 5px;
  width: 100%;
  border-bottom: 1px solid darkgray;
}

li:first-child {
  border-top: 1px solid darkgray;
}

li.item {
  display: flex;
}

li.item .item-content {
  flex-grow: 1;
}

svg {
  padding: 5px;
  margin-left: 10px;
  flex-grow: 0;
}

svg:hover {
  cursor: pointer;
  background-color: darkgray;
}

input {
  background-color: transparent;
  border: none;
  padding: 5px 5px;
  width: 100%;
  background: white;
}

li.active {
  padding: 0px;
}
</style>