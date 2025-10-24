<script setup lang="ts">
import { onMounted, ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useConfigStore } from "@/store/configStore";
import router from "@/router";

const { authUser } = useConfigStore();

const user = ref({
  login: "",
  password: "",
});

const isLoading = ref(false);

async function logInUser() {
  isLoading.value = true;
  try {
    const result = await authUser(user.value.login, user.value.password);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      router.push({ name: "PrivateView" });
    } else {
      alert("Неверный логин или пароль");
      user.value.password = "";
    }
  } catch (error) {
    alert("Ошибка авторизации");
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (localStorage.getItem("user")) router.push({ name: "PrivateView" });
});
</script>

<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center dark:bg-gray-900 p-4"
  >
    <Card>
      <CardHeader>
        <CardTitle class="text-center">Авторизация</CardTitle>
      </CardHeader>
      <CardContent class="space-y-5">
        <div class="space-y-1">
          <Input v-model="user.login" placeholder="Логин или почта" />
        </div>
        <div class="space-y-1">
          <Input
            v-model="user.password"
            type="password"
            placeholder="Пароль"
            @keydown.enter="logInUser"
          />
        </div>
      </CardContent>
      <CardFooter class="w-full flex flex-col items-center justify-center">
        <Button :is-loading="isLoading" :disable="isLoading" @click="logInUser"
          >Войти</Button
        >
      </CardFooter>
    </Card>
    <CardDescription class="text-xs">
      Введите логин/почту и пароль для входа
    </CardDescription>
  </div>
</template>
