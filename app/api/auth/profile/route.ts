
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // TODO: Implement proper authentication to get the user ID from the session/token
  // For demonstration purposes, we'll use a hardcoded user ID or one from a query parameter
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId') || '1'; // Example: /api/auth/profile?userId=1

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: { // Select only necessary fields
        name: true,
        email: true,
        province: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // TODO: Implement proper authentication to get the user ID from the session/token
  // For demonstration purposes, we'll use a hardcoded user ID or one from a query parameter
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId') || '1'; // Example: /api/auth/profile?userId=1

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const { name, province } = await req.json();

    if (!name || !province) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        name,
        province,
      },
      select: {
        name: true,
        email: true,
        province: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
