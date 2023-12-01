import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = 'd7251873553444a3b3a2d72e1fc495b2'; // Replace with your actual API key

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/api/news', async (req, res) => {
    const { country = 'us' , category = 'science' } = req.body;
    console.log(req.body);
    try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    );
    const news = response.data.articles;
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
