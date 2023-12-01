document.getElementById('newsForm').addEventListener('submit', (event) => {
  event.preventDefault();
  getNews();
});

async function getNews() {
  try {
      const country = document.getElementById('country').value;
      const category = document.getElementById('category').value;
      
      const response = await axios.post('/api/news', { country, category });
      const news = response.data;
      displayNews(news);
  } catch (error) {
      console.error('Error fetching space news:', error.message);
      alert('Error fetching space news. Please try again later.');
  }
}


 
function displayNews(news) {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = ''; // Clear previous news

  news.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');

      const title = document.createElement('div');
      title.classList.add('news-title');
      title.textContent = item.title;

      const image = document.createElement('img');
      image.src = item.urlToImage;
      image.alt = 'News Image';
      image.classList.add('news-image');

      const description = document.createElement('div');
      description.classList.add('news-description');
      description.textContent = item.description;

      newsItem.appendChild(title);
      newsItem.appendChild(image);
      newsItem.appendChild(description);
      newsContainer.appendChild(newsItem);
  });
}
