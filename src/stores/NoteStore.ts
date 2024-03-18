import { defineStore } from 'pinia';

export const useNoteStore = defineStore('noteStore', {
    state: () => ({
        notes: [
            {
                id: 1,
                title: 'Note title',
                problem: 'text',
                result: 'text',
                resources: 'text',
                timestamp: Date.now()
            },
            {
                id: 2,
                title: 'Note about lalala',
                problem: 'text',
                result: 'text',
                resources: 'text',
                timestamp: Date.now()
            },
            {
                id: 3,
                title: 'Note abshtttttttttethh tttttttttttttsfgs fgsfgsfgfgsf gsfsgrtttttttttt ttttttttt tttttehethet tttttfgsfgst tttttttttttt bhdgdgttttttt tttttttttttt ttttttttttt tttttttttt tttttout lalala',
                problem: 'text',
                result: 'text',
                resources: 'text',
                timestamp: Date.now()
            },
            {
                id: 4,
                title: 'Notesss',
                problem: 'text',
                result: 'text',
                resources: 'text',
                timestamp: Date.now()
            }
        ]
    }),
    getters: {
        allNotes: ( state ) => {
            return state.notes;
        }
    }
});