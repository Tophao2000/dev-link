import { useState, useEffect, type FormEvent } from "react";

import { toast } from "react-toastify";

import { LuLink } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";

import Input from "../../components/Input";

import Header from "../../components/Header";
import Buttton from "../../components/Button";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { type LinkProps } from "../../interfaces/linksProps";

function Admin() {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [linkBgColor, setLinkBgColor] = useState("#ffffff");
  const [linkTextColor, setLinkTextColor] = useState("#000000");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      const onSub = onSnapshot(queryRef, (snapshot) => {
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
      });

      return () => {
        onSub();
      };
    }
    loadLinks();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (linkName === "" || linkUrl === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    async function addLink() {
      await addDoc(collection(db, "links"), {
        name: linkName,
        url: linkUrl,
        bgColor: linkBgColor,
        textColor: linkTextColor,
        created: new Date(),
      })
        .then(() => {
          toast.success("Link cadastrado com sucesso!");
          setLinkName("");
          setLinkUrl("");
        })
        .catch(() => {
          toast.error("Erro ao cadastrar o link! Tente novamente.");
        });
    }
    addLink();
  }

  function handleDeleteLink(id: string) {
    async function deleteLink() {
      await deleteDoc(doc(db, "links", id))
        .then(() => {
          toast.success("Link deletado com sucesso!");
        })
        .catch(() => {
          toast.error("Erro ao deletar o link! Tente novamente.");
        });
    }
    deleteLink();
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-7 px-2">
      <Header />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mb-3 mt-8 w-full max-w-xl"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link-name" className="font-medium">
            Nome do Link:
          </label>
          <Input
            type="text"
            name="link-name"
            placeholder="Nome do seu link..."
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link-url" className="font-medium">
            URL do Link:
          </label>
          <Input
            type="url"
            name="link-url"
            placeholder="Digite a URL do seu link..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>

        <section className="w-full flex gap-10 font-medium mb-5">
          <div className="flex items-end gap-2">
            <label htmlFor="link-bg">Fundo do link</label>
            <input
              type="color"
              id="link-bg"
              className=" ml-1.5 w-12 h-12 apearance-none p-0 bg-gray-800 dark:bg-gray-300 border border-gray-800 dark:border-gray-300 rounded-lg"
              value={linkBgColor}
              onChange={(e) => setLinkBgColor(e.target.value)}
            />
          </div>

          <div className="flex items-end gap-2">
            <label htmlFor="link-color">Cor do link</label>
            <input
              type="color"
              id="link-color"
              className=" ml-1.5 w-12 h-12 apearance-none p-0 bg-gray-800 dark:bg-gray-300 border border-gray-800 dark:border-gray-300 rounded-lg"
              value={linkTextColor}
              onChange={(e) => setLinkTextColor(e.target.value)}
            />
          </div>
        </section>

        {linkName !== "" && (
          <div className="flex flex-col items-center justify-center gap-3 py-3 border border-gray-100/25 rounded-md">
            <p>Veja como está ficando o seu link:</p>
            <article
              className="w-11/12 flex justify-center items-center max-w-lg rounded px-4 py-3"
              style={{
                backgroundColor: linkBgColor,
                color: linkTextColor,
                userSelect: "none",
              }}
            >
              <p className="font-medium">{linkName}</p>
            </article>
          </div>
        )}

        <Buttton>
          Cadastrar <LuLink size={20} />
        </Buttton>
      </form>

      {links && (
        <section className="w-full max-w-xl flex flex-col gap-3 items-center">
          <h2 className="font-bold mb-4 text-2xl">Meus Links</h2>

          <div className="w-full flex flex-col items-center gap-2 ">
            {links.map((link) => (
              <article
                key={link.id}
                className="w-full flex justify-between items-center  rounded px-4 py-3 mb-3 border border-gray-800"
                style={{
                  backgroundColor: link.bgColor,
                  color: link.textColor,
                  userSelect: "none",
                }}
              >
                <p className="font-medium">{link.name}</p>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="transition-colors duration-300 bg-zinc-900 text-white p-1 border-2 rounded-xs border-dashed  hover:text-red-600"
                >
                  <FiTrash2 size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Admin;
