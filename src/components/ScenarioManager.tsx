import { useEffect, useRef } from "react";
import { useEOCGame } from "@/lib/stores/useEOCGame";

export function ScenarioManager() {
  const { scenario, addDecision, updateScenario, phase } = useEOCGame();
  const decisionsTriggered = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!scenario || phase !== "active_scenario") return;

    const triggers = [
      {
        id: "typhoon-evacuation",
        time: 540,
        decision: {
          id: "typhoon-evacuation",
          description: "The typhoon is intensifying. Storm surge warnings have been issued for coastal barangays. Several families are refusing to evacuate due to concerns about leaving their homes and livestock.",
          options: [
            {
              text: "Deploy rescue teams immediately to conduct forced evacuation with police assistance",
              resourceCost: { personnel: 20, vehicles: 3, budget: 50000 },
              effectivenessScore: 25,
            },
            {
              text: "Send community leaders to convince families, offer livestock shelter at evacuation centers",
              resourceCost: { personnel: 10, foodPacks: 30, budget: 30000 },
              effectivenessScore: 20,
            },
            {
              text: "Issue final warning via radio and SMS, document refusal for legal purposes",
              resourceCost: { personnel: 5, budget: 10000 },
              effectivenessScore: 5,
            },
          ],
        },
      },
      {
        id: "medical-supplies",
        time: 480,
        decision: {
          id: "medical-supplies",
          description: "Health centers report multiple injuries from falling debris and flooding. Medical supplies are running low. The rural health unit is requesting immediate resupply.",
          options: [
            {
              text: "Deploy emergency medical teams with full field hospital equipment",
              resourceCost: { medicalSupplies: 30, personnel: 15, vehicles: 2, budget: 100000 },
              effectivenessScore: 30,
            },
            {
              text: "Send basic first aid supplies and coordinate with provincial health office for backup",
              resourceCost: { medicalSupplies: 15, personnel: 8, budget: 40000 },
              effectivenessScore: 18,
            },
            {
              text: "Advise use of remaining supplies, request national government assistance",
              resourceCost: { medicalSupplies: 5, personnel: 3 },
              effectivenessScore: 8,
            },
          ],
        },
      },
      {
        id: "communication-breakdown",
        time: 420,
        decision: {
          id: "communication-breakdown",
          description: "Power outages have caused communication breakdown with 3 barangays in the mountainous area. Last report indicated rising flood waters and possible landslides.",
          options: [
            {
              text: "Deploy helicopter reconnaissance with satellite communication equipment",
              resourceCost: { personnel: 10, rescueEquipment: 8, vehicles: 1, budget: 150000 },
              effectivenessScore: 28,
            },
            {
              text: "Send ground teams with portable radios via alternate routes",
              resourceCost: { personnel: 15, rescueEquipment: 5, vehicles: 2, budget: 60000 },
              effectivenessScore: 20,
            },
            {
              text: "Wait for weather to clear and rely on barangay emergency response teams",
              resourceCost: { personnel: 5, budget: 20000 },
              effectivenessScore: 10,
            },
          ],
        },
      },
      {
        id: "evacuation-center-capacity",
        time: 360,
        decision: {
          id: "evacuation-center-capacity",
          description: "Evacuation centers are at 90% capacity. More families are arriving. Food supplies will last only 48 hours at current rate. Social distancing is becoming impossible.",
          options: [
            {
              text: "Open additional evacuation sites (schools, covered courts) and distribute resources",
              resourceCost: { foodPacks: 50, personnel: 20, budget: 80000 },
              effectivenessScore: 25,
            },
            {
              text: "Implement strict rationing and coordinate with NGOs for additional supplies",
              resourceCost: { foodPacks: 20, personnel: 10, budget: 40000 },
              effectivenessScore: 18,
            },
            {
              text: "Accommodate overflow in hallways and request provincial disaster fund release",
              resourceCost: { foodPacks: 15, personnel: 8, budget: 30000 },
              effectivenessScore: 12,
            },
          ],
        },
      },
      {
        id: "infrastructure-damage",
        time: 300,
        decision: {
          id: "infrastructure-damage",
          description: "The main bridge connecting two major barangays has sustained structural damage and is unsafe. This is the primary route for relief operations and medical evacuations.",
          options: [
            {
              text: "Deploy engineering team to build temporary bailey bridge immediately",
              resourceCost: { personnel: 25, rescueEquipment: 15, vehicles: 4, budget: 200000 },
              effectivenessScore: 30,
            },
            {
              text: "Establish boat shuttle service for emergency transport across the river",
              resourceCost: { personnel: 12, rescueEquipment: 6, vehicles: 1, budget: 80000 },
              effectivenessScore: 22,
            },
            {
              text: "Use longer alternate route via mountain road for all logistics",
              resourceCost: { personnel: 8, vehicles: 3, budget: 40000 },
              effectivenessScore: 14,
            },
          ],
        },
      },
    ];

    triggers.forEach((trigger) => {
      if (scenario.timeElapsed >= (600 - trigger.time) && !decisionsTriggered.current.has(trigger.id)) {
        decisionsTriggered.current.add(trigger.id);
        addDecision(trigger.decision);
      }
    });

    const updateInterval = setInterval(() => {
      updateScenario({
        timeElapsed: scenario.timeElapsed + 1,
      });
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [scenario, addDecision, updateScenario, phase]);

  return null;
}
