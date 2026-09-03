// "use client";

// import Card from "react-bootstrap/Card";
// import { Maximize2 } from "lucide-react";

// export default function TermsConditionsCard({ terms = [],  maxHeight = 400,  }) {
//   if (!terms.length) return null;

//   // API gives single long string
//   const rawText = terms[0];

//   // Split by numbered sections (1. 2. 3.)
//   const sections = rawText
//     .split(/\n?\d+\.\s/)
//     .filter(Boolean);

//   const sectionTitles = rawText.match(/\d+\.\s([^\n]+)/g) || [];

//   return (
//     <Card className="border-0 shadow-sm rounded-4 mb-4">
//       {/* HEADER */}
//       <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
//         <h6 className="fw-semibold text-grey-100 mb-2">Terms & Conditions</h6>
//         <Maximize2 size={16} className="text-muted" />
//       </Card.Header>

//       {/* BODY */}
//       <Card.Body
//         className="pt-2 px-4 pb-4"
//         style={{ maxHeight, overflowY: "auto" }}
//       >
//         <div className="small text-muted">
//           {sections.map((section, index) => {
//             const title =
//               sectionTitles[index]?.replace(/^\d+\.\s/, "") || "";

//             // Split bullet points
//             const points = section
//               .split("\n")
//               .map((p) => p.trim())
//               .filter((p) => p && p !== title);

//             return (
//               <div key={index} className="mb-3">
//                 {/* SECTION TITLE */}
//                 {title && (
//                   <div className="fw-semibold text-grey-90 mb-1">
//                     {index + 1}. {title}
//                   </div>
//                 )}

//                 {/* BULLETS */}
//                 <ul className="ps-3 mb-0">
//                   {points.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             );
//           })}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

"use client";

import Card from "react-bootstrap/Card";
import { Maximize2 } from "lucide-react";

export default function TermsConditionsCard({
  terms,
  maxHeight = 400,
}) {
  if (!terms) return null;

  const rawText = Array.isArray(terms) ? terms[0] : terms;
  if (!rawText) return null;

  const lines = rawText
    .split("\n")
    .map((l) => l.replace(/^•\s*/, "").trim())
    .filter(Boolean);

  const sections = [];
  let currentSection = null;

  lines.forEach((line) => {
    const isHeading = !line.endsWith(".");

    if (isHeading) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: line, points: [] };
    } else if (currentSection) {
      currentSection.points.push(line);
    }
  });

  if (currentSection) sections.push(currentSection);

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      {/* HEADER */}
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
        <h6 className="fw-semibold text-grey-100 mb-2">
          Terms & Conditions
        </h6>
        <Maximize2 size={16} className="text-muted" />
      </Card.Header>

      {/* BODY */}
      <Card.Body
        className="pt-2 px-4 pb-4"
        style={{ maxHeight, overflowY: "auto" }}
      >
        <div className="small text-muted">
          {sections.map((sec, i) => (
            <div key={i} className="mb-3">
              {/* HEADING */}
              <div className="fw-semibold text-grey-90 mb-1">
                {sec.title}
              </div>

              {/* BULLETS */}
              {sec.points.length > 0 && (
                <ul className="ps-4 mb-0">
                  {sec.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
