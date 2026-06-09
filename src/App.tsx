import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Fire,
  IdentificationCard,
  Wine,
  BeerBottle,
  UsersThree,
  ListChecks,
  CheckCircle,
  X,
} from "@phosphor-icons/react";

interface FlagConfig {
  id: string;
  bg: string;
  shape: number;
  textColor: string;
}

export default function App() {
  const [currentId, setCurrentId] = useState<string>("home");
  const [nome, setNome] = useState("");
  const [comida, setComida] = useState("");
  const [vaiBeber, setVaiBeber] = useState<boolean | null>(null);
  const [bebida, setBebida] = useState("");
  const [cienteBebida, setCienteBebida] = useState(false);
  const [levarGente, setLevarGente] = useState<boolean | null>(null);
  const [convidados, setConvidados] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTrack = (): FlagConfig[] => {
    const track: FlagConfig[] = [];
    track.push({
      id: "home",
      bg: "bg-red-600",
      shape: 1,
      textColor: "text-white",
    });
    track.push({
      id: "identificacao",
      bg: "bg-blue-600",
      shape: 2,
      textColor: "text-white",
    });
    track.push({
      id: "bebidas",
      bg: "bg-green-600",
      shape: 3,
      textColor: "text-white",
    });
    if (vaiBeber === true) {
      track.push({
        id: "qual_bebida",
        bg: "bg-yellow-400",
        shape: 4,
        textColor: "text-neutral-900",
      });
    }
    track.push({
      id: "acompanhantes",
      bg: "bg-orange-500",
      shape: 1,
      textColor: "text-white",
    });
    if (levarGente === true) {
      track.push({
        id: "lista",
        bg: "bg-purple-600",
        shape: 2,
        textColor: "text-white",
      });
    }
    track.push({
      id: "sucesso",
      bg: "bg-pink-600",
      shape: 3,
      textColor: "text-white",
    });
    return track;
  };

  const track = getTrack();
  const trackIds = track.map((t) => t.id);
  const currentIndex =
    trackIds.indexOf(currentId) !== -1 ? trackIds.indexOf(currentId) : 0;

  const avancar = async () => {
    if (currentIndex < trackIds.length - 1) {
      const proximoId = trackIds[currentIndex + 1];

      if (proximoId === "sucesso") {
        setIsSubmitting(true);
        try {
          const templateParams = {
            nome: nome,
            comida: comida,
            vai_beber: vaiBeber ? "Sim" : "Não",
            bebida: bebida || "Nenhuma",
            levar_gente: levarGente ? "Sim" : "Não",
            convidados:
              convidados.filter((c) => c.trim() !== "").join(", ") || "Nenhum",
          };

          await emailjs.send(
            "service_8gt4w18",
            "template_ctectee",
            templateParams,
            "2YULp3swOMMiQelOb",
          );

          setCurrentId(proximoId);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          alert("Ocorreu um erro ao enviar sua confirmação. Tente novamente.");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setCurrentId(proximoId);
      }
    }
  };

  const voltar = () => {
    if (currentIndex > 0) {
      setCurrentId(trackIds[currentIndex - 1]);
    }
  };

  const reiniciar = () => {
    setCurrentId("home");
    setNome("");
    setComida("");
    setVaiBeber(null);
    setBebida("");
    setCienteBebida(false);
    setLevarGente(null);
    setConvidados([""]);
  };

  const validarEtapa = () => {
    if (currentId === "identificacao")
      return nome.trim() !== "" && comida.trim() !== "";
    if (currentId === "bebidas") return vaiBeber !== null;
    if (currentId === "qual_bebida")
      return bebida.trim() !== "" && cienteBebida;
    if (currentId === "acompanhantes") return levarGente !== null;
    if (currentId === "lista")
      return convidados.length > 0 && convidados.every((c) => c.trim() !== "");
    return true;
  };

  const getClipPath = (shape: number) => {
    switch (shape) {
      case 1:
        return "polygon(0% 0%, 100% 0%, 100% 100%, 50% 88%, 0% 100%)";
      case 2:
        return "polygon(0% 0%, 100% 0%, 100% 88%, 50% 100%, 0% 88%)";
      case 3:
        return "polygon(0% 0%, 100% 0%, 100% 92%, 0% 100%)";
      case 4:
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 92%)";
      default:
        return "polygon(0% 0%, 100% 0%, 100% 100%, 50% 88%, 0% 100%)";
    }
  };

  const inputStyle =
    "w-full rounded-xl border-2 border-current/30 bg-black/10 p-4 placeholder-current/70 outline-none transition-all focus:bg-black/20 focus:border-current shadow-inner font-serif text-lg";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center selection:bg-black selection:text-white overflow-hidden relative p-4">
      <div className="relative w-full max-w-[420px] h-[700px] mx-auto flex items-start justify-center z-10">
        <div className="varal-line"></div>

        {track.map((flag, index) => {
          const offset = index - currentIndex;

          if (Math.abs(offset) > 2) return null;

          return (
            <motion.div
              key={flag.id}
              initial={false}
              animate={{
                x: `${offset * 115}%`,
                scale: offset === 0 ? 1 : 0.85,
                opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : 0.4,
                rotate: offset === 0 ? 0 : offset * 4,
                zIndex: offset === 0 ? 20 : 10 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="absolute top-0 w-full h-[660px] origin-top"
            >
              <div className="absolute top-0 left-1/4 w-2 h-10 bg-[#b8a08c] -translate-x-1/2 -translate-y-4 rounded-sm shadow-md z-30"></div>
              <div className="absolute top-0 left-3/4 w-2 h-10 bg-[#b8a08c] -translate-x-1/2 -translate-y-4 rounded-sm shadow-md z-30"></div>

              <div
                className={`w-full h-full ${flag.bg} ${flag.textColor} shadow-2xl relative flex flex-col pt-12 pb-44 px-6 sm:px-8 animate-sway`}
                style={{ clipPath: getClipPath(flag.shape) }}
              >
                <div className="flex-1 flex flex-col justify-start pt-6 w-full">
                  {flag.id === "home" && (
                    <div className="text-center w-full">
                      <Fire
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h1 className="font-arraia text-5xl sm:text-6xl drop-shadow-md leading-tight mb-4">
                        2º Arraiá <br />
                        <span className="text-3xl sm:text-4xl font-serif font-bold tracking-wide">
                          FML LGBT
                        </span>
                      </h1>
                      <p className="font-serif text-base sm:text-lg mb-10 max-w-xs mx-auto leading-relaxed opacity-95">
                        Prepara o look xadrez, traz o teu orgulho e vem curtir o
                        melhor arrasta-pé da região!
                      </p>
                      <button
                        onClick={avancar}
                        className="w-full font-arraia text-2xl font-bold py-5 px-6 rounded-xl shadow-lg active:scale-95 transition-all bg-white/20 hover:bg-white/30 text-current border-2 border-transparent hover:border-current"
                      >
                        Entrar e Confirmar
                      </button>
                    </div>
                  )}

                  {flag.id === "identificacao" && (
                    <div className="w-full">
                      <IdentificationCard
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl text-center drop-shadow-sm mb-8">
                        Identificação
                      </h2>
                      <div className="flex flex-col gap-6">
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className={inputStyle}
                        />
                        <textarea
                          placeholder="O que você vai trazer para comer?"
                          value={comida}
                          onChange={(e) => setComida(e.target.value)}
                          className={`${inputStyle} resize-none h-32`}
                        />
                      </div>
                    </div>
                  )}

                  {flag.id === "bebidas" && (
                    <div className="text-center w-full">
                      <Wine
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl drop-shadow-sm mb-6">
                        Bebidas
                      </h2>
                      <p className="font-serif text-lg mb-5 px-2 opacity-95">
                        Você pretende consumir bebidas alcoólicas na festa?
                      </p>
                      <div className="flex flex-col gap-5 max-w-xs mx-auto w-full">
                        <button
                          onClick={() => setVaiBeber(true)}
                          className={`py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 ${vaiBeber === true ? "bg-white text-green-600 border-white shadow-md" : "bg-transparent border-current/40 hover:bg-black/10"}`}
                        >
                          Sim, vou beber!
                        </button>
                        <button
                          onClick={() => setVaiBeber(false)}
                          className={`py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 ${vaiBeber === false ? "bg-white text-green-600 border-white shadow-md" : "bg-transparent border-current/40 hover:bg-black/10"}`}
                        >
                          Não, passo.
                        </button>
                      </div>
                    </div>
                  )}

                  {flag.id === "qual_bebida" && (
                    <div className="w-full">
                      <BeerBottle
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl text-center drop-shadow-sm mb-8">
                        O que vai beber?
                      </h2>
                      <div className="flex flex-col gap-8">
                        <input
                          type="text"
                          placeholder="Ex: Cerveja, Vinho, Refri..."
                          value={bebida}
                          onChange={(e) => setBebida(e.target.value)}
                          className={inputStyle}
                        />
                        <label className="flex items-start gap-5 bg-black/5 p-5 rounded-xl border border-current/20 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={cienteBebida}
                            onChange={(e) => setCienteBebida(e.target.checked)}
                            className="h-7 w-7 rounded border-2 border-current focus:ring-0 cursor-pointer mt-1 shrink-0 bg-transparent"
                          />
                          <span className="text-base font-medium leading-relaxed opacity-95 font-serif">
                            Estou ciente de que ajudarei a financiar o
                            abastecimento de bebidas da festa.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {flag.id === "acompanhantes" && (
                    <div className="text-center w-full">
                      <UsersThree
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl drop-shadow-sm mb-6">
                        Acompanhantes
                      </h2>
                      <p className="font-serif text-lg mb-5 px-2 opacity-95">
                        Você pretende levar convidados com você para o arraiá?
                      </p>
                      <div className="flex flex-col gap-5 max-w-xs mx-auto w-full">
                        <button
                          onClick={() => setLevarGente(true)}
                          className={`py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 ${levarGente === true ? "bg-white text-orange-500 border-white shadow-md" : "bg-transparent border-current/40 hover:bg-black/10"}`}
                        >
                          Sim, pretendo levar!
                        </button>
                        <button
                          onClick={() => setLevarGente(false)}
                          className={`py-5 px-6 rounded-xl font-bold text-lg transition-all border-2 ${levarGente === false ? "bg-white text-orange-500 border-white shadow-md" : "bg-transparent border-current/40 hover:bg-black/10"}`}
                        >
                          Vou sozinho(a).
                        </button>
                      </div>
                    </div>
                  )}

                  {flag.id === "lista" && (
                    <div className="w-full">
                      <ListChecks
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl text-center drop-shadow-sm mb-2">
                        Lista de Convidados
                      </h2>
                      <p className="text-center text-sm opacity-80 mb-6 font-serif">
                        Você pode listar até 3 pessoas
                      </p>
                      <div className="flex flex-col gap-3">
                        {convidados.map((convidado, i) => (
                          <div key={i} className="flex gap-3">
                            <input
                              type="text"
                              placeholder={`Acompanhante ${i + 1}`}
                              value={convidado}
                              onChange={(e) => {
                                const novos = [...convidados];
                                novos[i] = e.target.value;
                                setConvidados(novos);
                              }}
                              className={`${inputStyle} p-4 flex-1`}
                            />
                            {convidados.length > 1 && (
                              <button
                                onClick={() =>
                                  setConvidados(
                                    convidados.filter((_, idx) => idx !== i),
                                  )
                                }
                                className="bg-black/20 px-5 rounded-xl font-bold flex items-center justify-center hover:bg-black/30 transition-all border border-transparent"
                              >
                                <X size={24} weight="bold" />
                              </button>
                            )}
                          </div>
                        ))}
                        {convidados.length < 3 && (
                          <button
                            onClick={() => setConvidados([...convidados, ""])}
                            className="text-base font-bold mt-2 hover:opacity-70 transition-opacity underline self-start font-serif"
                          >
                            + Adicionar outro convidado
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {flag.id === "sucesso" && (
                    <div className="text-center w-full">
                      <CheckCircle
                        size={64}
                        weight="duotone"
                        className="mx-auto mb-6 drop-shadow-md"
                      />
                      <h2 className="font-arraia text-4xl drop-shadow-sm mb-6">
                        Presença Confirmada!
                      </h2>
                      <p className="font-serif text-lg mb-10 max-w-xs mx-auto opacity-95">
                        O fogo do nosso arraiá já tá aceso. A sua lista e as
                        suas preferências foram salvas com sucesso!
                      </p>
                      <button
                        onClick={reiniciar}
                        className="underline text-base hover:opacity-70 transition-all font-bold font-serif"
                      >
                        Voltar para o Início
                      </button>
                    </div>
                  )}
                </div>

                {flag.id !== "home" && flag.id !== "sucesso" && (
                  <div className="absolute bottom-28 left-0 w-full px-6 sm:px-8 flex gap-4 justify-between z-40">
                    <button
                      onClick={voltar}
                      disabled={isSubmitting}
                      className="flex-1 py-4 px-4 rounded-xl font-bold text-base transition-all active:scale-95 bg-black/15 hover:bg-black/25 disabled:opacity-50"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={avancar}
                      disabled={!validarEtapa() || isSubmitting}
                      className={`flex-1 py-4 px-4 rounded-xl font-bold text-base transition-all ${
                        validarEtapa() && !isSubmitting
                          ? "bg-white/20 hover:bg-white/30 active:scale-95 shadow-md border border-white/30"
                          : "bg-black/5 opacity-40 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? "Enviando..." : "Avançar"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
