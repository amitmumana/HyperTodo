import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, MailIcon } from "lucide-react";
import AuthTemplate from "./AuthTemplate";
import TextField from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict; ${
        window.location.protocol === "https:" ? "Secure" : ""
      }`;

      setLoading(false);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <AuthTemplate title="Login" error={error}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          type="email"
          label="Your Email"
          icon={<MailIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <TextField
          type="password"
          label="Your Password"
          icon={<Lock />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {/* <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-teal-600 hover:text-teal-500"
          >
            Forgot password?
          </Link>
        </div> */}

        <Button type="submit" fullWidth loading={loading}>
          Log In
        </Button>
      </form>
    </AuthTemplate>
  );
}
export default Login;
