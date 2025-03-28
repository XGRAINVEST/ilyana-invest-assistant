
const input = document.querySelector("input[type='text']");
const button = document.querySelector(".send");

const apiKey = "YOUR_OPENAI_API_KEY"; // Remplacez par votre propre clé

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const assistantReply = data.choices[0].message.content;

  const replyBox = document.createElement("p");
  replyBox.style.marginTop = "20px";
  replyBox.style.color = "#eee";
  replyBox.textContent = `🤖 ${assistantReply}`;
  document.querySelector(".chat-container").appendChild(replyBox);

  input.value = "";
});
