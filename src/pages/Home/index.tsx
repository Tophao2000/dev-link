import { Link } from "react-router-dom";
import Social from "../../components/Social";
import Spinner from "../../components/Spinner";

import { useEffect, useState } from "react";

import { db } from "../../services/firebaseConnection";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

import { type LinkProps } from "../../interfaces/linksProps";

function Home() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const list: LinkProps[] = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bgColor: doc.data().bgColor,
            textColor: doc.data().textColor,
            created: doc.data().created,
          });
        });

        setLinks(list);
        setLoading(false);
      });
    }
    loadLinks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="md:text-4xl text-3xl font-bold mt-20">
        Christopher Salomão
      </h1>
      <p className="mb-5 mt-3 text-gray-800 dark:text-gray-50">Meus links 👇</p>

      <section className="flex flex-col items-center w-11/12 max-w-xl text-center">
        <div className="w-full flex flex-col items-center justify-center ">
          {links &&
            links.map((link) => (
              <Link
                key={link.id}
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" mb-4 w-full py-2 rounded-lg transition-transform duration-500 hover:scale-105 text-base md:text-lg"
                style={{
                  backgroundColor: link.bgColor,
                  color: link.textColor,
                }}
              >
                {link.name}
              </Link>
            ))}
        </div>

        <footer className="flex  gap-3">
          <Social url="https://www.facebook.com/">
            <FaLinkedin size={30} color="#fffff" />
          </Social>
        </footer>
      </section>
    </div>
  );
}

export default Home;
