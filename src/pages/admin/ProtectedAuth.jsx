import { useIsLoginMutation } from '@/Rtk/authApi';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from '../Loading/SpinLoading';

const ProtectedAuth = ({ isPrivate }) => {
  const [isLogin] = useIsLoginMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // For loading indicator

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await isLogin();
        console.log(response);

        if (response?.data?.success) {
          console.log("✅ User is logged in.");
          if (!isPrivate) navigate("/dashboard/home", { replace: true });
        } else {
          console.log("⛔ User is not logged in.");
          if (isPrivate) navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("🚨 Error in login check:", error);
        if (isPrivate) navigate("/login", { replace: true });
      } finally {
        setLoading(false); // Loading is done
      }
    };

    checkLogin(); // Call the function
  }, [isPrivate, navigate, isLogin]);

  // Show a loading indicator during the check
  if (loading) {
    return <div className='flex  h-[100vh] items-center justify-center'><Spinner/></div>
  }

  return <Outlet />; // Render child routes
};

export default ProtectedAuth;
