<script setup lang="ts">
import { useIdeasStore } from '@/stores/AdminIdeas';

const ideasStore = useIdeasStore();
const ideas = ideasStore.allIdeas;

const loadRandomIdeas = () => {
    fetch('https://6602eb1d9d7276a7555492a3.mockapi.io/api/ideas/ideas')
        .then(res => {
            return res.json();
        })
        .then(data => {
            const randomId = Math.floor(Math.random() * data.length);
            const randomIdea = { id: ideas.length+1, title: data[randomId].title };
            ideasStore.addIdea(randomIdea);
            ideas.push(randomIdea);
        })
}

const addNewIdea = () => {
    let ideaTitlefromModal = prompt('Ввидите идею');

    if (ideaTitlefromModal) {
        if (ideaTitlefromModal.length > 0) {
            const newIdea = { id: ideas.length + 1, title: ideaTitlefromModal };
            ideasStore.addIdea(newIdea);
            ideas.push(newIdea);
        }
    }
};
</script>

<template>
    <div class="container">
        <h3>Администраторская страница</h3>

        <div class="btns_view">
            <button class="btn" @click="loadRandomIdeas">Обновить</button>
            <button class="btn" @click="addNewIdea">Добавить идею</button>
        </div>

        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="idea in ideas" :key="idea.id">{{ idea.title }}</li>
        </ul>
    </div>
</template>