import { ref } from "vue";
import { defineStore } from "pinia";

import { CrmUser, emptyCrmUser } from "@/types/config";

import { useConfigStore } from "../configStore";
import router from "@/router";

export const useAccountStore = defineStore("account", () => {
    const {crmUsers} = useConfigStore()

    const account = ref<CrmUser | null>({...emptyCrmUser});

    function setAccountItem(id: number | null) {
        for(const item of crmUsers) {
            if(item.id === id) {
                account.value = {...item}
                break
            }
        }
    }

    function logOut() {
        account.value = {...emptyCrmUser}
        localStorage.removeItem('user')
        router.push('/')
    }

    return {
        account,
        setAccountItem,
        logOut
    }
})