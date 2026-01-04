import './CreditBalance.css';

function CreditBalance({ balance, isByokMode, onClick }) {
  // Format balance as currency
  const formatBalance = (amount) => {
    if (amount === null || amount === undefined) return '$0.00';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // BYOK users see a key indicator instead of balance
  if (isByokMode) {
    return (
      <button className="credit-balance-btn credit-balance-byok" onClick={onClick} title="Using your OpenRouter key">
        <span className="credit-balance-icon">🔑</span>
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
