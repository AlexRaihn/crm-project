export interface Company {
    id: number;
    name: string;
    inn: string;
    industry: string;
    websiteUrl: string;
    isDelete: boolean
}

export const emptyCompany: Company = {
    id: 0,
    name: '',
    inn: '',
    industry: '',
    websiteUrl: '',
    isDelete: false,
};