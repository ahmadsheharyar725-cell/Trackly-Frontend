import { createContext, useContext, useState } from "react";

// ⭐ IMPROVEMENT: proper context creation
const TracklyContext = createContext();

export function TracklyProvider({ children }) {

  const [shipments, setShipments] = useState([
    {
      id: 1,
      title: "Lahore → Karachi",
      status: "In Transit",
      assignedDriver: "Ali",
      accepted: false
    },
    {
      id: 2,
      title: "Islamabad → Multan",
      status: "Delivered",
      assignedDriver: "Ahmed",
      accepted: false
    }
  ]);

  // ⭐ IMPROVEMENT: safe state update (prevents bugs)
  const addShipment = (shipment) => {
    setShipments((prev) => [...prev, shipment]);
  };

  // ⭐ IMPROVEMENT: functional update (safe React pattern)
  const updateStatus = (id, status) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    );
  };

  // ⭐ IMPROVEMENT: delete feature added (needed for admin panel later)
  const deleteShipment = (id) => {
    setShipments((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <TracklyContext.Provider
      value={{
        shipments,
        addShipment,
        updateStatus,
        deleteShipment
      }}
    >
      {children}
    </TracklyContext.Provider>
  );
}

// ⭐ IMPROVEMENT: custom hook for clean usage
export const useTrackly = () => useContext(TracklyContext);