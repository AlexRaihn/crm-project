<script setup lang="ts">
import PrivateSideBar from "@/components/Private/PrivateSideBar.vue";

import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
</script>

<template>
  <SidebarProvider>
    <div class="flex h-screen w-full">
      <PrivateSideBar />
      <SidebarTrigger />
      <main class="p-6 h-full w-full overflow-auto flex flex-col gap-16">
        <RouterView />
      </main>
    </div>
  </SidebarProvider>
</template>
