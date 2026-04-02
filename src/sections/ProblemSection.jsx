import { useEffect, useRef, useState } from 'react';
import problemBg from '../assets/The-Problem-section-background.svg';

const ProblemSection = ({ problem }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0, width: 0, pointerX: 0 });
  const containerRef = useRef(null);
  const paragraphRef = useRef(null);
  const termRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!showTooltip) return;

    const updateTooltipPosition = () => {
      if (!containerRef.current || !paragraphRef.current || !termRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const paragraphRect = paragraphRef.current.getBoundingClientRect();
      const termRect = termRef.current.getBoundingClientRect();

      const viewportPadding = 16;
      const preferredWidth = Math.min(520, window.innerWidth - viewportPadding * 2);
      const tooltipWidth = Math.min(preferredWidth, containerRect.width);

      const termCenterInContainer = termRect.left + termRect.width / 2 - containerRect.left;
      const maxLeft = Math.max(containerRect.width - tooltipWidth, 0);
      const tooltipLeft = Math.min(Math.max(termCenterInContainer - tooltipWidth / 2, 0), maxLeft);
      const tooltipTop = paragraphRect.bottom - containerRect.top + 14;

      const pointerX = Math.min(Math.max(termCenterInContainer - tooltipLeft, 18), tooltipWidth - 18);

      setTooltipPosition({
        left: tooltipLeft,
        top: tooltipTop,
        width: tooltipWidth,
        pointerX,
      });
    };

    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);

    const handlePointerDown = (event) => {
      const clickedTrigger = termRef.current && termRef.current.contains(event.target);
      const clickedTooltip = tooltipRef.current && tooltipRef.current.contains(event.target);

      if (!clickedTrigger && !clickedTooltip) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [showTooltip]);

  return (
    <section 
      className="section problem-section" 
      data-section="Problem Section" 
      aria-label="Problem Section"
      style={{ backgroundImage: `url(${problemBg})` }}
    >
      <div className="container" ref={containerRef}>
        <h2 className="section-title">{problem.title}</h2>
        <p className="problem-text" ref={paragraphRef}>
          <span className="problem-text-copy">
            {problem.intro}{' '}
            <span
              ref={termRef}
              className={`dark-funnel-term ${showTooltip ? 'is-active' : ''}`}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') {
                  setShowTooltip(true);
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') {
                  setShowTooltip(false);
                }
              }}
              onClick={() => setShowTooltip((prev) => !prev)}
              role="button"
              tabIndex={0}
              aria-expanded={showTooltip}
              aria-controls="dark-funnel-tooltip"
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setShowTooltip((prev) => !prev);
                }
                if (event.key === 'Escape') {
                  setShowTooltip(false);
                }
              }}
            >
              {problem.highlightedTerm}
            </span>
            {problem.outro}
          </span>
        </p>
        {showTooltip ? (
          <div
            ref={tooltipRef}
            id="dark-funnel-tooltip"
            className="dark-funnel-tooltip"
            role="tooltip"
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`,
              width: `${tooltipPosition.width}px`,
              '--tooltip-pointer-x': `${tooltipPosition.pointerX}px`,
            }}
          >
            {problem.tooltip}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProblemSection;
