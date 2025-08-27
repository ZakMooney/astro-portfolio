import { PanelLabel } from "@/components/ui/PanelLabel";
import { Panel } from "@/components/ui/Panel";
import Button from '@/components/ui/Button';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const contactMethods = [
  {
    icon: <IconBrandGithub size={48} />,
    platform: "GITHUB",
    handle: "@zakmooney",
    url: "https://github.com/zakmooney",
    status: "Active",
    lastActive: `Regular`,
    purpose: "Code & Projects",
  },
  {
    icon: <IconBrandLinkedin size={48} />,
    platform: "LINKEDIN",
    handle: "zmooney",
    url: "https://linkedin.com/in/zmooney",
    status: "Available",
    lastActive: "Daily",
    purpose: "Professional Network",
  },
  {
    icon: <IconMail size={48} />,
    platform: "EMAIL",
    handle: "zak_mooney@hotmail.co.uk",
    url: "mailto:zak_mooney@hotmail.co.uk",
    status: "Active",
    lastActive: "Daily",
    purpose: "Direct Contact",
  },
];

export function ContactItems() {
  const contactLoop = contactMethods.map((item, index) => {
    return (
      <div className="flex w-full gap-2 h-full" key={index}>
        <PanelLabel
          label={item.platform || "Contact"}
          client:only="react"
          index={index + 1}
        />
        <Panel client:only="react" panelClassName="h-full" index={index + 2}>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2 items-center text-white drop-shadow-sm drop-shadow-blue-100/50">
              {item.icon}
              <div>
              <h1 className="text-xl font-heading font-bold">
                {item.platform || "Contact"}
              </h1>
              <p className="opacity-60">
                {item.handle}
              </p>
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between gap-4">
                <p className="opacity-80">Status:</p>
                {item.platform === "GITHUB" ? (
                  <>
                    <p className="text-moon-green font-medium capitalise">
                      {item.status}
                    </p>
                  </>
                ) : (
                  <>
                    {item.platform === "LINKEDIN" ? (
                      <>
                        <p className="text-moon-blue font-medium capitalise">
                          {item.status}
                        </p>
                      </>
                    ) : (
                      <>
                        {item.platform === "EMAIL" ? (
                          <>
                            <p className="text-moon-yellow font-medium capitalise">
                              {item.status}
                            </p>
                          </>
                        ) : (
                          <>
                            {" "}
                            <p className="text-moon-blue font-medium capitalise">
                              {item.status}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-row justify-between gap-4">
                <p className="opacity-80">Activity:</p>
                <p className="font-medium">{item.lastActive}</p>
              </div>
              <div className="flex flex-row justify-between gap-4">
                <p className="opacity-80">Best For:</p>
                <p className="font-medium">{item.purpose}</p>
              </div>
            </div>
            <div>
              <Button
                linkTo={item.url}
                className="flex-1 w-full md:w-auto"
                external
              >
                CONNECT
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    );
  });

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
          {contactLoop}
        </div>
      </div>
    </>
  );
}
