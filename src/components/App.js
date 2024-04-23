import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=0edf9f307b2a6e73d6a1f264a8dbdb92&max=10&lang=en`);
        const data = await response.json();
        setNewsData(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();

  }, [category]);

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (
        <p className='loader'>Loading...</p>
      ) : (
        <ol>
          {newsData.map((news, index) => (
            <li key={index}>
              <img className='news-img' src={news.image} alt=""/>
              <section className='new-title-content-author'>
                <h3 className='news-title'>{news.title}</h3>
                <section className='new-content-author'>
                  <p className='news-description'>{news.description}</p>
                  <p className='news-source'><strong>Source:</strong> {news.source.name}</p>
                </section>
              </section>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default App;
