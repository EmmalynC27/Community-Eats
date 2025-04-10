import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
        },
        button: {
            backgroundColor: "#4285F4",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
        },
        buttonDisabled: {
            opacity: 0.7,
            cursor: "not-allowed",
        },
        error: {
            color: "#d32f2f",
            marginTop: "15px",
            fontSize: "14px",
        },
        googleIcon: {
            width: "18px",
            height: "18px",
            backgroundColor: "white",
            padding: "4px",
            borderRadius: "2px",
        }
    };

    const handleSignIn = async () => {
        setIsSigningIn(true);
        setAuthError(null);
        const provider = new GoogleAuthProvider();
      
        try {
          await signInWithPopup(auth, provider);
          navigate("/home"); // Changed from "/" to "/home"
        } catch (error) {
          console.error("Google sign-in error:", error);
          setAuthError("Failed to sign in. Please try again.");
        } finally {
          setIsSigningIn(false);
        }
      };

    return (
        <div style={styles.container}>
            <div>
                <button
                    style={{
                        ...styles.button,
                        ...(isSigningIn ? styles.buttonDisabled : {})
                    }}
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                >
                    {isSigningIn ? (
                        "Signing In..."
                    ) : (
                        <>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google logo"
                                style={styles.googleIcon}
                            />
                            Sign in with Google
                        </>
                    )}
                </button>
                {authError && <div style={styles.error}>{authError}</div>}
            </div>
        </div>
    );
};

export default LoginPage;