export const RecentOrders = () => {
  const orders = [
    {
      id: "#1234",
      name: "John Doe",
      items: "Adobo Combo, Sinigang",
      status: "completed",
      price: "₱850",
    },
    {
      id: "#1235",
      name: "Maria Santos",
      items: "Lechon Kawali, Rice",
      status: "preparing",
      price: "₱450",
    },
    {
      id: "#1236",
      name: "Pedro Cruz",
      items: "Catering Package",
      status: "pending",
      price: "₱15,000",
    },
  ];

  const variants = {
    completed: "bg-green-500 text-white",
    preparing: "bg-orange-500 text-white",
    pending: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4 text-lg">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto bg-white text-gray-800 text-sm border border-gray-200 rounded-xl">
          <thead className="text-gray-600 bg-white">
            <tr>
              <th className="px-6 py-4 text-center">Order ID</th>
              <th className="px-6 py-4 text-center">Customer</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50/40 transition-colors"
              >
                <td className="px-6 py-4 text-center font-bold align-middle">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  {order.name}
                </td>
                <td className="px-6 py-4 text-center text-gray-500 text-sm align-middle">
                  {order.items}
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      variants[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-yellow-600 align-middle">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
