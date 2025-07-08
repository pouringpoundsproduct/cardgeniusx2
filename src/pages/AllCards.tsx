
import { useState, useEffect } from "react";
import { SearchHeader } from "@/components/all-cards/SearchHeader";
import { CardsList } from "@/components/all-cards/CardsList";
import { AIWidget } from "@/components/all-cards/AIWidget";

const AllCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIWidget, setShowAIWidget] = useState(false);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: "",
          banks_ids: [],
          card_networks: [],
          annualFees: "",
          credit_score: "",
          sort_by: "",
          free_cards: "",
          eligiblityPayload: {},
          cardGeniusPayload: {}
        }),
      });
      const data = await response.json();
      setCards(data.cards?.slice(0, 8) || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = (cardName: string) => {
    setShowAIWidget(true);
    console.log(`AI query for card: ${cardName}`);
  };

  const filteredCards = cards.filter(card => 
    card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.bank_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <CardsList 
        cards={filteredCards}
        loading={loading}
        onAskAI={handleAskAI}
      />

      <AIWidget 
        showAIWidget={showAIWidget}
        onClose={() => setShowAIWidget(false)}
      />
    </div>
  );
};

export default AllCards;
