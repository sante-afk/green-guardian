export const routes: Array<any> = [
    { 
        path: '/', 
        name: 'main-layout', 
        component: () => import('../layouts/MainLayout.vue') },
    { 
        path: '/tasks', 
        name: 'my-tasks', 
        component: () => import('../layouts/MyTasks.vue') },
    { 
        path: '/compTasks', 
        name: 'complete-tasks', 
        component: () => import('../layouts/CompleteTasks.vue') }
]