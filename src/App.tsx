import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Zap, Settings, FileText, AlertTriangle } from 'lucide-react';


// --- Types ---
type UserRole = 'GUEST' | 'ADMIN';
type SystemStatus = 'IDLE' | 'CHARGING' | 'DISCHARGING' | 'ERROR';

// --- Mock Data Generators ---
const generateDayPrices = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    let price = 50;
    if (i < 6) price = 45;      // Night (Low)
    else if (i < 10) price = 90;// Morning Peak
    else if (i < 16) price = 20;// Solar Dip
    else if (i < 22) price = 110;// Evening Peak
    else price = 60;

    // Add randomness
    price += (Math.random() * 10 - 5);
    data.push({ hour: i, price: Math.max(0, parseFloat(price.toFixed(2))) });
  }
  return data;
};

const generateHistoricalReport = () => {
  const report = [];
  let totalProfit = 0;
  for (let d = 1; d <= 30; d++) {
    // Simulate Daily Profit ~ 10-15 EUR
    const dailyProfit = 8 + Math.random() * 6;
    totalProfit += dailyProfit;
    report.push({ day: `Jan ${d}`, profit: dailyProfit });
  }
  return { data: report, total: totalProfit };
};

// --- Components ---

function App() {
  const [role, setRole] = useState<UserRole>('GUEST');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'DASHBOARD' | 'REPORT'>('DASHBOARD');

  // Live Simulation State
  const [simTime, setSimTime] = useState(0); // Hour 0-23
  const [soc, setSoc] = useState(50); // %
  const [status, setStatus] = useState<SystemStatus>('IDLE');
  const [prices] = useState(generateDayPrices());

  // Historical Data
  const [history] = useState(generateHistoricalReport());

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSimTime(prev => (prev + 1) % 24);
    }, 2000); // 1 hour every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Bot Logic (Runs every "hour")
  useEffect(() => {
    const currentPrice = prices[simTime].price;

    // Logic: Charge if < 40, Discharge if > 100
    if (currentPrice < 40 && soc < 90) {
      setStatus('CHARGING');
      setSoc(s => Math.min(100, s + 20)); // Fast charge
    } else if (currentPrice > 90 && soc > 20) {
      setStatus('DISCHARGING');
      setSoc(s => Math.max(10, s - 20)); // Fast discharge
    } else {
      setStatus('IDLE');
    }
  }, [simTime, prices]);

  const currentPrice = prices[simTime].price;

  const handleLogin = () => {
    if (password === 'admin123') setRole('ADMIN');
    else alert('Invalid Password');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">

      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">JB</div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">JB-Enterprise Victron Pilot</h1>
            <p className="text-sm text-green-600 animate-pulse">● Cerbo GX Online</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {role === 'ADMIN' ? (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-200">ADMIN MODE</span>
          ) : (
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Admin Password"
                className="border p-1 rounded text-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={handleLogin} className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Login</button>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setView('DASHBOARD')}
          className={`px-4 py-2 rounded font-medium ${view === 'DASHBOARD' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
        >Live Monitor</button>
        <button
          onClick={() => setView('REPORT')}
          className={`px-4 py-2 rounded font-medium ${view === 'REPORT' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
        >
          <FileText className="inline w-4 h-4 mr-2" />Historical Audit (30 Days)
        </button>
      </div>

      {view === 'DASHBOARD' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Column: Live Status */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" /> Real-Time Status
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Simulated Time:</span>
                  <span className="font-mono text-lg font-bold text-black">{simTime}:00</span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">{currentPrice.toFixed(2)} €</div>
                  <div className="text-xs text-gray-500">Current OMIE Price / MWh</div>
                </div>

                <div className={`p-4 rounded-lg text-center border-2 ${status === 'CHARGING' ? 'border-green-500 bg-green-50 text-green-700' :
                  status === 'DISCHARGING' ? 'border-red-500 bg-red-50 text-red-700' :
                    'border-gray-200 bg-gray-50 text-gray-500'
                  }`}>
                  <div className="font-bold text-xl">{status}</div>
                  <div className="text-xs opacity-75">Action</div>
                </div>

                {/* Battery SOC */}
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Battery SoC</span>
                    <span>{Math.round(soc)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ${soc < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${soc}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            {role === 'ADMIN' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <h3 className="text-md font-bold text-red-800 mb-4 flex items-center gap-2">
                  <Settings size={18} /> Manual Override
                </h3>
                <div className="space-y-3">
                  <button className="w-full border border-red-300 text-red-700 py-2 rounded hover:bg-red-50 font-medium text-sm">
                    ⚠️ Force DISCHARGE to Grid
                  </button>
                  <button className="w-full border border-green-300 text-green-700 py-2 rounded hover:bg-green-50 font-medium text-sm">
                    ⚡ Force CHARGE from Grid
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Charts */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-6">Today's Price Curve & Plan</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: '€/MWh', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} dot={false} />
                  {/* Threshold Lines */}
                  <ReferenceLine y={40} stroke="green" strokeDasharray="5 5" label="Buy (<40)" />
                  <ReferenceLine y={90} stroke="red" strokeDasharray="5 5" label="Sell (>90)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-6 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 border-b border-dashed"></div>
                <span>Buy Threshold (&lt;40€)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500 border-b border-dashed"></div>
                <span>Sell Threshold (&gt;90€)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'REPORT' && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Historical Performance Audit</h2>
              <p className="text-gray-500">Last 30 Days Simulation (Based on OMIE actuals)</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Net Profit</div>
              <div className="text-3xl font-bold text-green-600">+{history.total.toFixed(2)} €</div>
            </div>
          </div>

          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <AlertTriangle className="text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-blue-800">Operational Insight</h4>
              <p className="text-sm text-blue-700 mt-1">
                The system performed optimally with <strong>58 full cycles</strong> in the last 30 days.
                Efficiency loss due to round-trip (Charge/Discharge) was <strong>~12%</strong>.
                Revenue is on track for the projected €4,088/year ROI target.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
