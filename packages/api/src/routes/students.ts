import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get student dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const student = await req.prisma.student.findUnique({
      where: { userId: req.user.userId },
      include: {
        user: true,
        universityGoal: {
          include: {
            subjects: true
          }
        },
        enrollments: {
          include: {
            course: {
              include: {
                teacher: {
                  include: {
                    user: true
                  }
                },
                assessments: {
                  orderBy: { dueDate: 'asc' },
                  take: 5,
                  include: {
                    submissions: {
                      where: { studentId: req.user.profileId }
                    }
                  }
                }
              }
            },
            progress: {
              include: {
                lesson: {
                  include: {
                    module: true
                  }
                }
              }
            }
          }
        },
        studyPlans: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sessions: {
              where: {
                startTime: {
                  gte: new Date()
                }
              },
              orderBy: { startTime: 'asc' },
              take: 5
            }
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Calculate progress statistics
    const enrollmentStats = student.enrollments.map(enrollment => {
      const totalLessons = enrollment.progress.length;
      const completedLessons = enrollment.progress.filter(p => p.completed).length;
      const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      return {
        course: enrollment.course,
        progressPercentage: Math.round(progressPercentage),
        completedLessons,
        totalLessons
      };
    });

    // Get upcoming assessments
    const upcomingAssessments = student.enrollments
      .flatMap(enrollment => enrollment.course.assessments)
      .filter(assessment => 
        assessment.dueDate > new Date() && 
        assessment.submissions.length === 0
      )
      .slice(0, 5);

    res.json({
      student,
      enrollmentStats,
      upcomingAssessments,
      upcomingSessions: student.studyPlans[0]?.sessions || []
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get student courses
router.get('/courses', async (req, res) => {
  try {
    const enrollments = await req.prisma.enrollment.findMany({
      where: { 
        student: { userId: req.user.userId }
      },
      include: {
        course: {
          include: {
            teacher: {
              include: {
                user: true
              }
            },
            modules: {
              include: {
                lessons: true
              }
            }
          }
        },
        progress: {
          include: {
            lesson: true
          }
        }
      }
    });

    const coursesWithProgress = enrollments.map(enrollment => {
      const totalLessons = enrollment.course.modules.reduce(
        (sum, module) => sum + module.lessons.length, 0
      );
      const completedLessons = enrollment.progress.filter(p => p.completed).length;
      const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

      return {
        ...enrollment.course,
        progressPercentage: Math.round(progressPercentage),
        completedLessons,
        totalLessons,
        enrollmentId: enrollment.id
      };
    });

    res.json(coursesWithProgress);
  } catch (error) {
    console.error('Courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get course details with modules and lessons
router.get('/courses/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const enrollment = await req.prisma.enrollment.findFirst({
      where: {
        courseId,
        student: { userId: req.user.userId }
      },
      include: {
        course: {
          include: {
            teacher: {
              include: {
                user: true
              }
            },
            modules: {
              orderBy: { order: 'asc' },
              include: {
                lessons: {
                  orderBy: { order: 'asc' }
                }
              }
            }
          }
        },
        progress: {
          include: {
            lesson: true
          }
        }
      }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Course not found or not enrolled' });
    }

    const modulesWithProgress = enrollment.course.modules.map(module => {
      const lessonsWithProgress = module.lessons.map(lesson => {
        const progress = enrollment.progress.find(p => p.lessonId === lesson.id);
        return {
          ...lesson,
          completed: progress?.completed || false,
          timeSpent: progress?.timeSpent || 0,
          completedAt: progress?.completedAt
        };
      });

      const completedCount = lessonsWithProgress.filter(l => l.completed).length;
      const progressPercentage = (completedCount / lessonsWithProgress.length) * 100;

      return {
        ...module,
        lessons: lessonsWithProgress,
        progressPercentage: Math.round(progressPercentage)
      };
    });

    res.json({
      ...enrollment.course,
      modules: modulesWithProgress,
      enrollmentId: enrollment.id
    });
  } catch (error) {
    console.error('Course details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark lesson as completed
router.post('/lessons/:lessonId/complete', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { timeSpent } = req.body;

    // Find the enrollment for this lesson
    const lesson = await req.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                enrollments: {
                  where: {
                    student: { userId: req.user.userId }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!lesson || lesson.module.course.enrollments.length === 0) {
      return res.status(404).json({ error: 'Lesson not found or not enrolled' });
    }

    const enrollment = lesson.module.course.enrollments[0];

    // Update or create lesson progress
    const progress = await req.prisma.lessonProgress.upsert({
      where: {
        enrollmentId_lessonId: {
          enrollmentId: enrollment.id,
          lessonId
        }
      },
      update: {
        completed: true,
        timeSpent: timeSpent || 0,
        completedAt: new Date()
      },
      create: {
        enrollmentId: enrollment.id,
        lessonId,
        completed: true,
        timeSpent: timeSpent || 0,
        completedAt: new Date()
      }
    });

    res.json(progress);
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get university pathway
router.get('/university-pathway', async (req, res) => {
  try {
    const student = await req.prisma.student.findUnique({
      where: { userId: req.user.userId },
      include: {
        universityGoal: {
          include: {
            subjects: true
          }
        },
        enrollments: {
          include: {
            course: true
          }
        }
      }
    });

    if (!student || !student.universityGoal) {
      return res.status(404).json({ error: 'University pathway not found' });
    }

    // Match enrolled courses with required subjects
    const subjectProgress = student.universityGoal.subjects.map(reqSubject => {
      const enrolledCourse = student.enrollments.find(
        enrollment => enrollment.course.subject === reqSubject.subjectCode
      );

      return {
        ...reqSubject,
        enrolled: !!enrolledCourse,
        courseId: enrolledCourse?.courseId
      };
    });

    res.json({
      ...student.universityGoal,
      subjectProgress,
      currentAtar: student.atar
    });
  } catch (error) {
    console.error('University pathway error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;