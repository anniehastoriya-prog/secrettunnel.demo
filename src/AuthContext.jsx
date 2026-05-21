import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  async function signup( username, password){
    try{
      const response = await fetch(
        "https://fsa-jwt-practuce.herokuapp.com/signup" {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
        

        
      );
      if (!response.ok){
        throw Error("Failed to sign up. Check username / password ");
      }
      const result = await response.json();
      setToken(result.token);
      setLocation("TABLET");
    }catch (error){
      console.error(error);
    }
  }
  // TODO: authenticate
  const authenticate  = async () => {
    try {
      const response = await fetch (
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw Error("Failed to authenticate");
      }
      setLocation("TUNNEL");
    } catch (error) {
      console.error(error);
    }
  };
  const value = { location, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

