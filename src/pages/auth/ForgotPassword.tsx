import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import TextField from "../../components/common/TextField";
import AuthTemplate from "./AuthTemplate";
import { Button } from "../../components/common/Button";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  return (
    <AuthTemplate title=" Reset Password" error={error}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div
            className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm"
            role="alert"
          >
            Password reset email sent! Check your inbox.
          </div>
        )}

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

        <Button type="submit" fullWidth loading={loading}>
          Reset Password
        </Button>

        <div className="text-center text-sm text-gray-600">
          Remember your password?{" "}
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

export default ForgotPassword;
