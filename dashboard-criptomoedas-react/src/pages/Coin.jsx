import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

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
    <div>
      <Link to="/"> Back</Link>

      <h1>{coin.name}</h1>
      <img src={coin.image.large} alt={coin.name} width="80" />

      <p>Rank: {coin.market_cap_rank}</p>
      <p>
        Current price: R$ {coin.market_data.current_price.brl}
      </p>
      <p>
        Market cap: R$ {coin.market_data.market_cap.brl}
      </p>
      <p>
        24h change: {coin.market_data.price_change_percentage_24h}%
      </p>
    </div>
  );
}
