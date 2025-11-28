export interface Person {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: number; // 0 | 1
}

export const emptyPerson: Person = {
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 0,
};

