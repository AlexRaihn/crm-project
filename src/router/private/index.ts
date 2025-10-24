import { RouteRecordRaw } from "vue-router";

import type { RouteCustomMeta } from "@/types/config";

import PrivateView from "@/views/Private/PrivateView.vue";
import DemoView from "@/views/DemoView.vue";
import ClientsView from "@/views/Private/Clients/ClientsView.vue";

const optionsMeta: RouteCustomMeta = {
    guest: false,
    role: [],
    title: 'Система'
};

export const privateViews: RouteRecordRaw[] = [
    {
        name: 'PrivateView',
        path: '/private',
        component: PrivateView,
        redirect: {name: 'ClientsView'},
        children: [
            {
                path: 'clients',
                name: 'ClientsView',
                component: ClientsView,
                meta: {
                    ...optionsMeta,
                    title: 'Клиенты',
                    role: []
                },
            },
            {
                path: 'demo', 
                name: 'DemoView', 
                component: DemoView,
                meta: {
                    ...optionsMeta,
                    title: 'Добавление демо данных',
                    role: [1]
                },
            },
        ]
    }
]