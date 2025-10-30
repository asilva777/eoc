import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "tutorial" | "active_scenario" | "ended";
export type DisasterType = "typhoon" | "earthquake" | "flood" | "volcanic" | "fire";

export interface ScenarioData {
  type: DisasterType;
  name: string;
  severity: number;
  timeElapsed: number;
  affectedPopulation: number;
  evacuees: number;
  casualties: number;
  damageEstimate: number;
}

export interface Resources {
  personnel: number;
  medicalSupplies: number;
  foodPacks: number;
  rescueEquipment: number;
  vehicles: number;
  budget: number;
}

export interface Decision {
  id: string;
  description: string;
  options: {
    text: string;
    resourceCost: Partial<Resources>;
    effectivenessScore: number;
  }[];
}

interface EOCGameState {
  phase: GamePhase;
  currentZone: string | null;
  scenario: ScenarioData | null;
  resources: Resources;
  score: number;
  decisionsWaiting: Decision[];
  completedDecisions: string[];
  timeRemaining: number;
  
  // Actions
  startTutorial: () => void;
  setPhase: (phase: GamePhase) => void;
  setCurrentZone: (zone: string | null) => void;
  initializeScenario: (type: DisasterType) => void;
  updateScenario: (updates: Partial<ScenarioData>) => void;
  addDecision: (decision: Decision) => void;
  makeDecision: (decisionId: string, optionIndex: number) => void;
  allocateResources: (allocation: Partial<Resources>) => void;
  updateScore: (points: number) => void;
  updateTime: (delta: number) => void;
  endScenario: () => void;
  restart: () => void;
}

const initialResources: Resources = {
  personnel: 100,
  medicalSupplies: 50,
  foodPacks: 200,
  rescueEquipment: 30,
  vehicles: 15,
  budget: 1000000,
};

export const useEOCGame = create<EOCGameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "menu",
    currentZone: null,
    scenario: null,
    resources: initialResources,
    score: 0,
    decisionsWaiting: [],
    completedDecisions: [],
    timeRemaining: 600,
    
    startTutorial: () => {
      set({ phase: "tutorial" });
      get().initializeScenario("typhoon");
    },
    
    setPhase: (phase) => set({ phase }),
    
    setCurrentZone: (zone) => set({ currentZone: zone }),
    
    initializeScenario: (type) => {
      const scenarios: Record<DisasterType, ScenarioData> = {
        typhoon: {
          type: "typhoon",
          name: "Bagyong Maria",
          severity: 4,
          timeElapsed: 0,
          affectedPopulation: 50000,
          evacuees: 5000,
          casualties: 0,
          damageEstimate: 50000000,
        },
        earthquake: {
          type: "earthquake",
          name: "7.2 Magnitude Earthquake",
          severity: 5,
          timeElapsed: 0,
          affectedPopulation: 100000,
          evacuees: 20000,
          casualties: 50,
          damageEstimate: 200000000,
        },
        flood: {
          type: "flood",
          name: "Flash Flood",
          severity: 3,
          timeElapsed: 0,
          affectedPopulation: 30000,
          evacuees: 3000,
          casualties: 5,
          damageEstimate: 20000000,
        },
        volcanic: {
          type: "volcanic",
          name: "Volcanic Eruption Alert",
          severity: 5,
          timeElapsed: 0,
          affectedPopulation: 80000,
          evacuees: 15000,
          casualties: 0,
          damageEstimate: 100000000,
        },
        fire: {
          type: "fire",
          name: "Urban Fire",
          severity: 2,
          timeElapsed: 0,
          affectedPopulation: 5000,
          evacuees: 500,
          casualties: 2,
          damageEstimate: 5000000,
        },
      };
      
      set({ 
        scenario: scenarios[type],
        resources: { ...initialResources },
        score: 0,
        decisionsWaiting: [],
        completedDecisions: [],
        timeRemaining: 600,
        phase: "active_scenario",
      });
    },
    
    updateScenario: (updates) => {
      const current = get().scenario;
      if (current) {
        set({ scenario: { ...current, ...updates } });
      }
    },
    
    addDecision: (decision) => {
      set((state) => ({
        decisionsWaiting: [...state.decisionsWaiting, decision],
      }));
    },
    
    makeDecision: (decisionId, optionIndex) => {
      const { decisionsWaiting, resources, score } = get();
      const decision = decisionsWaiting.find(d => d.id === decisionId);
      
      if (decision && decision.options[optionIndex]) {
        const option = decision.options[optionIndex];
        
        const newResources = { ...resources };
        Object.entries(option.resourceCost).forEach(([key, cost]) => {
          if (cost) {
            newResources[key as keyof Resources] = Math.max(0, newResources[key as keyof Resources] - cost);
          }
        });
        
        set({
          resources: newResources,
          score: score + option.effectivenessScore,
          decisionsWaiting: decisionsWaiting.filter(d => d.id !== decisionId),
          completedDecisions: [...get().completedDecisions, decisionId],
        });
      }
    },
    
    allocateResources: (allocation) => {
      set((state) => ({
        resources: { ...state.resources, ...allocation },
      }));
    },
    
    updateScore: (points) => {
      set((state) => ({ score: state.score + points }));
    },
    
    updateTime: (delta) => {
      set((state) => {
        const newTime = Math.max(0, state.timeRemaining - delta);
        if (newTime === 0 && state.phase === "active_scenario") {
          return { timeRemaining: 0, phase: "ended" };
        }
        return { timeRemaining: newTime };
      });
    },
    
    endScenario: () => {
      set({ phase: "ended" });
    },
    
    restart: () => {
      set({
        phase: "menu",
        currentZone: null,
        scenario: null,
        resources: initialResources,
        score: 0,
        decisionsWaiting: [],
        completedDecisions: [],
        timeRemaining: 600,
      });
    },
  }))
);
