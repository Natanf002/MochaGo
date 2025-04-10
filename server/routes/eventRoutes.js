import express from 'express';
const router = express.Router();

router.get('/today', (req, res) => {
  res.json({
    title: "Today's Event",
    description: "Matcha tastings, new menu items, and more!",
    highlights: ['🎥 Live Demonstrations', '💰 Exclusive Discounts', '🤝 Social & Networking', '🍵 Free Samples'],
    time: "4 PM EST",
    location: "📍 MatchaGo"
  });
});

export default router;
