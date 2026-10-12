import { NextResponse } from 'next/server';
import { insertQuote } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      projectType,
      siteAddress,
      estimatedArea,
      slabThickness,
      finishType,
      siteAccess,
      earthworks,
      message
    } = body;

    if (!firstName || !email || !phone || !projectType) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Email, Phone, Project Type).' },
        { status: 400 }
      );
    }

    const saved = await insertQuote({
      firstName,
      lastName: lastName || '',
      email,
      phone,
      projectType,
      siteAddress,
      estimatedArea: estimatedArea ? Number(estimatedArea) : undefined,
      slabThickness,
      finishType,
      siteAccess,
      earthworks: Boolean(earthworks),
      message: message || '',
    });

    return NextResponse.json({
      success: true,
      quote: saved,
      message: 'Thank you! Your quote request has been received. Wangaratta Radiators will contact you within 24 hours.',
    });
  } catch (error: any) {
    console.error('API /api/quote error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit quote request.' },
      { status: 500 }
    );
  }
}
