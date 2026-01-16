'use client';

import { useState } from 'react';

interface ContributionModalProps {
  boxId: string;
  faceValue: number;
  onClose: () => void;
  onContribute: (amount: number) => void;
}

export default function ContributionModal({
  boxId,
  faceValue,
  onClose,
  onContribute,
}: ContributionModalProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);

  // Suggested amounts based on face value (PR0004 logic)
  const suggestedAmounts = [
    Math.max(1, Math.floor(faceValue * 0.01)), // 1% of face value
    Math.max(2, Math.floor(faceValue * 0.02)), // 2%
    Math.max(5, Math.floor(faceValue * 0.05)), // 5%
  ];

  const handleAmountClick = (suggestedAmount: number) => {
    setAmount(suggestedAmount.toString());
    setCustomAmount(false);
  };

  const handleCustomAmountClick = () => {
    setCustomAmount(true);
    setAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount < 0.5) {
      alert('Minimum contribution is £0.50');
      return;
    }

    if (numAmount > faceValue * 2) {
      alert(`Maximum contribution is £${faceValue * 2} for this box`);
      return;
    }

    onContribute(numAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Contribute to Box</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <span className="text-white/70">✕</span>
            </button>
          </div>
          <p className="text-sm text-white/60">
            Box ID: {boxId.slice(0, 8).toUpperCase()}
          </p>
          <p className="text-sm text-white/60">
            Face Value: <span className="font-bold text-white">£{faceValue}</span>
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Important Notice */}
          <div
            className="mb-6 p-4 rounded-lg"
            style={{
              background: 'rgba(234, 179, 8, 0.1)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
            }}
          >
            <p className="text-sm text-yellow-200/90">
              <strong>How it works:</strong> This box has a hidden threshold. If your
              contribution completes the box, you win £{faceValue}. No progress bars,
              no visible counters—just pure anticipation.
            </p>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-white/80">
              Choose your contribution amount:
            </label>

            {/* Suggested Amounts */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {suggestedAmounts.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAmountClick(suggested)}
                  className={`p-3 rounded-lg font-bold transition-all ${
                    amount === suggested.toString() && !customAmount
                      ? 'bg-white text-black'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  £{suggested}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <button
              type="button"
              onClick={handleCustomAmountClick}
              className={`w-full p-3 rounded-lg font-medium transition-all mb-3 ${
                customAmount
                  ? 'bg-white text-black'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              Custom Amount
            </button>

            {/* Custom Input */}
            {customAmount && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 font-bold">
                  £
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.5"
                  max={faceValue * 2}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* KYC Notice */}
          <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-white/60">
              By contributing, you confirm you have an account. If you win, you'll need
              to complete identity verification to withdraw your prize (as required by
              financial regulations).
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount || parseFloat(amount) < 0.5}
            className="w-full py-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: amount && parseFloat(amount) >= 0.5
                ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
                : '#333',
              color: amount && parseFloat(amount) >= 0.5 ? '#000' : '#666',
            }}
          >
            {amount && parseFloat(amount) >= 0.5
              ? `Contribute £${parseFloat(amount).toFixed(2)}`
              : 'Enter an amount'}
          </button>

          {/* Terms */}
          <p className="mt-4 text-xs text-center text-white/40">
            Contributions are final. See{' '}
            <a href="#" className="underline hover:text-white/60">
              Terms & Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
