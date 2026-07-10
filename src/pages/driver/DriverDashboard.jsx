import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";
import API_URL from "../../config";
export default function DriverDashboard() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    loadShipments();
  }, []);

  // Load Driver Shipments
  const loadShipments = async () => {
  try {
    const driver = JSON.parse(localStorage.getItem("trackly-user"));

    console.log("Logged in driver:", driver);

    const response = await fetch(
      `${API_URL}/driver/shipments/${driver._id}`
    );

    const data = await response.json();

    console.log("Driver shipments:", data);

    setShipments(data.shipments || []);
  } catch (error) {
    console.log(error);
  }
};

  // Update Delivery Status
  const updateStatus = async (shipmentId, newStatus) => {
    try {
      const response = await fetch(
        `${API_URL}/driver/shipments/${shipmentId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Shipment status updated");

      loadShipments();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <DashboardLayout title="Driver Dashboard" role="driver">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {shipments.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">🚚</div>

            <h2 className="text-xl font-semibold text-white">
              No Assigned Shipments
            </h2>

            <p className="text-white/60 mt-2">
              Once the admin assigns shipments, they will appear here.
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

              <div className="mt-3 space-y-2 text-sm">

                <p>
                  <strong>Pickup:</strong>{" "}
                  {shipment.pickupLocation}
                </p>

                <p>
                  <strong>Delivery:</strong>{" "}
                  {shipment.deliveryLocation}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {shipment.customerId?.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {shipment.customerId?.email}
                </p>

              </div>

              <div className="mt-4 flex gap-2 flex-wrap">

                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
                  {shipment.approvalStatus}
                </span>

                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                  {shipment.status}
                </span>

              </div>

              <div className="mt-5">

                <label className="text-sm text-white/70">
                  Update Shipment Status
                </label>

                <select
                  value={shipment.status}
                  onChange={(e) =>
                    updateStatus(shipment._id, e.target.value)
                  }
                  className="w-full mt-2 rounded-lg bg-white/10 border border-white/20 p-2 text-white"
                >
                  <option className="text-black" value="Pending">
                    Pending
                  </option>

                  <option className="text-black" value="Picked Up">
                    Picked Up
                  </option>

                  <option className="text-black" value="In Transit">
                    In Transit
                  </option>

                  <option className="text-black" value="Delivered">
                    Delivered
                  </option>
                </select>

              </div>

              <p className="mt-5 text-xs text-white/40">
                Created:
                {" "}
                {new Date(shipment.createdAt).toLocaleString()}
              </p>

            </div>

          ))

        )}

      </div>
    </DashboardLayout>
  );
}