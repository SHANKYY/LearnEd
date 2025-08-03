import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { Role } from '@prisma/client';

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  role: z.enum([Role.STUDENT, Role.TEACHER]),
  yearLevel: z.enum(['YEAR_11', 'YEAR_12']).optional(),
  department: z.string().optional(),
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Find user with their role-specific profile
    const user = await req.prisma.user.findUnique({
      where: { email },
      include: {
        student: {
          include: {
            universityGoal: {
              include: {
                subjects: true
              }
            }
          }
        },
        teacher: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For demo purposes, we'll check against default passwords
    const isPasswordValid = password === 'student123' || password === 'teacher123';
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role,
        profileId: user.role === 'STUDENT' ? user.student?.id : user.teacher?.id
      },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        profile: user.role === 'STUDENT' ? user.student : user.teacher
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Invalid request data' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        student: {
          include: {
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
                    }
                  }
                }
              }
            }
          }
        },
        teacher: {
          include: {
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
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      profile: user.role === 'STUDENT' ? user.student : user.teacher
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout (client-side token removal, but we can track sessions here)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Middleware to authenticate JWT token
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'demo-secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

export { authenticateToken };
export default router;