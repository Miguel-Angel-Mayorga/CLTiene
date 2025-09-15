import { useNavigate } from "react-router-dom";
import ContainerComponent from "../components/ContainerComponent";
import landingLogo from "../assets/ejemplo_de_bot.png";
import IlustracionAsistente from "../assets/Ilustracion_asistente.webp";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <ContainerComponent>
      <main
        className="relative flex flex-col items-start text-left bg-[#9776DF] rounded-2xl border border-white/20 shadow-xl
                   w-[90%] max-w-[900px] min-h-fit h-auto p-6 md:p-12"
                   
      >
        <div className="flex flex-col items-center text-left mx-auto w-full max-w-md">
          <img
            src={landingLogo}
            alt="Dexter, asistente virtual"
            width={700}
            height={700}
            className=" w-56 md:w-72 h-auto select-none"
            decoding="async"
          />
          <p className="text-white/90 text-base md:text-lg max-w-md">
            <span>Tu asistente para el programa de</span>
            <span className="font-semibold block">
              Administración Deportiva
            </span>
          </p>
          <img
            src={IlustracionAsistente}
            alt="Ilustración de Dexter"
            width={1200}
            height={1200}
            className="mt-2 w-72 sm:w-72 h-auto object-contain select-none"
            loading="lazy"
            decoding="async"
          />

          <div className="flex flex-col items-center text-center w-full">
            <p className="mt-6 text-white/80 text-lg">¡Pregúntame algo!</p>
            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="mt-3 bg-[#584c8c] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-95 focus:outline-none"
            >
              INICIAR
            </button>
          </div>
        </div>
      </main>
    </ContainerComponent>
  );
};

export default Landing;
