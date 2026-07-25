import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  credits?: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user: User;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = (): string | null => {
    if (!data.email.trim() || !data.password.trim()) {
      return "All fields are required.";
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(data.email)) {
      return "Please enter a valid email.";
    }

    if (data.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    return null;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Login Successful");
     
        localStorage.setItem(
          "user",
          JSON.stringify(response.data?.data)
        );
      

      setData({
        email: "",
        password: "",
      });

      navigate("/videos");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Couldn't Login"
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface/80 backdrop-blur-2xl border border-border/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-text-primary">
              SkillSnap
            </h1>

            <p className="text-text-secondary mt-2">
              Welcome back! Sign in to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold tracking-wide text-text-primary block mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email"
                placeholder="john@example.com"
                className="w-full bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl py-3 px-4 text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-primary focus:bg-background transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold tracking-wide text-text-primary block mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-background/50 backdrop-blur-sm border border-border/30 rounded-xl py-3 px-4 pr-12 text-text-primary placeholder:text-text-secondary/40 outline-none focus:border-primary focus:bg-background transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-[55px] rounded-xl bg-secondary text-surface font-bold tracking-wide shadow-lg transition-all duration-300 hover:bg-primary hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-text-primary text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold underline underline-offset-4 text-secondary hover:text-primary transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;