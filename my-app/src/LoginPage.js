import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import googleLogo from './assets/images/google-logo.png';

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
            backgroundColor: "#f5f5f5", 
        },
        loginBox: {
            backgroundColor: "#ffffff", 
            borderRadius: "12px",
            padding: "2rem",
            width: "400px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "2px solid #4285F4", 
        },
        welcomeBox: {
            backgroundColor: "#E8F0FE", 
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "25px",
            borderLeft: "5px solid #4285F4", 
        },
        title: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1a73e8", 
            marginBottom: "10px",
        },
        description: {
            fontSize: "16px",
            color: "#5f6368", 
            lineHeight: "1.5",
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
            width: "100%",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#3367D6", 
        },
        buttonDisabled: {
            opacity: 0.7,
            cursor: "not-allowed",
        },
        error: {
            color: "#d32f2f",
            marginTop: "15px",
            fontSize: "14px",
            textAlign: "center",
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
            navigate("/home");
        } catch (error) {
            console.error("Google sign-in error:", error);
            setAuthError("Failed to sign in. Please try again.");
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <div style={styles.welcomeBox}>
                    <h1 style={styles.title}>Welcome to Community Eats!!</h1>
                    <p style={styles.description}>
                        To use our awesome features please login to continue.
                    </p>
                </div>
                
                <button
                    style={{
                        ...styles.button,
                        ...(isSigningIn ? styles.buttonDisabled : {})
                    }}
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    onMouseEnter={(e) => !isSigningIn && (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => !isSigningIn && (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    {isSigningIn ? (
                        "Signing In..."
                    ) : (
                        <>
                            <img
                                src={googleLogo}
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