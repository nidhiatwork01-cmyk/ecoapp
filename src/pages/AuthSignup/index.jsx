import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";
import { userSignup, userLogin } from "../../api/auth";

export const AuthSignup = () => {
  const { loginDispatch } = useLogin();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    // 1️⃣ Create user
    const signupResult = await userSignup(form);

    if (signupResult?.id) {
      // 2️⃣ Automatically login after signup
      const loginResult = await userLogin(form.email, form.password);

      if (loginResult?.access_token) {
        localStorage.setItem("token", loginResult.access_token);

        loginDispatch({
          type: "TOKEN",
          payload: { token: loginResult },
        });

        navigate("/home");
      }
    }
  };

  return (
    <form
      className="bg-white shadow-md w-[450px] p-10 mx-auto mt-10 rounded-lg"
      onSubmit={onSubmit}
    >
      <h2 className="flex justify-center text-3xl mb-6">Create Account</h2>

      <div className="flex flex-col gap-2 mb-4">
        <span>Name*</span>
        <input
          className="border-b-2 p-1"
          name="name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span>Email*</span>
        <input
          className="border-b-2 p-1"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <span>Password*</span>
        <input
          className="border-b-2 p-1"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <span>Confirm Password*</span>
        <input
          className="border-b-2 p-1"
          name="confirm"
          type="password"
          onChange={handleChange}
          required
        />
      </div>

      <button className="button btn-primary btn-icon d-flex align-center justify-center gap cursor">
        Sign Up
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <span
          className="text-green-700 hover:underline cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </span>
      </p>
    </form>
  );
};
