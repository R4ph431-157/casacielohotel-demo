import Ornament from '../ui/Ornament';
import { useLanguage } from '../../context/LanguageContext';

export default function Intro() {
  const { t } = useLanguage();
  const i = t.home.intro;

  return (
    <section className="intro">
      <Ornament />
      <span className="sec-eyebrow">{i.eyebrow}</span>
      <h2 className="sec-title display">
        {i.title1} <span className="it">{i.titleItalic}</span>
        <br />
        {i.title2}
      </h2>
      <p className="lead-prose">{i.lead}</p>
      <p className="lead-prose lead-prose--second">{i.lead2}</p>
    </section>
  );
}
