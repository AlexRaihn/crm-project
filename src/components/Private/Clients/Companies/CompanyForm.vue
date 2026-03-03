<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";

import { emptyCompany, type Company } from "@/types/clients/Companies";

type Emits = {
    save: [];
    cancel: [];
};

const emit = defineEmits<Emits>();

const company = defineModel<Company>("company", {
    default: { ...emptyCompany },
});

function getValues() {
    emit("save");
}
</script>

<template>
    <div class="c-flex-col">
        <Input v-model="company.name" placeholder="Название" />
        <Input v-model="company.inn" placeholder="ИНН" />
        <Input v-model="company.industry" placeholder="Отрасль" />
        <Input v-model="company.websiteUrl" placeholder="Сайт" />
        <div class="flex justify-end gap-2 w-full">
            <Button variant="outline" @click="emit('cancel')">
                Отмена
            </Button>
            <Button @click="getValues">
                Сохранить
            </Button>
        </div>
    </div>
</template>