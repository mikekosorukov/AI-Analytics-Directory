import { create } from 'zustand';

import { TABS } from '../types/tabs';

interface IStore {
	activeTab: TABS;
	setActiveTab: (tab: TABS) => void;
}

export const useStore = create<IStore>((set) => ({
	activeTab: 'explore',
	setActiveTab: (activeTab) => set({ activeTab }),
}));
