
// Mock API functions for test data across the application
// In a real application, these would make actual API calls to your Postgres/Neon database

// Users data
export const users = [
  { 
    user_id: 'dummy_parent_001', 
    name: 'Parent One', 
    email: 'parent.one@example.com', 
    role: 'parent',
    children: ['STU001'] 
  },
  { 
    user_id: 'dummy_parent_002', 
    name: 'Parent Two', 
    email: 'parent.two@example.com', 
    role: 'parent',
    children: ['STU002'] 
  },
  { 
    user_id: 'dummy_driver_001', 
    name: 'Driver One', 
    email: 'driver.one@example.com', 
    role: 'driver',
    assigned_routes: ['ROUTE001', 'ROUTE002']
  },
  { 
    user_id: 'dummy_teacher_001', 
    name: 'Teacher One', 
    email: 'teacher.one@example.com', 
    role: 'teacher',
    classes: ['7B', '8A', '9C']
  },
  { 
    user_id: 'dummy_admin_001', 
    name: 'Admin One', 
    email: 'dummy.admin@edusense.com', 
    role: 'admin' 
  }
];

// Students data
export const students = [
  { 
    student_id: 'STU001', 
    name: 'Ravi Sharma', 
    class: '8A', 
    parent_id: 'dummy_parent_001',
    route_id: 'ROUTE001' 
  },
  { 
    student_id: 'STU002', 
    name: 'Amit Kumar', 
    class: '7B', 
    parent_id: 'dummy_parent_002',
    route_id: 'ROUTE002'
  },
  { 
    student_id: 'STU003', 
    name: 'Priya Patel', 
    class: '9C', 
    parent_id: 'dummy_parent_001',
    route_id: 'ROUTE001'
  }
];

// Fees data
export const fees = [
  { 
    fee_id: 'FEE001', 
    student_id: 'STU001', 
    amount: 5000, 
    status: 'paid', 
    due_date: '2023-11-10', 
    payment_date: '2023-11-05' 
  },
  { 
    fee_id: 'FEE002', 
    student_id: 'STU002', 
    amount: 5000, 
    status: 'pending', 
    due_date: '2023-11-10' 
  },
  { 
    fee_id: 'FEE003', 
    student_id: 'STU003', 
    amount: 5000, 
    status: 'overdue', 
    due_date: '2023-10-10' 
  }
];

// Attendance data
export const attendance = [
  { 
    attendance_id: 'ATTEND001', 
    student_id: 'STU001', 
    date: '2023-11-01', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND002', 
    student_id: 'STU001', 
    date: '2023-11-02', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND003', 
    student_id: 'STU001', 
    date: '2023-11-03', 
    status: 'absent' 
  },
  { 
    attendance_id: 'ATTEND004', 
    student_id: 'STU002', 
    date: '2023-11-01', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND005', 
    student_id: 'STU002', 
    date: '2023-11-02', 
    status: 'absent' 
  },
  { 
    attendance_id: 'ATTEND006', 
    student_id: 'STU002', 
    date: '2023-11-03', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND007', 
    student_id: 'STU003', 
    date: '2023-11-01', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND008', 
    student_id: 'STU003', 
    date: '2023-11-02', 
    status: 'present' 
  },
  { 
    attendance_id: 'ATTEND009', 
    student_id: 'STU003', 
    date: '2023-11-03', 
    status: 'present' 
  }
];

// Routes data
export const routes = [
  { 
    route_id: 'ROUTE001', 
    route_name: 'Route A', 
    stops: [
      { stop_id: 'STOP1', stop_name: 'Stop 1', latitude: 12.9716, longitude: 77.5946, arrival_time: '08:00' },
      { stop_id: 'STOP2', stop_name: 'Stop 2', latitude: 12.9718, longitude: 77.5950, arrival_time: '08:15' }
    ] 
  },
  { 
    route_id: 'ROUTE002', 
    route_name: 'Route B', 
    stops: [
      { stop_id: 'STOP3', stop_name: 'Stop 3', latitude: 12.9725, longitude: 77.5955, arrival_time: '08:30' },
      { stop_id: 'STOP4', stop_name: 'Stop 4', latitude: 12.9730, longitude: 77.5960, arrival_time: '08:45' }
    ] 
  }
];

