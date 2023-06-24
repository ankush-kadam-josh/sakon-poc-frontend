import { FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { RiServiceFill } from "react-icons/ri";
import { API_ROUTES } from "../../routes/routes-constants";

export const sideBarMenus = {
  basicRoutes: [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/messages",
      name: "Messages",
      icon: <MdMessage />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <BiAnalyse />,
    },
    {
      path: "/order",
      name: "Order",
      icon: <BsCartCheck />,
    },
    {
      path: "/saved",
      name: "Saved",
      icon: <AiFillHeart />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <BiCog />,
      exact: true,
      subRoutes: [
        {
          path: "/settings/profile",
          name: "Profile ",
          icon: <FaUser />,
        },
        {
          path: "/settings/2fa",
          name: "2FA",
          icon: <FaLock />,
        },
        {
          path: "/settings/billing",
          name: "Billing",
          icon: <FaMoneyBill />,
        },
      ],
    },
  ],
  superAdmin: [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: API_ROUTES.SIGNUP,
      name: "User Enquiry",
      icon: <FaUser />,
    },
    {
      path: API_ROUTES.SERVICE_PROVIDERS,
      name: "Service Providers",
      icon: <RiServiceFill />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <BiAnalyse />,
    },
    {
      path: "/order",
      name: "Order",
      icon: <BsCartCheck />,
    },
    {
      path: "/saved",
      name: "Saved",
      icon: <AiFillHeart />,
    },
  ],
};
