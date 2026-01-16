'use client';

import { useState } from 'react';
import Box from '@/components/Box';
import ContributionModal from '@/components/ContributionModal';

// Mock data for the six boxes (V1 specification from PR0003)
const INITIAL_BOXES = [
  { id: 'box-001', faceValue: 10, createdDate: '2026-01-16' },
  { id: 'box-002', faceValue: 50, createdDate: '2026-01-15' },
  { id: 'box-003', faceValue: 100, createdDate: '2026-01-14' },
  { id: 'box-004', faceValue: 500, createdDate: '2026-01-12' },
  { id: 'box-005', faceValue: 1000, createdDate: '2026-01-10' },
  { id: 'box-006', faceValue: 10000, createdDate: '2026-01-08' },
];

export default function Home() {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<'won' | 'deposited' | null>(null);
  const [prizeAmount, setPrizeAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBoxClick = (boxId: string) => {
    setSelectedBox(boxId);
  };

  const handleContribute = async (amount: number) => {
    if (!selectedBox) return;

    setIsProcessing(true);

    try {
      // Mock user ID (will be replaced with real auth per PR0006)
      const mockUserId = 'user-' + Math.random().toString(36).substr(2, 9);

      const response = await fetch('/api/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boxId: selectedBox,
          userId: mockUserId,
          amount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSelectedBox(null);
        setShowResult(data.result);

        if (data.result === 'won' && data.prize) {
          setPrizeAmount(data.prize.amount);
        }

        // Auto-hide result after 5 seconds
        setTimeout(() => {
          setShowResult(null);
          setPrizeAmount(null);
        }, 5000);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Contribution error:', error);
      alert('Failed to process contribution');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedBoxData = selectedBox
    ? INITIAL_BOXES.find((b) => b.id === selectedBox)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-8 flex items-center justify-between border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SmashMyBox</h1>
          <p className="text-sm text-white/60 mt-1">The Parcel Prize Game</p>
        </div>

        {/* Avatar placeholder (PR0006 - Authentication) */}
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/15 transition-colors">
          <span className="text-xs font-bold text-white/70">?</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Choose Your Box</h2>
          <p className="text-white/70 text-lg">
            Six boxes are active. Each has a hidden prize threshold.
            Contribute to a box—if yours is the winning deposit, you take the prize.
          </p>
        </div>

        {/* Six Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {INITIAL_BOXES.map((box) => (
            <Box
              key={box.id}
              id={box.id}
              faceValue={box.faceValue}
              createdDate={box.createdDate}
              onClick={() => handleBoxClick(box.id)}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-2xl text-center">
          <p className="text-sm text-white/50">
            No progress bars. No visible counters. Just anticipation.
            <br />
            Each box ages over time—the older it gets, the closer it might be to paying out.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8 border-t border-white/5 text-center">
        <p className="text-xs text-white/40">
          SmashMyBox.com · Fixed prizes, transparent targets, deterministic payouts
        </p>
      </footer>

      {/* Contribution Modal */}
      {selectedBox && selectedBoxData && !isProcessing && (
        <ContributionModal
          boxId={selectedBox}
          faceValue={selectedBoxData.faceValue}
          onClose={() => setSelectedBox(null)}
          onContribute={handleContribute}
        />
      )}

      {/* Result Modal - Win or Deposit */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden p-12 text-center"
            style={{
              background:
                showResult === 'won'
                  ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
                  : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {showResult === 'won' ? (
              <>
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-5xl font-bold mb-4 text-black">YOU WON!</h2>
                <p className="text-3xl font-bold mb-6 text-black">
                  £{prizeAmount?.toFixed(2)}
                </p>
                <p className="text-lg text-black/80 mb-8">
                  Your contribution smashed the box!
                  <br />
                  Prize will be transferred to your account.
                </p>
                <p className="text-sm text-black/60">
                  You'll need to complete identity verification to withdraw.
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-6">📦</div>
                <h2 className="text-3xl font-bold mb-4 text-white">Deposited</h2>
                <p className="text-lg text-white/70">
                  Your contribution has been added to the box.
                  <br />
                  Keep playing—the next one might be the winner!
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Processing contribution...</p>
          </div>
        </div>
      )}
    </div>
  );
}
