<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps();

const toggleUserRole = () => {
  const userRole = localStorage.getItem('userRole');

  if (userRole === 'admin') {
    localStorage.setItem('userRole', 'initiator');
  } else {
    localStorage.setItem('userRole', 'admin');
  };
}

import { ref } from 'vue'
const role = ref(localStorage.getItem('userRole') || 'initiator')
const isAdmin = (role: string): boolean => {
  return role === 'admin';
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-fixed" style="background-color: #fff;">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Idea Manag.</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/all_ideas">Список идей</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Создать
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/create_idea">Записать идею</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Быстрая идея</a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" v-if="isAdmin(role)" href="/admin_page" >Для админов</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" @click="toggleUserRole" href="">Сменить роль</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <router-view />
  </main>
</template>

<style scoped>

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
  height: 100vh;
  padding-top: 56px;
  margin: 0 20px;
}

</style>
