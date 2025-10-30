import { useEOCGame, type Decision } from "@/lib/stores/useEOCGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DecisionPanel() {
  const { decisionsWaiting, makeDecision, resources } = useEOCGame();

  if (decisionsWaiting.length === 0) return null;

  const currentDecision = decisionsWaiting[0];

  const canAfford = (cost: Partial<typeof resources>) => {
    return Object.entries(cost).every(([key, value]) => {
      if (!value) return true;
      return resources[key as keyof typeof resources] >= value;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 pointer-events-auto">
      <Card className="w-full max-w-2xl mx-4 bg-white shadow-2xl">
        <CardHeader className="bg-red-600 text-white">
          <CardTitle className="text-2xl">Decision Required / Kailangan ng Desisyon</CardTitle>
          <CardDescription className="text-red-100">
            Make a critical decision for the emergency response
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-gray-800 font-medium">{currentDecision.description}</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-gray-700">Choose your response:</p>
            {currentDecision.options.map((option, index) => {
              const affordable = canAfford(option.resourceCost);
              
              return (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 ${
                    affordable 
                      ? 'border-blue-300 bg-blue-50 hover:bg-blue-100' 
                      : 'border-gray-300 bg-gray-100 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-800 flex-1">{option.text}</p>
                    <Badge 
                      variant={option.effectivenessScore >= 15 ? "default" : "secondary"}
                      className="ml-2"
                    >
                      +{option.effectivenessScore} pts
                    </Badge>
                  </div>

                  {Object.keys(option.resourceCost).length > 0 && (
                    <div className="text-sm text-gray-600 mb-3">
                      <p className="font-semibold mb-1">Resource Cost:</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(option.resourceCost).map(([resource, cost]) => {
                          if (!cost) return null;
                          const available = resources[resource as keyof typeof resources];
                          const hasEnough = available >= cost;
                          
                          return (
                            <span
                              key={resource}
                              className={`px-2 py-1 rounded ${
                                hasEnough 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {resource}: -{cost} ({available} available)
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => makeDecision(currentDecision.id, index)}
                    disabled={!affordable}
                    className="w-full"
                    variant={affordable ? "default" : "secondary"}
                  >
                    {affordable ? 'Select This Option' : 'Insufficient Resources'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