// Driver assignments data
export const driverAssignments = [
  { user_id: 'dummy_driver_001', route_id: 'ROUTE001' },
  { user_id: 'dummy_driver_001', route_id: 'ROUTE002' }
];

// Stop statuses data
export const stopStatuses = [
  { 
    status_id: 'STATUS001', 
    stop_id: 'STOP1', 
    status: 'completed', 
    actual_arrival_time: '08:05', 
    date: '2023-11-03' 
  },
  { 
    status_id: 'STATUS002', 
    stop_id: 'STOP2', 
    status: 'completed', 
    actual_arrival_time: '08:20', 
    date: '2023-11-03' 
  },
  { 
    status_id: 'STATUS003', 
    stop_id: 'STOP3', 
    status: 'pending', 
    date: '2023-11-03' 
  },
  { 
    status_id: 'STATUS004', 
    stop_id: 'STOP4', 
    status: 'pending', 
    date: '2023-11-03' 
  }
];

// Diary entries data
export const diaryEntries = [
  { 
    entry_id: 'DIARY001', 
    student_id: 'STU001',
    teacher_id: 'dummy_teacher_001',
    date: '2023-11-01', 
    content: 'Completed all assignments. Good work with math problems.',
    attachments: []
  },
  { 
    entry_id: 'DIARY002', 
    student_id: 'STU001',
    teacher_id: 'dummy_teacher_001', 
    date: '2023-11-02', 
    content: 'Participated well in class discussion. Needs to focus on science homework.',
    attachments: [] 
  },
  { 
    entry_id: 'DIARY003', 
    student_id: 'STU002',
    teacher_id: 'dummy_teacher_001', 
    date: '2023-11-01', 
    content: 'Did not complete math homework. Please help at home.',
    attachments: [] 
  },
  { 
    entry_id: 'DIARY004', 
    student_id: 'STU002',
    teacher_id: 'dummy_teacher_001', 
    date: '2023-11-02', 
    content: 'Improvement in reading skills. Good job!',
    attachments: [] 
  }
];

// Alerts data
export const alerts = [
  { 
    id: 'alert001', 
    type: 'attendance',
    student_id: 'STU001',
    title: "Attendance Alert", 
    description: "Ravi has been absent for 3 days this month. Is everything okay?",
    createdAt: "2023-10-15T10:30:00Z"
  },
  { 
    id: 'alert002', 
    type: 'academic',
    student_id: 'STU001',
    title: "Academic Performance", 
    description: "Ravi's mathematics scores have dropped by 15%. Consider scheduling a meeting with the teacher.",
    createdAt: "2023-10-10T14:20:00Z"
  },
  { 
    id: 'alert003', 
    type: 'health',
    student_id: 'STU001',
    title: "Health Check Reminder", 
    description: "Ravi's annual health check is due next week. Please ensure he attends.",
    createdAt: "2023-10-05T09:15:00Z"
  },
  { 
    id: 'alert004', 
    type: 'attendance',
    student_id: 'STU002',
    title: "Attendance Alert", 
    description: "Amit has been absent for 2 days this week. Is everything okay?",
    createdAt: "2023-10-20T10:30:00Z"
  }
];

// Notifications data
export const notifications = [
  { 
    notification_id: 'NOTIF001', 
    user_id: 'dummy_parent_001',
    title: "Fee Due Reminder", 
    message: "Please pay the term fees by November 10th.",
    read: false,
    created_at: "2023-11-01T10:00:00Z"
  },
  { 
    notification_id: 'NOTIF002', 
    user_id: 'dummy_parent_001',
    title: "PTM Schedule", 
    message: "Parent-Teacher Meeting scheduled for November 15th, 10:00 AM.",
    read: true,
    created_at: "2023-10-25T14:30:00Z"
  },
  { 
    notification_id: 'NOTIF003', 
    user_id: 'dummy_driver_001',
    title: "Route Change", 
    message: "Route A has been modified. Please check the updated stops.",
    read: false,
    created_at: "2023-11-02T08:00:00Z"
  },
  { 
    notification_id: 'NOTIF004', 
    user_id: 'dummy_admin_001',
    title: "System Update", 
    message: "EduSense system will be updated on November 5th at midnight.",
    read: true,
    created_at: "2023-10-30T16:00:00Z"
  }
];

