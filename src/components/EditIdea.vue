<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNoteStore } from '@/stores/NoteStore';
import type { Note } from '@/stores/NoteStore';
import contenteditable from 'vue-contenteditable';

const noteStore = useNoteStore();
const router = useRouter();
const noteId = router.currentRoute.value.params.id;
const note = ref(noteStore.allNotes.find((note) => note.id === noteId));
const editedNote = ref(JSON.parse(JSON.stringify(note.value)) as Note);

let timestamp = '';
if (note.value) {
    const date = note.value.timestamp;
    timestamp = (new Date(date)).toLocaleString();
}

let title = ref('');
let problem = ref('');
let result = ref('');
let resources = ref('');

const updateNote = () => {
    if (note.value) {
        title = ref(editedNote.value.title);
        problem = ref(editedNote.value.problem);
        result = ref(editedNote.value.result);
        resources = ref(editedNote.value.resources);

        const updatedNote = { ...editedNote.value, id: note.value.id };
        noteStore.updateNote(updatedNote);
        router.push({ name: 'all-ideas' });
    }
};

</script>
<template>
    <div class="container">
        <div v-if="note">
            <form class="form" @submit.prevent="updateNote">
                <div class="form_header">
                    <contenteditable
                        tag="div"
                        v-model="editedNote.title"
                        contenteditable="true"
                        class="content_editable edit_title">
                    </contenteditable>
                    <button type="submit" class="btn saveform">Сохранить</button>
                </div>

                <p><strong>Проблема:</strong></p>
                <contenteditable
                    tag="div"
                    v-model="editedNote.problem"
                    contenteditable="true"
                    class="content_editable">{{ editedNote.problem ? editedNote.problem : '-- Поле не заполнено --' }}
                </contenteditable>

                <p><strong>Результат:</strong></p>
                <contenteditable
                    tag="div"
                    v-model="editedNote.result"
                    contenteditable="true"
                    class="content_editable">
                    {{ editedNote.result.length == 0 ? '-- Поле не заполнено --' : editedNote.result }}
                </contenteditable>

                <p><strong>Ресурсы:</strong></p>
                <contenteditable
                    tag="div"
                    v-model="editedNote.resources"
                    contenteditable="true"
                    placeholder="-- Поле не заполнено --"
                    class="content_editable">
                </contenteditable>

                <p><strong>Время создания:</strong> {{ timestamp }}</p>
            </form>
        </div>
    </div>
</template>

<style>
.content_editable {
    word-wrap: normal;
    width: 60%;
    margin-bottom: 16px;
}
.form_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    overflow: hidden;
}
.saveform {
    margin-left: 0;
}
.edit_title {
    font-size: 18px;
    font-weight: 600;
}
</style>