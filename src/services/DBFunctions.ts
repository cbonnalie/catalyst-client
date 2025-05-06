interface Event {
  event_type: string;
  description: string;
  percent_3months: number;
  percent_6months: number;
  percent_1year: number;
  percent_5years: number;
}

export async function fetchEvents(x: number): Promise<Event[]> {
  try {
    const prefix = String(import.meta.env.VITE_SERVER_URL);
    console.log(`Prefix: ${prefix}`);
    const url = `${prefix}/api/xEvents?x=${x}`;
    console.log(`Fetching events from ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Expected application/json, but received ${contentType}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
