
import { Card, CardContent } from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="animate-pulse flex items-center space-x-6">
          <div className="w-20 h-12 bg-muted rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-2"></div>
            <div className="flex space-x-4">
              <div className="h-6 w-16 bg-muted rounded"></div>
              <div className="h-6 w-16 bg-muted rounded"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="h-10 w-20 bg-muted rounded"></div>
            <div className="h-10 w-24 bg-muted rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
