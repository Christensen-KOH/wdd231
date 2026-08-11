export async function fetchIdioms() {
    try {
        const response = await fetch('data/data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch idioms:", error);
        return [];
    }
}