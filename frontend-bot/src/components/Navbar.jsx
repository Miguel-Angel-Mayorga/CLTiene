import person from '../assets/Asset 2@4x.png';
import menu from '../assets/burger.png';
import logo from '../assets/CLTiene-logo.png';

const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-700 fixed top-0 z-50">
      <div className="w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* IZQUIERDA - Los 3 elementos juntos */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Menú hamburguesa */}
          <img 
            src={menu}
            alt="menu hamburguesa" 
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />

          {/* Logo - Se oculta en móviles pequeños si es necesario */}
          <img 
            src={logo} 
            alt="Logo CLTIENE" 
            className="h-8 w-32 sm:h-10 sm:w-40 object-contain"
          />

          {/* Texto - Se oculta en móviles muy pequeños */}
          <h3 className="hidden sm:block text-sm sm:text-lg font-semibold">
            Servicio de ayuda
          </h3>
        </div>

        {/* DERECHA - Icono de persona */}
        <div className="flex items-center">
          <img 
            src={person} 
            alt="logo de persona" 
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;