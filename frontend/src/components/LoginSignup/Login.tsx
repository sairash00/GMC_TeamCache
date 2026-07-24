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
    <div className="w-screen h-screen bg-[#081C3A]">
      <div className="w-full h-full flex justify-center items-center px-4">
        <div className="w-[30vw] max-xl:w-[38vw] max-lg:w-[48vw] max-md:w-[60vw] max-sm:w-[80vw] bg-[#10284D] rounded-xl shadow-2xl px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#F8F2E7]">
              SkillSnap
            </h1>

            <p className="text-[#E8D8B5]/70 mt-2">
              Welcome back! Sign in to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mt-10"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold tracking-wide text-[#F8F2E7]"
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
                className="mt-2 w-full bg-transparent border-b border-[#E8D8B5]/40 py-3 text-[#F8F2E7] placeholder:text-[#F8F2E7]/40 outline-none focus:border-[#F8F2E7] disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold tracking-wide text-[#F8F2E7]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-2 w-full bg-transparent border-b border-[#E8D8B5]/40 py-3 text-[#F8F2E7] placeholder:text-[#F8F2E7]/40 outline-none focus:border-[#F8F2E7] disabled:opacity-50"
              />

              <div className="flex items-center gap-2 mt-4">
                <input
                  id="showPassword"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={loading}
                  className="accent-[#E8D8B5]"
                />

                <label
                  htmlFor="showPassword"
                  className="text-sm text-[#F8F2E7] cursor-pointer"
                >
                  Show Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-[55px] rounded-lg bg-[#E8D8B5] text-[#081C3A] font-bold tracking-wide shadow-lg transition-all duration-300 hover:bg-[#F7EFD9] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#081C3A] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-[#F8F2E7] text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold underline underline-offset-4 text-[#E8D8B5] hover:text-white transition"
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