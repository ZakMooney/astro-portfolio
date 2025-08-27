import React from "react";
import Pill from "../ui/Pill";
import Button from '../ui/Button';

const PortfolioItem = (props) => {
  const { PortfolioDetails, handleOpenModal } = props;

  const { title, description, mainTech, tag, tasks, thumbnail } =
    PortfolioDetails;

  const techLoop = mainTech.map((tech, index) => {
    return <Pill key={index} text={tech} />;
  });

  const imageSrc =
    typeof thumbnail === "string" ? thumbnail : thumbnail?.src || thumbnail;

  return (
    <>
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 scanlines-overlay mb-4 md:mb-0 md:mr-4 p-1 border border-[#38bdf8]">
          <img
            src={imageSrc || ""}
            alt={title || ""}
            className="multi-flicker object-cover object-top md:object-center md:object-center h-full w-full max-h-[200px] md:max-h-none md:h-full"
          />
        </div>
        <div className="flex flex-2 flex-col justify-between gap-2 max-h-[300px]">
          <div className="flex flex-col">
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
              <h1 className="w-full sm:w-2/3 text-lg md:text-xl font-medium drop-shadow-sm pb-0">
                {title || ""}&nbsp;
              </h1>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="w-full text-sm md:text-sm xl:text-md font-light italic drop-shadow-sm opacity-90">
              {description ? `"${description}"` : null}
            </h2>
          </div>

          <div className="w-full flex flex-wrap gap-2">{techLoop}</div>

          <div className="flex items-end">
            <Button
              variant=""
              className="w-full md:w-auto"
              onClick={() => handleOpenModal(tag)}
              client:only="react"
            >
              VIEW
            </Button>

          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioItem;
