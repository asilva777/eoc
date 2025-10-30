# eoc
EOC Simulation Game - Emergency Operations Center Training

Overview
A 3D simulation game for training Philippine Local Government Units (LGUs) in Emergency Operations Center (EOC) management, disaster risk reduction and management (DRRM), and business continuity planning.

Project Architecture
Game Structure
Game States: Menu → Tutorial/Active Scenario → End Screen
5 Functional EOC Zones:
Command Center (Blue) - Central coordination
Operations (Red) - Active response management
Logistics (Green) - Resource management
Planning (Purple) - Strategic planning
Finance/Admin (Orange) - Budget and administration
Key Features Implemented
3D EOC Environment

Realistic EOC layout with designated zones
Interactive zone markers with hover effects
First-person camera navigation
Typhoon Disaster Scenario

Tutorial scenario: "Bagyong Maria"
5 critical decision points triggered over 10 minutes
Real-time scenario data tracking (evacuees, casualties, damage)
Decision System

Multiple response options per decision
Resource cost calculations
Effectiveness scoring based on choices
Resource Management

Personnel, medical supplies, food packs
Rescue equipment, vehicles, budget
Real-time tracking and allocation
Filipino Cultural Elements

Taglish (Tagalog-English) signage throughout
Philippine peso currency format
Local terminology and context
Scoring System

Points awarded based on decision effectiveness
Performance ratings (Excellent to Needs Improvement)
End-of-scenario summary with learning points
Technical Stack
Frontend: React + Three.js (via React Three Fiber)
3D Rendering: @react-three/fiber, @react-three/drei
State Management: Zustand
UI Components: Radix UI + Tailwind CSS
Controls: Keyboard (WASD/Arrows) + Mouse
Controls
WASD / Arrow Keys: Move around EOC
Mouse: Look around (click to lock camera)
Click on zones: View zone information
Decision UI: Click buttons to make choices
Game Flow
Menu Screen: Introduction and objectives
Active Scenario: Navigate EOC, make decisions
Decision Points: Critical choices appear as overlays
End Screen: Performance summary and learning outcomes
Recent Changes (October 30, 2025)
Initial game implementation with full EOC simulation
Created 5 distinct EOC zones with interactive elements
Implemented typhoon scenario with 5 decision points
Added resource management and scoring systems
Integrated Taglish labels and Filipino cultural elements
Built HUD showing real-time scenario data
Created decision panel with resource allocation
Learning Outcomes
Players will:

Understand EOC structure and function in Philippine LGUs
Apply DRRM principles based on RA 10121
Practice resource allocation under time constraints
Experience Incident Command System coordination
Learn ISO 22301 (Business Continuity) principles
Learn ISO 31000 (Risk Management) principles
Future Enhancements (Next Phase)
Additional disaster scenarios (earthquake, flood, volcanic, fire)
Full ICS coordination with barangay-level units
NPC characters with voiceovers
Comprehensive ISO compliance tracking
Multi-phase missions (prevention, preparedness, response, rehabilitation)
Public Service Continuity Planning scenarios
Save/load game progress
Performance analytics dashboard
Development Notes
Game uses simplified physics (no complex physics libraries)
Camera bounded to EOC environment
Decision triggers based on elapsed time
Resource costs validated before decision execution
Score calculated from decision effectiveness
File Structure
client/src/
  ├── components/
  │   ├── Menu.tsx - Main menu screen
  │   ├── EOCEnvironment.tsx - 3D EOC zones
  │   ├── PlayerController.tsx - First-person controls
  │   ├── GameHUD.tsx - Heads-up display
  │   ├── DecisionPanel.tsx - Decision interface
  │   ├── ScenarioManager.tsx - Scenario logic
  │   └── EndScreen.tsx - Results screen
  ├── lib/stores/
  │   └── useEOCGame.tsx - Game state management
  └── App.tsx - Main app component