// Marks data
export const marks = [
  { 
    mark_id: 'MARK001', 
    student_id: 'STU001', 
    subject: 'Math', 
    score: 85.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'A',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  },
  { 
    mark_id: 'MARK002', 
    student_id: 'STU001', 
    subject: 'Science', 
    score: 78.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'B',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  },
  { 
    mark_id: 'MARK003', 
    student_id: 'STU002', 
    subject: 'Math', 
    score: 92.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'A+',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  },
  { 
    mark_id: 'MARK004', 
    student_id: 'STU002', 
    subject: 'Science', 
    score: 65.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'C',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  },
  { 
    mark_id: 'MARK005', 
    student_id: 'STU003', 
    subject: 'Math', 
    score: 70.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'B',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  },
  { 
    mark_id: 'MARK006', 
    student_id: 'STU003', 
    subject: 'Science', 
    score: 88.0, 
    exam_type: 'FA1',
    max_score: 100,
    grade: 'A',
    term: '2023-24',
    entered_by: 'dummy_teacher_001'
  }
];

// Assessments data
export const assessments = [
  { 
    assessment_id: 'ASSESS001',
    student_id: 'STU001',
    subject: 'Math',
    strengths: ['Geometry', 'Basic Algebra'],
    weaknesses: ['Complex Equations'],
    recommendations: ['Practice more complex problems', 'Attend remedial sessions'],
    created_by: 'dummy_teacher_001',
    created_at: '2023-10-15T10:00:00Z'
  },
  { 
    assessment_id: 'ASSESS002',
    student_id: 'STU001',
    subject: 'Science',
    strengths: ['Theory Understanding', 'Lab Work'],
    weaknesses: ['Application Questions'],
    recommendations: ['More practice with application-based questions'],
    created_by: 'dummy_teacher_001',
    created_at: '2023-10-20T14:00:00Z'
  },
  { 
    assessment_id: 'ASSESS003',
    student_id: 'STU002',
    subject: 'Math',
    strengths: ['Complex Equations', 'Problem Solving'],
    weaknesses: ['Geometry'],
    recommendations: ['Focus on spatial reasoning'],
    created_by: 'dummy_teacher_001',
    created_at: '2023-10-18T11:00:00Z'
  }
];

// Student interests
export const studentInterests = [
  { 
    interest_id: 'INT001', 
    student_id: 'STU001', 
    interests: ['Science', 'Art'] 
  },
  { 
    interest_id: 'INT002', 
    student_id: 'STU002', 
    interests: ['Mathematics', 'Music'] 
  },
  { 
    interest_id: 'INT003', 
    student_id: 'STU003', 
    interests: ['Literature', 'Sports'] 
  }
];

// Curricula data
export const curricula = [
  { 
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
    ],
    created_at: '2023-10-25T09:00:00Z'
  },
  { 
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
    ],
    created_at: '2023-10-26T10:00:00Z'
  }
];

// Hall tickets data
export const hallTickets = [
  { 
    ticket_id: 'TICKET001', 
    student_id: 'STU001',
    exam_type: 'FA1',
    details: {
      seat_number: 'A101',
      exam_center: 'Main Building',
      date: '2023-11-20'
    },
    status: 'approved'
  },
  { 
    ticket_id: 'TICKET002', 
    student_id: 'STU002',
    exam_type: 'FA1',
    details: {
      seat_number: 'A102',
      exam_center: 'Main Building',
      date: '2023-11-20'
    },
    status: 'pending'
  }
];

