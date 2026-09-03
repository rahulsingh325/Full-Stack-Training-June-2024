"use client";

import Barcode from "react-barcode";

export default function TicketBarcode({
  value,
  height = 90,
  width = 1,
}) {
  if (!value) return null;

  return (
    <Barcode
      value={value}          // e.g. EV-20260120-A9FD61
      format="CODE128"       // gate scanners ke liye best
      height={height}
      width={width}
      displayValue={false}   // niche text nahi dikhana
      background="transparent"
    />
  );
}
