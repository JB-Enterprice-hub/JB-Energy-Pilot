export const calculateConsumption = (hour: number): number => {
    // Classic "Duck Curve" Consumption Profile (kW)
    // 1. Night (00-06): Low (Fridge, Standby)
    // 2. Morning (06-09): Spike (Breakfast, Shower)
    // 3. Day (09-17): Moderate (Working from home or Empty)
    // 4. Evening (17-23): Peak (Cooking, TV, Lighting)
    // 5. Late (23-24): Wind down

    let baseLoad = 0.3; // Default: 300W

    if (hour >= 6 && hour < 9) {
        baseLoad = 1.2; // Morning Rush
    } else if (hour >= 9 && hour < 17) {
        baseLoad = 0.5; // Day
    } else if (hour >= 17 && hour < 23) {
        baseLoad = 2.8; // Evening Peak
    } else if (hour >= 23) {
        baseLoad = 0.6; // Late Night
    }

    // Add "Live" Noise (+/- 100W) to make it feel real
    const noise = (Math.random() * 0.2) - 0.1;

    return Math.max(0.1, baseLoad + noise);
};
