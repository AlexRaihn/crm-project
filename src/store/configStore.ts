import { CrmUser } from '@/types/config'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    const crmUsers: CrmUser[] = [
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
            firstName: 'Иван',
            middleName: '',
            lastName: '',
            login: 'manager',
            password: 'manager',
            role: 2,
            email: 'test@mail.ru',
            phone: '',
            gender: 1
        },
    ]

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

    async function authUser(login: string, password: string): Promise<boolean | number> {
        let res = 0
        for(const item of crmUsers) {
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
        crmUsers
    }
})