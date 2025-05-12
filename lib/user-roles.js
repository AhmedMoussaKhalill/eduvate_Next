// User roles for the education platform
const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

// Check if we're in development environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Functions to check user roles
export const isInstructor = (user) => {
  // In development mode, allow access
  if (isDevelopment) return true;

  return (
    user?.publicMetadata?.role === USER_ROLES.INSTRUCTOR ||
    user?.publicMetadata?.role === USER_ROLES.ADMIN
  );
};

export const isStudent = (user) => {
  // In development mode, consider all users as students
  if (isDevelopment) return true;

  return user?.publicMetadata?.role === USER_ROLES.STUDENT;
};

export const isAdmin = (user) => {
  // Admin role should still be properly checked even in development
  return user?.publicMetadata?.role === USER_ROLES.ADMIN;
};

export default USER_ROLES;
