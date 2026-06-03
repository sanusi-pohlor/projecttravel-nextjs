import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    let attractions;
    if (region) {
      attractions = await prisma.attraction.findMany({
        where: { region },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      attractions = await prisma.attraction.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(attractions);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
