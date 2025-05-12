import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { updateUserRole, ROLES } from '@/lib/roles';

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { targetUserId, role } = body;

    // Validate role
    if (!Object.values(ROLES).includes(role)) {
      return new NextResponse('Invalid role', { status: 400 });
    }

    // Only admins can update roles
    const currentUser = await clerkClient.users.getUser(userId);
    if (currentUser.publicMetadata.role !== ROLES.ADMIN) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const success = await updateUserRole(targetUserId, role);
    if (!success) {
      return new NextResponse('Failed to update role', { status: 500 });
    }

    return new NextResponse('Role updated successfully', { status: 200 });
  } catch (error) {
    console.error('[ROLES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
