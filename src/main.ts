import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import MainPage from './components/MainPage.vue'
import AllIdeas from './components/AllIdeas.vue'
import CreateIdea from './components/CreateIdea.vue'
import AdminPage from './components/AdminPage.vue'

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'main-page',
            component: MainPage
        },
        {
            path: '/all_ideas',
            name: 'all-ideas',
            component: AllIdeas
        },
        {
            path: '/create_idea',
            name: 'create-idea',
            component: CreateIdea
        },
        {
            path: '/admin_page',
            name: 'admin-page',
            component: AdminPage
        }
    ],
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

