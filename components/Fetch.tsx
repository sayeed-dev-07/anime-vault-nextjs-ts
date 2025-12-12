// Better fetching utility with retry logic and error handling
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface FetchOptions {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

export async function fetchWithRetry(
  url: string, 
  options: FetchOptions = {}
): Promise<any> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 10000
  } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      // Handle rate limiting (429) specifically
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * Math.pow(2, attempt);
        
        console.warn(`Rate limited. Retrying after ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
        
        if (attempt < maxRetries) {
          await wait(delay);
          continue;
        }
      }

      // Handle other error status codes
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      
      if (isLastAttempt) {
        console.error(`Failed to fetch ${url} after ${maxRetries + 1} attempts:`, error);
        throw error;
      }

      // Exponential backoff for retries
      const delay = retryDelay * Math.pow(2, attempt);
      console.warn(`Fetch failed (attempt ${attempt + 1}/${maxRetries + 1}). Retrying in ${delay}ms...`);
      await wait(delay);
    }
  }

  throw new Error('Max retries exceeded');
}

// Base fetch function
export const fetchData = async (baseURL: string): Promise<any[]> => {
  try {
    const resData = await fetchWithRetry(baseURL);
    return resData.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Type-safe props
export type NameProp = 'anime' | 'manga';
export type TypeProp = 'characters' | 'recommendations' | 'staff';

// Improved function with better error handling
export async function getRecAndCharData(
  name: NameProp, 
  id: number, 
  type: TypeProp
): Promise<any[]> {
  try {
    const url = `https://api.jikan.moe/v4/${name}/${id}/${type}`;
    const data = await fetchWithRetry(url, {
      maxRetries: 3,
      retryDelay: 1000
    });
    
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching ${type} for ${name} ${id}:`, error);
    return [];
  }
}

// Batch fetching to reduce API calls
export async function batchFetchAnimeData(animeId: number) {
  // Add delay between requests to respect rate limits
  const delayBetweenCalls = 350; // Jikan recommends 3 requests/second max

  try {
    const [characters, staff, recommendations] = await Promise.all([
      getRecAndCharData('anime', animeId, 'characters'),
      wait(delayBetweenCalls).then(() => 
        fetchWithRetry(`https://api.jikan.moe/v4/anime/${animeId}/staff`)
          .then(res => res.data || [])
          .catch(() => [])
      ),
      wait(delayBetweenCalls * 2).then(() => 
        getRecAndCharData('anime', animeId, 'recommendations')
      ),
    ]);

    return { characters, staff, recommendations };
  } catch (error) {
    console.error('Error batch fetching anime data:', error);
    return {
      characters: [],
      staff: [],
      recommendations: []
    };
  }
}