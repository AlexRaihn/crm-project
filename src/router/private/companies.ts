import { RouteRecordRaw } from "vue-router";

import type { RouteCustomMeta } from "@/types/config";

import CompaniesView from "@/views/Private/Clients/Companies/CompaniesView.vue";
import CompanyInfoView from "@/views/Private/Clients/Companies/CompanyInfoView.vue";

const optionsMeta: RouteCustomMeta = {
    guest: false,
    role: [],
    title: 'Компании'
};

export const companiesViews: RouteRecordRaw[] = [
    {
        path: '/companies',
        name: 'CompaniesView',
        meta: optionsMeta,
        component: CompaniesView,
        children: []
    },
    {
        name: 'CompanyInfoView',
        path: '/companies/:companyId',
        props: true,
        meta: optionsMeta,
        component: CompanyInfoView,
        children: []
    }
];