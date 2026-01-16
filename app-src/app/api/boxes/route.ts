import { NextResponse } from 'next/server';
import { getAllBoxes } from '@/lib/db-mock';

/**
 * GET /api/boxes
 * Returns all active boxes
 * Per PR0003: Six boxes are always visible
 */
export async function GET() {
  try {
    const boxes = getAllBoxes();

    // Only return active boxes (filter out filled/cancelled)
    const activeBoxes = boxes.filter((box) => box.status === 'active');

    return NextResponse.json({
      success: true,
      boxes: activeBoxes,
    });
  } catch (error) {
    console.error('Error fetching boxes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch boxes' },
      { status: 500 }
    );
  }
}
