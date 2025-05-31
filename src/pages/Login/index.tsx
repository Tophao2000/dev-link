import { useState, type FormEvent } from "react";

import { NavLink } from "react-router-dom";

import Input from "../../components/Input";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handdleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <NavLink to={"/"}>
        <h1 className="mt-11 mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </NavLink>

      <form
        onSubmit={handdleSubmit}
        className="flex flex-col items-center w-11/12 max-w-xl text-center gap-3.5"
      >
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="absolute right-10"
            style={{ top: "50%", transform: "translateY(calc(-50% + 4px))" }}
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="relative w-6 h-6"
            >
              <FaEye
                size={24}
                color="#000000"
                className={`absolute top-0 left-0 transition-opacity duration-500 ${
                  showPassword ? "opacity-0" : "opacity-100"
                }`}
              />
              <FaEyeSlash
                size={24}
                color="#000000"
                className={`absolute top-0 left-0 transition-opacity duration-500 ${
                  showPassword ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-11/12 max-w-xl bg-gradient-to-r from-yellow-500 to-orange-400 py-2 rounded-lg text-lg font-medium  hover:from-yellow-600 hover:to-orange-500 transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
