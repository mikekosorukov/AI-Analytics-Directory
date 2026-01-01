import { create } from 'zustand';

interface IStore {
	selectedCategory: string;
	selectedTechnicality: string;
	setSelectedCategory: (category: string) => void;
	setSelectedTechnicality: (technicality: string) => void;
	clearFilters: () => void;
	resetScrollTrigger: number;
	triggerScrollReset: () => void;
}

export const useStore = create<IStore>((set) => ({
	selectedCategory: 'all',
	selectedTechnicality: 'all',
	setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
	setSelectedTechnicality: (selectedTechnicality) => set({ selectedTechnicality }),
	clearFilters: () => set({ selectedCategory: 'all', selectedTechnicality: 'all' }),
	resetScrollTrigger: 0,
	triggerScrollReset: () => set((state) => ({ resetScrollTrigger: state.resetScrollTrigger + 1 })),
}));
