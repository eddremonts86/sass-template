/**
 * API Route to get the current Strapi user
 */

import { getTemplateUserByClerkId } from '@/lib/strapi/services/template-users';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from Strapi
    const strapiUser = await getTemplateUserByClerkId(userId);

    if (!strapiUser) {
      return NextResponse.json(
        { error: 'User not found in Strapi' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: strapiUser });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, bio, locale, timezone } = body;

    // Get current user
    const strapiUser = await getTemplateUserByClerkId(userId);

    if (!strapiUser) {
      return NextResponse.json(
        { error: 'User not found in Strapi' },
        { status: 404 }
      );
    }

    // Import update function
    const { updateTemplateUser } = await import(
      '@/lib/strapi/services/template-users'
    );

    // Update user
    const updatedUser = await updateTemplateUser(strapiUser.id, {
      firstName,
      lastName,
      bio,
      locale,
      timezone,
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
