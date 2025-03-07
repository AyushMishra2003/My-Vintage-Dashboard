import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

import { MdLabelOutline, MdHealthAndSafety } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { IoMdImages } from "react-icons/io";
import { FaDiagnoses } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuCopyright } from "react-icons/lu";
import { FaBloggerB } from "react-icons/fa";

import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

import ViewScan from "./pages/scan/ViewScan";
import ScanTest from "./pages/scan/ScanTest";

import Banner from "./pages/banner/Banner";

import LabTestTag from "./pages/pathology/LabTestTag";
import LabTest from "./pages/pathology/LabTest";

import Package from "./pages/packages/Package";
import PackageConcern from "./pages/packages/PackageConcern";

import Order from "./pages/order/Order";

import Carrer from "./pages/carrer/Carrer";
import Blog from "./pages/Blogs/Blog";
import BlogAdd from "./pages/Blogs/BlogAdd";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },

      {
        icon: <FaDiagnoses {...icon} />,
        name: "Scan List",
        path: "/scan",
        element: <ViewScan/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Scan Test",
        index:1,
        path: "/test/scan/:slug",
        element: <ScanTest/>,
      },
      {
        icon: <ImLab {...icon} />,
        name: "Pathology List",
        path: "/pathology",
        element: <LabTest/>,
      },
      {
        icon: <MdHealthAndSafety {...icon} />,
        name:  "Health Package",
        path: "/package",
        element: <Package/>,
      },
      {
        icon: <ImLab {...icon} />,
        name: "Pathology Tag",
        path: "/lab/tag",
        element: <LabTestTag/>,
      },
      {
        icon: <IoPricetagsSharp {...icon} />,
        name: "Health Concern Tag",
        path: "/health-concern/package",
        element: <PackageConcern/>
      },
      {
        icon: <IoMdImages {...icon} />,
        name: "Banner",
        path: "/banner",
        element: <Banner/>,
      },
      {
        icon: <LuCopyright {...icon} />,
        name: "Carrer",
        path: "/carrer",
        element: <Carrer/>,
      },
      {
        icon: <GoListUnordered {...icon} />,
        name: "All-Order",
        path: "/order",
        element: <Order/>,
      },
      {
        icon: <FaBloggerB {...icon} />,
        name: "Blog",
        path: "/blog",
        element: <Blog/>,
      },
      {
        icon: <FaBloggerB {...icon} />,
        name: "Add Blog",
        path: "/add/blog",
        index:1,
        element: <BlogAdd/>,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
