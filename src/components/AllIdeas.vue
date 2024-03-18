<script setup lang="ts">
import { useNoteStore } from '@/stores/NoteStore';

const noteStore = useNoteStore();
const notes = noteStore.allNotes;
</script>

<template>
    <div class="container">

        <div class="pagenav">
            <h3>Тут будут все идеи</h3>

            <router-link :to="{name: 'create-idea'}">
                Создать идею
            </router-link>
        </div>

        <!-- <span class="material-symbols-outlined">search</span> -->
        
        <div class="all__ideas__list">
            <ul class="ideas__list">
                <li class="idea__item__list" v-for="note in notes" :key="note.id">
                    <div class="idea__item">
                        <p class="idea__item__title">{{ note.title }}</p>
                        <span class="material-symbols-outlined li_item">edit</span>
                        <span class="material-symbols-outlined li_item">delete</span>
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
    display: flex;
    margin: 10px 0;
}
.idea__item__title {
    width: 33%;
    margin: 0;
}
.li_item {
    margin-left: auto;
    margin-right: 20px;
}
.li_item:last-child {
    margin-left: 0;
    margin-right: 0;
}
</style>