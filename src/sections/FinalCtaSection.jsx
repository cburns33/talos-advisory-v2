import { useState } from 'react';
import LeadCaptureForm from '../components/LeadCaptureForm';

const FinalCtaSection = ({ finalCta, adapter }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      className="section section--final-cta"
      data-section="Final CTA Section"
      aria-label="Final CTA Section"
    >
      <div className="container final-cta-layout">
        <div>
          <h2 className="section-title">{finalCta.title}</h2>
          <p className="section-subtitle">{finalCta.body}</p>
        </div>
        <div className="hero-form-wrap">
          <button
            type="button"
            className="neo-cta-button"
            data-element="Final CTA Button"
            onClick={() => setShowForm((prev) => !prev)}
            aria-expanded={showForm}
            aria-controls="footer-lead-form"
          >
            Stop wasting budget
          </button>
          <div
            id="footer-lead-form"
            className={`form-reveal ${showForm ? 'is-open' : ''}`}
            aria-hidden={!showForm}
            data-element="Final Lead Form"
          >
            <LeadCaptureForm adapter={adapter} source="footer" ctaLabel="Stop wasting budget" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
