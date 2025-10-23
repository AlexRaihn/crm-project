import { Faker, ru } from '@faker-js/faker'

export const useFaker = () => {
    const fakerMain = new Faker({
        locale: ru
    })

    function createId(arr: Array<number>) {
        return arr.length ? Math.max(...arr) + 1 : 1
    }

    return {
        fakerMain,
        createId
    };
}