import { ref } from "vue";
import { defineStore } from "pinia";

import { CrmUser } from "@/types/config";

import { createEmptyMock } from "@/composables/defaultModel";

import { useConfigStore } from "../configStore";

export const useAccountStore = defineStore("account", () => {
    const {crmUsers} = useConfigStore()

    const account = ref<CrmUser | null>(createEmptyMock<CrmUser>());

    function setAccountItem(id: number | null) {
        for(const item of crmUsers) {
            if(item.id === id) {
                account.value = {...item}
                break
            }
        }
    }

    return {
        account,
        setAccountItem
    }
})