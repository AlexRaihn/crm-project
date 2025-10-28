import { ref } from 'vue'

import { useFaker } from '@/composables/useFaker'

import { CrmUser } from '@/types/config'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    const crmUsers = ref<CrmUser[]>([
        {
            id: 1,
            firstName: 'Иван',
            middleName: 'Иванович',
            lastName: 'Иванов',
            login: 'admin',
            password: 'admin',
            role: 1,
            email: 'test@mail.ru',
            phone: '',
            gender: 1
        },
        {
            id: 2,
            firstName: 'Алексей',
            middleName: '',
            lastName: '',
            login: 'manager',
            password: 'manager',
            role: 3,
            email: 'test@mail.ru',
            phone: '',
            gender: 1
        },
    ])

    const {createId} = useFaker()

    async function getCrmUsers(): Promise<CrmUser[]> {
        return crmUsers.value
    }

    async function updateCrmUser(crmUser: CrmUser): Promise<CrmUser> {
        crmUsers.value.forEach((item, index) => {
            if(item.id === crmUser.id)
                crmUsers.value[index] = {...crmUser}
        })
        return crmUser
    }

    async function deleteCrmUser(id: number) {
        crmUsers.value = crmUsers.value.filter(el => el.id != id)
    }

    async function createCrmUser(crmUser: CrmUser) {
        const item: CrmUser = { 
            ...crmUser,
            id: createId(crmUsers.value.map(c => c.id))
        }
        crmUsers.value.push(item)
        return item
    }

    function checkLogin(login: string, crmUser: CrmUser) {
        const loginLower = login.toLowerCase()

        const user = {
            login: crmUser.login.toLowerCase(),
            email: crmUser.email.toLowerCase(),    
        }

        if(loginLower === user.login || loginLower === user.email)
            return true

        return false
    }

    function ckeckPassword(password: string, crmUser: CrmUser) {
        const user = { 
            password: crmUser.password.toLowerCase(),       
        }
        if(password.toLowerCase() === user.password.toLowerCase())
            return true

        return false
    }

    async function authUser(login: string, password: string): Promise<number> {
        let res = 0
        for(const item of crmUsers.value) {
            if(!checkLogin(login, item))
                continue
            if(!ckeckPassword(password, item)) {
                continue
            }
            res = item.id
        }
        return res
    }

    return {
        authUser,
        crmUsers,
        getCrmUsers,
        updateCrmUser,
        deleteCrmUser,  
        createCrmUser,
    }
})