export interface Customer {
    id: string;
    name: string;
    plan: 'SUBSCRIPTION' | 'STANDARD';
    walletBalance: number;
    totalConsumptionKwh: number;
    // Profitability
    revenue: number; // What they paid us
    costOfEnergy: number; // What we paid grid
}

export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: '1',
        name: 'Mario Silva',
        plan: 'SUBSCRIPTION',
        walletBalance: 12.45,
        totalConsumptionKwh: 450,
        revenue: 65.20,
        costOfEnergy: 42.10, // Good margin
    },
    {
        id: '2',
        name: 'Ana Santos',
        plan: 'STANDARD',
        walletBalance: -5.00,
        totalConsumptionKwh: 320,
        revenue: 48.00,
        costOfEnergy: 45.50, // Tight margin
    },
    {
        id: '3',
        name: 'Condominium A',
        plan: 'SUBSCRIPTION',
        walletBalance: 120.50,
        totalConsumptionKwh: 2100,
        revenue: 315.00,
        costOfEnergy: 180.00, // Great margin (Solar shared)
    }
];
