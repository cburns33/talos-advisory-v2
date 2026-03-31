import { useEffect, useMemo, useRef, useState } from 'react';
import HeroSection from '../sections/HeroSection';
import OutcomeStrip from '../sections/OutcomeStrip';
import HowIWorkSection from '../sections/HowIWorkSection';
import ProblemSection from '../sections/ProblemSection';
import CapabilitiesSection from '../sections/CapabilitiesSection';
import LogosSection from '../sections/LogosSection';
import FinalCtaSection from '../sections/FinalCtaSection';
import LoadingScreen from '../components/LoadingScreen';
import { siteContent } from '../content/siteContent';
import { createMailtoAdapter } from '../forms/adapters/mailtoAdapter';

const connectorMap = [
  { accentIndex: 1, snapshotIndex: 3, color: 'var(--color-terracotta)' },
  { accentIndex: 2, snapshotIndex: 2, color: 'var(--color-dusk-blue)' },
  { accentIndex: 3, snapshotIndex: 1, color: 'var(--color-sandy-brown)' },
];

const HomePage = () => {
  const formAdapter = useMemo(
    () => createMailtoAdapter({ to: siteContent.siteMeta.contactEmail }),
    []
  );
  const heroSnapshotClusterRef = useRef(null);
  const [connectorPaths, setConnectorPaths] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [animatePaths, setAnimatePaths] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setAnimatePaths(true);
  };

  // Hide snapshot card outlines immediately on mount
  useEffect(() => {
    const snapshotCards = document.querySelectorAll('[data-snapshot-index]');
    snapshotCards.forEach(card => {
      card.style.borderColor = 'transparent';
      card.style.borderWidth = '3px';
      card.style.transition = 'border-color 0.3s ease';
    });
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      if (!heroSnapshotClusterRef.current || window.innerWidth < 768) {
        setConnectorPaths([]);
        return;
      }

      const clusterRect = heroSnapshotClusterRef.current.getBoundingClientRect();
      const ctaButton = heroSnapshotClusterRef.current.querySelector('[data-element="Hero CTA Button"]');
      const ctaRect = ctaButton?.getBoundingClientRect();

      const paths = connectorMap
        .map((connection) => {
          const dot = heroSnapshotClusterRef.current.querySelector(
            `[data-headline-dot="${connection.accentIndex}"]`
          );
          const snapshot = heroSnapshotClusterRef.current.querySelector(
            `[data-snapshot-index="${connection.snapshotIndex}"]`
          );

          if (!dot || !snapshot) {
            return null;
          }

          const dotRect = dot.getBoundingClientRect();
          const snapshotRect = snapshot.getBoundingClientRect();

          const startX = dotRect.left + dotRect.width * 0.5 - clusterRect.left;
          const startY = dotRect.top + dotRect.height * 0.5 - clusterRect.top;
          const targetX = snapshotRect.left + snapshotRect.width / 2 - clusterRect.left;
          const targetY = snapshotRect.top - clusterRect.top;

          const minRouteY = startY + 20;
          const maxRouteY = targetY - 22;
          const ctaSafeY = ctaRect ? ctaRect.bottom - clusterRect.top + 18 : minRouteY;
          const routeY = Math.max(minRouteY, Math.min(maxRouteY, ctaSafeY));

          return {
            id: `${connection.accentIndex}-${connection.snapshotIndex}`,
            color: connection.color,
            path: `M ${startX} ${startY} V ${routeY} H ${targetX} V ${targetY}`,
            snapshotIndex: connection.snapshotIndex
          };
        })
        .filter(Boolean);

      setConnectorPaths(paths);
    };

    const loadGSAP = async () => {
      if (!window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
        script.async = true;
        
        await new Promise((resolve) => {
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
    };

    const animateConnectorPaths = () => {
      if (!window.gsap || !animatePaths) return;

      const paths = document.querySelectorAll('.headline-connector-layer path');

      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        window.gsap.set(path, { 
          strokeDasharray: length, 
          strokeDashoffset: length,
          opacity: 1
        });
        
        // Animate the line drawing
        window.gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: index * 0.2,
          onComplete: () => {
            // When line completes, pulse the corresponding snapshot card
            const snapshotIndex = path.getAttribute('data-snapshot-index');
            const targetCard = document.querySelector(`[data-snapshot-index="${snapshotIndex}"]`);
            
            if (targetCard) {
              // Get the color from the connector path
              const pathColor = window.gsap.getProperty(path, 'stroke');
              
              // Set the border color to match the line
              targetCard.style.borderColor = pathColor;
              
              // Subtle pulse animation
              window.gsap.fromTo(targetCard, 
                {
                  scale: 1,
                  transformOrigin: 'center'
                },
                {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1,
                  transformOrigin: 'center',
                  onComplete: () => {
                    // Return to normal scale
                    window.gsap.set(targetCard, { scale: 1 });
                  }
                }
              );
            }
          }
        });
      });
    };

    const resizeObserver = new ResizeObserver(() => updatePaths());
    if (heroSnapshotClusterRef.current) {
      resizeObserver.observe(heroSnapshotClusterRef.current);
    }

    updatePaths();
    window.addEventListener('resize', updatePaths);

    // Load GSAP and setup animations
    loadGSAP().then(() => {
      if (animatePaths) {
        animateConnectorPaths();
      }
    });

    // Watch for animation trigger
    if (animatePaths) {
      animateConnectorPaths();
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePaths);
    };
  }, [animatePaths]);

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <main>
        <div className="hero-snapshot-cluster" ref={heroSnapshotClusterRef}>
          <HeroSection adapter={formAdapter} />
          <OutcomeStrip items={siteContent.snapshotItems} />
          <svg className="headline-connector-layer" aria-hidden="true">
            {connectorPaths.map((connector) => (
              <path
                key={connector.id}
                d={connector.path}
                stroke={connector.color}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-snapshot-index={connector.snapshotIndex}
                style={{ opacity: animatePaths ? 1 : 0 }}
              />
            ))}
          </svg>
        </div>
        <ProblemSection problem={siteContent.problem} />
        <HowIWorkSection steps={siteContent.processSteps} />
        <CapabilitiesSection capabilities={siteContent.capabilities} />
        <LogosSection />
        <FinalCtaSection finalCta={siteContent.finalCta} adapter={formAdapter} />
      </main>
    </>
  );
};

export default HomePage;
