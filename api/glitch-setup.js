// Glitch-compatible server setup
// This file helps deploy to Glitch which auto-deploys from GitHub

const express = require('express');
const cors = require('cors');
const app = express();

// Hardcoded data (replaces SQLite)
const appData = {
  projects: [
    { id: 56, title: "ต่อเติมห้องนั่งเล่น", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=600&h=400&fit=crop&q=80", category: "renovation", description: "" },
    { id: 57, title: "ออกแบบและสร้างหลังคา", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&w=600&h=400&fit=crop&q=80", category: "renovation", description: "" },
    { id: 58, title: "ตกแต่งห้องครัวยุโรป", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&w=600&h=400&fit=crop&q=80", category: "renovation", description: "" }
  ]
};

app.use(cors());
app.use(express.json());

app.get('/api/projects', (req, res) => {
  res.json(appData.projects);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
