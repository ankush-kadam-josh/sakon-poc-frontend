import { Grid, InputLabel } from "@mui/material";

import {
  DaysOfMonth,
  Interval,
  configurationOptions,
  dayOfWeek,
  timeZones,
} from "../helpers";

import { IFormikProps } from "../../../../shared/types";
import { INTERVAL, ISchedulerProps } from "../types";

import Input from "../../../../shared/FormComponents/Input";
import Select from "../../../../shared/FormComponents/Select";
import Time from "../../../../shared/FormComponents/Time";

interface ISchedulerFormProps {
  formik: IFormikProps<ISchedulerProps>;
}

const SchedulerForm = (props: ISchedulerFormProps) => {
  const { interval } = props.formik.values;
  const isMonthly: boolean = interval === INTERVAL.MONTHLY;
  const isWeekly: boolean = interval === INTERVAL.WEEKLY;

  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 2 }}
      className="grid-align-style"
    >
      <Grid item lg={3} md={4} sm={5} xs={12}>
        <InputLabel sx={{ color: "black" }}>Scheduler Name</InputLabel>
      </Grid>
      <Grid item lg={9} md={8} sm={8} xs={12}>
        <Input
          type="text"
          name="schedularName"
          className="form-control-input"
          placeholder="Schedular Name"
        />
      </Grid>

      <Grid item lg={3} md={4} sm={5} xs={12}>
        <InputLabel sx={{ color: "black" }}>Configuration</InputLabel>
      </Grid>
      <Grid item lg={9} md={8} sm={8} xs={12}>
        <Select
          name="configurations"
          placeholder="Select Configuration"
          options={configurationOptions}
          className="configuration-style"
          menuPlacement="bottom"
          maxMenuHeight={100}
          isMulti={true}
        />
      </Grid>

      <Grid item lg={3} md={4} sm={5} xs={12}>
        <InputLabel sx={{ color: "black" }}>Frequency</InputLabel>
      </Grid>
      <Grid item lg={9} sm={8} xs={12}>
        <div className="card-style">
          <Select
            name="interval"
            placeholder="Interval"
            options={Interval}
            className="form-control"
          />
          {isMonthly ? (
            <>
              <InputLabel sx={{ color: "black", padding: "0% 2%" }}>
                Day of month
              </InputLabel>

              <Select
                name="monthDay"
                placeholder="Select Date"
                options={DaysOfMonth}
                className="form-control-monthly"
                menuPlacement="bottom"
                maxMenuHeight={100}
              />
            </>
          ) : (
            isWeekly && (
              <>
                <InputLabel sx={{ color: "black", padding: "0% 2%" }}>
                  on
                </InputLabel>
                <Select
                  name="weekDay"
                  placeholder="Select Day"
                  options={dayOfWeek}
                  menuPlacement="bottom"
                  maxMenuHeight={100}
                  className="form-control-weekly"
                  isMulti={true}
                />
              </>
            )
          )}
          <InputLabel sx={{ color: "black", padding: "0% 2%" }}>at</InputLabel>

          <Time name="timeDuration" className="form-control-time" />
        </div>
      </Grid>

      <Grid item lg={3} md={4} sm={5} xs={12}>
        <InputLabel sx={{ color: "black" }}>Timezone</InputLabel>
      </Grid>
      <Grid item lg={9} md={8} sm={8} xs={12}>
        <Select
          name="timeZone"
          placeholder="Select Timezone"
          options={timeZones}
          className="form-control-timezone"
          menuPlacement="bottom"
          maxMenuHeight={70}
          menuShouldScrollIntoView={true}
        />
      </Grid>
    </Grid>
  );
};

export default SchedulerForm;
