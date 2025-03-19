import { useGetAllOrderQuery } from "@/Rtk/orderApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const BookingChart = () => {
  const { data, isLoading } = useGetAllOrderQuery();
  console.log(data);

  const monthlyData = [
    { name: "Jan", pathology: 200, scan: 150 },
    { name: "Feb", pathology: 300, scan: 220 },
    { name: "Mar", pathology: 250, scan: 180 },
    { name: "Apr", pathology: 400, scan: 300 },
    { name: "May", pathology: 350, scan: 250 },
    { name: "Jun", pathology: 500, scan: 400 },
    { name: "Jul", pathology: 450, scan: 350 },
    { name: "Aug", pathology: 600, scan: 500 },
    { name: "Sep", pathology: 480, scan: 390 },
    { name: "Oct", pathology: 420, scan: 350 },
    { name: "Nov", pathology: 550, scan: 470 },
    { name: "Dec", pathology: 600, scan: 520 },
  ];

  const weeklyData = [
    { name: "Mon", pathology: 40, scan: 30 },
    { name: "Tue", pathology: 20, scan: 15 },
    { name: "Wed", pathology: 30, scan: 25 },
    { name: "Thu", pathology: 50, scan: 40 },
    { name: "Fri", pathology: 60, scan: 50 },
    { name: "Sat", pathology: 45, scan: 35 },
    { name: "Sun", pathology: 50, scan: 40 },
  ];

  // Dummy values, replace with real data
  const totalBookings = 3500;
  const totalConfirmed = 2800;
  const totalOngoing = 400;
  const totalCancelled = 200;
  const totalCompleted = 2700;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
      {/* Weekly Booking Chart */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Bookings</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pathology" fill="#4CAF50" name="Pathology" />
            <Bar dataKey="scan" fill="#2196F3" name="Scan" />
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
            <Line type="monotone" dataKey="pathology" stroke="#4CAF50" name="Pathology" strokeWidth={3} />
            <Line type="monotone" dataKey="scan" stroke="#2196F3" name="Scan" strokeWidth={3} />
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
