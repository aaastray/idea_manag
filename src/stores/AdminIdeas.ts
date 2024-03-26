import { defineStore } from 'pinia';

export interface Idea {
    title: string;
    id: number;
};

export const useIdeasStore = defineStore('adminStore', {
    state: () => ({
        ideas: JSON.parse(localStorage.getItem('adminIdeas') || '[]') as Idea[]
    }),
    getters: {
        allIdeas: ( state ) => {
            return state.ideas;
        }
    },
    actions: {
        addIdea(newIdea: any) {
            const newNotesArr = [newIdea, ...this.ideas];
            this.ideas = newNotesArr;
            localStorage.setItem('adminIdeas', JSON.stringify(this.ideas));
        }
    }
});