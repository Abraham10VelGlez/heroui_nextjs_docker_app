import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //CONFIGURACIONES PARA TRABAJAR CON DOCKER SOBRE LA APP
  //solo se aplica en modo desarrollo de docker ...(process.env.NODE_ENV === "development" && {
  ...(process.env.NODE_ENV === "development" && {
    reactStrictMode: true,
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 1000, // Ajusta el tiempo de escucha de cambios
        aggregateTimeout: 300,
      };
      return config;
    },
  }),
};

export default nextConfig;
