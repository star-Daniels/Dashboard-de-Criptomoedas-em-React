import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} — Desenvolvido por <strong>Daniel Santos</strong>
      </p>
      <span>Crypto Dashboard • React + API CoinGecko</span>
    </footer>
  );
}
