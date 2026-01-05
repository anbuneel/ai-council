import './CreditBalance.css';

function CreditBalance({ balance, isByokMode, onClick }) {
  // Format balance as currency (without $ prefix since icon provides it)
  const formatBalance = (amount) => {
    if (amount === null || amount === undefined) return '0.00';
    return parseFloat(amount).toFixed(2);
  };

  // BYOK users see a key indicator instead of balance
  if (isByokMode) {
    return (
      <button className="credit-balance-btn credit-balance-byok" onClick={onClick} title="Using your OpenRouter key">
        <span className="credit-balance-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
          </svg>
        </span>
        <span className="credit-balance-count">Your Key</span>
      </button>
    );
  }

  return (
    <button className="credit-balance-btn" onClick={onClick} title="View balance">
      <span className="credit-balance-icon">$</span>
      <span className="credit-balance-count">{formatBalance(balance)}</span>
    </button>
  );
}

export default CreditBalance;
