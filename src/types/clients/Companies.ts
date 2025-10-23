import { Client } from "./Clients";

export interface Company {
    id: number;
    name: string;
    inn: string;
    industry: string;
    websiteUrl: string;
}