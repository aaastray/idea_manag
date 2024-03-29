<script setup lang="ts">
import { useRoleStore } from '../stores/store';

const roleStore = useRoleStore();
const updateRole = (role: string) => {
  roleStore.updateRole(role);
}
</script>

<template>
    <div class="container main">
      <div class="first-page">
        <h3 class="title">Приветсвуем Вас</h3>
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero a perspiciatis velit. Reiciendis, consectetur ipsam vero placeat quo sapiente sit quis neque nulla praesentium, alias molestias, impedit ipsa. Vitae, eaque.</p>
        <p class="text">Выберите вашу роль:</p>
        <div class="select">
            <button class="btn" @click="updateRole('initiator')">Инициатор</button>
            <button class="btn" @click="updateRole('admin')">Администратор</button>
        </div>
        <p class="text txt-accent">Текущая роль : {{ roleStore.getRoleName }}</p>
      </div>
    </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.first-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.title {
  margin-bottom: 55px;
}
.text {
  text-align: center;
  width: 75%;
  font-size: 17px;
  margin-bottom: 15px;
}
.txt-accent {
  font-weight: 600;
  text-decoration: underline;
}

.select {
  margin-bottom: 55px;
}
</style>../stores/store