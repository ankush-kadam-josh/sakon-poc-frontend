import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { validationSchema } from "../../SchedulerModal/helpers";
import {
  useFetchAllSchedulers,
  useFetchUnscheduledConfigurations,
  useScheduleConfiguration,
  useUpdateScheduler,
} from "../../scheduler-hooks";

import { initialSchedulerValue } from "../../SchedulerModal/constants";

import { IFormikProps } from "../../../../shared/types";
import {
  ICreateSchedulerPayload,
  ICreateSchedulerProps,
} from "../../SchedulerModal/types";

import FormikModalComponent from "../../../../shared/FormikModalComponent/component";
import SchedulerForm from "../../SchedulerModal/component/SchedulerForm";
import { useQueryClient } from "react-query";
import { GET_ALL_SCHEDULERS } from "../../constant";
import { useSelector } from "react-redux";

const SchedulerModal = ({
  isOpen: isSchedulerModalOpen,
  toggleModal,
  scheduler,
}: ICreateSchedulerProps) => {
  //@ts-ignore
  const { loggedInUser } = useSelector((state) => state.AuthReducer);
  const [configurationOptions, setConfigurationOptions] =
    useState<{ value: string; label: string }[]>();

  const queryClient = useQueryClient();

  const isEdit = scheduler ? true : false;
  let schedulerInitialData;

  const id = loggedInUser?.id;

  const { data } = useFetchAllSchedulers({
    is_scheduled: false,
    queryArguments:id
  });
  

  const { data:configurations} = useFetchUnscheduledConfigurations({
    is_scheduled: false,
    queryArguments:id
  })

  console.log("scheduler Edit",scheduler);

  useEffect(() => {
    if (isEdit) {
      let arr = [];
      const length = scheduler?.configuration?.length;

      for (let i = 0; i < length; i++) {
        arr.push({
          value: scheduler?.id,
          label: scheduler?.configuration[i],
        });
      }
      setConfigurationOptions(arr);
    } else {
      let arr = [];

      for (let i = 0; i < data?.length; i++) {
        arr.push({
          value: configurations[i]?.id,
          label: configurations[i]?.configurationName,
        });
      }
      setConfigurationOptions(arr);
    }
  }, [data]);

  if (isEdit) {
    schedulerInitialData = {
      ...scheduler,
      configurations: configurationOptions,
      schedularName: scheduler?.schedule_name,
      interval: scheduler?.interval?.split(" ")[0],
      timeDuration: scheduler?.time,
      timeZone:scheduler?.timeZone
    };
  }

  const initialSchedulervalues = isEdit
    ? schedulerInitialData
    : initialSchedulerValue;

  const onSuccess = async (values: AxiosResponse) => {
    isEdit
      ? toast.success("Scheduler Updated Successfully...")
      : toast.success("Scheduler Added Successfully...");

    queryClient.invalidateQueries(GET_ALL_SCHEDULERS);
    toggleModal();
  };
  const onError = (values: AxiosError) => {
    toast.error("Something Went Wrong...");
  };

  const { mutate: createScheduler } = useScheduleConfiguration({
    onSuccess,
    onError,
  });

  const { mutate: updateScheduler } = useUpdateScheduler({
    onSuccess,
    onError,
  });

  const onSubmit = (values: any) => {
    values.emp = loggedInUser.id;
    isEdit ? updateScheduler(values) : createScheduler(values);
  };

  return (
    <FormikModalComponent
      isOpen={isSchedulerModalOpen}
      toggleModal={toggleModal}
      modalTitle={isEdit ? "Edit Scheduler" : "Create Scheduler"}
      getFormBody={(formik: IFormikProps<ICreateSchedulerPayload>) => (
        <SchedulerForm
          formik={formik}
          configurationOptions={configurationOptions}
        />
      )}
      initialValues={initialSchedulervalues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default SchedulerModal;
