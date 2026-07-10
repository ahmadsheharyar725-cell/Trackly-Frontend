import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API_URL from "../../config";
export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState({});

  useEffect(() => {
    loadShipments();
    loadDrivers();
  }, []);

  // Load Shipments
  const loadShipments = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/shipments`);
      const data = await res.json();
      setShipments(data.shipments || []);
    } catch (error) {
      console.log("Load shipments error:", error);
    }
  };

  // Load Drivers
  const loadDrivers = async () => {
    try {
      const res = await fetch(`${API_URL}/drivers`);
      const data = await res.json();
      setDrivers(data.drivers || []);
    } catch (error) {
      console.log("Load drivers error:", error);
    }
  };

  // Accept Shipment
  const acceptShipment = async (id) => {
    await fetch(`${API_URL}/admin/shipments/${id}/accept`, {
      method: "PUT",
    });
    loadShipments();
  };

  // Reject Shipment
  const rejectShipment = async (id) => {
    await fetch(`${API_URL}/admin/shipments/${id}/reject`, {
      method: "PUT",
    });
    loadShipments();
  };

  // Assign Driver 
const assignDriver = async (shipmentId) => {
  const driverId = selectedDrivers[shipmentId];

  if (!driverId) {
    alert("Please select a driver");
    return;
  }

  const res = await fetch(
     `${API_URL}/admin/shipments/${shipmentId}/assign-driver`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driverId }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  // ✅ SUCCESS ALERT
  alert("Driver assigned successfully");

  // ✅ RELOAD DATA
  loadShipments();
};

  return (
    <DashboardLayout title="Admin Dashboard" role="admin">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {shipments.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-white">
              No Shipments Found
            </h2>
            <p className="text-white/60 mt-2">
              Shipments will appear here once customers create them.
            </p>
          </div>
        ) : (
          shipments.map((shipment) => (
            <div
              key={shipment._id}
              className="relative rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg text-white"
            >
              <h3 className="text-lg font-bold">
                Shipment #{shipment._id.slice(-6)}
              </h3>

              <div className="mt-3 space-y-1 text-sm text-white/80">
                <p>
                  <span className="text-white font-semibold">Pickup:</span>{" "}
                  {shipment.pickupLocation}
                </p>

                <p>
                  <span className="text-white font-semibold">Delivery:</span>{" "}
                  {shipment.deliveryLocation}
                </p>

                <p>
                  <span className="text-white font-semibold">Customer:</span>{" "}
                  {shipment.customerId?.name}
                </p>
              </div>

              {/* Status */}
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-200">
                  {shipment.approvalStatus}
                </span>

                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200">
                  {shipment.status}
                </span>
              </div>

              {/* Driver */}
             <p className="mt-3 text-sm text-white/70">
  <span className="text-white font-semibold">Driver:</span>{" "}
  {shipment.assignedDriver
    ? `${shipment.assignedDriver.name} (${shipment.assignedDriver._id.slice(-6)})`
    : "Not Assigned"}
</p>

              {/* Select Driver */}
              <div className="mt-4 flex gap-2">
                <select
                  className="flex-1 bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2"
                  value={selectedDrivers[shipment._id] || ""}
                  onChange={(e) =>
                    setSelectedDrivers({
                      ...selectedDrivers,
                      [shipment._id]: e.target.value,
                    })
                  }
                >
                  <option className="text-black" value="">
                    Select Driver
                  </option>

                  {drivers.map((d) => (
                    <option key={d._id} value={d._id} className="text-black">
                      {d.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assignDriver(shipment._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold"
                >
                  Assign
                </button>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => acceptShipment(shipment._id)}
                  className="flex-1 py-2 rounded-lg bg-green-500/20 text-green-300"
                >
                  Accept
                </button>

                <button
                  onClick={() => rejectShipment(shipment._id)}
                  className="flex-1 py-2 rounded-lg bg-red-500/20 text-red-300"
                >
                  Reject
                </button>
              </div>

              <p className="mt-4 text-xs text-white/40">
                {new Date(shipment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}