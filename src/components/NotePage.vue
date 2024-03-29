<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import type { Note } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';
import contenteditable from 'vue-contenteditable';
import { onBeforeRouteLeave } from 'vue-router';

const noteStore = useNoteStore();
const router = useRouter();
const noteId = router.currentRoute.value.params.id;
const note = ref(noteStore.allNotes.find((note) => note.id === noteId));
const deletedNote = ref(JSON.parse(JSON.stringify(note.value)) as Note);
const editedNote = ref(JSON.parse(JSON.stringify(note.value)) as Note);

let timestamp = '';
if (note.value) {
    const date = note.value.timestamp;
    timestamp = (new Date(date)).toLocaleString();
}

const updateNote = () => {
    if (note.value) {


        editedNote.value.problem = editedNote.value.problem.length > 0 ? editedNote.value.problem : '-- Поле не заполнено --',
        editedNote.value.result = editedNote.value.result.length > 0 ? editedNote.value.result : '-- Поле не заполнено --',
        editedNote.value.resources = editedNote.value.resources.length > 0 ? editedNote.value.resources : '-- Поле не заполнено --',

        note.value.title = editedNote.value.title;
        note.value.problem = editedNote.value.problem;
        note.value.result = editedNote.value.result;
        note.value.resources = editedNote.value.resources;

        const updatedNote = { ...editedNote.value, id: note.value.id };
        noteStore.updateNote(updatedNote);

        noteStore.editing = false;
    }
};

const editNote = () => {
    if (note.value) {
        noteStore.editing = true;
        editedNote.value = { ...note.value };
    }
};

const deletenote = () => {
    if (note.value) {
        const delNote = { ...deletedNote.value, id: note.value.id };
        noteStore.deleteNote(delNote);
        router.push({ name: 'all-ideas' });
    }
}

onBeforeRouteLeave((to, from, next) => {
    noteStore.editing = false;
    next();
});
</script>

<template>
    <div class="container">
        <div v-if="note" class="idea__form">
            <div class="idea__item">
                <contenteditable
                    tag="div"
                    v-if="noteStore.editing"
                    v-model="editedNote.title"
                    contenteditable="true"
                    class="content_editable edit_title"
                    style="font-weight: 500; font-size: calc(1.3rem + .6vw);">
                </contenteditable>
                <h3 v-else class="note_title">{{ note.title }}</h3>

                <span v-if="!noteStore.editing" class="material-symbols-outlined li_item" @click="editNote()">edit</span>
                <span class="material-symbols-outlined li_item" data-bs-toggle="modal" data-bs-target="#deleteModal">delete</span>
            </div>
            
            <p><strong>Проблема:</strong></p>
            <contenteditable
                tag="div"
                v-if="noteStore.editing"
                v-model="editedNote.problem"
                contenteditable="true"
                class="content_editable">
            </contenteditable>
            <pre v-else>{{ note.problem }}</pre>

            <p><strong>Результат:</strong></p>
            <contenteditable
                tag="div"
                v-if="noteStore.editing"
                v-model="editedNote.result"
                contenteditable="true"
                class="content_editable">
            </contenteditable>
            <pre v-else>{{ note.result }}</pre>

            <p><strong>Ресурсы:</strong></p>
            <contenteditable
                tag="div"
                v-if="noteStore.editing"
                v-model="editedNote.resources"
                contenteditable="true"
                placeholder="-- Поле не заполнено --"
                class="content_editable"
                id="contenteditable">
            </contenteditable>
            <pre v-else>{{ note.resources }}</pre>

            <p><strong>Время создания:</strong> {{ timestamp }}</p>

            <button v-if="noteStore.editing" type="submit" class="btn saveForm" @click="updateNote()">Сохранить</button>
        </div>
        <div v-else>
            <h2>Запись не найдена.</h2>
        </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Сообщение</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Вы уверены, что хотите удалить запись?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="deletenote()" data-bs-toggle="modal" data-bs-target="#deletedModal">Да, удалить</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deletedModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Сообщение</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Запись удалена</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ок</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
.idea__form {
    display: flex;
    flex-direction: column;
}
.note_title {
    word-wrap: normal;
    width: 60%;
    margin-bottom: 16px;
    overflow: hidden;
    word-break: keep-all;
}
.content_editable {
    word-wrap: normal;
    width: 60%;
    margin-bottom: 16px;
    border: 1.5px solid #000;
    border-radius: 5px;
    padding: 8px;
}
.content_editable:first-child {
    border: 0px;
}
.edit_title {
    font-size: 18px;
    font-weight: 600;
    word-break: keep-all;
}
pre {
    font-family: var(--bs-body-font-family) !important;
}
</style>