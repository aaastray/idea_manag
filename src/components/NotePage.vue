<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import type { Note } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';

const noteStore = useNoteStore();
const router = useRouter();
const noteId = router.currentRoute.value.params.id;
const note = ref(noteStore.allNotes.find((note) => note.id === noteId));
const deletedNote = ref(JSON.parse(JSON.stringify(note.value)) as Note);

let timestamp = '';
if (note.value) {
    const date = note.value.timestamp;
    timestamp = (new Date(date)).toLocaleString();
}

const editNote = (noteId: string) => {
  router.push({ name: 'edit-page', params: { id: noteId } });
};

const deleteNote = () => {
    if (note.value) {
        let question = confirm('Вы точно хотите удалить запись?');

        if (question) {
            const delNote = { ...deletedNote.value, id: note.value.id };
            noteStore.deleteNote(delNote);
            router.push({ name: 'all-ideas' });
        }
    }
}
</script>

<template>
    <div class="container">
        <div v-if="note">
            <div class="idea__item">
                <h3 class="note_title">{{ note.title }}</h3>
                <span class="material-symbols-outlined li_item" @click="editNote(note.id)">edit</span>
                <span class="material-symbols-outlined li_item" @click="deleteNote()">delete</span>
            </div>
            
            <p><strong>Проблема:</strong></p>
            <pre>{{ note.problem ? note.problem : '-- Поле не заполнено --' }}</pre>

            <p><strong>Результат:</strong></p>
            <pre>{{ note.result ? note.result : '-- Поле не заполнено --' }}</pre>

            <p><strong>Ресурсы:</strong></p>
            <pre>{{ note.resources ? note.resources : '-- Поле не заполнено --' }}</pre>

            <p><strong>Время создания:</strong> {{ timestamp }}</p>
        </div>
        <div v-else>
            <h2>Запись не найдена.</h2>
        </div>
    </div>
</template>

<style>
.note_title {
    word-wrap: normal;
    width: 60%;
}
pre {
    font-family: var(--bs-body-font-family) !important;
}
</style>