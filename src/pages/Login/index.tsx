import { useState, useEffect, type FormEvent } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Login() {
  const [notSigned, setNotSigned] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
         setNotSigned(false);
       } else {
         setNotSigned(true);
       }
    })

    return () => {
      unsub();
    }
  })

  function handdleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    async function signIn() {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Logado com sucesso!");
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          console.error("Erro ao logar", error);
          toast.error("Erro ao logar! Verifique se os email e senha estão corretos.");
        });
    }
    signIn();
  }

  if (!notSigned) {
    return <Navigate to="/admin" />;
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

        <Button>Entar</Button>
      </form>
    </div>
  );
}

export default Login;
