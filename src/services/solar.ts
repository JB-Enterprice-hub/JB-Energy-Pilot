export const calculateSolarOutput = (hour: number, minute: number): number => {
    // Simple Bell Curve Implementation
    // Peak at 13:00 (1PM)
    // Sunrise ~07:00, Sunset ~19:00

    const timeAsDecimal = hour + minute / 60;

    // No sun at night
    if (timeAsDecimal < 7 || timeAsDecimal > 19) return 0;

    // Peak Output (kW) - assumed 5kW system for pilot
    const MAX_OUTPUT = 5.0;

    // Gaussian-ish curve
    // Center = 13, Width (Sigma) = 2.5
    const center = 13;
    const sigma = 2.5;
    const exponent = -Math.pow(timeAsDecimal - center, 2) / (2 * Math.pow(sigma, 2));

    return MAX_OUTPUT * Math.exp(exponent);
};
