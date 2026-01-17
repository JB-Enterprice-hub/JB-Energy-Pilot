// Financial Base Rates (Cents/kWh)
export const FINANCIALS = {
    REAL_COST_PER_KWH: 0.15,      // Standard Retail Rate (Cost to buy from grid)
    VIRTUAL_REVENUE_PER_KWH: 0.25, // (DEPRECATED: Use SUBSCRIPTION_RATE or REAL_COST)

    // Model A: Subscription
    GRID_FEE_PER_KWH: 0.04,       // Access Fee (when using Credit)
    SUBSCRIPTION_RATE_PER_KWH: 0.04, // Default "4c" Rate

    // Model B: Standard
    STANDARD_RATE_PER_KWH: 0.15,  // Pay-As-You-Go Rate

    // Pilot Parameters
    INITIAL_WALLET_BALANCE: 0,
    SOLAR_INJECTION_AMOUNT: 10,
    CONSUMPTION_RATE_MS: 1000, // How fast consumption ticks (ms)
};

// Default Risk Schedule (Fallback)
export const DEFAULT_RISK_SCHEDULE = [
    { id: 1, start: '00:00', end: '08:00', factor: 0.5 }, // Night (Cheap)
    { id: 2, start: '08:00', end: '18:00', factor: 1.0 }, // Day (Normal)
    { id: 3, start: '18:00', end: '23:59', factor: 2.0 }, // Peak (Expensive)
];
