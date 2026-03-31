import ifsLogo from '../assets/IFS_logo.svg';
import jblLogo from '../assets/JBL_logo.svg';
import kasasaLogo from '../assets/Kasasa_logo.svg';
import retailmenotLogo from '../assets/RetailMeNot_logo.svg';
import tricorbraunLogo from '../assets/Tricorbraun_logo.svg';
import offersComLogo from '../assets/offers-com_logo.svg';

const logos = [
  { src: ifsLogo, alt: 'IFS' },
  { src: jblLogo, alt: 'JBL' },
  { src: kasasaLogo, alt: 'Kasasa' },
  { src: retailmenotLogo, alt: 'RetailMeNot' },
  { src: tricorbraunLogo, alt: 'TricorBraun' },
  { src: offersComLogo, alt: 'Offers.com' },
];

const LogosSection = () => {
  return (
    <section className="section client-logos-section" data-section="Logos Section" aria-label="Logos Section">
      <div className="container">
        <h2 className="section-title client-logos-title">Brands I&apos;ve Helped Build</h2>
        <div className="logos-container" role="list" aria-label="Client logos">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="client-logo"
              role="listitem"
              data-element="Logo Item"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
