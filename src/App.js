import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from './Navigation';

function App() {
  const [stories, setStories] = useState([]);
  const [visibleStories, setVisibleStories] = useState(6); // Number of stories to display initially
  const storiesToLoad = 6;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(prev => !prev);
  };
  const handleLoadMore = () => {
    setVisibleStories(prev => prev + storiesToLoad);
  };


  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const promises = storyIds
          .slice(0, 10)
          .map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (response) => response.json()
            )
          );
        return Promise.all(promises);
      })
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
     <Navigation isDarkMode={isDarkMode} toggleMode={toggleMode} />
      <h1>Hacker News Jobs Board</h1>
      <ul>
        {stories.slice(0,visibleStories).map((story) => (
          <li key={story.id}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            <p className="post-time">{new Date(story.time * 1000).toLocaleString()}</p>
            
          </li>
        ))}
      </ul>
      {stories.length > visibleStories && (
        <button onClick={handleLoadMore}>
          Load More Jobs
        </button>
      )}
      <button
        className="mode-toggle"
        onClick={() => setIsDarkMode((prev) => !prev)}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default App;
