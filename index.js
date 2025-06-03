const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/top25', async (req, res) => {
  try {
    const response = await axios.get(
      'https://foundation-api.stayloud.io/ipfs/list/?type=leaderboard&page=1&limit=25&sortBy=score&sortOrder=desc'
    );

    const data = response.data?.data || [];

    const users = data.map((item) => ({
      username: item.username,
      handle: item.handle,
      avatar: item.profile_image_url,
      score: item.score,
    }));

    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
