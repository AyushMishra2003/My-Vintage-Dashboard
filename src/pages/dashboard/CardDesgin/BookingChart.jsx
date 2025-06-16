import { useGetAllOrderQuery } from "@/Rtk/orderApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const BookingChart = () => {
  const { data, isLoading } = useGetAllOrderQuery();
  console.log(data);

  const monthlyData = [
    { name: "Jan", data1: 200, data2: 150 },
    { name: "Feb", data1: 300, data2: 220 },
    { name: "Mar", data1: 250, data2: 180 },
    { name: "Apr", data1: 400, data2: 300 },
    { name: "May", data1: 350, data2: 250 },
    { name: "Jun", data1: 500, data2: 400 },
    { name: "Jul", data1: 450, data2: 350 },
    { name: "Aug", data1: 600, data2: 500 },
    { name: "Sep", data1: 480, data2: 390 },
    { name: "Oct", data1: 420, data2: 350 },
    { name: "Nov", data1: 550, data2: 470 },
    { name: "Dec", data1: 600, data2: 520 },
  ];

  const weeklyData = [
    { name: "Mon", data1: 40, data2: 30 },
    { name: "Tue", data1: 20, data2: 15 },
    { name: "Wed", data1: 30, data2: 25 },
    { name: "Thu", data1: 50, data2: 40 },
    { name: "Fri", data1: 60, data2: 50 },
    { name: "Sat", data1: 45, data2: 35 },
    { name: "Sun", data1: 50, data2: 40 },
  ];

  // Dummy values, replace with real data
  const totalBookings = 3500;
  const totalConfirmed = 2800;
  const totalOngoing = 400;
  const totalCancelled = 200;
  const totalCompleted = 2700;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 ">
      {/* Weekly Booking Chart */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Bookings</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="data1" fill="#4CAF50" name="data1" />
            <Bar dataKey="data2" fill="#2196F3" name="data2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Booking Chart */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="data1" stroke="#4CAF50" name="data1" strokeWidth={3} />
            <Line type="monotone" dataKey="data2" stroke="#2196F3" name="data2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Bookings + Status */}
      <div className="bg-white p-6 shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Booking Summary</h2>
        <p className="text-3xl font-bold text-blue-600 mb-2">{totalBookings}+</p>
        <p className="text-gray-500 text-lg mb-4">(Total Bookings)</p>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-green-600 text-lg font-bold">{totalConfirmed}+</p>
            <p className="text-gray-600 text-sm">Confirmed</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <p className="text-yellow-600 text-lg font-bold">{totalOngoing}+</p>
            <p className="text-gray-600 text-sm">Ongoing</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <p className="text-red-600 text-lg font-bold">{totalCancelled}+</p>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-blue-600 text-lg font-bold">{totalCompleted}+</p>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingChart;
