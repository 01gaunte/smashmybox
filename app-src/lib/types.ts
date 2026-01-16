// Core data types based on PR0003 and PR0004 specifications

export interface Box {
  id: string;
  faceValue: number; // Net payout to winner (e.g., £10)
  targetFillValue: number; // Gross amount needed including fees (e.g., £13)
  currentTotal: number; // Running total of contributions
  createdDate: string; // ISO 8601 date
  status: 'active' | 'filled' | 'cancelled';
  winnerId?: string; // User ID of winner (if filled)
  winningContributionId?: string; // Contribution that triggered win
}

export interface Contribution {
  id: string;
  boxId: string;
  userId: string;
  amount: number; // Gross contribution amount
  timestamp: string; // ISO 8601 timestamp
  appliedAmount: number; // Amount actually applied to box (after overshoot)
  overshootAmount: number; // Amount that became overshoot (0 if didn't overshoot)
  isWinningContribution: boolean; // True if this contribution filled the box
}

export interface User {
  id: string;
  email: string;
  alias: string; // Display name
  hasCompletedKYC: boolean;
  createdAt: string;
}

// PR0004 Payout Logic Constants
export const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee
export const CHARITY_PERCENTAGE = 0.20; // 20% to charity (configurable per box)

/**
 * Calculate Target Fill Value from Face Value
 * Per PR0004: Target Fill Value = Face Value + Fees + Charity
 *
 * Example:
 * Face Value: £10
 * Platform Fee (5%): £0.65
 * Charity (20%): £2.60
 * Target Fill Value: £13.25
 */
export function calculateTargetFillValue(
  faceValue: number,
  charityPercentage: number = CHARITY_PERCENTAGE
): number {
  const totalPercentage = 1 + PLATFORM_FEE_PERCENTAGE + charityPercentage;
  return parseFloat((faceValue * totalPercentage).toFixed(2));
}

/**
 * Process a contribution with overshoot handling
 * Per PR0004: Overshoot goes to house, winner gets exact face value
 */
export function processContribution(
  currentTotal: number,
  targetFillValue: number,
  contributionAmount: number
): {
  appliedAmount: number;
  overshootAmount: number;
  newTotal: number;
  isWinningContribution: boolean;
} {
  const needed = targetFillValue - currentTotal;

  if (contributionAmount <= needed) {
    // Contribution fits entirely
    return {
      appliedAmount: contributionAmount,
      overshootAmount: 0,
      newTotal: currentTotal + contributionAmount,
      isWinningContribution: currentTotal + contributionAmount >= targetFillValue,
    };
  } else {
    // Contribution overshoots - excess goes to house
    return {
      appliedAmount: needed,
      overshootAmount: contributionAmount - needed,
      newTotal: targetFillValue,
      isWinningContribution: true,
    };
  }
}
