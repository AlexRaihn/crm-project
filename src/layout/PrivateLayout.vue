<script setup lang="ts">
import PrivateSideBar from "@/components/Private/PrivateSideBar.vue";

import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
  <SidebarProvider>
    <div class="flex h-screen">
      <PrivateSideBar />
      <SidebarTrigger />
      <div class="flex-1 overflow-auto">
        <main class="p-6 h-full w-full">
          <RouterView />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
