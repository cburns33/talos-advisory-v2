import ifsLogo from '../assets/IFS_logo.svg';
import jblLogo from '../assets/JBL_logo.svg';
import kasasaLogo from '../assets/Kasasa_logo.svg';
import retailmenotLogo from '../assets/RetailMeNot_logo.svg';
import nexusBlackLogo from '../assets/NexusBlack_logo.svg';
import offersComLogo from '../assets/offers-com_logo.svg';

const logos = [
  { src: ifsLogo, alt: 'IFS' },
  { src: jblLogo, alt: 'JBL' },
  { src: kasasaLogo, alt: 'Kasasa' },
  { src: retailmenotLogo, alt: 'RetailMeNot' },
  { src: nexusBlackLogo, alt: 'NexusBlack', link: '/case-study-nexus-black.html' },
  { src: offersComLogo, alt: 'Offers.com' },
];

const LogosSection = () => {
  return (
    <section className="section client-logos-section" data-section="Logos Section" aria-label="Logos Section">
      <div className="container">
        <h2 className="section-title client-logos-title">Brands I&apos;ve Helped Build</h2>
        <div className="logos-container" role="list" aria-label="Client logos">
          {logos.map((logo) => (
            logo.link ? (
              <a
                key={logo.alt}
                href={logo.link}
                className="client-logo-link"
                role="listitem"
                data-element="Logo Item"
                aria-label={`${logo.alt} - View case study`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="client-logo"
                />
              </a>
            ) : (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="client-logo"
                role="listitem"
                data-element="Logo Item"
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