// Reports data (for reports screen)
export const reports = [
  {
    report_id: 'REPORT001',
    student_id: 'STU001',
    type: 'progress',
    term: '2023-24 Term 1',
    data: {
      subjects: [
        { name: 'Math', score: 85, grade: 'A', remarks: 'Excellent work in algebra' },
        { name: 'Science', score: 78, grade: 'B', remarks: 'Good understanding of concepts' },
        { name: 'English', score: 92, grade: 'A+', remarks: 'Outstanding writing skills' }
      ],
      attendance: '95%',
      class_rank: 3,
      teacher_remarks: 'Ravi is showing consistent improvement'
    },
    generated_at: '2023-10-30T12:00:00Z'
  },
  {
    report_id: 'REPORT002',
    student_id: 'STU002',
    type: 'progress',
    term: '2023-24 Term 1',
    data: {
      subjects: [
        { name: 'Math', score: 92, grade: 'A+', remarks: 'Exceptional problem-solving abilities' },
        { name: 'Science', score: 65, grade: 'C', remarks: 'Needs to focus more on theory' },
        { name: 'English', score: 80, grade: 'B+', remarks: 'Good comprehension skills' }
      ],
      attendance: '88%',
      class_rank: 5,
      teacher_remarks: 'Amit excels in mathematics but needs improvement in science'
    },
    generated_at: '2023-10-30T14:00:00Z'
  }
];

// Helper functions to fetch the data

/**
 * Get user data by ID
 */
export const getUserById = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return users.find(user => user.user_id === userId) || null;
};

/**
 * Get students for a parent
 */
export const getStudentsForParent = async (parentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  return students.filter(student => student.parent_id === parentId);
};

/**
 * Get fees for a student
 */
export const getStudentFees = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  return fees.filter(fee => fee.student_id === studentId);
};

/**
 * Get attendance for a student
 */
export const getStudentAttendance = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
  return attendance.filter(record => record.student_id === studentId);
};

/**
 * Get routes for a driver
 */
export const getDriverRoutes = async (driverId: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  const assignments = driverAssignments.filter(assignment => assignment.user_id === driverId);
  return routes.filter(route => assignments.some(a => a.route_id === route.route_id));
};

/**
 * Get diary entries for a student
 */
export const getStudentDiaryEntries = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  return diaryEntries.filter(entry => entry.student_id === studentId);
};

/**
 * Get alerts for a student
 */
export const getStudentAlerts = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return alerts.filter(alert => alert.student_id === studentId);
};

/**
 * Get notifications for a user
 */
export const getUserNotifications = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay
  return notifications.filter(notification => notification.user_id === userId);
};

/**
 * Get marks for a student
 */
export const getStudentMarks = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
  return marks.filter(mark => mark.student_id === studentId);
};

/**
 * Get assessments for a student
 */
export const getStudentAssessments = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  return assessments.filter(assessment => assessment.student_id === studentId);
};

/**
 * Get interests for a student
 */
export const getStudentInterests = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  return studentInterests.find(interest => interest.student_id === studentId) || null;
};

/**
 * Get all routes
 */
export const getAllRoutes = async () => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  return routes;
};

/**
 * Get stop statuses
 */
export const getStopStatuses = async (date: string = new Date().toISOString().split('T')[0]) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return stopStatuses.filter(status => status.date === date);
};

/**
 * Get hall ticket for a student
 */
export const getStudentHallTicket = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  return hallTickets.find(ticket => ticket.student_id === studentId) || null;
};

/**
 * Get reports for a student
 */
export const getStudentReports = async (studentId: string) => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
  return reports.filter(report => report.student_id === studentId);
};

/**
 * Trigger a notification (simulated)
 */
export const triggerNotification = async (userId: string, title: string, message: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const newNotification = {
    notification_id: `NOTIF${Date.now()}`,
    user_id: userId,
    title,
    message,
    read: false,
    created_at: new Date().toISOString()
  };
  
  console.log('Notification triggered:', newNotification);
  return { success: true, notification: newNotification };
};
