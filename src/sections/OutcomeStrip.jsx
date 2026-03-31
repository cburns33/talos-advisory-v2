const snapshotConnectionColors = [
  'var(--color-sandy-brown)',
  'var(--color-dusk-blue)',
  'var(--color-terracotta)',
];

const OutcomeStrip = ({ items }) => {
  return (
    <section
      className="section section--snapshot"
      data-section="Snapshot Strip"
      aria-label="Snapshot Strip"
    >
      <div className="container snapshot-grid">
        {items.map((item, index) => (
          <article
            key={item.label}
            className="snapshot-card"
            data-element="Snapshot Cards"
            data-snapshot-index={index + 1}
            style={{ '--snapshot-connection-color': snapshotConnectionColors[index] }}
          >
            <p className="snapshot-label">{item.label}</p>
            <h2 className="snapshot-value">{item.value}</h2>
            <p className="snapshot-note">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OutcomeStrip;
