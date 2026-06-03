import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const attractionId = parseInt(id, 10);

    if (isNaN(attractionId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const attraction = await prisma.attraction.findUnique({
      where: { id: attractionId },
    });

    if (!attraction) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
    }

    return NextResponse.json(attraction);
  } catch (error) {
    console.error('Error fetching attraction details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
