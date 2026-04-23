const HowIWorkSection = ({ steps }) => {
  return (
    <section className="section" data-section="How I Work Section" aria-label="How I Work Section">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title section-title--mask">HOW I WORK</h2>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <article 
              key={step.title} 
              className="process-card"
              data-process-index={index + 1}
            >
              <p className="step-index">0{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <a href="/case-study-knime.html" className="see-it-applied-panel" data-element="See It Applied Panel">
          <div className="see-it-applied-inner">
            <div className="see-it-applied-text">
              <p className="see-it-applied-eyebrow">See It Applied</p>
              <h3 className="see-it-applied-title">KNIME: Enterprise Paid Media Strategy</h3>
              <p className="see-it-applied-desc">A full B2B SaaS program, four buyer personas, $50K/month budget allocation, and a mock campaign assessment. The whole process, end to end.</p>
            </div>
            <span className="see-it-applied-arrow" aria-hidden="true">&#8599;</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HowIWorkSection;
