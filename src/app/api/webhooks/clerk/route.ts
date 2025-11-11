/**
 * Clerk webhook to sync users with Strapi
 * This webhook is triggered when there are user events in Clerk
 */

import { syncTemplateUserFromClerk } from '@/lib/strapi/services/template-users';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET to .env.local');
}

export async function POST(req: Request) {
  try {
    // Get headers
    const headerPayload = await headers();
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    // Validate headers
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Error: Missing svix headers' },
        { status: 400 }
      );
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create Svix Webhook instance
    const wh = new Webhook(WEBHOOK_SECRET!);

    let evt: WebhookEvent;

    // Verify the webhook
    try {
      evt = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json(
        { error: 'Error: Verification error' },
        { status: 400 }
      );
    }

    // Process the event
    const eventType = evt.type;

    console.log(`Webhook event type: ${eventType}`);

    // Events we sync with Strapi
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        username,
        image_url,
        last_sign_in_at,
      } = evt.data;

      try {
        // Sync with Strapi
        const result = await syncTemplateUserFromClerk({
          id,
          emailAddresses: email_addresses.map(e => ({
            emailAddress: e.email_address,
          })),
          firstName: first_name,
          lastName: last_name,
          username,
          imageUrl: image_url,
          lastSignInAt: last_sign_in_at,
        });

        console.log(
          `User ${eventType === 'user.created' ? 'created' : 'updated'} in Strapi:`,
          result
        );

        return NextResponse.json({
          success: true,
          message: `User ${eventType === 'user.created' ? 'created' : 'updated'} in Strapi`,
          userId: result?.id,
        });
      } catch (error) {
        console.error('Error syncing user to Strapi:', error);
        return NextResponse.json(
          {
            error: 'Error syncing user to Strapi',
            details: error instanceof Error ? error.message : 'Unknown error',
          },
          { status: 500 }
        );
      }
    }

    // For other events, just return 200
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      eventType,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
