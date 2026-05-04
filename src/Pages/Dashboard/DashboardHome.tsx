const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-gray-500 text-sm font-medium">Total Users</h4>
        <p className="text-3xl font-bold mt-2 text-gray-800">1,248</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-gray-500 text-sm font-medium">Revenue</h4>
        <p className="text-3xl font-bold mt-2 text-gray-800">$12,400</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-gray-500 text-sm font-medium">Active Sessions</h4>
        <p className="text-3xl font-bold mt-2 text-gray-800">42</p>
      </div>
    </div>
  );
};

export default DashboardHome;
