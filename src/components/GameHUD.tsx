import { useEffect } from "react";
import { useEOCGame } from "@/lib/stores/useEOCGame";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GameHUD() {
  const { 
    scenario, 
    resources, 
    score, 
    timeRemaining, 
    currentZone,
    updateTime 
  } = useEOCGame();

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime(1);
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTime]);

  if (!scenario) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-PH');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div className="w-full h-full p-4 flex flex-col">
        <div className="flex justify-between items-start gap-4 pointer-events-auto">
          <Card className="bg-gray-900/90 border-gray-700 text-white backdrop-blur-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-yellow-400">{scenario.name}</h2>
                  <p className="text-sm text-gray-300">Severity Level {scenario.severity}</p>
                </div>
                <Badge variant="destructive" className="text-lg px-3 py-1">
                  {formatTime(timeRemaining)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-400">Affected Population</p>
                  <p className="font-semibold text-orange-400">{formatNumber(scenario.affectedPopulation)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Evacuees</p>
                  <p className="font-semibold text-blue-400">{formatNumber(scenario.evacuees)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Casualties</p>
                  <p className="font-semibold text-red-400">{formatNumber(scenario.casualties)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Damage Estimate</p>
                  <p className="font-semibold text-yellow-400">₱{formatNumber(scenario.damageEstimate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/90 border-gray-700 text-white backdrop-blur-sm">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-bold text-green-400 text-lg">Resources / Mga Mapagkukunan</h3>
              <div className="space-y-1 text-sm min-w-[200px]">
                <div className="flex justify-between">
                  <span className="text-gray-300">Personnel:</span>
                  <span className="font-semibold">{resources.personnel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Medical Supplies:</span>
                  <span className="font-semibold">{resources.medicalSupplies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Food Packs:</span>
                  <span className="font-semibold">{resources.foodPacks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rescue Equipment:</span>
                  <span className="font-semibold">{resources.rescueEquipment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Vehicles:</span>
                  <span className="font-semibold">{resources.vehicles}</span>
                </div>
                <div className="flex justify-between border-t border-gray-600 pt-1 mt-1">
                  <span className="text-gray-300">Budget:</span>
                  <span className="font-semibold text-green-400">₱{formatNumber(resources.budget)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-auto flex justify-between items-end pointer-events-auto">
          <Card className="bg-blue-900/90 border-blue-700 text-white backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-blue-200">Response Score / Puntos</p>
                  <p className="text-2xl font-bold text-yellow-300">{score}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {currentZone && (
            <Card className="bg-purple-900/90 border-purple-700 text-white backdrop-blur-sm">
              <CardContent className="p-3">
                <p className="text-xs text-purple-200">Current Zone / Kasalukuyang Zona</p>
                <p className="text-lg font-bold text-purple-100">{currentZone.toUpperCase()}</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gray-900/90 border-gray-700 text-white backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="text-xs space-y-1">
                <p className="text-gray-400">Controls:</p>
                <p><strong>WASD/Arrows:</strong> Move</p>
                <p><strong>Mouse:</strong> Look Around</p>
                <p><strong>Click Canvas:</strong> Lock Camera</p>
                <p><strong>ESC:</strong> Unlock Camera</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
