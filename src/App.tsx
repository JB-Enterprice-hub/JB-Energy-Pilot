import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FINANCIALS, DEFAULT_RISK_SCHEDULE } from './config/constants';

// Services
import { calculateSolarOutput } from './services/solar';
import { calculateConsumption } from './services/consumption';

// Pages
import Dashboard from './pages/Dashboard';
import StrategyPage from './pages/StrategyPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';

// --- Types ---
type UserRole = 'GUEST' | 'ADMIN';
type BotAction = 'IDLE' | 'CHARGE' | 'DISCHARGE';

function App() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [role, setRole] = useState<UserRole>('GUEST');

  // Strategy State
  const [simResult] = useState({ profit: 1540, cycles: 24.5, roi: 12 });

  // Pilot State (Wallet)
  const [walletBalance, setWalletBalance] = useState(0);
  const [efficiencyMultiplier, setEfficiencyMultiplier] = useState(1);
  const [netMargin, setNetMargin] = useState(0);

  // Admin / Strategy State
  const [planType, setPlanType] = useState<'SUBSCRIPTION' | 'STANDARD'>('SUBSCRIPTION');
  const [gridFee, setGridFee] = useState(FINANCIALS.GRID_FEE_PER_KWH);

  // Risk Schedule
  interface RiskBlock { id: number, start: string, end: string, factor: number }
  const [riskSchedule, setRiskSchedule] = useState<RiskBlock[]>(DEFAULT_RISK_SCHEDULE);

  // Live State (Simulated)
  const [currentAction, setCurrentAction] = useState<BotAction>('IDLE');
  const [soc, setSoc] = useState(50);

  // --- Wallet Logic ---
  useEffect(() => {
    // 1. Determine Multiplier based on Schedule (Time of Use)
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentTimeVal = currentHour * 60 + currentMin;

    // Find active block
    const activeBlock = riskSchedule.find(block => {
      const [startH, startM] = block.start.split(':').map(Number);
      const [endH, endM] = block.end.split(':').map(Number);
      const startVal = startH * 60 + startM;
      const endVal = endH * 60 + endM;
      // Handle midnight wrapping if needed, but for now assuming 00:00-23:59 sorted
      return currentTimeVal >= startVal && currentTimeVal < endVal;
    });

    const activeFactor = activeBlock ? activeBlock.factor : 1.0;
    setEfficiencyMultiplier(activeFactor);

    // 2. Simulate Consumption Drain & Solar Injection
    const drainInterval = setInterval(() => {
      const now = new Date();
      const sH = now.getHours();
      const sM = now.getMinutes();

      // A. Solar Input
      const currentSolarkW = calculateSolarOutput(sH, sM);

      // B. Consumption Load
      const currentLoadkW = calculateConsumption(sH);

      setWalletBalance(prev => {
        // Solar Injection (kWh = kW * hours) -> 1 sec tick = 1/3600 hours
        const solarGain = currentSolarkW / 3600;

        // Consumption (kWh = kW * hours)
        const loadDrain = currentLoadkW / 3600;
        const consumption = loadDrain * efficiencyMultiplier;

        // Net Change
        const newBalance = Math.max(0, prev - consumption + solarGain);

        // P&L Calculation (New Subscription Logic)
        let appliedRate = FINANCIALS.STANDARD_RATE_PER_KWH; // Default to 15c

        if (planType === 'SUBSCRIPTION') {
          // Model A: Check if we have credit (balance > 0)
          if (prev > 0) {
            appliedRate = gridFee; // Use Configurable Fee (Default 4c, or 0)
          } else {
            appliedRate = FINANCIALS.STANDARD_RATE_PER_KWH; // Empty Bank = 15c
          }
        } else {
          // Model B: Standard
          appliedRate = FINANCIALS.STANDARD_RATE_PER_KWH;
        }

        // Simulation Metric: "How much did the user PAY?"
        // We track Net Margin: Revenue (User Pays) - Real Cost (Grid Import)
        const costToCompany = loadDrain * FINANCIALS.STANDARD_RATE_PER_KWH;
        const revenueFromUser = loadDrain * appliedRate;

        // P&L Accumulator
        setNetMargin(m => m + (revenueFromUser - costToCompany));

        return newBalance;
      });

      // Update Flow State (Visuals)
      const netFlow = currentSolarkW - (currentLoadkW * efficiencyMultiplier);
      if (netFlow > 0.1) {
        setCurrentAction('CHARGE');
        setSoc(s => Math.min(100, s + (netFlow / 10000))); // Slow charge approx
      } else if (netFlow < -0.1) {
        setCurrentAction('DISCHARGE');
        setSoc(s => Math.max(0, s + (netFlow / 10000))); // Slow discharge
      } else {
        setCurrentAction('IDLE');
      }
    }, 1000);

    return () => clearInterval(drainInterval);
  }, [riskSchedule, efficiencyMultiplier, gridFee, planType]);


  return (
    <Router basename="/JB-Energy-Pilot">
      <Routes>
        <Route path="/" element={
          <Dashboard
            soc={soc}
            currentAction={currentAction}
            netMargin={netMargin}
            role={role}
            setRole={setRole}
          />
        } />
        <Route path="/strategy" element={<StrategyPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
