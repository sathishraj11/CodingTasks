import React, { useState } from "react";

const Homepage = () => {
  const [movie, setMovie] = useState("");
  const [output, setOutput] = useState(null);

  const getMovieDetails = async () => {
    if (!movie) {
      alert("Enter a movie name");
      return;
    }

    setOutput({ loading: true });

    try {
      const response = await fetch(`http://localhost:5000/api/movie?title=${movie}`);
      const data = await response.json();

      setOutput({
        title: data.title,
        year: data.year,
        plot: data.plot,
        details: data.details,
        poster: data.poster,
      });
    } catch (error) {
      setOutput({ error: "Error fetching movie details." });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Movie Chatbot</h2>
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Enter movie name..."
      />
      <button onClick={getMovieDetails}>Search</button>

      {output?.loading && <p>Fetching details...</p>}
      {output?.error && <p style={{ color: "red" }}>{output.error}</p>}
      {output?.title && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            minHeight: "150px",
          }}
        >
          <h3>{output.title} ({output.year})</h3>
          {output.poster && <img src={output.poster} alt="Movie Poster" style={{ maxWidth: "150px" }} />}
          <p><strong>Plot:</strong> {output.plot}</p>
          <p><strong>AI Summary:</strong> {output.details}</p>
        </div>
      )}
    </div>
  );
};

export default Homepage;
