import { useEOCGame } from "@/lib/stores/useEOCGame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Menu() {
  const { startTutorial } = useEOCGame();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 z-50">
      <div className="w-full max-w-4xl px-4">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-4xl font-bold text-blue-900">
                Emergency Operations Center
              </CardTitle>
              <p className="text-xl text-blue-700 font-semibold">
                EOC Simulation / Simulasyon ng EOC
              </p>
            </div>
            <CardDescription className="text-base text-gray-700">
              3D Disaster Risk Reduction and Management Training for Philippine Local Government Units
              <br />
              <span className="text-sm italic">
                Pagsasanay sa Pagbawas ng Panganib at Pamamahala sa Sakuna para sa mga Lokal na Yunit ng Pamahalaan
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-lg text-blue-900">Objectives / Mga Layunin:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Manage emergency response operations in a realistic EOC environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Apply DRRM principles based on RA 10121 (Philippine Disaster Risk Reduction and Management Act)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Practice resource allocation and decision-making under pressure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Coordinate multi-agency response following the Incident Command System</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">EOC Zones / Mga Zona:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Command Center</li>
                  <li>• Operations</li>
                  <li>• Logistics</li>
                  <li>• Planning</li>
                  <li>• Finance/Admin</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-900 mb-2">Controls / Kontrol:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>WASD/Arrow Keys:</strong> Move</li>
                  <li>• <strong>Mouse:</strong> Look Around</li>
                  <li>• <strong>E:</strong> Interact</li>
                  <li>• <strong>ESC:</strong> Pause Menu</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
              <Button 
                onClick={startTutorial}
                size="lg"
                className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6"
              >
                Start Tutorial: Typhoon Response
                <br />
                <span className="text-sm font-normal">Simulang Magsanay: Tugon sa Bagyo</span>
              </Button>
              
              <p className="text-xs text-gray-500 text-center max-w-md">
                This simulation is designed for training purposes and follows ISO 22301 (Business Continuity) 
                and ISO 31000 (Risk Management) standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
