import { RouteRecordRaw } from "vue-router"
import { RouteCustomMeta } from "@/types/config"

import HomeView from "@/views/HomeView.vue"
import AuthView from "@/views/AuthView.vue"

const optionsMeta: RouteCustomMeta = {
    guest: true,
}

export const publicViews: RouteRecordRaw[] = [
    {
        name: 'HomeView',
        path: '/',
        component: HomeView,
        meta: {
            ...optionsMeta,
            title: 'CRM',
        },
    },
    {
        name: 'AuthView',
        path: '/auth',
        component: AuthView,
        meta: {
            ...optionsMeta,
            title: 'Авторизация',
        },
    }
]