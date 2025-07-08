import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, Search, Calculator, Zap, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // No navigation items needed - just logo

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
          >
            <CreditCard className="h-6 w-6" />
            <span>Uncredit</span>
          </Link>

          {/* Desktop Navigation - Clean minimal */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Empty - minimal navigation */}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation - Minimal */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="text-center text-muted-foreground">
              Navigate by clicking the logo
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};