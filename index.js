import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/top25', async (req, res) => {
  try {
    const { data } = await axios.get('https://foundation-api.stayloud.io/ipfs/list/', {
      params: {
        type: 'leaderboard',
        page: 1,
        limit: 25,
        sortBy: 'score',
        sortOrder: 'desc'
      }
    });

    const result = data?.data?.map(entry => ({
      username: entry.name,
      handle: entry.twitterHandle,
      avatar: entry.image,
      score: entry.score
    })) || [];

    res.json(result);
  } catch (err) {
    console.error('Error fetching StayLoud data:', err.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
