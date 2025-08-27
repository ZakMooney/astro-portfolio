import { Panel } from "./Panel";

export const PanelLabel = ({ type = "vertical", label = "", index = 0 }) => {
  if (type === "vertical") {
    return <PanelLabelVertical label={label || ""} index={index} />;
  }
  return <PanelLabelVertical label={label || ""} index={index} />;
};

const PanelLabelVertical = ({ label = "", index = 0 }) => {
  return (
    <Panel
      borderColor={"rgba(56, 189, 248, 1)"}
      backgroundColor={"#71cdf4"}
      textColor={"rgba(0, 20, 40, 1)"}
      cornerTL={0}
      cornerTR={0}
      cornerBL={10}
      cornerBR={0}
      className={`w-[24px]! md:w-[40px]!`}
      contentClassName={`p-2! h-full relative`}
      childrenClassName={`flex justify-center h-full`}
      panelClassName={`h-full`}
      hasScan={false}
      showStatusDots={false}
      variant="label"
      index={index}
    >
      <div className="flex justify-center h-full relative">
        <h3
          className="text-xs md:text-sm uppercase font-heading font-extrabold pointer-events-none p-2 m-0"
          style={{
            position: "sticky",
            top: "8px",
            writingMode: "vertical-rl",
            display: "inline-block",
            zIndex: 10,
          }}
        >
          {label || ""}
        </h3>
      </div>
    </Panel>
  );
};
