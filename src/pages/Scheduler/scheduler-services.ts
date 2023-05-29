import { API_ROUTES } from "../../routes/routes-constants";
import { GET, POST } from "../../services/api/axios";
import { AxiosResponse } from "axios";
import { ISchedulerProps } from "./CreateScheduler/types";

export const getSchedulers = (params: any) => {
  return GET(`${API_ROUTES.SCHEDULERS.GET}`, params);
};

export const scheduleConfiguration = (
  payload: ISchedulerProps
): Promise<AxiosResponse<string, any>> => {
  return POST(API_ROUTES.SCHEDULERS.CREATE, payload);
};
