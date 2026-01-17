
// Service to fetch OMIE data
// Falls back to simulation if API fails or is not configured

export interface PricePoint {
    time: string;
    price: number;
    isOptimalStart?: boolean;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const fetchLivePrices = async (range: '1D' | '1M' | '6M' | '1Y'): Promise<PricePoint[] | null> => {
    // Only support 1D live fetching for now
    if (range !== '1D') return null;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.warn("Supabase not configured. Using simulation.");
        return null;
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/omie-proxy`, {
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        const json = await response.json();

        if (json.error || !json.data) {
            console.warn("API Error:", json.error);
            return null;
        }

        return json.data.map((d: any) => ({
            time: d.time,
            price: d.price
        }));

    } catch (e) {
        console.error("Fetch failed", e);
        return null; // Trigger fallback
    }
};
