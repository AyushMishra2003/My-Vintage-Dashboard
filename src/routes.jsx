import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

import { MdLabelOutline, MdHealthAndSafety, MdPhoto } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { IoMdImages } from "react-icons/io";
import { FaDiagnoses } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuCopyright } from "react-icons/lu";
import { FaBloggerB } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";

import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import ViewScan from "./pages/scan/ViewScan";
import ScanTest from "./pages/scan/ScanTest";
import Banner from "./pages/banner/Banner";
import LabTestTag from "./pages/pathology/LabTestTag";
import LabTest from "./pages/pathology/LabTest";
import Package from "./pages/packages/Package";

import Order from "./pages/order/Order";
import Carrer from "./pages/carrer/Carrer";
import Blog from "./pages/Blogs/Blog";
import BlogAdd from "./pages/Blogs/BlogAdd";
import Team from "./pages/team/Team";
import AddTeam from "./pages/team/AddTeam";
import AddLabTest from "./pages/pathology/AddLabTest";
import AddPackage from "./pages/packages/AddPackage";
import AddScanTest from "./pages/scan/AddScanTest";
import Inquiry from "./pages/inquiry/Inquiry";
import { CiViewList } from "react-icons/ci";
import Test from "./pages/Test/Test";
import CollectionSales from "./pages/collection/CollectionSales";
import AddCollectionSales from "./pages/collection/AddCollectionSales";
import HomeCollectionOrder from "./pages/collection/HomeCollectionOrder";
import DetailHomeCollection from "./pages/collection/DetailHomeCollection";
import CollectionSalesDetail from "./pages/collection/CollectionSalesDetail";
import OrderDetail from "./pages/order/OrderDetail";
import Gallery from "./pages/gallery/Gallery";
import GeoLocationMap from "./pages/Test/GeoGraph";
import ThemeCategoryTag from "./pages/packages/ThemeCategory";
import BrandCategoryTag from "./pages/BrandTag/BrandTagCategory";
import ProductSubCategory from "./pages/pathology/ProductSubCategory";
import Product from "./pages/products/Product";
import AllProduct from "./pages/products/AllProduct";
import ProductDetail from "./pages/products/ProductDetail";
import CreatePage from "./pages/Dynamic/Page";
import ChildManager from "./pages/Dynamic/Child";
import SectionManager from "./pages/Dynamic/Section";


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
        icon: <IoPricetagsSharp {...icon} />,
        name: "Product Tag",
        path: "/product/tag",
        element: <LabTestTag />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "Scan Test",
        index: 1,
        path: "/product/tag/:name",
        element: <ProductSubCategory />,
      },


      {
        icon: <IoPricetagsSharp {...icon} />,
        name: "Brand Tag",
        path: "/brand/tag",
        element: <BrandCategoryTag />
      },

      {
        icon: <IoPricetagsSharp {...icon} />,
        name: "Theme Tag",
        path: "/theme/tag",
        element: <ThemeCategoryTag />
      },


      {
        icon: <IoMdImages {...icon} />,
        name: "Product",
        path: "/products",
        element: <Product />,
      },

      {
        icon: <IoMdImages {...icon} />,
        name: "Product",
        index: 1,
        path: "/products/:id",
        element: <Product />,
      },


      {
        icon: <IoMdImages {...icon} />,
        index: 1,
        name: "Product",
        path: "/products/all",
        element: <AllProduct />,
      },


      {
        icon: <IoMdImages {...icon} />,
        name: "Banner",
        path: "/banner",
        element: <Banner />,
      },

      {
        icon: <IoMdImages {...icon} />,
        name: "CMS",
        path: "/cms",
        element: <CreatePage />,


      },

      {
        icon: <IoMdImages {...icon} />,
        name: "Section Manager",
        path: "/cms/:name",
        index: 1,
        element: <SectionManager />,


      },

      {
        icon: <IoMdImages {...icon} />,
        name: "Child Manager",
        index: 1,
        path: "/dashboard/children/:pageName",
        element: <ChildManager />,

      },

      // {
      //   icon: <RiTeamFill {...icon} />,
      //   name: "Team",
      //   path: "/team",
      //   element: <Team/>,
      // },
      // {
      //   icon: <RiTeamFill {...icon} />,
      //   name: "Add Team",
      //   path: "/team/add",
      //   element: <AddTeam/>,
      //   index:1
      // },
      // {
      //   icon: <LuCopyright {...icon} />,
      //   name: "Carrer",
      //   path: "/carrer",
      //   element: <Carrer/>,
      // },
      {
        icon: <GoListUnordered {...icon} />,
        name: "All-Order",
        path: "/order",
        element: <Order />,
      },
      {
        icon: <GoListUnordered {...icon} />,
        name: "Order Detail",
        path: "/order/detail",
        element: <OrderDetail />,
        index: 1
      },
      {
        icon: <FaBloggerB {...icon} />,
        name: "Blog",
        path: "/blog",
        element: <Blog />,
      },
      {
        icon: <FaBloggerB {...icon} />,
        name: "Add Blog",
        path: "/add/blog",
        index: 1,
        element: <BlogAdd />,
      },
      {
        icon: <CiViewList {...icon} />,
        name: "Inquiry",
        path: "/inquiry",
        element: <Inquiry />,
      },

      // {
      //   icon: <CiViewList {...icon} />,
      //   name: "HomeCollection",
      //   path: "/home-collection/add",
      //   element: <AddCollectionSales/>,
      //   index:1,
      // },
      // {
      //   icon: <CiViewList {...icon} />,
      //   name: "HomeCollection Order",
      //   path: "/home-collection/order",
      //   element: <HomeCollectionOrder/>,
      //   index:1,
      // },
      {
        icon: <CiViewList {...icon} />,
        name: "HomeCollection Detail",
        path: "/home-collection/detail",
        element: <DetailHomeCollection />,
        index: 1,
      },
      // {
      //   icon: <CiViewList {...icon} />,
      //   name: "HomeCollectionSales Detail",
      //   path: "/home-collection/sales/detail",
      //   element: <CollectionSalesDetail/>,
      //   index:1,
      // },
      {
        icon: <MdPhoto {...icon} />,
        name: "Gallery",
        path: "/gallery",
        element: <Gallery />,
        index: 0,
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
