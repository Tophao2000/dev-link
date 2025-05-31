import { Link } from "react-router-dom";
import Social from "../../components/Social";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="md:text-4xl text-3xl font-bold mt-20">Nome</h1>
      <p className="mb-5 mt-3 text-gray-800 dark:text-gray-50">Meus links 👇</p>

      <section className="flex flex-col items-center w-11/12 max-w-xl text-center">
        <div className="w-full flex flex-col items-center justify-center ">
          <Link
            to="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black bg-white mb-4 w-full py-2 rounded-lg transition-transform duration-500 hover:scale-105 text-base md:text-lg"
          >
            Fábrica de Aplicativos
          </Link>
        </div>

        <footer className="flex  gap-3">
          <Social url="https://www.facebook.com/">
            <FaFacebook size={30} color="#fffff" />
          </Social>
        </footer>
      </section>
    </div>
  );
}

export default Home;
