import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

import { useAccountStore } from '@/store/Account/AccountStore'

import { publicViews } from './public'
import { privateViews } from './private'

const routes: RouteRecordRaw[] = [
  ...publicViews,
  ...privateViews,
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

  if (to.meta.guest === true) {
    return true;
  }

  if (to.meta.guest === false) {
    if (account.id > 0) {
      return true;
    } else {
      return { name: "AuthView" };
    }
  }
});

export default router