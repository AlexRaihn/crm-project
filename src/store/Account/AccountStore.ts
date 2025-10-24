import { ref } from "vue";
import { defineStore } from "pinia";

import { CrmUser } from "@/types/config";

import { createEmptyMock } from "@/composables/defaultModel";

import { useConfigStore } from "../configStore";
import router from "@/router";

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

    function logOut() {
        account.value = createEmptyMock<CrmUser>()
        localStorage.removeItem('user')
        router.push('/')
    }

    return {
        account,
        setAccountItem,
        logOut
    }
})