import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/me",
        {
          withCredentials: true,
        }
      );

      setUser(response.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

    } catch (error) {
      setUser(null);

      localStorage.removeItem("user");
    } finally {
      setChecking(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checking,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};