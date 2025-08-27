import Pill from "../ui/Pill";

const PortfolioItem = (props) => {
  const { PortfolioDetails, handleOpenModal } = props;

  const { title, description, tech, tag, tasks, thumbnail } = PortfolioDetails;

  const taskLoop = tasks.map((task, index) => {
    return (
      <li
        key={index}
        className="text-sm md:text-md xl:text-lg font-light opacity-90 drop-shadow-sm"
      >
        {task}
      </li>
    );
  });

  const techLoop = tech.map((tech, index) => {
    return <Pill key={index} text={tech} />;
  });

  const imageSrc =
    typeof thumbnail === "string" ? thumbnail : thumbnail?.src || thumbnail;

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div class="scanlines-overlay mb-4 md:mb-0 md:mr-4 p-1 border border-[#38bdf8]">
          <img
            src={imageSrc || ""}
            alt={title || ""}
            className="multi-flicker object-cover object-top md:object-center h-full w-full max-h-[200px] md:max-h-none md:h-full md:max-w-[200px]"
          />
        </div>
        <div>
          <div className="flex flex-col justify-between max-h-[300px]">
            <div className="flex flex-col">
              <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                <h1 className="w-full sm:w-2/3 text-lg md:text-xl font-medium drop-shadow-sm pb-0">
                  {title || ""}&nbsp;
                </h1>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4">
              <h2 className="w-full text-sm md:text-sm xl:text-md font-light italic drop-shadow-sm pb-2 opacity-90">
                {description ? `"${description}"` : null}
              </h2>

              <ul className="list-disc pl-4 font-light opacity-80 pb-4 w-full">
                {taskLoop}
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-2">{techLoop}</div>
        </div>
      </div>
    </>
  );
};

export default PortfolioItem;
