import CustomPieChart from "../../../shared/Charts/CustomPieChart";
import { useGetDepartments, useGetOrganizations } from "../config-hooks";
import { Formik, Form } from "formik";
import { Box, Button, Grid, InputLabel } from "@mui/material";
import Select from "../../../shared/FormComponents/Select";
import { useFetchSuperAdminData } from "../config-hooks";
import { useEffect, useState } from "react";
import CustomBarGraph from "../../../shared/Charts/CustomBarGraph";

const User = () => {
  const [uploadPieChartData, setUploadPieChartData] = useState([]);
  const [downloadPieChartData, setDownloadPieChartData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const selectFrequencyOptions: any[] = [
    { label: "daily", value: "daily" },
    { label: "weekly", value: "weekly" },
    { label: "monthly", value: "monthly" },
  ];

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8001/uploadPieChart").then((response) =>
        response.json()
      ),
      fetch("http://localhost:8001/downloadPieChart").then((response) =>
        response.json()
      ),
      fetch(" http://localhost:8001/jobData").then((response) =>
        response.json()
      ),
    ])
      .then(([uploadData, downloadData, jobData]) => {
        setUploadPieChartData(uploadData);
        setDownloadPieChartData(downloadData);
        setJobData(jobData);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  // const getSuperAdmintData = (values: any) => {
  //   const { data, isLoading, isError } = useFetchSuperAdminData(values);
  // };

  const onSubmit = (values: any) => {
    console.log("admin values", values);
    // getSuperAdmintData(values);
  };

  return (
    <>
      <Formik initialValues={{ select: "" }} onSubmit={onSubmit}>
        <Form>
          <Grid sx={{ display: "flex", marginLeft: "5rem" }}>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                marginTop: "2rem",
                alignItems: "baseline",
              }}
            >
              {/* <Grid xs={3}>
                <InputLabel sx={{ color: "black" }}>Frequncy:</InputLabel>
              </Grid> */}
              <Grid xs={6}>
                <Select
                  name="frequency"
                  placeholder="Frequency"
                  // options={selectFrequencyOptions}
                  options={selectFrequencyOptions}
                  className="configuration-style"
                  menuPlacement="bottom"
                  maxMenuHeight={100}
                  isMulti={false}
                />
              </Grid>
            </Grid>
            <Grid xs={-1}>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "capitalize", marginTop: "2rem" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            marginTop: "7%",
            position: "relative",
            left: "15%",
            fontSize: "16px",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Uploads
        </Box>
        {uploadPieChartData.length > 0 && (
          <CustomPieChart
            width={600}
            height={450}
            cx={400}
            cy={250}
            outerRadius={150}
            data={uploadPieChartData}
            // label="Uploads"
          />
        )}
        <Box
          sx={{
            marginTop: "7%",
            position: "relative",
            left: "15%",
            fontSize: "16px",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Downloads
        </Box>
        {downloadPieChartData.length > 0 && (
          <CustomPieChart
            width={600}
            height={450}
            cx={400}
            cy={250}
            outerRadius={150}
            data={downloadPieChartData}
            // label="Downloads"
          />
        )}
      </div>
      <div style={{ marginLeft: "15%" }}>
        <Box
          sx={{
            marginRight: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Jobs
        </Box>

        {jobData.length > 0 && (
          <CustomBarGraph width={1100} height={300} data={jobData} />
        )}
      </div>
    </>
  );
};

export default User;
