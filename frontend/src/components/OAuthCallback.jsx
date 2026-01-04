import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { auth } from '../api';
import './OAuthCallback.css';

function OAuthCallback({ onLogin }) {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against double execution (StrictMode, dependency changes, etc.)
    if (hasRun.current) return;
    hasRun.current = true;

    const completeAuth = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(`Authentication was cancelled or failed: ${errorParam}`);
        setIsProcessing(false);
        return;
      }

      if (!code) {
        setError('No authorization code received');
        setIsProcessing(false);
        return;
      }

      try {
        await auth.completeOAuth(provider, code, state);
        onLogin();
        navigate('/', { replace: true });
      } catch (err) {
        setError(err.message || 'Authentication failed');
        setIsProcessing(false);
      }
    };

    completeAuth();
  }, [provider, searchParams, navigate, onLogin]);

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="oauth-callback-container">
      <div className="oauth-callback-box">
        {isProcessing ? (
          <>
            <div className="oauth-spinner"></div>
            <p className="oauth-message">Completing sign in...</p>
          </>
        ) : (
          <>
            <div className="oauth-error-icon">!</div>
            <p className="oauth-error">{error}</p>
            <button onClick={handleRetry} className="oauth-retry-button">
              Return to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OAuthCallback;
