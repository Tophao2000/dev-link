import { type FormEvent, useState, useEffect } from "react";
import { LuLink } from "react-icons/lu";
import Buttton from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";

import { toast } from "react-toastify";

import { db } from "../../services/firebaseConnection";
import { getDoc, setDoc, doc } from "firebase/firestore";

function Networks() {
  const [linkedinLink, setLinkedinLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  useEffect(() => {
    async function loadLinks() {
      const docRef = doc(db, "social", "links");
      await getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setLinkedinLink(snapshot.data().linkedin);
            setInstagramLink(snapshot.data().instagram);
            setGithubLink(snapshot.data().github);
          }
        })
        .catch(() => {
          console.error("Erro ao carregar as redes! Tente novamente.");
        });
    }
    loadLinks();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      linkedinLink === "" ||
      instagramLink === "" ||
      githubLink === ""
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    async function addSocial() {
      await setDoc(doc(db, "social", "links"), {
        linkedin: linkedinLink,
        instagram: instagramLink,
        github: githubLink,
      })
        .then(() => {
          toast.success("Redes cadastradas com sucesso!");
          setLinkedinLink("");
          setInstagramLink("");
          setGithubLink("");
        })
        .catch(() => {
          toast.error("Erro ao cadastrar as redes! Tente novamente.");
        });
    }
    addSocial();
  }
  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-7 px-2">
      <Header />

      <h1 className="font-bold text-3xl mt-8">Minhas Redes</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mb-3 mt-5 w-full max-w-xl"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="linkedin-url" className="font-medium">
            Link do LinkedIn
          </label>
          <Input
            id="linkedin-url"
            type="url"
            placeholder="Digite a URL do LinkedIn..."
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="instagram-url" className="font-medium">
            Link do Instagram
          </label>
          <Input
            type="url"
            id="instagram-url"
            placeholder="Digite a URL do Instagram..."
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="github-url" className="font-medium">
            Link do GitHub
          </label>
          <Input
            type="url"
            id="github-url"
            placeholder="Digite a URL do GitHub..."
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <Buttton>
          Salvar links <LuLink size={20} />
        </Buttton>
      </form>
    </div>
  );
}

export default Networks;
