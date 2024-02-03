import { resolve } from "path";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
    id: string;
    name: string;
    email: string;
}

export enum Stores {
    Users = 'users',
}

export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDB', version + 1);

        request.onupgradeneeded = () => {
            db = request.result;

            if (!db.objectStoreNames.contains(Stores.Users)) {
                db.createObjectStore(Stores.Users, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => {
            db = request.result;
            version = db.version;
            console.log('request.onsuccess - initDB', version);
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addData = <T>(storeName: string, data: T): Promise<string | T> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDB');

        request.onsuccess = () => {
            console.log('request.onsuccess - addData', data);
            db = request.result;

            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error) {
                resolve(error);
            } else {
                resolve('Error adding data');
            }
        };
    })
};

export const deleteData = (storeName: string, key: string): Promise<boolean> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDB', version);

        request.onsuccess = () => {
            console.log('request.onsuccess - deleteData', key);
            db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const res = store.delete(key);

            // add listeners that will resolve the Promise
            res.onsuccess = () => {
                resolve(true);
            };
            res.onerror = () => {
                resolve(false);
            }
        };
    });
};

export const getData = <T>(storeName: Stores): Promise<T[]> => {
    return new Promise((resolve) => {
        request = indexedDB.open('myDB');

        request.onsuccess = () => {
            console.log('request.onsuccess - getAllData');
            db = request.result;

            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const res = store.getAll();

            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};