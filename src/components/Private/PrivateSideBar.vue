<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAccountStore } from "@/store/Account/AccountStore";
import { computed } from "vue";

const { account } = useAccountStore();

type MenuItem = {
  title: string;
  url: string;
  icon: any;
  role: number[];
};

// Menu items.
const items: MenuItem[] = [
  {
    title: "Клиенты",
    url: "ClientsView",
    icon: Home,
    role: [],
  },
  {
    title: "Демо данные",
    url: "DemoView",
    icon: Inbox,
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
    console.log("!!", item);
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
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {{ account }}
            <SidebarMenuItem v-for="item in menuItems" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink :to="{ name: item.url }">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
