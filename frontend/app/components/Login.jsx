import { useState } from "react";
import { useAddress } from "@chopinframework/react";

const Login = ({ isNestedInButton = false }) => {
  const { address, isLoading, isLoginError, login, logout, revalidate } = useAddress();
  
  const [uiState, setUiState] = useState({
    isLoggingIn: false,
    showFullAddress: false,
  });

  // app/components/Login.js (updated login handler)
const handleLogin = async () => {
  setUiState(prev => ({ ...prev, isLoggingIn: true }));

  try {
    const response = await fetch("http://localhost:4000/_chopin/login", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Login failed");

    const { address, token } = await response.json();
    
    // Store both token and address
        //Added for testing purpose

    localStorage.setItem("chopin_token", token);
    localStorage.setItem("wallet_address", address);
    
    // Verify Chopin status before proceeding
    const statusResponse = await fetch("http://localhost:4000/_chopin/status");
    if (!statusResponse.ok) throw new Error("Chopin service unavailable");
    
    window.location.href = "/";

  } catch (error) {
    console.error("Login error:", error);
  } finally {
    setUiState(prev => ({ ...prev, isLoggingIn: false }));
  }
};
  
  
  

  const toggleAddressVisibility = () => {
    setUiState(prev => ({ ...prev, showFullAddress: !prev.showFullAddress }));
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return uiState.showFullAddress
      ? addr
      : `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isLoading || uiState.isLoggingIn) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (isLoginError) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.error}>Authentication error</div>
        <button style={styles.retryButton} onClick={handleLogin} aria-label="Retry login">
          Retry
        </button>
      </div>
    );
  }

  const ButtonOrDiv = isNestedInButton ? "div" : "button";

  return (
    <div style={styles.container}>
      {address ? (
        <div style={styles.loggedInContainer}>
          <p style={styles.address} onClick={toggleAddressVisibility} title="Click to show full address">
            {formatAddress(address)}
          </p>
          <div style={styles.buttonContainer}>
            <ButtonOrDiv style={styles.button} onClick={logout} role={isNestedInButton ? "button" : undefined} tabIndex={isNestedInButton ? 0 : undefined}>
              Logout
            </ButtonOrDiv>
            <ButtonOrDiv style={styles.button} onClick={revalidate} role={isNestedInButton ? "button" : undefined} tabIndex={isNestedInButton ? 0 : undefined}>
              Refresh
            </ButtonOrDiv>
          </div>
        </div>
      ) : (
        <ButtonOrDiv style={styles.loginButton} onClick={handleLogin} disabled={uiState.isLoggingIn} role={isNestedInButton ? "button" : undefined} tabIndex={isNestedInButton ? 0 : undefined}>
          {uiState.isLoggingIn ? "Connecting..." : "Login"}
        </ButtonOrDiv>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    width: "100%",   // Ensures it takes full width of parent but not more
    backgroundColor: "var(--background-color)",
    color: "var(--text-color)",
    padding: "0.5rem 1rem",
    boxSizing: "border-box",
    top: "0px",
    overflow: "hidden", // Ensures content does not overflow
    whiteSpace: "nowrap" // Prevents text from breaking into multiple lines
}
,
  loggedInContainer: {
    textAlign: "center",
    backgroundColor: "var(--element-color)",
    padding: "5px",
    borderRadius: "px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
  },
  address: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-color)",
    cursor: "pointer",
    userSelect: "none",
    transition: "color 0.2s ease",
  },
  buttonContainer: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  button: {
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-color)",
    backgroundColor: "var(--button-bg)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  loginButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-color)",
    backgroundColor: "var(--button-bg)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "var(--text-color)",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
  },
  error: {
    color: "#e53e3e",
    fontSize: "14px",
    fontWeight: "500",
  },
  retryButton: {
    padding: "6px 12px",
    fontSize: "12px",
    backgroundColor: "var(--button-bg)",
    color: "var(--text-color)",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

export default Login;
