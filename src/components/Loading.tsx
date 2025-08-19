export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      {/* Icono de caja registradora animada */}
      <div className="relative mb-6">
        <div className="w-16 h-12 bg-gray-800 rounded-t-lg relative">
          {/* Pantalla de la caja */}
          <div className="w-12 h-8 bg-green-400 rounded mx-auto mt-1 flex items-center justify-center">
            <div className="text-xs font-mono text-gray-800 animate-pulse">$$$</div>
          </div>
        </div>
        {/* Base de la caja */}
        <div className="w-20 h-4 bg-gray-700 rounded-b-lg -mt-1"></div>

        {/* Papel que sale animado */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-8 bg-white border border-gray-300 rounded-b animate-pulse"
               style={{
                 height: '20px',
                 animation: 'paper-out 1.5s ease-in-out infinite'
               }}>
            <div className="w-full h-1 bg-gray-300 mt-1"></div>
            <div className="w-3/4 h-1 bg-gray-300 mt-1"></div>
            <div className="w-1/2 h-1 bg-gray-300 mt-1"></div>
          </div>
        </div>
      </div>

      {/* Puntos de progreso */}
      <div className="flex space-x-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
             style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
             style={{animationDelay: '0.4s'}}></div>
      </div>

      <style jsx>{`
        @keyframes paper-out {
          0% { height: 10px; opacity: 0.7; }
          50% { height: 25px; opacity: 1; }
          100% { height: 10px; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}