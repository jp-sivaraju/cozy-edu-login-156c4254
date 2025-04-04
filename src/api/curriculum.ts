
// Mock API functions for curriculum generation
// In a real application, these would make actual API calls

/**
 * Fetch all students
 */
export const fetchStudents = async () => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  // Mock student data
  return [
    { student_id: 'STU001', name: 'Ravi Sharma', class: '8A', interests: ['Science', 'Art'] },
    { student_id: 'STU002', name: 'Amit Kumar', class: '7B', interests: ['Mathematics', 'Music'] },
    { student_id: 'STU003', name: 'Priya Patel', class: '9C', interests: ['Literature', 'Sports'] },
  ];
};

/**
 * Generate curriculum for a student
 */
export const generateCurriculum = async ({ student_id }: { student_id: string }) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate AI processing delay
  
  // Mock curriculum data based on student_id
  if (student_id === 'STU001') {
    return {
      curriculum_id: 'CURR001',
      student_id: 'STU001',
      content: [
        {
          subject: 'Mathematics',
          topics: ['Advanced Algebra', 'Geometry', 'Probability', 'Statistics'],
          difficulty: 'intermediate'
        },
        {
          subject: 'Science',
          topics: ['Physics Fundamentals', 'Chemistry Basics', 'Biology Introduction'],
          difficulty: 'beginner'
        },
        {
          subject: 'Art',
          topics: ['Color Theory', 'Basic Drawing Techniques', 'Art History'],
          difficulty: 'intermediate'
        }
      ]
    };
  } else if (student_id === 'STU002') {
    return {
      curriculum_id: 'CURR002',
      student_id: 'STU002',
      content: [
        {
          subject: 'Mathematics',
          topics: ['Advanced Calculus', 'Linear Algebra', 'Number Theory'],
          difficulty: 'advanced'
        },
        {
          subject: 'Music',
          topics: ['Music Theory', 'Instrument Practice', 'Music History'],
          difficulty: 'intermediate'
        }
      ]
    };
  } else if (student_id === 'STU003') {
    return {
      curriculum_id: 'CURR003',
      student_id: 'STU003',
      content: [
        {
          subject: 'Literature',
          topics: ['Poetry Analysis', 'Novel Writing', 'World Literature'],
          difficulty: 'advanced'
        },
        {
          subject: 'Sports',
          topics: ['Team Sports', 'Physical Fitness', 'Sports Psychology'],
          difficulty: 'intermediate'
        }
      ]
    };
  }
  
  // Default curriculum for other students
  return {
    curriculum_id: `CURR-${Math.floor(Math.random() * 1000)}`,
    student_id: student_id,
    content: [
      {
        subject: 'Mathematics',
        topics: ['Basic Arithmetic', 'Introduction to Algebra'],
        difficulty: 'beginner'
      },
      {
        subject: 'English',
        topics: ['Grammar Rules', 'Vocabulary Building', 'Reading Comprehension'],
        difficulty: 'intermediate'
      }
    ]
  };
};

/**
 * Fetch curriculum for a student
 */
export const fetchCurriculum = async (student_id: string) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  // Mock data for different students
  const curriculumData: Record<string, any> = {
    'STU001': {
      curriculum_id: 'CURR001',
      student_id: 'STU001',
      content: [
        {
          subject: 'Mathematics',
          topics: ['Advanced Algebra', 'Geometry', 'Probability', 'Statistics'],
          difficulty: 'intermediate'
        },
        {
          subject: 'Science',
          topics: ['Physics Fundamentals', 'Chemistry Basics', 'Biology Introduction'],
          difficulty: 'beginner'
        },
        {
          subject: 'Art',
          topics: ['Color Theory', 'Basic Drawing Techniques', 'Art History'],
          difficulty: 'intermediate'
        }
      ]
    },
    'STU002': {
      curriculum_id: 'CURR002',
      student_id: 'STU002',
      content: [
        {
          subject: 'Mathematics',
          topics: ['Advanced Calculus', 'Linear Algebra', 'Number Theory'],
          difficulty: 'advanced'
        },
        {
          subject: 'Music',
          topics: ['Music Theory', 'Instrument Practice', 'Music History'],
          difficulty: 'intermediate'
        }
      ]
    },
    'STU003': {
      curriculum_id: 'CURR003',
      student_id: 'STU003',
      content: [
        {
          subject: 'Literature',
          topics: ['Poetry Analysis', 'Novel Writing', 'World Literature'],
          difficulty: 'advanced'
        },
        {
          subject: 'Sports',
          topics: ['Team Sports', 'Physical Fitness', 'Sports Psychology'],
          difficulty: 'intermediate'
        }
      ]
    }
  };
  
  // Return curriculum for the specified student or null if not found
  return curriculumData[student_id] || null;
};

/**
 * Download curriculum as PDF
 */
export const downloadCurriculum = async (curriculum_id: string) => {
  // In a real app, this would trigger a PDF download
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate PDF generation delay
  
  console.log(`Downloading curriculum ${curriculum_id} as PDF`);
  
  // In a real implementation, this would return a PDF file or a download URL
  return { success: true };
};

/**
 * Edit curriculum
 */
export const editCurriculum = async (curriculum_id: string, content: any) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  console.log(`Updating curriculum ${curriculum_id} with:`, content);
  
  // Return the updated curriculum
  return {
    curriculum_id,
    content
  };
};
