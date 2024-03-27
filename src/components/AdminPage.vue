<script setup lang="ts">
import { useIdeasStore } from '@/stores/AdminIdeas';
import contenteditable from 'vue-contenteditable';
import { ref } from 'vue';

const title = ref('');
const showModal = ref(false);

const ideasStore = useIdeasStore();
const ideas = ideasStore.allIdeas;

const loadRandomIdeas = () => {
    fetch('https://6602eb1d9d7276a7555492a3.mockapi.io/api/ideas/ideas')
        .then(res => {
            return res.json();
        })
        .then(data => {
            let randomId = Math.floor(Math.random() * data.length);
            let randomIdea = { id: ideas.length+1, title: data[randomId].title };
            ideasStore.addIdea(randomIdea);
            ideas.unshift(randomIdea);
        })
}

const addNewIdea = () => {
    let ideaTitlefromModal = title.value;
    showModal.value = true;

    if (ideaTitlefromModal) {
        if (ideaTitlefromModal.length > 0) {
            const newIdea = { id: ideas.length + 1, title: ideaTitlefromModal };
            ideasStore.addIdea(newIdea);
            ideas.unshift(newIdea);
            title.value = '';
        }
    }
};
</script>

<template>
    <div class="container">
        <h3>Администраторская страница</h3>

        <div class="btns_view">
            <button class="btn" @click="loadRandomIdeas">Рандом</button>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#adminIdeaModal">Добавить идею</button>
        </div>

        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="idea in ideas" :key="idea.id">{{ idea.title }}</li>
        </ul>

        <div class="modal fade" id="adminIdeaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Сообщение</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Введите название идеи</p>
                        <contenteditable
                        tag="div"
                        class="content_editable_admin"
                        :contenteditable="true"
                        :no-nl="true"
                        :no-html="true"
                        v-model="title"
                        id="contenteditable"
                        />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="addNewIdea" data-bs-toggle="modal" data-bs-target="#doneAdminModal">Сохранить</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="doneAdminModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Сообщение</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p v-if="showModal">Идея сохранена</p>
            <p v-else>Ошибка, попробуйте снова</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style>

.content_editable_admin {
  width: 100%;
  word-break: break-all;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

</style>