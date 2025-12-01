<script setup lang="ts">
import {
  UserRound,
  HomeIcon,
  Settings,
  Building2,
  DollarSignIcon,
} from "lucide-vue-next";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAccountStore } from "@/store/Account/AccountStore";
import { computed } from "vue";

const { account } = useAccountStore();

type MenuItem = {
  title: string;
  url: string;
  icon?: any;
  role: number[];
};

// Menu items.
const items: MenuItem[] = [
  {
    title: "Главная",
    url: "DashboardView",
    icon: HomeIcon,
    role: [],
  },
  {
    title: "Клиенты",
    url: "ClientsView",
    icon: UserRound,
    role: [],
  },
  {
    title: "Компании",
    url: "CompaniesView",
    icon: Building2,
    role: [],
  },
  {
    title: "Пользователи CRM",
    url: "CrmUsersView",
    icon: Settings,
    role: [0, 1],
  },
];

function checkRole(roles: number[]): boolean {
  if (roles.length === 0) return true;
  return roles.includes(account.role);
}

const menuItems = computed(() => {
  let res = [];
  for (const item of items) {
    if (item.role.length === 0) {
      res.push(item);
    } else {
      checkRole(item.role) && res.push(item);
    }
  }
  return res;
});
</script>

<template>
  <Sidebar>
    <SidebarContent class="p-4">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuItems" :key="item.title">
              <RouterLink
                active-class="font-bold text-primary"
                class="flex gap-2 items-center"
                :to="{ name: item.url }"
              >
                <component v-if="item.icon" :is="item.icon" />
                <span>{{ item.title }}</span>
              </RouterLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
