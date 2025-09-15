export async function sendMessage(text: string) {
  try {
    const res = await fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    console.log("Response from server:", data);
    return data;
  } catch (err) {
    console.error("Error sending message:", err);
  }
}
