import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from '@/stores/user';

export const useListStore = defineStore("list", () => {

  type ListItemData = {
    id: number,
    todolist: number,
    content: string,
  }

  type ListData = {
    id: number,
    user: number,
    name: string,
    items : ListItemData[]
  }


  const lists = ref<ListData[]>([]);
  const selectedList = ref<ListData>();

  const apiGet = (url: string) => {

    const userStore = useUserStore();

    return fetch('http://127.0.0.1:8000/api/'+url, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + userStore.token,
        },
      })
  }
  const apiPost = (url: string, data = {}) => {

    const userStore = useUserStore();

    return fetch('http://127.0.0.1:8000/api/'+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userStore.token,
      },
      body: JSON.stringify(data)
    })
  }
  const apiDelete = (url: string) => {

    const userStore = useUserStore();

    return fetch('http://127.0.0.1:8000/api/'+url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userStore.token,
      },
    })
  }
  const apiPatch = (url: string, data = {}) => {

    const userStore = useUserStore();

    return fetch('http://127.0.0.1:8000/api/'+url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + userStore.token,
      },
      body: JSON.stringify(data)
    })
  }
  const fetchLists = () => {
    let req = apiGet('list/');
    req.then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          lists.value = data;
        })
      }
    });
  }
  const fetchListItems = (listID: number) => {
    let req = apiGet(`list/${listID}/item/`);
    req.then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          lists.value.filter(list => list.id === listID).forEach(list => list.items = data);
        })
      }
    })
  }
  const createListItem = (newItem: ListItemData) => {
    let req = apiPost(`list/${newItem.todolist}/item/`, {todolist:newItem.todolist,content:newItem.content});
    req.then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
        })
        fetchListItems(newItem.todolist);
      }
    })
  }
  const deleteListItem = (item: ListItemData) => {
    let req = apiDelete(`list/${item.todolist}/item/${item.id}`);
    req.then((res) => {
      if (res.status === 204) {
        lists.value.filter(list => list.id === item.todolist).forEach(list => { list.items = list.items.filter(listitem=>listitem.id!==item.id) });
        fetchListItems(item.todolist);
      }
    })
  }
  const patchListItem = (item: ListItemData) => {
    let req = apiPatch(`list/${item.todolist}/item/${item.id}/`, {todolist:item.todolist,content:item.content});
    req.then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
        })
        fetchListItems(item.todolist);
      }
    })
  }
  const fetchList = (listID:number) => {
    let req = apiGet(`list/${listID}/`);
    req.then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          lists.value.filter(list=>list.id===listID).forEach(list=>{list.name=data.name})
        })
      }
    });
  }
  const createList = (newList: ListData) => {
    let req = apiPost(`list/`, {name:newList.name});
    req.then((res) => {
      if (res.status === 201) {
        res.json().then((data) => {
        })
        fetchLists();
      }
    })
  }
  const patchList = (list: ListData) => {
    console.log('here')
    let req = apiPatch(`list/${list.id}/`, {name:list.name});
    req.then((res) => {
      console.log('status',res.status)
      if (res.status === 200) {
        res.json().then((data) => {
        })
        fetchList(list.id);
      }
    })
  }
  const selectList = (id: number) => {
    if (lists.value) {
      
      selectedList.value = lists.value.find(list => list.id === id);
      if (selectedList.value && selectedList.value.items === undefined) {
        selectedList.value.items = [];
        fetchListItems(selectedList.value.id);
      }
    }
  }

  return { lists, selectedList, selectList, fetchLists, fetchListItems, createListItem,deleteListItem,patchListItem,fetchList,patchList,createList, };
});
