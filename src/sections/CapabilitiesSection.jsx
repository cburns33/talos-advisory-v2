import { useRef, useState } from 'react';

const CapabilitiesSection = ({ capabilities }) => {
  const [flippedCards, setFlippedCards] = useState({});
  const isFlipping = useRef({});

  const handleCardClick = (index, event) => {
    event.stopPropagation();

    if (isFlipping.current[index]) {
      return;
    }

    isFlipping.current[index] = true;

    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    setTimeout(() => {
      isFlipping.current[index] = false;
    }, 600);
  };

  return (
    <section className="section" data-section="Capabilities Section" aria-label="Capabilities Section">
      <div className="container text-center">
        <h2 className="section-title">Core Services</h2>

        <div className="neo-grid">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className={`flip-card ${flippedCards[index] ? 'flipped' : ''}`}
              data-element="Capabilities Flip Cards"
              onClick={(event) => handleCardClick(index, event)}
              style={{
                transform: `rotate(${capability.rotate || '0deg'})`,
                '--card-rotation': capability.rotate || '0deg',
              }}
            >
              <div className="flip-card-inner">
                <div
                  className="flip-card-front neo-box"
                  style={{
                    backgroundColor: capability.color,
                    color: capability.textColor,
                  }}
                >
                  <h3 style={{ color: capability.textColor }}>{capability.title}</h3>
                </div>
                <div
                  className="flip-card-back neo-box"
                  style={{
                    backgroundColor: capability.color,
                    color: capability.textColor,
                  }}
                >
                  <p style={{ color: capability.textColor }}>{capability.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
