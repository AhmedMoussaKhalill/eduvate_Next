import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST() {
  const { userId } = auth();

  console.log('User ID:', userId); // Debugging line

  if (!userId) {
    console.error('Unauthorized: No user ID found'); // Debugging line
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not allowed in production', { status: 403 });
  }

  try {
    // Update the user's role in Clerk
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: 'instructor',
      },
    });

    return new NextResponse('Role updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating role:', error);
    return new NextResponse('Error updating role', { status: 500 });
  }
}
