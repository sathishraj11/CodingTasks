require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; 
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.get("/api/movie", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Movie title required" });

  try {
    // Fetch movie details from OMDb API
    const omdbResponse = await axios.get(
      `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`
    );

    if (omdbResponse.data.Response === "False") {
      return res.json({ title, details: "Movie not found" });
    }

    const movieData = omdbResponse.data;
    const movieInfo = `Title: ${movieData.Title}\nYear: ${movieData.Year}\nPlot: ${movieData.Plot}`;

    // Process data with DeepSeek API
    const deepseekResponse = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          { 
            role: "system", 
            content: "You are a knowledgeable movie assistant. Provide concise but insightful analysis." 
          },
          { 
            role: "user", 
            content: `Analyze this movie in 3-5 sentences: ${movieInfo}` 
          },
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000 // 10 second timeout
      }
    );

    const botResponse = deepseekResponse.data.choices[0].message.content;

    res.json({
      title: movieData.Title,
      year: movieData.Year,
      plot: movieData.Plot,
      details: botResponse,
      poster: movieData.Poster,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to process movie request",
      details: error.response?.data?.error?.message || error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
