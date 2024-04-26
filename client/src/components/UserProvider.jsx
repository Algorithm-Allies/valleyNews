import React from "react";
export const UserContext = React.createContext(null);
export default function UserProvider({ children }) {
  const [user, setUser] = React.useState({ userId: null, businessId: null });

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
