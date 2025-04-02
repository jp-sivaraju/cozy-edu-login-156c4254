
// Test Data Verification Utility
// This can be imported and run from the browser console to verify test data

import {
  getUserById,
  getStudentsForParent,
  getStudentFees,
  getStudentAttendance,
  getDriverRoutes,
  getStudentDiaryEntries,
  getStudentAlerts,
  getUserNotifications,
  getStudentMarks,
  getStudentAssessments,
  getStudentInterests,
  getAllRoutes,
  getStopStatuses,
  getStudentHallTicket,
  getStudentReports,
  triggerNotification
} from '../api/testData';
import { fetchCurriculum } from '../api/curriculum';

// Testing parent data
export const verifyParentData = async () => {
  console.group('Verifying Parent Data (dummy_parent_001)');
  
  try {
    const user = await getUserById('dummy_parent_001');
    console.log('User data:', user);
    
    const students = await getStudentsForParent('dummy_parent_001');
    console.log('Students:', students);
    
    if (students.length > 0) {
      const studentId = students[0].student_id;
      
      const fees = await getStudentFees(studentId);
      console.log(`Fees for ${studentId}:`, fees);
      
      const attendance = await getStudentAttendance(studentId);
      console.log(`Attendance for ${studentId}:`, attendance);
      
      const diaryEntries = await getStudentDiaryEntries(studentId);
      console.log(`Diary entries for ${studentId}:`, diaryEntries);
      
      const alerts = await getStudentAlerts(studentId);
      console.log(`Alerts for ${studentId}:`, alerts);
      
      const hallTicket = await getStudentHallTicket(studentId);
      console.log(`Hall ticket for ${studentId}:`, hallTicket);
      
      const reports = await getStudentReports(studentId);
      console.log(`Reports for ${studentId}:`, reports);
    }
    
    const notifications = await getUserNotifications('dummy_parent_001');
    console.log('Notifications:', notifications);
    
    console.log('Parent data verification complete');
  } catch (error) {
    console.error('Error verifying parent data:', error);
  }
  
  console.groupEnd();
};

// Testing driver data
export const verifyDriverData = async () => {
  console.group('Verifying Driver Data (dummy_driver_001)');
  
  try {
    const user = await getUserById('dummy_driver_001');
    console.log('User data:', user);
    
    const routes = await getDriverRoutes('dummy_driver_001');
    console.log('Assigned routes:', routes);
    
    const stopStatuses = await getStopStatuses('2023-11-03');
    console.log('Stop statuses for 2023-11-03:', stopStatuses);
    
    const notifications = await getUserNotifications('dummy_driver_001');
    console.log('Notifications:', notifications);
    
    console.log('Driver data verification complete');
  } catch (error) {
    console.error('Error verifying driver data:', error);
  }
  
  console.groupEnd();
};

// Testing teacher data
export const verifyTeacherData = async () => {
  console.group('Verifying Teacher Data (dummy_teacher_001)');
  
  try {
    const user = await getUserById('dummy_teacher_001');
    console.log('User data:', user);
    
    // For each student
    for (const studentId of ['STU001', 'STU002', 'STU003']) {
      console.group(`Student ${studentId} data:`);
      
      const marks = await getStudentMarks(studentId);
      console.log(`Marks:`, marks);
      
      const assessments = await getStudentAssessments(studentId);
      console.log(`Assessments:`, assessments);
      
      const diaryEntries = await getStudentDiaryEntries(studentId);
      console.log(`Diary entries:`, diaryEntries);
      
      console.groupEnd();
    }
    
    const notifications = await getUserNotifications('dummy_teacher_001');
    console.log('Notifications:', notifications);
    
    console.log('Teacher data verification complete');
  } catch (error) {
    console.error('Error verifying teacher data:', error);
  }
  
  console.groupEnd();
};

// Testing admin data
export const verifyAdminData = async () => {
  console.group('Verifying Admin Data (dummy_admin_001)');
  
  try {
    const user = await getUserById('dummy_admin_001');
    console.log('User data:', user);
    
    const routes = await getAllRoutes();
    console.log('All routes:', routes);
    
    // For each student
    for (const studentId of ['STU001', 'STU002', 'STU003']) {
      console.group(`Student ${studentId} data:`);
      
      const curriculum = await fetchCurriculum(studentId);
      console.log(`Curriculum:`, curriculum);
      
      const fees = await getStudentFees(studentId);
      console.log(`Fees:`, fees);
      
      const hallTicket = await getStudentHallTicket(studentId);
      console.log(`Hall ticket:`, hallTicket);
      
      console.groupEnd();
    }
    
    const notifications = await getUserNotifications('dummy_admin_001');
    console.log('Notifications:', notifications);
    
    console.log('Admin data verification complete');
  } catch (error) {
    console.error('Error verifying admin data:', error);
  }
  
  console.groupEnd();
};

// Test notification trigger
export const testNotificationTrigger = async () => {
  console.group('Testing Notification Trigger');
  
  try {
    const result = await triggerNotification(
      'dummy_parent_001', 
      'Test Notification', 
      'This is a test notification with tricolor theme'
    );
    console.log('Notification trigger result:', result);
  } catch (error) {
    console.error('Error triggering notification:', error);
  }
  
  console.groupEnd();
};

// Verify all data
export const verifyAllTestData = async () => {
  console.group('EduSense Test Data Verification');
  console.log('Starting test data verification...');
  
  await verifyParentData();
  await verifyDriverData();
  await verifyTeacherData();
  await verifyAdminData();
  
  console.log('Test data verification complete!');
  console.groupEnd();
};

// Export the verification utilities to the window object for console access
(window as any).EduSenseTest = {
  verifyParentData,
  verifyDriverData,
  verifyTeacherData,
  verifyAdminData,
  testNotificationTrigger,
  verifyAllTestData
};

console.log('EduSense test data verification utilities loaded.');
console.log('Run window.EduSenseTest.verifyAllTestData() to verify all test data.');
