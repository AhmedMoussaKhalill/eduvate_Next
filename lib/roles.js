import { clerkClient } from '@clerk/nextjs';

export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

export async function updateUserRole(userId, role) {
  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });
    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    return false;
  }
}

export async function getUserRole(userId) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata.role || ROLES.STUDENT;
  } catch (error) {
    console.error('Error getting user role:', error);
    return ROLES.STUDENT;
  }
}

export function hasRole(user, requiredRole) {
  const userRole = user?.publicMetadata?.role || ROLES.STUDENT;

  if (requiredRole === ROLES.ADMIN) {
    return userRole === ROLES.ADMIN;
  }

  if (requiredRole === ROLES.INSTRUCTOR) {
    return [ROLES.ADMIN, ROLES.INSTRUCTOR].includes(userRole);
  }

  return true; // Students can access student routes
}
