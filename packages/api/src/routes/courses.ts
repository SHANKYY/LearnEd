import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

router.use(authenticateToken);

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await req.prisma.course.findMany({
      include: {
        teacher: {
          include: {
            user: true
          }
        }
      }
    });

    res.json(courses);
  } catch (error) {
    console.error('Courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;