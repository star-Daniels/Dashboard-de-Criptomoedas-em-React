import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Dashboard de Criptomoedas</h1>

      {coins.map((coin) => (
        <Link key={coin.id} to={`/coin/${coin.id}`}>
          <div style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
            <p><strong>{coin.market_cap_rank}º</strong> - {coin.name}</p>
            <p>Preço: R$ {coin.current_price}</p>
            <p>Variação 24h: {coin.price_change_percentage_24h}%</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
