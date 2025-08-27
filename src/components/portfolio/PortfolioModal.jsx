import Pill from '@/components/ui/Pill';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

import { Panel } from "@/components/ui/Panel";
import { PanelLabel } from "@/components/ui/PanelLabel";

import {
  IconBrandGithub,
  IconLibraryPhoto,
  IconLink,
} from '@tabler/icons-react';

const PortfolioModal = (props) => {
  const {
    isOpen,
    handleCloseModal,
    jobDetails,
    setLightboxOpen,
    lightboxOpen
  } = props;

  if (!jobDetails) {
    return (
      <>
        <Modal
          open={isOpen}
          wide
          closeModal={() => {
            handleCloseModal();
          }}
        >
          <div className="flex w-full gap-2 h-full justify-center">
            <PanelLabel label="Loading" client:only="react" variant="label" index={1} />
            <div className="flex flex-col gap-2">
              <Panel cornerBR={0} cornerTR={20} childrenClassName="flex flex-col gap-2" index={2}>
                <div className="p-[120px]">
                  <div className="loader"></div>
                </div>
              </Panel>
            </div>

          </div>

        </Modal>
      </>
    );  
  }

  const {
    title,
    description,
    tasks,
    date,
    tech,
    thumbnail,
    link,
    gitLink,
    images,
  } = jobDetails;


  const taskLoop = tasks && tasks.length && tasks.map((task, index) => {
    return (
      <li key={index}>
        {task}
      </li>
    )
  });

  const techLoop = tech && tech.length && tech.map((tech, index) => {
    return (
      <Pill key={index} text={tech} />
    )
  });

  return (
    <>
      <Modal
        open={isOpen}
        closeModal={() => {
          handleCloseModal();
        }}
      >
        <div className="flex w-full gap-2 h-full">
          <PanelLabel label="Project" client:only="react" variant="label" index={1} />
          <div className="flex flex-col gap-2">
            <Panel cornerBR={0} cornerTR={20} childrenClassName="flex flex-col gap-2" index={2}>
              <div className="min-h-[120px] max-h-[120px] sm:max-h-[250px] sm:min-h-[250px] bg-slate-700/50 mb-2">
                <div className="flex-1 scanlines-overlay p-1 border border-[#38bdf8]">
                  <img src={thumbnail?.src || ''} alt={title || ''}
                    className="multi-flicker object-cover object-top md:object-center md:object-center min-h-[120px] max-h-[120px] sm:max-h-[250px] sm:min-h-[250px] w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                <h3 className="w-full text-lg md:text-xl font-medium drop-shadow-sm pb-0">
                  {title || ''}
                  <span className="w-full text-xs md:text-sm xl:text-md text-start md:text-end font-light drop-shadow-sm pb-0 opacity-80">
                    {` [${date || ''}]`}
                  </span>
                </h3>
              </div>

              <div className="overflow-y-auto h-[100%] max-h-[200px] md:max-h-none">
                <h2 className="w-full text-sm md:text-md font-light italic drop-shadow-sm pb-2 opacity-90">
                  {description || ''}
                </h2>
                <ul className="list-disc pl-4 text-sm sm:text-md font-light opacity-80 pb-2 w-full">
                  {taskLoop}
                </ul>
              </div>
              <div className="w-full flex flex-wrap gap-2">
                {techLoop}
              </div>
            </Panel>
            <Panel index={3}>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button
                  onClick={() => handleCloseModal()}
                  variant="alt"
                  className="flex-1 small md:default"
                >
                  CLOSE
                </Button>
                {images && images.length ? (
                  <Button
                    onClick={() => setLightboxOpen(!lightboxOpen)}
                    className="flex-1 small md:default"
                    color="green"
                  >
                    <IconLibraryPhoto className="hidden md:inline-block" size={18} /> MEDIA
                  </Button>
                ) : null}
                {gitLink ? (
                  <Button
                    onClick={() => window.open(gitLink, '_blank').focus()}
                    className="flex-1 small md:default"
                    color="white"
                  >
                    <IconBrandGithub className="hidden md:inline-block" size={18} /> GIT
                  </Button>
                ) : null}
                {link ? (
                  <Button
                    onClick={() => window.open(link, '_blank').focus()}
                    className="flex-1 small md:default"
                  >
                    <IconLink className="hidden md:inline-block" size={18} /> VISIT
                  </Button>
                ) : null}
              </div>
            </Panel>
          </div>

        </div>

      </Modal>
    </>
  );
}

export default PortfolioModal;
