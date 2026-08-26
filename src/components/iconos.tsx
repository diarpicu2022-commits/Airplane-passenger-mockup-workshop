/* Iconos SVG propios. Sin librería: el mockup sólo necesita cuatro glifos y
   añadir una dependencia por eso sería desproporcionado.
   Todos heredan color con currentColor y son decorativos (aria-hidden): el
   texto accesible lo pone siempre el elemento que los contiene. */

type PropsIcono = { className?: string };

export function IconoChevron({ className }: PropsIcono) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 5 8 12l6.5 7" />
    </svg>
  );
}

export function IconoAjustes({ className }: PropsIcono) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M5 12H2.6M18.6 5.4l-1.6 1.6M7 17l-1.6 1.6M18.6 18.6 17 17M7 7 5.4 5.4" />
    </svg>
  );
}

/** Avión de perfil, morro a la derecha: es la dirección en la que viaja el
 *  arco punteado de MUC a LXR en los dos mockups. */
export function IconoAvion({ className }: PropsIcono) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12c0 .55-.37 1.03-.9 1.16l-6.35 1.59-2.6 5.83a.6.6 0 0 1-.55.35h-1.06a.6.6 0 0 1-.58-.75l1.4-5.3-4.02.78-1.1 1.98a.6.6 0 0 1-.52.31h-.6a.6.6 0 0 1-.58-.75L5.3 12 4.54 8.79a.6.6 0 0 1 .58-.75h.6c.22 0 .42.12.52.31l1.1 1.98 4.02.78-1.4-5.3a.6.6 0 0 1 .58-.75h1.06c.24 0 .45.14.55.35l2.6 5.83 6.35 1.59c.53.13.9.61.9 1.16Z" />
    </svg>
  );
}

/** Cuadro coral pequeño dentro del icono redondeado de la card de cabina. */
export function IconoCabina({ className }: PropsIcono) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
    </svg>
  );
}
