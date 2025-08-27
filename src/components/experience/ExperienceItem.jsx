import {
  IconBuilding,
  IconCoins,
  IconWallet,
  IconToolsKitchen2,
  IconDeviceMobileVibration,
  IconWifi,
} from '@tabler/icons-react';

import Pill from '../ui/Pill';

const ExperienceItem = (props) => {
  const {jobDetails} = props;

  const {icon, title, company, description, tasks, start, end, tech} = jobDetails;

  const taskLoop = tasks.map((task, index) => {
    return (
      <li key={index} className="text-sm md:text-md xl:text-lg font-light opacity-90 drop-shadow-sm">
        {task}
      </li>
    )
  });

  const techLoop = tech.map((tech, index) => {
    return (
      <Pill key={index} text={tech} />
    )
  });

  const showIcon = (icon) => {
    const iconClass = 'mx-2 opacity-60';
    switch (icon) {
      case 'faCoins':
        return (
          <IconCoins
            color="rgb(56, 189, 248)"
          />
        )
      case 'faVault':
        return (
          <IconWallet
            className={iconClass + ' text-amber-400 dark:text-amber-500 stroke-amber-600 dark:stroke-amber-700 stroke-[20px]'}
          />
        )
      case 'faUtensils':
        return (
          <IconToolsKitchen2
            className={iconClass + ' text-rose-400 dark:text-rose-500 stroke-rose-600 dark:stroke-rose-700 stroke-[20px]'}
          />
        )
      case 'faStore':
        return (
          <IconDeviceMobileVibration
            className={iconClass + ' text-sky-400 dark:text-sky-500 stroke-sky-600 dark:stroke-sky-700 stroke-[20px]'}
          />
        )
      case 'faWifi':
        return (
          <IconWifi
            className={iconClass + ' text-emerald-400 dark:text-emerald-500 stroke-emerald-600 dark:stroke-emerald-700 stroke-[20px]'}
          />
        )
      default:
        return (
          <IconBuilding
            className={iconClass + ' text-slate-400 dark:text-slate-500 stroke-slate-600 dark:stroke-slate-700 stroke-[20px]'}
          />
        )
      }  
  }


  return (
    <>
      <div className="flex flex-col justify-between max-h-[300px]">
        <div className="flex flex-col">

          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center">
            <h1 className="w-full sm:w-2/3 text-lg md:text-xl font-medium drop-shadow-sm pb-0">
              {title || ''}&nbsp;
              {company ? <span className="opacity-60 font-light">@&nbsp;</span> : null}
              {company ? (`${company}`) : null}
            </h1>
            <p className="w-full md:w-1/3 text-xs md:text-sm xl:text-md text-start md:text-end font-light drop-shadow-sm pb-0 opacity-80">
              {start || ''} - {end || ''}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          <h2 className="w-full text-sm md:text-md xl:text-lg font-light italic drop-shadow-sm pb-2 opacity-90">
            {description ? (`"${description}"`) : null}
          </h2>
          <ul className="list-disc pl-4 font-light opacity-90 w-full">
            {taskLoop}
          </ul>
        </div>

      </div>
      <div className="w-full flex flex-wrap gap-2">
        {techLoop}
      </div>
    </>
  );
}

export default ExperienceItem;
