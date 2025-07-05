import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/Rtk/authApi";
import Swal from "sweetalert2";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const dispatch1 = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async() => {
    // Clear authentication data

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result?.isConfirmed) {
      localStorage.removeItem("auth");
          // Redirect to login
    navigate("/login");

// 
      // if (response?.success) {
      //   Swal.fire({
      //     title: "Deleted!",
      //     text: "Your item has been deleted.",
      //     icon: "success",
      //     timer: 2000,
      //     showConfirmButton: false,
      //   });
      // }
    }



  };


  return (
    <Navbar
      className={`transition-all duration-300 mb-2 ${fixedNavbar
          ? "sticky top-0 z-40 py-1 shadow-xl"
          : "py-2"
        } bg-gradient-to-r from-[#06425F] to-[#0a5a73] border-0 w-full`}
      style={{
        background: 'linear-gradient(135deg, #06425F 0%, #0a5a73 50%, #0e6e87 100%)',
        boxShadow: '0 4px 20px rgba(6, 66, 95, 0.4), 0 2px 8px rgba(6, 66, 95, 0.3)',
        borderRadius: '0',
        margin: '0',
        maxWidth: '100%'
      }}
      fullWidth
      blurred={false}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center px-6 mb-0">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                className="font-normal text-blue-100 opacity-70 transition-all hover:text-white hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              className="font-normal text-white"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" className="text-white font-semibold">
            {page}
          </Typography>
        </div>

        <div className="flex items-center">
          <div className="mr-auto md:mr-6 md:w-64">
            <div className="relative">
              <Input
                label="Search"
                className="!text-white placeholder:!text-blue-100 !border-white/30 focus:!border-white"
                labelProps={{
                  className: "!text-blue-100 peer-focus:!text-white"
                }}
                containerProps={{
                  className: "!min-w-0"
                }}
                style={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
              />
              <div className="absolute inset-0 bg-white/5 rounded-md pointer-events-none"></div>
            </div>
          </div>

          <IconButton
            variant="text"
            className="grid xl:hidden hover:bg-white/10 transition-colors duration-200"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-white" />
          </IconButton>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-1 rounded-lg text-[#06425F] bg-white hover:bg-blue-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
            <IconButton
              variant="text"
              className="grid xl:hidden hover:bg-white/10 transition-colors duration-200"
            >
              <UserCircleIcon className="h-6 w-6 text-white" />
            </IconButton>
          </div>

          {/* <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                className="hover:bg-white/10 transition-colors duration-200 relative"
              >
                <BellIcon className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0 shadow-xl">
              <MenuItem className="flex items-center gap-3 hover:bg-blue-50 transition-colors duration-200">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4 hover:bg-blue-50 transition-colors duration-200">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4 hover:bg-blue-50 transition-colors duration-200">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-[#06425F] to-[#0a5a73]">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;