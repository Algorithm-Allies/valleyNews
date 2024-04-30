import React from "react";
import { UserContext } from "../components/UserProvider";

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("You have to be within the User Context provider");
  }
  return context;
}
