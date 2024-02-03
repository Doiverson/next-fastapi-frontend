'use client';
import { useEffect, useState } from 'react';
import { Stores, User, initDB, getData, addData, deleteData } from './db';

export default function Home() {
    const [isDBReady, setIsDBReady] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isDBReady) handleGetUsers();
    }, [isDBReady]);

    const handleInitDB = async () => {
        const status = await initDB();
        setIsDBReady(status);
    };

    const handleGetUsers = async () => {
        const users = await getData<User>(Stores.Users);
        setUsers(users);
    };

    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
        };

        const name = target.name.value;
        const email = target.email.value;
        // we must pass an Id since it's our primary key declared in our createObjectStoreMethod  { keyPath: 'id' }
        const id = Date.now();

        if (name.trim() === '' || email.trim() === '') {
            alert('Please enter a valid name and email');
            return;
        }

        try {
            const res = await addData(Stores.Users, { name, email, id });
            handleGetUsers();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    };

    const handleRemoveUser = async (id: string) => {
        try {
            await deleteData(Stores.Users, id);
            handleGetUsers();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong deleting the user');
            }
        }
    };

    return (
        <main style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h1>IndexedDB</h1>
            {!isDBReady ? (
                <button onClick={handleInitDB}>Init DB</button>
            ) : (
                <>
                    <h2>DB is ready</h2>
                    <form onSubmit={handleAddUser}>
                        <input type="text" name="name" placeholder="Name" style={{ color: 'black' }} />
                        <input type="email" name="email" placeholder="Email" style={{ color: 'black' }} />
                        <button type="submit">Add User</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {users.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.id}</td>
                                        <td>
                                            <button onClick={() => handleRemoveUser(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </main>
    );
}

// REF: https://dev.to/esponges/indexeddb-your-offline-and-serverless-db-in-your-browser-with-react-3hm7
