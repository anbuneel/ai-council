import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Masthead from './Masthead';
import './HowItWorks.css';

export default function HowItWorks() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'How It Works | Quinthesis';
    }, []);

    return (
        <div className="how-it-works-view">
            <Masthead variant="full">
                <button
                    type="button"
                    className="how-it-works-cta-btn"
                    onClick={() => navigate('/')}
                >
                    Sign Up
                </button>
            </Masthead>

            <div className="how-it-works-content">
                <div className="how-it-works-intro">
                    <h1>How Quinthesis Works</h1>
                    <p>
                        A 3-stage deliberation pipeline that distills collective AI intelligence
                        through anonymized peer review.
                    </p>
                </div>

                <a
                    href="/quinthesis-infographic.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="how-it-works-infographic-link"
                    aria-label="View full-size infographic"
                >
                    <img
                        src="/quinthesis-infographic.png"
                        alt="Infographic showing the 3-stage deliberation pipeline: Stage 1 Independent Inquiry with parallel AI responses, Stage 2 Anonymized Peer Review, and Stage 3 Synthesis producing the final Quintessence answer"
                        className="how-it-works-infographic"
                    />
                </a>

                <div className="how-it-works-footer">
                    <p>Ready to try it yourself?</p>
                    <div className="how-it-works-actions">
                        <button
                            type="button"
                            className="how-it-works-cta-btn how-it-works-cta-large"
                            onClick={() => navigate('/')}
                        >
                            Get Started
                        </button>
                        <button
                            type="button"
                            className="how-it-works-secondary-btn"
                            onClick={() => navigate('/demo')}
                        >
                            See Examples
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
