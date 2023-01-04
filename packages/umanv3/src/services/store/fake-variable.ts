import { defineStore } from "pinia";
import { generateFakeData, Item } from "./@models/fake-models";

export type RootState = {
  items: Item[];
  test: string;
  cpt: number;
};

export const useMainStore = defineStore({
  id: "fake-variable",
  state: () =>
    ({
      items: [],
      test: "Bonsoir",
      cpt: 0
    } as RootState),
  getters:{
    count: state =>{
      state.cpt+1;
    }
  },
  actions: {
    createNewItem(item: Item) {
      if (!item) return;

      this.items.push(item);
    },
    updateItem(id: string, payload: Item) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.items[index] = generateFakeData();
      }
    },
    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.items.splice(index, 1);
    },
    findIndexById(id: string) {
      return this.items.findIndex((item) => item.id === id);
    },
    addOne(){
      this.cpt++;
    }
  },
});
