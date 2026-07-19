export const routes: Array<any> = [
    {
        path: '/',
        name: 'main-layout',
        component: () => import('../layouts/MainLayout.vue'),
        props: true
    },
    {
        path: '/tasks',
        name: 'my-tasks',
        component: () => import('../layouts/MyTasksLayout.vue'),
        props: true
    },
    {
        path: '/compTasks',
        name: 'complete-tasks',
        component: () => import('../layouts/CompleteTasksLayout.vue'),
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-layout',
        component: () => import('../layouts/ErrorNotFoundLayout.vue')
    }
]