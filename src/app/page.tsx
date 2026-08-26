import { vuelo } from "@/data/vuelo";
import { PantallaSeleccion } from "@/components/PantallaSeleccion";

/* Server Component: lee el vuelo del módulo de datos y se lo pasa a la
   pantalla, que es la que lleva el estado de la selección. */
export default function Page() {
  return <PantallaSeleccion vuelo={vuelo} />;
}
