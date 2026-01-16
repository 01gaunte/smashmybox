import { NextRequest, NextResponse } from 'next/server';
import { getBox, updateBox, addContribution } from '@/lib/db-mock';
import { processContribution } from '@/lib/types';
import { Contribution } from '@/lib/types';

/**
 * POST /api/contribute
 * Process a contribution to a box
 * Implements PR0004 game mechanics:
 * - Sequential processing by timestamp
 * - Hidden threshold (no progress visible)
 * - Overshoot handling (excess → house)
 * - Binary feedback (deposit sound or smash animation)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { boxId, userId, amount } = body;

    // Validation
    if (!boxId || !userId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (amount < 0.5) {
      return NextResponse.json(
        { success: false, error: 'Minimum contribution is £0.50' },
        { status: 400 }
      );
    }

    // Get box
    const box = getBox(boxId);
    if (!box) {
      return NextResponse.json(
        { success: false, error: 'Box not found' },
        { status: 404 }
      );
    }

    if (box.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Box is not active' },
        { status: 400 }
      );
    }

    // Process contribution with overshoot handling (PR0004)
    const result = processContribution(
      box.currentTotal,
      box.targetFillValue,
      amount
    );

    // Create contribution record
    const contribution: Contribution = {
      id: `contrib-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      boxId,
      userId,
      amount,
      timestamp: new Date().toISOString(),
      appliedAmount: result.appliedAmount,
      overshootAmount: result.overshootAmount,
      isWinningContribution: result.isWinningContribution,
    };

    // Save contribution
    addContribution(contribution);

    // Update box
    const boxUpdates: any = {
      currentTotal: result.newTotal,
    };

    if (result.isWinningContribution) {
      boxUpdates.status = 'filled';
      boxUpdates.winnerId = userId;
      boxUpdates.winningContributionId = contribution.id;
    }

    const updatedBox = updateBox(boxId, boxUpdates);

    // Response format (PR0003: No progress visible)
    // Client only knows: "deposited" or "won"
    return NextResponse.json({
      success: true,
      result: result.isWinningContribution ? 'won' : 'deposited',
      contribution: {
        id: contribution.id,
        appliedAmount: result.appliedAmount,
        overshootAmount: result.overshootAmount,
      },
      // Only include prize info if won
      ...(result.isWinningContribution && {
        prize: {
          amount: box.faceValue,
          boxId: box.id,
        },
      }),
    });
  } catch (error) {
    console.error('Error processing contribution:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process contribution' },
      { status: 500 }
    );
  }
}
