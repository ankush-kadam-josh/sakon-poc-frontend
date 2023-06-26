export interface ICreateSchedulerPayload {
  configurations: string[];
  schedularName: string;
  //Interval -> DAILY,WEEKLY,MONTHLY
  interval: string;
  timeZone: string;
  weekDay?: string;
  monthDay?: number;
  timeDuration?: string;
}

export interface IUpdateSchedulerPayload extends ICreateSchedulerPayload {
  id: number;
}

export interface ICreateSchedulerProps {
  toggleModal: () => void;
  configurationOptions?: { value: string; label: string }[];
  isOpen: boolean;
  scheduler: any;
}

export enum INTERVAL {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}
