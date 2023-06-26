import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector } from "react-redux";

import { IServiceProvidersPayload } from "./ServiceProviderList/types";
import { SUPER_ADMIN } from "../User/UserListing/types";

export const initialServiceProviderValues: IServiceProvidersPayload = {
  name: "",
  url: "",
};

export const UPDATE_SERVICE_PROVIDER_MESSAGE =
  "Service Providers Updated Successfully...";

export const CREATE_SERVICE_PROVIDER_MESSAGE =
  "Service Providers Added Successfully...";

export const ERROR_MESSAGE = "Something Went Wrong...";

export const GET_ALL_SERVICE_PROVIDERS = "getServiceProviders";

export const ServiceProvidersColumns = (
  handleEditServiceProviders: Function
): GridColDef[] => {
  //@ts-ignore
  const { loggedInUser } = useSelector((state) => state.AuthReducer);

  const columns: any = [
    {
      field: "id",
      headerName: "Id",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Service Provider Name",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "url",
      headerName: "Website URL",
      width: 650,
      headerAlign: "center",
      align: "center",
    },
  ];

  if (loggedInUser?.type === SUPER_ADMIN) {
    columns.push({
      field: "edit",
      headerName: "Edit",
      description: "Edit actions column.",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Tooltip title="Edit" placement="top">
              <IconButton
                onClick={() => handleEditServiceProviders(params.row)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    });
  }

  return columns;
};
