import { defineStore } from 'pinia';

interface Note {
    id: number;
    title: string;
    problem: string;
    result: string;
    resources: string;
    timestamp: number;
}

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        lastNoteId: '',
        notes: [] as Note[]
    }),
    getters: {
        allNotes: ( state ) => {
            return state.notes;
        }
    },
    actions: {
        // addNote(newNote: Note): void {
        //     this.notes.push({
        //         id: this.notes.length + 1,
        //         title: newNote.title,
        //         problem: newNote.problem,
        //         result: newNote.result,
        //         resources: newNote.resources,
        //         timestamp: Date.now()
        //     });
        // },

        addNewNote(nnote: any) {
            const newNotesArr = [nnote, ...this.notes];
            this.notes = newNotesArr;
        }
    }
});