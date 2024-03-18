<script setup lang="ts">
import { useRoleStore } from '../stores/store';

const roleStore = useRoleStore();
const updateRole = (role: string) => {
  roleStore.updateRole(role);
}
</script>

<template>
    <div class="container">
      <div class="first-page" id="firstPage">
        <h3 class="title">Приветсвуем Вас</h3>
        <p class="text">Этот сайт был создан для тренировки. Я добавлю немного текста здесь,
          чтобы создать видимость содержательности. Строго не судить, я потратила
          много сил. Ну это так... Инфа чисто, если кому-нибудь интересно <span>&#128522;</span>
        </p>
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
.first-page {
  width: 100%;
  height: 100%;
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