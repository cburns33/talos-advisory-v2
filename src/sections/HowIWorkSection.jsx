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
      </div>
    </section>
  );
};

export default HowIWorkSection;
