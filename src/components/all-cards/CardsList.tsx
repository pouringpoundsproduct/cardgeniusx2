
import { Button } from "@/components/ui/button";
import { CardItem } from "./CardItem";
import { CardSkeleton } from "./CardSkeleton";

interface CardsListProps {
  cards: any[];
  loading: boolean;
  onAskAI: (cardName: string) => void;
}

export const CardsList = ({ cards, loading, onAskAI }: CardsListProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `Showing ${cards.length} cards`}
        </p>
        
        {/* Check Eligibility Filter */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
            Check Eligibility
          </Button>
        </div>
      </div>

      {/* Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(8)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card, index) => (
            <CardItem 
              key={card.id} 
              card={card} 
              index={index} 
              onAskAI={onAskAI}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
          Load More Cards
        </Button>
      </div>
    </div>
  );
};
