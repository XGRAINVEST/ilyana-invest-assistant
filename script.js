
const input = document.querySelector("input[type='text']");
const button = document.querySelector(".send");

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();

  const replyBox = document.createElement("p");
  replyBox.style.marginTop = "20px";
  replyBox.style.color = "#eee";
  replyBox.textContent = `🤖 ${data.reply}`;
  document.querySelector(".chat-container").appendChild(replyBox);

  input.value = "";
});
