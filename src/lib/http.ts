
export async function fetchJson(url: string, { timeoutMs = 8000 } = {}) {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`);
    }
    return response.json();
}