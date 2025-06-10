import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full flex justify-center mt-16 md:mt-4">
      <nav className="w-full max-w-2xl bg-white h-12 flex justify-between items-center px-4 rounded-md border-2 border-gray-800">
        <div className="nav-links flex gap-3 font-medium text-black">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/admin">Links</NavLink>
          <NavLink to="/admin/social">Redes sociais</NavLink>
        </div>
        <button type="button" onClick={handleLogout} title="Sair" className="cursor-pointer">
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
