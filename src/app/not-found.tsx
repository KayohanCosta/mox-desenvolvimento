import Link from "next/link";
export default function NotFound() {
  return (
    <main id="conteudo" className="wrap inner-hero">
      <p className="eyebrow">404</p>
      <h1>
        Esse caminho
        <br />
        não existe<span className="purple">.</span>
      </h1>
      <Link className="button" href="/">
        Voltar para o início ↗
      </Link>
    </main>
  );
}
