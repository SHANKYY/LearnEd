import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

router.use(authenticateToken);

// Get university options
router.get('/options', async (req, res) => {
  try {
    const universities = [
      { name: 'University of Sydney', minAtar: 95, disciplines: ['Medicine', 'Engineering', 'Commerce', 'Arts', 'Science'] },
      { name: 'University of Melbourne', minAtar: 90, disciplines: ['Medicine', 'Engineering', 'Commerce', 'Arts', 'Science'] },
      { name: 'Australian National University', minAtar: 85, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Law'] },
      { name: 'University of New South Wales', minAtar: 85, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Medicine'] },
      { name: 'Monash University', minAtar: 80, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Medicine'] }
    ];

    res.json(universities);
  } catch (error) {
    console.error('University options error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;