import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El indicador flotante de Next tapa la esquina inferior izquierda, justo
  // encima de los chips del riel. Se apaga para poder comparar capturas
  // contra los mockups sin ruido.
  devIndicators: false,
};

export default nextConfig;
