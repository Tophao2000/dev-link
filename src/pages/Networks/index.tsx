import { type FormEvent, useState } from "react";
import { LuLink } from "react-icons/lu";
import Buttton from "../../components/Button";
import Input from "../../components/Input";
import Header from "../../components/Header";

function Networks() {
  const [linkedinLink, setLinkedinLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-7 px-2">
      <Header />

      <h1 className="font-bold text-3xl mt-8">Suas Redes Sociais</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mb-3 mt-5 w-full max-w-xl"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link-name" className="font-medium">
            Link do LinkedIn
          </label>
          <Input
            type="url"
            placeholder="Digite a URL..."
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link-url" className="font-medium">
            Link do Instagram
          </label>
          <Input
            type="url"
            placeholder="Digite a URL..."
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="link-url" className="font-medium">
            Link do GitHub
          </label>
          <Input
            type="url"
            placeholder="Digite a URL..."
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
