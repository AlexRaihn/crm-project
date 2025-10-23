import { CrmUser } from '@/types/config'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
    const crmUser: CrmUser = {
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
    }

    function checkLogin(login: string) {
        const loginLower = login.toLowerCase()

        const user = {
            login: crmUser.login.toLowerCase(),
            email: crmUser.email.toLowerCase(),    
        }

        if(loginLower === user.login || loginLower === user.email)
            return true

        return false
    }

    function ckeckPassword(password: string) {
        const user = { 
            password: crmUser.password.toLowerCase(),       
        }
        if(password.toLowerCase() === user.password.toLowerCase())
            return true

        return false
    }

    async function authUser(login: string, password: string): Promise<boolean> {
        if(!checkLogin(login))
            return false
        if(!ckeckPassword(password))
            return false
        return true
    }

    return {
        crmUser,
        authUser,
    }
})