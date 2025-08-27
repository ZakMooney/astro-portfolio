import { TechColours } from '../../data/TechColours';

const Pill = (props) => {
  const { text } = props;

  let useTechColour = '';
  const techColour = TechColours?.find((item) => item.tech === text);
  if (techColour) {
    useTechColour = techColour.classes;
  }

  return (
    <div className={`
      px-2 py-1 md:px-3 md:py-1 text-xs md:text-md
      backdrop-blur-md border text-xs max-h-[26px] cursor-default transition-all duration-200 hover:drop-shadow-glow
      ${useTechColour}
    `.trim()}>
      {text}
    </div>
  );
}

export default Pill;
