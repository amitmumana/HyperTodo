import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import TextField from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import AuthTemplate from "./AuthTemplate";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict; ${
        window.location.protocol === "https:" ? "Secure" : ""
      }`;

      navigate("/");
    } catch (err: any) {
      console.error("Sign up error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate title="Sign Up" error={error}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          type="email"
          label="Your Email"
          icon={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
        />

        <TextField
          type="password"
          label="Your Password"
          icon={<Lock />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={loading}
        />

        <Button type="submit" fullWidth loading={loading}>
          Sign Up
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 hover:text-teal-500 font-medium"
          >
            Log In
          </Link>
        </div>
      </form>
    </AuthTemplate>
  );
}

export default SignUp;
