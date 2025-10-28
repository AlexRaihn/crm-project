import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import { useAccountStore } from '@/store/Account/AccountStore'

import { publicViews } from './public'
import { privateViews } from './private'

import NotFoundView from '@/views/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
  ...publicViews,
  ...privateViews,
  {
    name: 'NotFoundView',
    component: NotFoundView,
    path: '/:pathMatch(.*)*',
    props: true,
    meta: {
      guest: true,
      title: 'Страница не найдена',
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { account, setAccountItem } = useAccountStore();
  const accountId = Number(localStorage.getItem("user"));

  if (accountId && !isNaN(accountId) && accountId != 0)
    setAccountItem(accountId);

  const title = (to.meta?.title as string) ?? "CRM";
  document.title = title;

  if (to.meta.guest === true)
    return true;

  if (to.meta.guest === false) {
    if(account.id === 0)
      return { name: "AuthView" };

    const routeRoles = to.meta.role as number[] | undefined;

    console.log('!!', account.role, routeRoles)
    if(routeRoles === undefined || routeRoles.length === 0) {
      console.log(to)
      return true
    }
    else if(routeRoles.find(el => el === account.role))
      return true
    else {
      console.log('No access to view:', to.name);
      return { name: "NotFoundView", props: {noAccess: true} };
    }
  }
});

export default router