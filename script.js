const input = document.querySelector("input[type='text']");
const button = document.querySelector(".send");

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Affiche un message "en attente"
  const loading = document.createElement("p");
  loading.textContent = "⏳ Ilyana réfléchit...";
  loading.style.color = "#aaa";
  loading.style.marginTop = "20px";
  document.querySelector(".chat-container").appendChild(loading);

  // Envoie la requête à ton backend
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await response.json();
  loading.remove(); // supprime le message de chargement

  const replyBox = document.createElement("p");
  replyBox.style.marginTop = "20px";
  replyBox.style.color = "#eee";
  replyBox.textContent = "🤖 ";
  document.querySelector(".chat-container").appendChild(replyBox);

  // Fonction pour effet de frappe lettre par lettre
  function typeWriter(text, i = 0) {
    if (i < text.length) {
      replyBox.textContent += text.charAt(i);
      setTimeout(() => typeWriter(text, i + 1), 25); // vitesse de frappe ici
    }
  }

  typeWriter(data.reply);

  input.value = "";
});

