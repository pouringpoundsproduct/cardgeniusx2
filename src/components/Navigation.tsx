import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
          >
            <CreditCard className="h-6 w-6" />
            <span>Uncredit</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};