<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from '@/stores/NoteStore';
import type { Note } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';

const noteStore = useNoteStore();
const router = useRouter();

const notes = noteStore.allNotes;
const noteId = router.currentRoute.value.params.id;
const note = ref(noteStore.allNotes.find((note) => note.id === noteId));

const editNote = (noteId: string) => {
    noteStore.editing = true;
};

const deleteNote = (note: Note) => {
  const question = confirm('Вы точно хотите удалить запись?');
  if (question) {
    noteStore.deleteNote(note);
  }
};
</script>

<template>
    <div class="container">

        <div class="pagenav">
            <h3>Все записи идей</h3>

            <router-link :to="{name: 'create-idea'}">
                <button class="btn">Создать идею</button>
            </router-link>
        </div>
        
        <div class="all__ideas__list">
            <ul class="ideas__list">
                <li class="idea__item__list" v-for="note in notes" :key="note.id">
                    <div class="idea__item">
                        <router-link :to="{name: 'note-page', params: { id: note.id}}" class="a_link">
                            <p class="idea__item__title">{{ note.title }}</p>
                        </router-link>

                        <div>
                            <router-link :to="{name: 'note-page', params: { id: note.id}}" class="a_link li_item">
                                <span class="material-symbols-outlined li_item" @click="editNote(note.id)">edit</span>
                            </router-link>

                            <span class="material-symbols-outlined li_item" @click="deleteNote(note)">delete</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
li {
    list-style-type: none;
}
li:last-child {
    border-bottom: none;
}
ul {
    margin-left: 0;
    padding-left: 0;
}
.a_link {
    width: 70%;
    text-decoration: none;
    color: var(--bs-heading-color);
}
.pagenav {
    display: flex;
    justify-content: space-between
}
.all__ideas__list {
    padding: 30px;
}
.idea__item__list {
    border-bottom: 1px solid rgba(0, 0, 0, .8);
}
.idea__item__list:last-child {
    border-bottom: none;
}
.idea__item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}
.idea__item__title {
    width: 100%;
    margin: 0;
    word-break: keep-all;
}
.li_item {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
}
.li_item:last-child {
    margin-left: 0;
    margin-right: 0;
}
</style>