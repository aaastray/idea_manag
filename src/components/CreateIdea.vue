<script setup lang="ts">
</script>

<template>
    <div class="container">
        <h3>Тут можно будет создать идею</h3>
        <form>
            <div class="form">
                <p>Введите название идеи:</p><input type="text" id="nameIdea">
            </div>
            <div>
                <p>Проблема идеи:</p><input type="text">
            </div>
            <div>
                <p>Ожидаемый результат:</p><textarea></textarea>
            </div>
            <div>
                <p>Необходимые ресурсы:</p><input type="text">
            </div>
            <button type="submit" class="btn">Сохранить</button>
        </form>
    </div>
</template>

<style scoped>
.btn {
  margin-left: 0px;
}
</style>