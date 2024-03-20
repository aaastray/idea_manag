<script setup lang="ts">
import { useRoleStore } from './stores/store';

const roleStore = useRoleStore();
const toggleUserRole = () => {
  roleStore.toggleUserRole();
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
                <li><a class="dropdown-item" href="#">Быстрая идея</a></li>
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
    <router-view />
  </main>
  
</template>

<style scoped>
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
</style>./stores/store
