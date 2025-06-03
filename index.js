const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/top25', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://foundation-api.stayloud.io/ipfs/list/?type=leaderboard&page=1&limit=25&sortBy=score&sortOrder=desc'
    );

    const users = (data?.data || []).map((user) => ({
      username: user.username,
      handle: user.handle,
      avatar: user.profile_image_url,
      score: user.score,
    }));

    res.json(users);
  } catch (err) {
    console.error('Proxy fetch error:', err.message);
    res.status(500).json({ error: 'Could not fetch leaderboard data' });
  }
});

app.get('/', (req, res) => {
  res.send('Loud Proxy is running');
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
