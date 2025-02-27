// hooks/useAuthentication.js
import { useState, useEffect } from "react";
import { useAddress } from "@chopinframework/react";

const useAuthentication = () => {
  const { address, isLoading, isLoginError, login, logout, revalidate } = useAddress();
  const [authState, setAuthState] = useState({
    isInitialized: false,
    isAuthenticated: false,
    address: null,
    lastActivity: null
  });

  useEffect(() => {
    const validateSession = async () => {
      if (address) {
        try {
          await revalidate();
          setAuthState(prev => ({
            ...prev,
            lastActivity: Date.now(),
            isAuthenticated: true
          }));
        } catch (error) {
          console.error("Session validation failed:", error);
          logout();
        }
      }
    };

    const interval = setInterval(validateSession, 300000); // 5 min checks

    return () => clearInterval(interval);
  }, [address, revalidate, logout]);

  useEffect(() => {
    if (!isLoading) {
      setAuthState({
        isInitialized: true,
        isAuthenticated: !!address,
        address,
        lastActivity: address ? Date.now() : null
      });
    }
  }, [isLoading, address]);

  return {
    ...authState,
    isLoading,
    isLoginError,
    login: async () => {
      try {
        await login();
        setAuthState(prev => ({
          ...prev,
          lastActivity: Date.now(),
          isAuthenticated: true
        }));
      } catch (error) {
        throw error;
      }
    },
    logout: async () => {
      await logout();
      setAuthState({
        isInitialized: true,
        isAuthenticated: false,
        address: null,
        lastActivity: null
      });
    }
  };
};

export default useAuthentication;