import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import "./Home.css";


export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCoins() {
      try {
        const response = await api.get(
          "/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=20&page=1"
        );

        setCoins(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar dados da API");
        setLoading(false);
      }
    }

    loadCoins();
  }, []);

  if (loading) return <h2>Carregando...</h2>;
  if (error) return <h2>{error}</h2>;

 return (
  <div className="crypto-container">
    <h1 className="crypto-title"> Dashboard de Criptomoedas</h1>

    <div className="crypto-list">
      {coins.map((coin) => (
        <Link key={coin.id} to={`/coin/${coin.id}`} className="crypto-card">
          <div className="crypto-info">
            <span className="crypto-rank">{coin.market_cap_rank}º</span>
            <span className="crypto-name">{coin.name}</span>
          </div>

          <div className="crypto-prices">
            <p className="crypto-price">
              R$ {coin.current_price.toLocaleString("pt-BR")}
            </p>
            <p
              className={`crypto-change ${
                coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

}
