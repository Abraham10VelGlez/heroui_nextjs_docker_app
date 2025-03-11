/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //CONFIGURACIONES PARA TRABAJAR CON DOCKER SOBRE LA APP
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Ajusta el tiempo de escucha de cambios
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
*/
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otras configuraciones de Next.js

  devIndicators: {
    autoPrerender: false,
  },

  // Asegúrate de que el servidor escuche en todas las interfaces
  serverRuntimeConfig: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
  },

};

export default nextConfig;

