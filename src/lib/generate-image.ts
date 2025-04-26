

export const generateImage = async (prompt: string): Promise<string | null> => {
    const url = "/api/openai";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({prompt}),
            });
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data.image_url || null;
    } catch (err) {
        console.error("Error generating image:", err);
        return null;
    }
}