/**
 * Mock Database Layer
 * Per PR0005: Start simple, add real database later
 * This is in-memory storage for development only
 */

import { Box, Contribution, User, calculateTargetFillValue } from './types';

// In-memory storage (will be lost on server restart)
const boxes: Map<string, Box> = new Map();
const contributions: Map<string, Contribution> = new Map();
const users: Map<string, User> = new Map();

// Initialize the six boxes per PR0003
function initializeBoxes() {
  const boxConfigs = [
    { id: 'box-001', faceValue: 10, createdDate: '2026-01-16' },
    { id: 'box-002', faceValue: 50, createdDate: '2026-01-15' },
    { id: 'box-003', faceValue: 100, createdDate: '2026-01-14' },
    { id: 'box-004', faceValue: 500, createdDate: '2026-01-12' },
    { id: 'box-005', faceValue: 1000, createdDate: '2026-01-10' },
    { id: 'box-006', faceValue: 10000, createdDate: '2026-01-08' },
  ];

  boxConfigs.forEach((config) => {
    const box: Box = {
      ...config,
      targetFillValue: calculateTargetFillValue(config.faceValue),
      currentTotal: 0,
      status: 'active',
    };
    boxes.set(box.id, box);
  });
}

// Initialize on module load
initializeBoxes();

// Box operations
export function getAllBoxes(): Box[] {
  return Array.from(boxes.values());
}

export function getBox(id: string): Box | undefined {
  return boxes.get(id);
}

export function updateBox(id: string, updates: Partial<Box>): Box | undefined {
  const box = boxes.get(id);
  if (!box) return undefined;

  const updated = { ...box, ...updates };
  boxes.set(id, updated);
  return updated;
}

// Contribution operations
export function addContribution(contribution: Contribution): Contribution {
  contributions.set(contribution.id, contribution);
  return contribution;
}

export function getContributionsByBox(boxId: string): Contribution[] {
  return Array.from(contributions.values()).filter((c) => c.boxId === boxId);
}

export function getContributionsByUser(userId: string): Contribution[] {
  return Array.from(contributions.values()).filter((c) => c.userId === userId);
}

// User operations
export function getUser(id: string): User | undefined {
  return users.get(id);
}

export function createUser(user: User): User {
  users.set(user.id, user);
  return user;
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const user = users.get(id);
  if (!user) return undefined;

  const updated = { ...user, ...updates };
  users.set(id, updated);
  return updated;
}

// Reset function for testing
export function resetDatabase() {
  boxes.clear();
  contributions.clear();
  users.clear();
  initializeBoxes();
}
