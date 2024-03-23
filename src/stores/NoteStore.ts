import { defineStore } from 'pinia';

export interface Note {
    id: string;
    title: string;
    problem: string;
    result: string;
    resources: string;
    timestamp: number;
}

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        lastNoteId: '',
        notes: JSON.parse(localStorage.getItem('notes') || '[]') as Note[]
    }),
    getters: {
        allNotes: ( state ) => {
            return state.notes;
        }
    },
    actions: {
        addNewNote(nnote: any) {
            const newNotesArr = [nnote, ...this.notes];
            this.notes = newNotesArr;
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },

        updateNote(updatedNote: Note) {
            const index = this.notes.findIndex((note) => note.id === updatedNote.id);
            if (index !== -1) {
                this.notes.splice(index, 1, updatedNote);
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        },

        deleteNote(deletedNote: Note) {
            const index = this.notes.findIndex((note) => note.id === deletedNote.id);
            if (index !== -1) {
                this.notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
        }
    }
});