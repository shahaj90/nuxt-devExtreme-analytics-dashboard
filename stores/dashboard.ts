import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    isLoading: true,
    popupVisible: false,
    selectedRow: null as null | { action: string; user: string; time: string },
  }),

  actions: {
    showPopup(row: any) {
      this.selectedRow = row;
      this.popupVisible = true;
    },
    hidePopup() {
      this.popupVisible = false;
    },
    finishLoading() {
      this.isLoading = false;
    },
  },
});
