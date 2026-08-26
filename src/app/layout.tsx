import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

/* Outfit reproduce las letras del mockup: 'a' de dos pisos (lo que descarta
   Poppins, que la tiene geométrica de un piso), tilde de la 'i' rectangular,
   'C' y 'o' de círculo casi perfecto y mayúsculas muy anchas en el peso más
   alto, que es lo que da el aire de "MUC" y "LXR". */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elige tu asiento · MUC a LXR",
  description:
    "Mapa de cabina del vuelo No 25 de Munich a Londres: elige hasta dos asientos y confirma el total.",
};

export const viewport: Viewport = {
  // Sin maximumScale ni userScalable: el mapa de cabina es denso y el zoom
  // del navegador es la vía de escape para quien necesite plazas más grandes.
  themeColor: "#fffdfd",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* lang="es": los textos accesibles (aria-label, aviso de tope) van en
       español, que es el idioma de este taller. Los rótulos visibles siguen en
       inglés porque así están en los mockups. La mezcla es una deuda conocida,
       anotada en el anexo. */
    <html lang="es" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
