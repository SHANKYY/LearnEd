import { PrismaClient, Role, YearLevel, Subject, AssessmentType, QuestionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Australian universities and their requirements
const universities = [
  { name: 'University of Sydney', minAtar: 95, disciplines: ['Medicine', 'Engineering', 'Commerce', 'Arts', 'Science'] },
  { name: 'University of Melbourne', minAtar: 90, disciplines: ['Medicine', 'Engineering', 'Commerce', 'Arts', 'Science'] },
  { name: 'Australian National University', minAtar: 85, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Law'] },
  { name: 'University of New South Wales', minAtar: 85, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Medicine'] },
  { name: 'Monash University', minAtar: 80, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Medicine'] },
  { name: 'University of Queensland', minAtar: 75, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science', 'Medicine'] },
  { name: 'University of Western Australia', minAtar: 75, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science'] },
  { name: 'University of Adelaide', minAtar: 70, disciplines: ['Engineering', 'Commerce', 'Arts', 'Science'] },
  { name: 'Macquarie University', minAtar: 70, disciplines: ['Commerce', 'Arts', 'Science', 'Psychology'] },
  { name: 'University of Technology Sydney', minAtar: 75, disciplines: ['Engineering', 'Commerce', 'Design', 'IT'] }
];

// Subject prerequisites for different university disciplines
const disciplineRequirements = {
  'Medicine': {
    prerequisite: [Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ENGLISH_ADVANCED],
    recommended: [Subject.MATHEMATICS_ADVANCED, Subject.PHYSICS]
  },
  'Engineering': {
    prerequisite: [Subject.MATHEMATICS_EXTENSION_1, Subject.PHYSICS, Subject.ENGLISH_STANDARD],
    recommended: [Subject.CHEMISTRY, Subject.MATHEMATICS_EXTENSION_2]
  },
  'Commerce': {
    prerequisite: [Subject.MATHEMATICS_STANDARD, Subject.ENGLISH_STANDARD],
    recommended: [Subject.MATHEMATICS_ADVANCED, Subject.ECONOMICS, Subject.BUSINESS_STUDIES]
  },
  'Science': {
    prerequisite: [Subject.MATHEMATICS_STANDARD, Subject.ENGLISH_STANDARD],
    recommended: [Subject.CHEMISTRY, Subject.BIOLOGY, Subject.PHYSICS, Subject.MATHEMATICS_ADVANCED]
  },
  'Arts': {
    prerequisite: [Subject.ENGLISH_STANDARD],
    recommended: [Subject.ENGLISH_ADVANCED, Subject.MODERN_HISTORY, Subject.ANCIENT_HISTORY]
  },
  'Law': {
    prerequisite: [Subject.ENGLISH_ADVANCED],
    recommended: [Subject.MODERN_HISTORY, Subject.ECONOMICS, Subject.ENGLISH_EXTENSION_1]
  }
};

// Sample first and last names for realistic data
const firstNames = [
  'Alexander', 'Emily', 'William', 'Olivia', 'James', 'Charlotte', 'Benjamin', 'Ava', 'Lucas', 'Sophia',
  'Henry', 'Isabella', 'Theodore', 'Mia', 'Oliver', 'Amelia', 'Ethan', 'Harper', 'Jacob', 'Evelyn',
  'Michael', 'Abigail', 'Daniel', 'Emma', 'Matthew', 'Elizabeth', 'Jackson', 'Sofia', 'David', 'Avery',
  'Samuel', 'Ella', 'Joseph', 'Madison', 'John', 'Scarlett', 'Andrew', 'Victoria', 'Ryan', 'Aria',
  'Noah', 'Grace', 'Nathan', 'Chloe', 'Isaac', 'Camila', 'Christian', 'Penelope', 'Caleb', 'Riley'
];

const lastNames = [
  'Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall',
  'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams',
  'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell',
  'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook'
];

// Teacher data
const teacherData = [
  { name: 'Dr. Sarah Chen', department: 'Mathematics', specialties: [Subject.MATHEMATICS_ADVANCED, Subject.MATHEMATICS_EXTENSION_1, Subject.MATHEMATICS_EXTENSION_2] },
  { name: 'Mr. David Thompson', department: 'Mathematics', specialties: [Subject.MATHEMATICS_STANDARD, Subject.MATHEMATICS_ADVANCED] },
  { name: 'Ms. Rebecca Williams', department: 'Science', specialties: [Subject.CHEMISTRY, Subject.BIOLOGY] },
  { name: 'Dr. Michael Johnson', department: 'Science', specialties: [Subject.PHYSICS, Subject.CHEMISTRY] },
  { name: 'Ms. Jennifer Clarke', department: 'Science', specialties: [Subject.BIOLOGY] },
  { name: 'Mr. Robert Anderson', department: 'English', specialties: [Subject.ENGLISH_ADVANCED, Subject.ENGLISH_EXTENSION_1] },
  { name: 'Ms. Lisa Martinez', department: 'English', specialties: [Subject.ENGLISH_STANDARD, Subject.ENGLISH_ADVANCED] },
  { name: 'Dr. Andrew Wilson', department: 'Humanities', specialties: [Subject.MODERN_HISTORY, Subject.ANCIENT_HISTORY] },
  { name: 'Ms. Patricia Taylor', department: 'Commerce', specialties: [Subject.ECONOMICS, Subject.BUSINESS_STUDIES] },
  { name: 'Mr. Christopher Lee', department: 'Technology', specialties: [Subject.INFORMATION_PROCESSES_TECHNOLOGY, Subject.SOFTWARE_DESIGN_DEVELOPMENT] }
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.studySession.deleteMany();
  await prisma.studyPlan.deleteMany();
  await prisma.course.deleteMany();
  await prisma.universitySubject.deleteMany();
  await prisma.universityGoal.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Create teachers
  const teachers = [];
  for (const teacherInfo of teacherData) {
    const hashedPassword = await bcrypt.hash('teacher123', 10);
    const email = `${teacherInfo.name.toLowerCase().replace(/[^a-z]/g, '')}@learned.edu.au`;
    
    const user = await prisma.user.create({
      data: {
        email,
        name: teacherInfo.name,
        role: Role.TEACHER,
        teacher: {
          create: {
            department: teacherInfo.department,
            specialties: teacherInfo.specialties
          }
        }
      },
      include: { teacher: true }
    });
    
    teachers.push(user);
  }

  console.log(`👩‍🏫 Created ${teachers.length} teachers`);

  // Create courses for Year 11 and Year 12
  const courses = [];
  const subjects = Object.values(Subject);
  
  for (const subject of subjects) {
    // Find appropriate teacher for this subject
    const appropriateTeacher = teachers.find(t => 
      t.teacher?.specialties.includes(subject)
    ) || teachers[0]; // Fallback to first teacher

    for (const yearLevel of [YearLevel.YEAR_11, YearLevel.YEAR_12]) {
      const course = await prisma.course.create({
        data: {
          code: `${subject}_${yearLevel}`,
          name: `${subject.replace(/_/g, ' ')} - ${yearLevel.replace('_', ' ')}`,
          description: `Comprehensive ${subject.replace(/_/g, ' ').toLowerCase()} course for ${yearLevel.replace('_', ' ')} students preparing for university entrance.`,
          yearLevel,
          subject,
          units: [Subject.MATHEMATICS_EXTENSION_1, Subject.MATHEMATICS_EXTENSION_2, Subject.ENGLISH_EXTENSION_1, Subject.ENGLISH_EXTENSION_2].includes(subject) ? 2 : 4,
          teacherId: appropriateTeacher.teacher!.id
        }
      });
      courses.push(course);
    }
  }

  console.log(`📚 Created ${courses.length} courses`);

  // Create modules and lessons for each course
  for (const course of courses) {
    // Create 4 modules per course
    for (let moduleIndex = 1; moduleIndex <= 4; moduleIndex++) {
      const module = await prisma.module.create({
        data: {
          courseId: course.id,
          title: `Module ${moduleIndex}: ${getModuleTitle(course.subject, moduleIndex)}`,
          description: `Comprehensive coverage of key concepts in ${course.subject.replace(/_/g, ' ')}`,
          order: moduleIndex
        }
      });

      // Create 5 lessons per module
      for (let lessonIndex = 1; lessonIndex <= 5; lessonIndex++) {
        await prisma.lesson.create({
          data: {
            moduleId: module.id,
            title: `Lesson ${lessonIndex}: ${getLessonTitle(course.subject, moduleIndex, lessonIndex)}`,
            content: getLessonContent(course.subject, moduleIndex, lessonIndex),
            duration: Math.floor(Math.random() * 30) + 30, // 30-60 minutes
            order: lessonIndex
          }
        });
      }
    }
  }

  console.log('📖 Created modules and lessons for all courses');

  // Create students (50 Year 11, 50 Year 12)
  const students = [];
  for (let i = 0; i < 100; i++) {
    const yearLevel = i < 50 ? YearLevel.YEAR_11 : YearLevel.YEAR_12;
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@student.learned.edu.au`;
    
    const hashedPassword = await bcrypt.hash('student123', 10);

    // Select a university goal
    const selectedUniversity = getRandomElement(universities);
    const selectedDiscipline = getRandomElement(selectedUniversity.disciplines);
    const requirements = disciplineRequirements[selectedDiscipline] || { prerequisite: [], recommended: [] };

    const user = await prisma.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        role: Role.STUDENT,
        student: {
          create: {
            yearLevel,
            atar: yearLevel === YearLevel.YEAR_12 ? Math.random() * 20 + 80 : null, // Year 12 students have estimated ATAR
            universityGoal: {
              create: {
                university: selectedUniversity.name,
                degree: `Bachelor of ${selectedDiscipline}`,
                discipline: selectedDiscipline,
                requiredAtar: selectedUniversity.minAtar + Math.random() * 10,
                subjects: {
                  create: [
                    ...requirements.prerequisite.map(subject => ({
                      subjectCode: subject,
                      subjectName: subject.replace(/_/g, ' '),
                      isPrerequisite: true,
                      recommendedMark: 80 + Math.random() * 15
                    })),
                    ...requirements.recommended.map(subject => ({
                      subjectCode: subject,
                      subjectName: subject.replace(/_/g, ' '),
                      isPrerequisite: false,
                      recommendedMark: 75 + Math.random() * 15
                    }))
                  ]
                }
              }
            }
          }
        }
      },
      include: { student: true }
    });
    
    students.push(user);
  }

  console.log(`🎓 Created 100 students (50 Year 11, 50 Year 12)`);

  // Enroll students in appropriate courses
  for (const student of students) {
    // Each student takes 6 subjects (typical for HSC)
    const studentCourses = courses.filter(c => c.yearLevel === student.student!.yearLevel);
    const selectedCourses = getRandomElements(studentCourses, 6);

    for (const course of selectedCourses) {
      const enrollment = await prisma.enrollment.create({
        data: {
          studentId: student.student!.id,
          courseId: course.id
        }
      });

      // Create some lesson progress for enrolled students
      const modules = await prisma.module.findMany({
        where: { courseId: course.id },
        include: { lessons: true }
      });

      for (const module of modules) {
        for (const lesson of module.lessons) {
          // 70% chance of completing each lesson
          if (Math.random() < 0.7) {
            await prisma.lessonProgress.create({
              data: {
                enrollmentId: enrollment.id,
                lessonId: lesson.id,
                completed: true,
                timeSpent: Math.floor(Math.random() * lesson.duration * 1.5),
                completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Last 30 days
              }
            });
          }
        }
      }
    }
  }

  console.log('📝 Created student enrollments and progress tracking');

  // Create assessments for each course
  for (const course of courses) {
    const assessmentTypes = [AssessmentType.QUIZ, AssessmentType.ASSIGNMENT, AssessmentType.EXAM];
    
    for (let i = 0; i < 3; i++) {
      const assessment = await prisma.assessment.create({
        data: {
          title: `${getRandomElement(assessmentTypes)} ${i + 1} - ${course.name}`,
          description: `Assessment covering key concepts from the first ${i + 1} modules`,
          type: getRandomElement(assessmentTypes),
          courseId: course.id,
          teacherId: course.teacherId,
          totalMarks: 100,
          weight: 25 + Math.random() * 10, // 25-35% weight
          dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000) // Spread over next few weeks
        }
      });

      // Create questions for assessment
      for (let j = 0; j < 10; j++) {
        await prisma.question.create({
          data: {
            assessmentId: assessment.id,
            question: getQuestionText(course.subject, j + 1),
            type: getRandomElement(Object.values(QuestionType)),
            options: QuestionType.MULTIPLE_CHOICE === QuestionType.MULTIPLE_CHOICE ? 
              ['Option A', 'Option B', 'Option C', 'Option D'] : [],
            correctAnswer: 'A', // Simplified for demo
            marks: 10,
            order: j + 1
          }
        });
      }
    }
  }

  console.log('📊 Created assessments and questions');

  // Create study plans for students
  for (const student of students) {
    const studyPlan = await prisma.studyPlan.create({
      data: {
        studentId: student.student!.id,
        title: 'University Preparation Study Plan',
        startDate: new Date(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 6 months
      }
    });

    // Create study sessions for the next 2 weeks
    const subjects = Object.values(Subject).slice(0, 6); // First 6 subjects
    for (let day = 0; day < 14; day++) {
      const sessionDate = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
      
      await prisma.studySession.create({
        data: {
          studyPlanId: studyPlan.id,
          title: `Study Session - ${getRandomElement(subjects).replace(/_/g, ' ')}`,
          subject: getRandomElement(subjects),
          startTime: new Date(sessionDate.setHours(14 + Math.floor(Math.random() * 4))), // 2-6 PM
          endTime: new Date(sessionDate.getTime() + (1 + Math.random()) * 60 * 60 * 1000), // 1-2 hours
          completed: day < 7 ? Math.random() < 0.8 : false, // 80% completion for past week
          notes: day < 7 ? 'Covered key concepts and practice problems' : null
        }
      });
    }
  }

  console.log('📅 Created study plans and sessions');

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`• ${teachers.length} teachers created`);
  console.log(`• 100 students created (50 Year 11, 50 Year 12)`);
  console.log(`• ${courses.length} courses created`);
  console.log('• University pathways and goals configured');
  console.log('• Assessments and progress tracking implemented');
  console.log('\n🔐 Login credentials:');
  console.log('Teachers: [name]@learned.edu.au / teacher123');
  console.log('Students: [firstname].[lastname][number]@student.learned.edu.au / student123');
}

// Helper functions for generating content
function getModuleTitle(subject: Subject, moduleIndex: number): string {
  const moduleMap: Record<Subject, string[]> = {
    [Subject.MATHEMATICS_ADVANCED]: ['Functions and Graphs', 'Calculus Fundamentals', 'Trigonometry and Geometry', 'Statistics and Probability'],
    [Subject.CHEMISTRY]: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Chemical Equilibrium'],
    [Subject.PHYSICS]: ['Mechanics', 'Waves and Sound', 'Electricity and Magnetism', 'Modern Physics'],
    [Subject.BIOLOGY]: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology'],
    [Subject.ENGLISH_ADVANCED]: ['Critical Analysis', 'Creative Writing', 'Poetry and Drama', 'Essay Techniques'],
    [Subject.MODERN_HISTORY]: ['World War I', 'World War II', 'Cold War', 'Contemporary Issues'],
    [Subject.ECONOMICS]: ['Market Forces', 'Government Policy', 'International Trade', 'Economic Indicators'],
    [Subject.BUSINESS_STUDIES]: ['Business Planning', 'Marketing', 'Finance', 'Operations Management']
  };

  return moduleMap[subject]?.[moduleIndex - 1] || `Core Concepts ${moduleIndex}`;
}

function getLessonTitle(subject: Subject, moduleIndex: number, lessonIndex: number): string {
  return `Understanding ${getModuleTitle(subject, moduleIndex)} - Part ${lessonIndex}`;
}

function getLessonContent(subject: Subject, moduleIndex: number, lessonIndex: number): string {
  return `This lesson covers fundamental concepts in ${subject.replace(/_/g, ' ')} related to ${getModuleTitle(subject, moduleIndex)}. Students will learn through interactive examples, practice problems, and real-world applications. The content is aligned with the Australian Curriculum and designed to prepare students for university-level study.`;
}

function getQuestionText(subject: Subject, questionNumber: number): string {
  const questionTemplates: Record<Subject, string[]> = {
    [Subject.MATHEMATICS_ADVANCED]: [
      'Find the derivative of f(x) = x³ + 2x² - 5x + 1',
      'Solve the equation 2x² - 8x + 6 = 0',
      'Calculate the area under the curve y = x² from x = 0 to x = 2'
    ],
    [Subject.CHEMISTRY]: [
      'What is the molecular formula for glucose?',
      'Balance the equation: C₂H₆ + O₂ → CO₂ + H₂O',
      'Explain the concept of electronegativity'
    ],
    [Subject.PHYSICS]: [
      'Calculate the velocity of an object after falling for 3 seconds',
      'What is the relationship between frequency and wavelength?',
      'Explain Newton\'s second law of motion'
    ]
  };

  const questions = questionTemplates[subject] || ['General question about the subject matter'];
  return questions[questionNumber % questions.length] || `Question ${questionNumber} about ${subject.replace(/_/g, ' ')}`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });