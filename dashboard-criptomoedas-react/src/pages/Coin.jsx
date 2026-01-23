import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import "./Coin.css";

export default function Coin() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCoin() {
      try {
        const response = await api.get(`/coins/${id}`);
        setCoin(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error loading coin data");
        setLoading(false);
      }
    }

    loadCoin();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
  <div className="coin-container">
    <Link to="/" className="back-link">← Voltar</Link>

    <div className="coin-card">
      <div className="coin-header">
        <img src={coin.image.large} alt={coin.name} />
        <h1>{coin.name}</h1>
      </div>

      <div className="coin-grid">
        <div className="coin-box">
          <span>Rank</span>
          <strong>#{coin.market_cap_rank}</strong>
        </div>

        <div className="coin-box">
          <span>Preço atual</span>
          <strong>
            R$ {coin.market_data.current_price.brl.toLocaleString("pt-BR")}
          </strong>
        </div>

        <div className="coin-box">
          <span>Market Cap</span>
          <strong>
            R$ {coin.market_data.market_cap.brl.toLocaleString("pt-BR")}
          </strong>
        </div>

        <div className="coin-box">
          <span>Variação 24h</span>
          <strong
            className={
              coin.market_data.price_change_percentage_24h >= 0
                ? "positive"
                : "negative"
            }
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </strong>
        </div>
      </div>
    </div>
  </div>
);

}
