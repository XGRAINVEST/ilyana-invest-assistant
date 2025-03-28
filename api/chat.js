const fetch = require('node-fetch'); // Ajoute ça tout en haut

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { message } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Désolé, une erreur est survenue.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Erreur API OpenAI :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
