import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

router.use(authenticateToken);

// Get teacher dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const teacher = await req.prisma.teacher.findUnique({
      where: { userId: req.user.userId },
      include: {
        user: true,
        courses: {
          include: {
            enrollments: {
              include: {
                student: {
                  include: {
                    user: true
                  }
                }
              }
            },
            assessments: {
              orderBy: { dueDate: 'asc' },
              take: 5
            }
          }
        }
      }
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const totalStudents = teacher.courses.reduce(
      (sum, course) => sum + course.enrollments.length, 0
    );

    res.json({
      teacher,
      totalStudents,
      totalCourses: teacher.courses.length
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get teacher's courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await req.prisma.course.findMany({
      where: {
        teacher: { userId: req.user.userId }
      },
      include: {
        enrollments: {
          include: {
            student: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    res.json(courses);
  } catch (error) {
    console.error('Teacher courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;