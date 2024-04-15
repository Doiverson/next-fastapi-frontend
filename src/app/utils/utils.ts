import { Url } from "url";

type User = {
    email: string;
    name: string;
    test?: boolean;
};

export const getUsers = async (): Promise<User[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
};