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
  const [animateColors, setAnimateColors] = useState(false);
  const [animateVerticalPaths, setAnimateVerticalPaths] = useState(false);
  const [animateProcessBorders, setAnimateProcessBorders] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const animateSnapshotCardsSequentially = () => {
    // Order: top to bottom (1, 2, 3)
    const snapshotOrder = [1, 2, 3];
    
    // Get colors from connectorMap to ensure consistency
    const getColorForSnapshot = (snapshotIndex) => {
      const connection = connectorMap.find(conn => conn.snapshotIndex === snapshotIndex);
      return connection ? connection.color : 'var(--color-terracotta)';
    };

    // Load GSAP if needed for pulse animation
    const loadGSAPIfNeeded = async () => {
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

    loadGSAPIfNeeded().then(() => {
      console.log('🎯 Starting snapshot animation for order:', snapshotOrder);
      
      snapshotOrder.forEach((snapshotIndex, orderIndex) => {
        setTimeout(() => {
          const targetCard = document.querySelector(`[data-snapshot-index="${snapshotIndex}"]`);
          console.log(`🔍 Looking for snapshot ${snapshotIndex}, found:`, targetCard);
          
          if (targetCard) {
            const color = getColorForSnapshot(snapshotIndex);
            console.log(`🎨 Setting snapshot ${snapshotIndex} border to:`, color);
            
            // Set the border color to match the connector
            targetCard.style.borderColor = color;
            
            // Subtle pulse animation (if GSAP is available)
            if (window.gsap) {
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
                    window.gsap.set(targetCard, { scale: 1 });
                  }
                }
              );
            }
          } else {
            console.error(`❌ Could not find snapshot card with index ${snapshotIndex}`);
          }
        }, orderIndex * 200); // 200ms stagger between cards
      });
      
      // Trigger vertical path animation after snapshot animations complete
      setTimeout(() => {
        setAnimateVerticalPaths(true);
        // Trigger process border animation after vertical lines appear
        setTimeout(() => {
          setAnimateProcessBorders(true);
          animateProcessCardsSequentially();
        }, 800); // Wait for vertical lines to animate in
      }, snapshotOrder.length * 200 + 300); // Wait for all snapshots + extra buffer
    });
  };

  const animateProcessCardsSequentially = () => {
    // Order: top to bottom (1, 2, 3) - matching visual layout
    const processOrder = [1, 2, 3];
    
    // Get colors from connectorMap to ensure consistency
    const getColorForProcess = (processIndex) => {
      // Flip mapping: Process 1 gets snapshot 1's color, Process 3 gets snapshot 3's color
      const snapshotIndex = processIndex === 1 ? 1 : processIndex === 2 ? 2 : 3;
      const connection = connectorMap.find(conn => conn.snapshotIndex === snapshotIndex);
      return connection ? connection.color : 'var(--color-terracotta)';
    };

    // Load GSAP if needed for pulse animation
    const loadGSAPIfNeeded = async () => {
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

    loadGSAPIfNeeded().then(() => {
      console.log('🎯 Starting process animation for order:', processOrder);
      
      processOrder.forEach((processIndex, orderIndex) => {
        setTimeout(() => {
          const targetCard = document.querySelector(`[data-process-index="${processIndex}"]`);
          console.log(`🔍 Looking for process ${processIndex}, found:`, targetCard);
          
          if (targetCard) {
            const color = getColorForProcess(processIndex);
            console.log(`🎨 Setting process ${processIndex} border to:`, color);
            
            // Set the border color to match the connector
            targetCard.style.borderColor = color;
            
            // Subtle pulse animation (if GSAP is available)
            if (window.gsap) {
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
                    window.gsap.set(targetCard, { scale: 1 });
                  }
                }
              );
            }
          } else {
            console.error(`❌ Could not find process card with index ${processIndex}`);
          }
        }, orderIndex * 200); // 200ms stagger between cards
      });
    });
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // Start color animation after loading completes
    setTimeout(() => setAnimateColors(true), 500);
  };

  // Hide snapshot card outlines and set headline colors to black initially
  useEffect(() => {
    const snapshotCards = document.querySelectorAll('[data-snapshot-index]');
    console.log('🔍 Found snapshot cards on mount:', snapshotCards.length);
    
    // Hide snapshot card borders initially
    snapshotCards.forEach(card => {
      card.style.borderColor = 'transparent';
    });

    // Also hide process card borders initially
    const processCards = document.querySelectorAll('[data-process-index]');
    console.log('🔍 Found process cards on mount:', processCards.length);
    
    processCards.forEach(card => {
      card.style.borderColor = 'transparent';
    });

    // Set headline accent words and periods to black initially
    const accentWords = document.querySelectorAll('[data-headline-accent]');
    const periodDots = document.querySelectorAll('[data-headline-dot]');
    
    accentWords.forEach(word => {
      const letters = word.querySelectorAll('.headline-letter');
      letters.forEach(letter => {
        letter.style.color = '#000000';
        letter.style.transition = 'color 0.2s ease';
      });
    });
    
    periodDots.forEach(dot => {
      dot.style.backgroundColor = '#000000';
      dot.style.transition = 'background-color 0.5s ease';
    });
  }, []);

  useEffect(() => {
    if (!animateColors) return;

    const accentWords = document.querySelectorAll('[data-headline-accent]');
    const periodDots = document.querySelectorAll('[data-headline-dot]');
    
    // Color mapping for each line
    const colors = [
      'var(--color-terracotta)',  // Humans
      'var(--color-dusk-blue)',   // Human  
      'var(--color-sandy-brown)'  // AI
    ];

    // Animate each line left-to-right with letter-by-letter typewriter effect
    accentWords.forEach((word, wordIndex) => {
      setTimeout(() => {
        const letters = word.querySelectorAll('.headline-letter');
        
        letters.forEach((letter, letterIndex) => {
          setTimeout(() => {
            letter.style.color = colors[wordIndex];
          }, letterIndex * 40); // 40ms per letter for faster typewriter effect
        });
        
        // Then animate the period dot after the last letter
        const totalLetterTime = letters.length * 40;
        setTimeout(() => {
          const dot = periodDots[wordIndex];
          if (dot) {
            dot.style.backgroundColor = colors[wordIndex];
          }
        }, totalLetterTime + 150); // 150ms extra delay before period
        
      }, wordIndex * 400); // Stagger each word (faster animation)
    });

    // After all colors animate, trigger animations
    const totalAnimationTime = accentWords.length * 400 + 400; // Extra buffer (updated for faster speed)
    
    setTimeout(() => {
      if (window.innerWidth >= 768) {
        // Desktop: trigger connector lines first, then snapshots
        setAnimatePaths(true);
      } else {
        // Mobile: directly animate snapshot borders (no connectors)
        animateSnapshotCardsSequentially();
      }
    }, totalAnimationTime + 300); // Extra pause before animations

  }, [animateColors]);

  // Desktop detection
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
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
            snapshotIndex: connection.snapshotIndex,
            endX: targetX,
            endY: targetY
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
            // Store completion for sequential snapshot animation
            const pathIndex = parseInt(path.getAttribute('data-snapshot-index'));
            
            // After all lines complete, animate snapshots sequentially (top to bottom)
            if (index === paths.length - 1) {
              setTimeout(() => {
                animateSnapshotCardsSequentially();
              }, 200);
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
  }, [animatePaths, animateColors]);

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

        {/* Vertical connector lines for desktop - animation-based */}
        {isDesktop && (
          <svg className="vertical-connector-layer" aria-hidden="true" style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '300%', // Extend well beyond to reach How I Work section
            pointerEvents: 'none', 
            zIndex: -1 // Behind Problem section background
          }}>
            {/* Vertical lines that start from header connector endpoints and go to How I Work boxes */}
            {connectorPaths.map((connector) => {
              // Calculate the end Y position based on which process card this connects to
              const processIndex = connector.snapshotIndex === 1 ? 3 : connector.snapshotIndex === 2 ? 2 : 1;
              const processCard = document.querySelector(`[data-process-index="${processIndex}"]`);
              const clusterRect = heroSnapshotClusterRef.current?.getBoundingClientRect();
              const processRect = processCard?.getBoundingClientRect();
              
              let endY = '250%'; // Default fallback - extend well below
              if (processRect && clusterRect) {
                // Use same coordinate system as header connectors
                endY = processRect.top - clusterRect.top;
              }
              
              return (
                <line
                  key={`vertical-${connector.id}`}
                  x1={connector.endX}
                  y1={connector.endY}
                  x2={connector.endX}
                  y2={endY}
                  stroke={connector.color}
                  strokeWidth="3"
                  opacity="0"
                  style={{ 
                    opacity: animateVerticalPaths ? 0.7 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
              );
            })}
          </svg>
        )}

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
