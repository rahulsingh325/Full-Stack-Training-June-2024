// "use client";

// import { useState } from "react";
// import { SlidersHorizontal } from "lucide-react";

// export default function FilterTrigger({ onOpen }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setIsOpen(true);
//     onOpen?.(); 
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="d-flex flex-column justify-content-center align-items-center bg-secondary-100 border text-grey-10 p-2 rounded-5 w-36 h-36"
//     >
//       <SlidersHorizontal size={18} />
//       {/* <span className="fs-body-2">Filters</span> */}
//     </button>
//   );
// }


"use client";

import { SlidersHorizontal } from "lucide-react";

/**
 * FilterTrigger
 * -------------
 * Sirf ek trigger button hai.
 * Actual filter logic / panel parent me handle hota hai.
 *
 * Props:
 * - onOpen?: () => void   // filter panel / drawer open karne ke liye
 */
export default function FilterTrigger({ onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen?.()}
      aria-label="Open filters"
      className="d-flex align-items-center justify-content-center bg-secondary-100 border text-grey-10 rounded-circle p-2 w-36 h-36"
    >
      <SlidersHorizontal size={18} />
    </button>
  );
}
