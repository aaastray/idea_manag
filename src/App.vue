<script setup lang="ts">
import { ref } from 'vue';
import contenteditable from 'vue-contenteditable';
import { useRoleStore } from './stores/store';
import { v4 as uuidv4  } from 'uuid';
import { useNoteStore } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const noteStore = useNoteStore();

const myModal = document.getElementById('myModal') as HTMLElement | null;
const myInput = document.getElementById('myInput') as HTMLElement | null;

if (myModal && myInput) {
  myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus();
  });
}

const showDoneModal = ref(false);
const title = ref('');
const roleStore = useRoleStore();
const toggleUserRole = () => {
  roleStore.toggleUserRole();
}


const saveModal = () => {
  let noteTitlefromModal = title.value;

  if (noteTitlefromModal) {
    let insertID = noteStore.lastNoteId;
    
    if ( noteTitlefromModal.length > 0 ) {
      insertID = uuidv4();

      noteStore.addNewNote({
        id: insertID,
        title: noteTitlefromModal,
        problem: '-- Поле не заполнено --',
        result: '-- Поле не заполнено --',
        resources: '-- Поле не заполнено --',
        timestamp: Date.now()
      });
      showDoneModal.value = true;
      title.value = '';
      router.push({name: 'note-page', params: { id: insertID }});
    }
  }
}
</script>

<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-fixed" style="background-color: #fff;">
      <div class="container-fluid">
        <router-link to="/" class="nav-link main_link">Idea Manag.</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/all_ideas" class="nav-link">Список идей</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Создать
              </a>
              <ul class="dropdown-menu">
                <li><router-link to="/create_idea" class="dropdown-item">Записать идею</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="" data-bs-toggle="modal" data-bs-target="#newIdeaModal">Быстрая идея</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="toggleUserRole" href="">Сменить роль</a>
            </li>
            
            <li class="nav-item">
              <router-link to="/admin_page" class="nav-link" v-if="roleStore.isAdmin">Для админов</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <div class="modal fade" id="newIdeaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              class="content_editable"
              :contenteditable="true"
              :no-nl="true"
              :no-html="true"
              v-model="title"
              id="contenteditable"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="saveModal()" data-bs-toggle="modal" data-bs-target="#doneModal">Сохранить</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="doneModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Сообщение</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p v-if="showDoneModal">Идея сохранена</p>
            <p v-else>Ошибка, попробуйте снова</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </main>
  
</template>

<style scoped>
.content_editable {
  width: 100%;
  word-break: break-all;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}
.btn-secondary {
  margin-left: 0;
}
.main_link {
  margin-right: 15px;
}
.container-fluid {
  max-width: 1200px;
  padding: 0 35px;
}
.navbar-fixed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
