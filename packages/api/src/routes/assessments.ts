import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

router.use(authenticateToken);

// Get assessments for a student
router.get('/', async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      const assessments = await req.prisma.assessment.findMany({
        where: {
          course: {
            enrollments: {
              some: {
                student: { userId: req.user.userId }
              }
            }
          }
        },
        include: {
          course: true,
          submissions: {
            where: { studentId: req.user.profileId }
          }
        }
      });
      res.json(assessments);
    } else {
      const assessments = await req.prisma.assessment.findMany({
        where: {
          teacherId: req.user.profileId
        },
        include: {
          course: true,
          submissions: true
        }
      });
      res.json(assessments);
    }
  } catch (error) {
    console.error('Assessments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;