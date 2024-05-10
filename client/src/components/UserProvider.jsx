import React from "react";
export const UserContext = React.createContext(null);
export default function UserProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ?? { userId: null, businessId: null };
  });
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
