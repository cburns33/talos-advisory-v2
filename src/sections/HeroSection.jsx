import { useEffect, useRef, useState } from 'react';
import LeadCaptureForm from '../components/LeadCaptureForm';

// Canvas-based text measurement (Pretext-style)
const measureTextWidth = (text, fontSize, fontFamily = "'Montserrat', sans-serif") => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `700 ${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
};

// Binary search for optimal font size to fit container
const findOptimalFontSize = (text, containerWidth, minSize = 16, maxSize = 80) => {
  let optimal = minSize;
  const padding = 32; // Account for padding
  const availableWidth = containerWidth - padding;

  for (let i = 0; i < 10; i++) {
    const mid = (minSize + maxSize) / 2;
    const width = measureTextWidth(text, mid);

    if (width <= availableWidth) {
      optimal = mid;
      minSize = mid;
    } else {
      maxSize = mid;
    }
  }
  return optimal;
};

const headlineLines = [
  {
    id: 1,
    lead: 'Marketing for ',
    accentWord: 'Humans',
    accentClass: 'headline-accent--terracotta',
    fullText: 'Marketing for Humans.',
  },
  {
    id: 2,
    lead: 'By a ',
    accentWord: 'Human',
    accentClass: 'headline-accent--dusk-blue',
    fullText: 'By a Human.',
  },
  {
    id: 3,
    lead: 'With ',
    accentWord: 'AI',
    accentClass: 'headline-accent--sandy-brown',
    fullText: 'With AI.',
  },
];

const HeroSection = ({ adapter }) => {
  const [showForm, setShowForm] = useState(false);
  const headlineRef = useRef(null);
  const [fontSize, setFontSize] = useState(64);

  useEffect(() => {
    const calculateSize = () => {
      if (!headlineRef.current) return;
      const containerWidth = headlineRef.current.offsetWidth;
      // Find size that fits the longest line
      const longestLine = headlineLines
        .map((line) => line.fullText)
        .reduce((a, b) => (a.length > b.length ? a : b));
      const optimalSize = findOptimalFontSize(longestLine, containerWidth);
      setFontSize(optimalSize);
    };

    calculateSize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateSize, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="section section--hero" data-section="Hero Section" aria-label="Hero Section">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">Talos Advisory</p>
          <h1
            ref={headlineRef}
            className="hero-headline-fit"
            style={{ '--headline-font-size': `${fontSize}px` }}
          >
            {headlineLines.map((line) => (
              <span key={line.id} className="headline-line">
                {line.lead}
                <span
                  className={`headline-accent ${line.accentClass}`}
                  data-headline-accent={line.id}
                >
                  {line.accentWord}
                </span>
                <span
                  className={`headline-period-dot ${line.accentClass}`}
                  data-headline-dot={line.id}
                />
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-form-wrap">
          <button
            type="button"
            className="neo-cta-button"
            data-element="Hero CTA Button"
            onClick={() => setShowForm((prev) => !prev)}
            aria-expanded={showForm}
            aria-controls="hero-lead-form"
          >
            Stop wasting budget
          </button>
          <div
            id="hero-lead-form"
            className={`form-reveal ${showForm ? 'is-open' : ''}`}
            aria-hidden={!showForm}
            data-element="Hero Lead Form"
          >
            <LeadCaptureForm adapter={adapter} source="hero" ctaLabel="Stop wasting budget" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
