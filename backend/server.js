// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const PY_SERVER = process.env.PY_SERVER || 'http://10.7.74.62:8000';
app.get('/status', async (req, res) => {
  try {
    const r = await axios.get(`${PY_SERVER}/status`, { timeout: 1000 });
    res.json(r.data);
  } catch (err) {
    res.json({
      cry: 'not_crying',
      cry_type: 'none',
      motion: 'calm',
      posture: 'unknown',
      state: 'sleeping',
      timestamp: 1700000000,
    });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend proxy running on port ${PORT}`));
