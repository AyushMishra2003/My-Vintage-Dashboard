import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import img1 from '../assets/avatar.svg';
import img2 from '../../assest/companylogo.png'
import img3 from '../../assest/wave.png'
import { useLoginMutation } from '@/Rtk/authApi';
// import doctor from '../assets/Apron.jpg'
// import { handleLogin } from '../redux/slices/dynamicSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loginAdd]=useLoginMutation()




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data={
        email:email,
        password:password
    }

    const response= await loginAdd(data)
    console.log(response);

    setLoading(false)

    if(response?.data){
          navigate("/")
    }
    

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility of the password
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      <img
        src={img3}
        className="absolute bottom-0 left-0 w-full h-full object-cover z-0 hidden sm:block"
        alt="background wave"
      />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10 px-4 z-10">
        <div className="hidden md:flex justify-end items-center">
          <img src={img2} alt="background graphic" className="w-96" />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-sm mx-auto text-center">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* <img src={img2} alt="Avatar" className="h-[rem] w-[6rem] mx-auto rounded-full object-contain" /> */}
            <h2 className="text-3xl font-bold text-gray-800 uppercase">Welcome Again</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="relative flex items-center border-b-2 border-gray-300 pb-1 transition-colors duration-300">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 pl-2 pt-2"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="relative flex items-center border-b-2 border-gray-300 pb-1 transition-colors duration-300">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between password and text
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 pl-2 "
                placeholder="Enter Password"
              />
              {/* Toggle the eye icon */}
              <div
                className="absolute right-2 top-1/4 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show the appropriate icon */}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full font-semibold uppercase transition-all duration-500 hover:from-green-500 hover:to-green-400 flex items-center justify-center ${loading && 'opacity-50'}`}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12c0 1.57.39 3.04 1.07 4.29l2.66-2.66A6.978 6.978 0 0 1 4 12zm16 0c0-1.57-.39-3.04-1.07-4.29l-2.66 2.66A6.978 6.978 0 0 0 20 12zm-8-8c-1.57 0-3.04.39-4.29 1.07l2.66 2.66A6.978 6.978 0 0 1 12 4z" />
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
