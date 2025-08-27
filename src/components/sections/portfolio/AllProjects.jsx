import React, { useState } from "react";

import { Panel } from "@/components/ui/Panel";
import { PanelLabel } from "@/components/ui/PanelLabel";
import Lightbox from "@/components/ui/Lightbox";
import PortfolioItemSimple from "@/components/portfolio/PortfolioItemSimple";
import PortfolioModal from "@/components/portfolio/PortfolioModal";

import { PortfolioDetails } from "@/data/PortfolioDetails";

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [work, setWork] = useState("");

  const jobDetails = PortfolioDetails?.find((item) => item.tag === work);

  const useSources = jobDetails?.images?.map(img => {
    if (typeof img?.src === 'object' && img?.src?.default) {
      return img.src.default;
    }
    if (typeof img?.src === 'string') {
      return img.src;
    }
    if (typeof img === 'string') {
      return img;
    }
    return img?.src || img;
  }) || [];

  const useCaptions = jobDetails?.captions || [];
  
  const handleOpenLightbox = (index = 0) => {
    // Only open if we have sources
    if (useSources && useSources.length > 0) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setWork("");
  };

  const handleOpenModal = (tag) => {
    setWork(tag);
    setOpen(true);
  };

  const portfolioLoop = PortfolioDetails.map((job, index) => {
    return (
      <Panel
        key={index}
        client:only="react"
        panelClassName="h-full"
        contentClassName="h-full"
        childrenClassName="h-full"
        index={1 + index}
      >
        <PortfolioItemSimple
          PortfolioDetails={job}
          key={index}
          handleOpenModal={handleOpenModal}
          client:only="react"
        />
      </Panel>
    );
  });

  return (
    <>
      <div className="flex w-full gap-2">
        <PanelLabel label="Projects" client:only="react" index={0} variant="label" />
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioLoop}
          </div>
        </div>
      </div>

      <PortfolioModal
        work={work}
        handleCloseModal={handleCloseModal}
        isOpen={open}
        jobDetails={jobDetails}
        setLightboxOpen={handleOpenLightbox}
        client:only="react"
      />

      <Lightbox
        isOpen={lightboxOpen && useSources.length > 0}
        onClose={() => setLightboxOpen(false)}
        sources={useSources}
        captions={useCaptions}
        startIndex={lightboxIndex}
        showThumbnails={true}
        client:only="react"
      />

    </>
  );
}

export default Portfolio;