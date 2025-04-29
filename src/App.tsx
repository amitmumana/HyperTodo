import { useEffect, useState } from "react";
import { useStore } from "./store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { getCookie } from "./utils/getCookie";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setUser = useStore((state) => state.setUser);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation");
        } else {
          console.log("User dismissed the PWA installation");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = getCookie("authToken");
    return token ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const token = getCookie("authToken");
    return token ? <Navigate to="/home" replace /> : children;
  };

  return (
    <>
      <div className="bg-white  dark:bg-gray-900">
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                getCookie("authToken") ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        {deferredPrompt && (
          <button onClick={handleInstallClick}>Install App</button>
        )}
      </div>
    </>
  );
}

export default App;
