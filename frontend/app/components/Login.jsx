import { useState } from "react";
import { useAddress } from "@chopinframework/react";

export default function Login({ isNestedInButton = false }) {
  const { address, isLoading, isLoginError, login, logout, revalidate } = useAddress();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Track login state
  const [showFullAddress, setShowFullAddress] = useState(false); // Track address visibility

  const handleLogin = async () => {
    setIsLoggingIn(true); // Start login process
    try {
      await login(); // Use the login function from useAddress
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoggingIn(false); // End login process
    }
  };

  const toggleAddressVisibility = () => {
    setShowFullAddress(!showFullAddress); // Toggle address visibility
  };

  if (isLoading || isLoggingIn) return <div style={styles.loading}>Loading...</div>;
  if (isLoginError) return <div style={styles.error}>Error logging in</div>;

  // Render a non-button element if nested inside a button
  const ButtonOrDiv = isNestedInButton ? "div" : "button";

  return (
    <div style={styles.container}>
      {address ? (
        <div style={styles.loggedInContainer}>
          <p style={styles.address} onClick={toggleAddressVisibility} title="Click to show full address">
            Logged in as {showFullAddress ? address : `dsdv${address.slice(-4)}`}
          </p>
          <div style={styles.buttonContainer}>
            <ButtonOrDiv
              style={styles.button}
              onClick={logout}
              role={isNestedInButton ? "button" : undefined} // Add role="button" for accessibility
              tabIndex={isNestedInButton ? 0 : undefined} // Make it focusable
            >
              Logout
            </ButtonOrDiv>
            <ButtonOrDiv
              style={styles.button}
              onClick={revalidate}
              role={isNestedInButton ? "button" : undefined}
              tabIndex={isNestedInButton ? 0 : undefined}
            >
              Refresh
            </ButtonOrDiv>
          </div>
        </div>
      ) : (
        <ButtonOrDiv
          style={styles.loginButton}
          onClick={handleLogin}
          disabled={isLoggingIn}
          role={isNestedInButton ? "button" : undefined}
          tabIndex={isNestedInButton ? 0 : undefined}
        >
          Login
        </ButtonOrDiv>
      )}
    </div>
  );
}

// Compact CSS styles for header
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto", // Adjusted for header
    backgroundColor: "transparent", // Adjusted for header
  },
  loggedInContainer: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "6px", // Reduced padding
    borderRadius: "4px", // Smaller border radius
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  address: {
    fontSize: "12px", // Small font size
    fontWeight: "500", // Medium font weight
    marginBottom: "6px", // Reduced margin
    color: "#333333",
    cursor: "pointer", // Show pointer on hover
    userSelect: "none", // Prevent text selection
  },
  buttonContainer: {
    display: "flex",
    gap: "6px", // Reduced gap
    justifyContent: "center",
  },
  button: {
    padding: "4px 8px", // Smaller padding
    fontSize: "12px", // Small font size
    fontWeight: "500", // Medium font weight
    color: "#ffffff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "3px", // Smaller border radius
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    height: "24px", // Fixed button height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "#0056b3", // Darker blue on hover
    },
  },
  loginButton: {
    padding: "4px 8px", // Smaller padding
    fontSize: "12px", // Small font size
    fontWeight: "500", // Medium font weight
    color: "#ffffff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "3px", // Smaller border radius
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    height: "24px", // Fixed button height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      backgroundColor: "#218838", // Darker green on hover
    },
  },
  loading: {
    fontSize: "12px", // Small font size
    fontWeight: "500", // Medium font weight
    color: "#333333",
  },
  error: {
    fontSize: "12px", // Small font size
    fontWeight: "500", // Medium font weight
    color: "#dc3545", // Red color for error
  },
};