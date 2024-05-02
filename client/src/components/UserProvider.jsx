import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ userId: null, businessId: null });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser ? JSON.parse(storedUser) : { userId: 'default', businessId: 'default' });
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;