import React from 'react';

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-[#1A1A2E] text-white flex items-center px-6 py-4 shadow-md z-10">
      <div className="flex items-center space-x-4"> {/* Aumentado el espacio entre logo y texto */}
        {/* Aquí la imagen */}
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" /> {/* Ajustado a 'object-contain' si es necesario */}
        
        {/* Contenedor del texto */}
        <div className="flex flex-col"> {/* Asegura que el texto esté en columna si quieres dos líneas */}
          <h1 className="text-xl font-bold leading-none">CLTIENE</h1> {/* 'leading-none' para reducir espacio entre líneas */}
          <p className="text-sm">SOLUCIONES</p>
        </div>
      </div>
      
      {/* Elemento de la derecha (Servicio de ayuda) */}
      <div className="ml-auto text-sm md:text-base">Servicio de ayuda</div> {/* 'ml-auto' para empujar a la derecha */}
    </header>
  );
};

export default Navbar;