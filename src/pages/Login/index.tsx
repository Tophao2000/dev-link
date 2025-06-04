import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [messageBox, setMessageBox] = useState({
    error: false,
    message: "",
  });
  const [messageBoxFadeIn, setMessageBoxFadeIn] = useState(false);

  const navigate = useNavigate();

  function handdleSubmit(e: FormEvent) {
    e.preventDefault();

    function TimeOut() {
      setTimeout(() => {
        setMessageBoxFadeIn(false);
      }, 3000);

      setTimeout(() => {
        setMessageBox({
          error: false,
          message: "",
        });
      }, 3500);
    }

    if (email === "" || password === "") {
      setMessageBox({
        error: true,
        message: "Todos os campos devem ser preenchidos!",
      });
      setMessageBoxFadeIn(true);
      TimeOut();

      return;
    }

    async function signIn() {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          console.error("Erro ao logar", error);
          setMessageBox({
            error: true,
            message:
              "Erro ao fazer login, verifique se o email e senha estão corretos!",
          });
          setMessageBoxFadeIn(true);

          TimeOut();
        });
    }

    signIn();
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <NavLink to={"/"} className="mb-10">
        <h1 className="mt-11 mb-16 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </NavLink>

      <form
        onSubmit={handdleSubmit}
        className="flex flex-col items-center w-11/12 max-w-xl text-center gap-3.5 relative"
      >
        {messageBox.error && (
          <div
            className={`bg-red-100 text-red-500 border-red-500 w-70 p-2.5 rounded-sm font-semibold border-3 absolute -top-21 message-box ${
              messageBoxFadeIn ? "fade-in" : "fade-out"
            } md:w-80`}
          >
            <h2>{messageBox.message}</h2>
          </div>
        )}

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
              {showPassword ? (
                <FaEye size={24} color="#000000" />
              ) : (
                <FaEyeSlash size={24} color="#000000" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="text-white w-11/12 max-w-xl bg-gradient-to-l from-yellow-500 to-orange-400 py-2 rounded-lg text-lg font-medium  hover:from-yellow-600 hover:to-orange-500 transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
