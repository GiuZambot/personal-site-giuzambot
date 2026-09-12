import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-code">404</p>
      <h1>Este portal ainda não existe</h1>
      <p>A rota se perdeu entre uma dimensão e outra.</p>
      <a href="/">Voltar para o universo de Giu</a>
    </main>
  );
}
