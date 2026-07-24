import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
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

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = (): string | null => {
    if (
      !data.name.trim() ||
      !data.email.trim() ||
      !data.password.trim()
    ) {
      return "All fields are required.";
    }

    if (data.name.trim().length < 3) {
      return "Name must be at least 3 characters.";
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
        import.meta.env.VITE_REGISTER,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(
        response.data.message || "Registration Successful"
      );

      // Save logged-in user
      if (response.data.user) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.user)
        );
      }

      setData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/videos");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Registration Failed"
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
        <div className="w-[30vw] max-xl:w-[38vw] max-lg:w-[48vw] max-md:w-[60vw] max-sm:w-[80vw] max-xs:w-full bg-[#10284D] rounded-xl shadow-2xl px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#F8F2E7]">
              SkillSnap
            </h1>

            <p className="mt-2 text-[#E8D8B5]/70">
              Create your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mt-10"
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold tracking-wide text-[#F8F2E7]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="John Doe"
                className="mt-2 w-full bg-transparent border-b border-[#E8D8B5]/40 py-3 text-[#F8F2E7] placeholder:text-[#F8F2E7]/40 outline-none focus:border-[#F8F2E7] disabled:opacity-50"
              />
            </div>

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
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
                disabled={loading}
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
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="••••••••"
                className="mt-2 w-full bg-transparent border-b border-[#E8D8B5]/40 py-3 text-[#F8F2E7] placeholder:text-[#F8F2E7]/40 outline-none focus:border-[#F8F2E7] disabled:opacity-50"
              />

              <div className="mt-4 flex items-center gap-2">
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
              className="h-[55px] rounded-lg bg-[#E8D8B5] text-[#081C3A] font-bold tracking-wide transition hover:bg-[#F7EFD9] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#081C3A] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#F8F2E7]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#E8D8B5] underline underline-offset-4 hover:text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;