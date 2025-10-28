<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import DemoDataButton from "../DemoData/DemoDataButton.vue";

import DashboardGraphics from "./DashboardGraphics.vue";

import { userRole } from "@/enums/role";

import { useAccountStore } from "@/store/Account/AccountStore";

const { account } = useAccountStore();
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-2xl">
      <span v-text="'Панель управления'" class="font-bold" />
    </div>
    <Card class="p-4" v-if="account">
      <div class="flex justify-between items-center">
        <div>
          {{ userRole.find((el) => el.value === account.role).label }}:
          {{ account.firstName }} {{ account.middleName }}
          {{ account.lastName }}
        </div>
        <DemoDataButton v-if="account.role < 2" />
      </div>
    </Card>
    <DashboardGraphics />
  </div>
</template>
