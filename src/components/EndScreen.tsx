import { useEOCGame } from "@/lib/stores/useEOCGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function EndScreen() {
  const { scenario, score, resources, completedDecisions, restart } = useEOCGame();

  if (!scenario) return null;

  const getPerformanceRating = (score: number) => {
    if (score >= 100) return { rating: "Excellent", color: "bg-green-600", message: "Napakahusay!" };
    if (score >= 75) return { rating: "Very Good", color: "bg-blue-600", message: "Napakagaling!" };
    if (score >= 50) return { rating: "Good", color: "bg-yellow-600", message: "Mabuti!" };
    if (score >= 25) return { rating: "Fair", color: "bg-orange-600", message: "Katamtaman" };
    return { rating: "Needs Improvement", color: "bg-red-600", message: "Kailangan ng Pagpapabuti" };
  };

  const performance = getPerformanceRating(score);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 z-50">
      <div className="w-full max-w-3xl px-4">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className={`${performance.color} text-white text-center`}>
            <CardTitle className="text-3xl font-bold">Scenario Complete</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              {scenario.name} - Response Summary
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-block">
                <Badge className={`${performance.color} text-white text-2xl px-6 py-3`}>
                  {performance.rating} - {performance.message}
                </Badge>
              </div>
              <p className="text-5xl font-bold text-blue-900">{score} Points</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Scenario Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disaster Type:</span>
                      <span className="font-semibold">{scenario.type.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Affected Population:</span>
                      <span className="font-semibold">{scenario.affectedPopulation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Evacuees:</span>
                      <span className="font-semibold">{scenario.evacuees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Casualties:</span>
                      <span className="font-semibold text-red-600">{scenario.casualties}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Resources Remaining</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Personnel:</span>
                      <span className="font-semibold">{resources.personnel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medical Supplies:</span>
                      <span className="font-semibold">{resources.medicalSupplies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Food Packs:</span>
                      <span className="font-semibold">{resources.foodPacks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget Remaining:</span>
                      <span className="font-semibold text-green-600">
                        ₱{resources.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-purple-900 mb-3">
                  Decisions Made: {completedDecisions.length}
                </h3>
                <p className="text-sm text-gray-700">
                  You successfully navigated {completedDecisions.length} critical decision points during this emergency scenario,
                  demonstrating your ability to manage resources and respond effectively under pressure.
                </p>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Learning Points / Mga Natutunan:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Applied RA 10121 (DRRM Act) principles in emergency response</li>
                <li>• Practiced resource allocation following ISO 22301 standards</li>
                <li>• Coordinated multi-agency response using Incident Command System</li>
                <li>• Demonstrated decision-making under time and resource constraints</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={restart}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg"
              >
                Return to Main Menu
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Continue training to improve your emergency response skills
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
