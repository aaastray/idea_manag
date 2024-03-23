<script setup lang="ts">
import { ref } from 'vue';
import contenteditable from 'vue-contenteditable';
import { v4 as uuidv4  } from 'uuid';
import { useNoteStore } from '@/stores/NoteStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const noteStore = useNoteStore();

const title = ref('');
const problem = ref('');
const result = ref('');
const resources = ref('');

const handleForm = () => {
    let insertID = noteStore.lastNoteId;

    if ( title.value.length > 0 && title.value.trim() !== '' ) {
        insertID = uuidv4();

        noteStore.addNewNote({
            id: insertID,
            title: title.value,
            problem: problem.value.length > 0 ? problem.value : '-- Поле не заполнено --',
            result: result.value.length > 0 ? result.value : '-- Поле не заполнено --',
            resources: resources.value.length > 0 ? resources.value : '-- Поле не заполнено --',
            timestamp: Date.now()
        });

        console.log(insertID);
        title.value = '';
        problem.value = '';
        result.value = '';
        resources.value = '';

        router.push({ name: 'all-ideas' });
    } else {
        alert('Заполните поле с названием!');
    }
}

</script>

<template>
    <div class="container">
        <h3>Создание идеи</h3>
        <form class="form" @submit.prevent="handleForm">
            <div>
                <p>Введите название идеи:</p>
                <contenteditable
                    tag="div"
                    class="content_editable"
                    :contenteditable="true"
                    :no-nl="true"
                    :no-html="true"
                    v-model="title"
                />
            </div>

            <div>
                <p>Проблема идеи:</p>
                <contenteditable
                    tag="div"
                    class="content_editable"
                    :contenteditable="true"
                    :no-nl="false"
                    :no-html="true"
                    v-model="problem"
                />
            </div>

            <div>
                <p>Ожидаемый результат:</p>
                <contenteditable
                    tag="div"
                    class="content_editable"
                    :contenteditable="true"
                    :no-nl="false"
                    :no-html="true"
                    v-model="result"
                />
            </div>

            <div>
                <p>Необходимые ресурсы:</p>
                <contenteditable
                    tag="div"
                    class="content_editable"
                    :contenteditable="true"
                    :no-nl="false"
                    :no-html="true"
                    v-model="resources"
                />
            </div>

            <button type="submit" class="btn">Сохранить</button>
        </form>
    </div>
</template>

<style scoped>
p {
    margin-bottom: 5px;
}
.form {
    padding: 10px 30px 30px;
}
.btn {
  margin-left: 0px;
}
.content_editable {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 30px;
}
</style>