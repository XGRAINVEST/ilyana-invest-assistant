const input = document.querySelector("input[type='text']");
const button = document.querySelector(".send");

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Création d’un conteneur de réponse
  const replyBox = document.createElement("p");
  replyBox.style.marginTop = "20px";
  replyBox.style.color = "#eee";
  replyBox.textContent = "🤖 ";

  // Ajout d’un loading animé
  const dots = document.createElement("span");
  replyBox.appendChild(dots);
  document.querySelector(".chat-container").appendChild(replyBox);

  let dotCount = 0;
  const loadingInterval = setInterval(() => {
    dots.textContent = ".".repeat(dotCount % 4);
    dotCount++;
  }, 500); // animation toutes les 0.5 secondes

  // Appel au backend
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();

  clearInterval(loadingInterval); // stop le loading
  replyBox.removeChild(dots); // retire les points de chargement

  // Fonction effet de frappe
  function typeWriter(text, i = 0) {
    if (i < text.length) {
      replyBox.textContent += text.charAt(i);
      setTimeout(() => typeWriter(text, i + 1), 25); // vitesse de frappe
    }
  }

  typeWriter(data.reply);
  input.value = "";
});


