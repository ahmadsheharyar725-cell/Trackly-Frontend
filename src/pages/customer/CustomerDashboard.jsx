import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { toast } from "react-toastify";
import API_URL from "../../config";

export default function CustomerDashboard() {
  const [shipments, setShipments] = useState([]);

  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("trackly-user"));

      const res = await fetch(
       `${API_URL}/my-shipments/${user._id}`
      );

      const data = await res.json();

      setShipments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    if (!pickupLocation || !deliveryLocation) {
      toast.error("Fill all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("trackly-user"));

    const res = await fetch(`${API_URL}/shipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: user._id,
        pickupLocation,
        deliveryLocation,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Shipment Created 🚚");

    setPickupLocation("");
    setDeliveryLocation("");

    loadShipments();
  };

  return (
    <DashboardLayout title="Customer Dashboard" role="customer">

      {/* Create Shipment */}
      <div className="mb-8 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">

        <h3 className="text-lg font-semibold mb-4 text-white">
          Create New Shipment
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Pickup Location"
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none"
          />

          <input
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="Delivery Location"
            className="p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none"
          />

        </div>

        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:scale-105 transition"
        >
          Create Shipment
        </button>

      </div>

      {/* Shipments */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {shipments.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">📦</div>

            <h2 className="text-xl font-semibold text-white">
              No Shipments Found
            </h2>

            <p className="text-white/60 mt-2 max-w-md">
              You have not created any shipments yet.
            </p>

          </div>
        ) : (

          shipments.map((shipment) => (

            <div
              key={shipment._id}
              className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300"
            >

              <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400 blur-3xl opacity-20 rounded-full"></div>

              <h3 className="text-white font-bold text-lg">
                Shipment #{shipment._id.slice(-6)}
              </h3>

              <div className="mt-3 text-white/80 text-sm space-y-1">

                <p>
                  <span className="text-white font-semibold">Pickup:</span>{" "}
                  {shipment.pickupLocation}
                </p>

                <p>
                  <span className="text-white font-semibold">Delivery:</span>{" "}
                  {shipment.deliveryLocation}
                </p>

              </div>

              <div className="mt-4 flex gap-2 flex-wrap">

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    shipment.approvalStatus === "Accepted"
                      ? "bg-green-500/20 text-green-300 border border-green-400/30"
                      : shipment.approvalStatus === "Rejected"
                      ? "bg-red-500/20 text-red-300 border border-red-400/30"
                      : "bg-yellow-500/20 text-yellow-200 border border-yellow-400/30"
                  }`}
                >
                  {shipment.approvalStatus}
                </span>

                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  {shipment.status}
                </span>

              </div>

             <p className="mt-3 text-sm text-white/70">
  <span className="text-white font-semibold">Driver:</span>{" "}
  {shipment.assignedDriver
    ? shipment.assignedDriver.name
    : "Not Assigned"}
</p>

            </div>

          ))

        )}

      </div>

    </DashboardLayout>
  );
}