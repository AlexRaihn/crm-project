import { RouteRecordRaw } from "vue-router";

import type { RouteCustomMeta } from "@/types/config";

import ClientsView from "@/views/Private/Clients/ClientsView.vue";
import ClientsInfoView from "@/views/Private/Clients/ClientsInfoView.vue";

const optionsMeta: RouteCustomMeta = {
    guest: false,
    role: [],
    title: 'Клиенты'
};

export const clientsViews: RouteRecordRaw[] = [
    {
        path: '/clients',
        name: 'ClientsView',
        component: ClientsView,
        meta: {
            ...optionsMeta
        },
    },
    {
        path: '/clients/:clientId',
        name: 'ClientInfoView',
        component: ClientsInfoView,
        props: true,
        meta: {
            ...optionsMeta,
            title: 'Информация о клиенте',
        },
    },
];