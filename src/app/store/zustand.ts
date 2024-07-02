import { create } from 'zustand';

// Zustand is a small, fast and scaleable bearbones state-management solution.

type Item = {
    id: number;
    name: string;
};

type State = {
    items: Item[];
    addItem: (item: Item) => void;
    updateItem: (id: number, updatedItem: Item) => void;
    deleteItem: (id: number) => void;
};

const useStore = create<State>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    updateItem: (id, updatedItem) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? updatedItem : item
            ),
        })),
    deleteItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
}));

export default useStore;
