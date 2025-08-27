import { navigate } from 'astro:transitions/client';

import './Button.css';

export default function Button(props) {
  const { 
    children,
    className = "",
    onClick = () => null,
    size = "default",
    color = "",
    variant = "",
    linkTo = "",
    external = false,
  } = props;

  let buttonClick = onClick;

  if (linkTo) {
    if (external) {
      buttonClick = () => window.open(linkTo, '_blank');
    } else {
      buttonClick = () => navigate(linkTo)
    }
  }

  return (
    <button
      className={`
        sci-button drop-shadow-glow
        text-sm md:text-md
        flex gap-2 justify-center items-center
        ${size} ${color} ${variant}
        ${className}
      `.trim()}
      onClick={buttonClick}
    >
      {children}
    </button>
  );
}
