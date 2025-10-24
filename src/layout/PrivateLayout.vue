<script setup lang="ts">
import PrivateSideBar from "@/components/Private/PrivateSideBar.vue";

import AccountCard from "@/components/Private/Account/AccountCard.vue";

import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
  <SidebarProvider>
    <div class="flex h-screen w-full">
      <PrivateSideBar />
      <main class="h-full w-full flex flex-col gap-4">
        <div class="border-b-2 flex items-center gap-4 p-4 w-full">
          <SidebarTrigger />
          <AccountCard />
        </div>
        <div class="p-6 h-full flex flex-col items-center overflow-hidden">
          <RouterView />
        </div>
      </main>
    </div>
  </SidebarProvider>
</template>
