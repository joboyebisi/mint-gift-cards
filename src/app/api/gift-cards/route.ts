import { NextRequest, NextResponse } from 'next/server';
import { GiftCard } from '@/types';

// Mock database for MVP - in production this would be a real database
const giftCards: GiftCard[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, recipientEmail, message, senderAddress } = body;

    // Validate required fields
    if (!amount || !currency || !recipientEmail || !senderAddress) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Generate unique gift card ID
    const giftCardId = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create gift card object
    const giftCard: GiftCard = {
      id: giftCardId,
      amount: parseFloat(amount),
      currency,
      recipientEmail,
      message: message || "¡Felicitaciones! Tienes un regalo especial.",
      senderAddress,
      createdAt: new Date().toISOString(),
      status: "pending",
      claimUrl: `${request.nextUrl.origin}/claim/${giftCardId}`,
    };

    // Store in mock database
    giftCards.push(giftCard);

    return NextResponse.json(giftCard, { status: 201 });
  } catch (error) {
    console.error('Error creating gift card:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Get specific gift card
      const giftCard = giftCards.find(card => card.id === id);
      if (!giftCard) {
        return NextResponse.json(
          { error: 'Tarjeta de regalo no encontrada' },
          { status: 404 }
        );
      }
      return NextResponse.json(giftCard);
    }

    // Get all gift cards (for demo purposes)
    return NextResponse.json(giftCards);
  } catch (error) {
    console.error('Error fetching gift cards:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, recipientData } = body;

    const giftCardIndex = giftCards.findIndex(card => card.id === id);
    if (giftCardIndex === -1) {
      return NextResponse.json(
        { error: 'Tarjeta de regalo no encontrada' },
        { status: 404 }
      );
    }

    // Update gift card
    giftCards[giftCardIndex] = {
      ...giftCards[giftCardIndex],
      status,
      recipientData,
      claimedAt: status === 'claimed' ? new Date().toISOString() : undefined,
    };

    return NextResponse.json(giftCards[giftCardIndex]);
  } catch (error) {
    console.error('Error updating gift card:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
