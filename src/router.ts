import { createRouter, createWebHistory } from 'vue-router';
import { useRoleStore } from './stores/store';

import MainPage from './components/MainPage.vue';
import AllIdeas from './components/AllIdeas.vue';
import CreateIdea from './components/CreateIdea.vue';
import AdminPage from './components/AdminPage.vue';
import NotePage from './components/NotePage.vue';

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
            component: AdminPage,
            meta: {
                needAdminRole: true
            }
        },
        {
            path: '/notepage/:id',
            name: 'note-page',
            component: () => NotePage
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const roleStore = useRoleStore()
    const isAdmin = roleStore.isAdmin;

    if (to.meta.needAdminRole) {
        if (!isAdmin) {
            next({ name: 'main-page' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;