import { reactive, provide, inject } from 'vue';

const ModalSymbol = Symbol('ModalSymbol');

export function createModalStore() {
  const state = reactive({
    currentItemId: null,
  });

//   const showModal = (id) => {
//     state.currentItemId = id;
//     state.isModalVisible = true;
//   };

//   const hideModal = () => {
//     state.isModalVisible = false;
//   };

  return {
    state
    // showModal,
    // hideModal
  };
}

export function useModalStore() {
  const store = inject(ModalSymbol);
  if (!store) {
    throw new Error('ModalStore is not provided');
  }
  return store;
}

export function ModalProvider({ children }) {
  const store = createModalStore();
  provide(ModalSymbol, store);
  return children;
}
