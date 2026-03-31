import { useState } from 'react';

const ProblemSection = ({ problem }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="section problem-section" data-section="Problem Section" aria-label="Problem Section">
      <div className="container">
        <h2 className="section-title">{problem.title}</h2>
        <p className="problem-text">
          {problem.intro}{' '}
          <span
            className="dark-funnel-term"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onTouchStart={() => setShowTooltip(true)}
            onTouchEnd={() => setShowTooltip(false)}
          >
            {problem.highlightedTerm}
            {showTooltip ? <span className="dark-funnel-tooltip">{problem.tooltip}</span> : null}
          </span>
          {problem.outro}
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
