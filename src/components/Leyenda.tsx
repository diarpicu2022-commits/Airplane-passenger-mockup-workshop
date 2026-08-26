/* Los dos mockups usan rótulos distintos para la misma leyenda:
   escritorio dice Available / Selected / Taken, y móvil abrevia a
   Free / Yours / Taken. Se respeta tal cual (ver anexo, hallazgo 3).

   El cuadrito de la leyenda repite la forma y el radio del asiento, no es un
   punto ni una línea: así el usuario mapea la muestra con la plaza sin
   traducir nada. */

const MUESTRA = "size-[18px] shrink-0 rounded-[6px] lg:size-5 lg:rounded-[7px]";

interface Props {
  variante: "escritorio" | "movil";
}

export function Leyenda({ variante }: Props) {
  const esMovil = variante === "movil";

  const items = esMovil
    ? ["Free", "Yours", "Taken"]
    : ["Available", "Selected", "Taken"];

  return (
    <ul
      className={`flex items-center gap-x-4 text-[13px] text-muted lg:gap-x-6 lg:text-[13px] ${
        esMovil ? "justify-start" : "justify-center"
      }`}
    >
      <li className="flex items-center gap-2">
        <span className={`${MUESTRA} border-2 border-coral-line bg-white`} />
        {items[0]}
      </li>
      <li className="flex items-center gap-2">
        <span className={`${MUESTRA} bg-coral`} />
        {items[1]}
      </li>
      <li className="flex items-center gap-2">
        <span className={`${MUESTRA} bg-taken`} />
        {items[2]}
      </li>
    </ul>
  );
}
