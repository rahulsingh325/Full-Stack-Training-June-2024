"use client";

import {
  ShieldAlert,
  Ban,
  Camera,
  VolumeX,
  Package,
  PawPrint,
  Bike,
  Umbrella,
  Tent,
} from "lucide-react";
import { Card, Col, Row } from "react-bootstrap";

/* ICON MAP (backend icon_key → lucide icon) */
const ICONS = {
  weapon: ShieldAlert,
  drugs: Ban,
  alcohol: Ban,
  camera: Camera,
  hazard: ShieldAlert,
  noise: VolumeX,
  merch: Package,
  pets: PawPrint,
  pet: PawPrint,
  animal: PawPrint,
  vehicle: Bike,
  bike: Bike,
  basket: Package,
  umbrella: Umbrella,
  camping: Tent,
  tent: Tent,
};

export default function ProhibitedItems({ items = [] }) {
  /* ================= GUARD ================= */
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  /* ================= NORMALIZE BACKEND DATA ================= */
  const normalizedItems = items
    .map(item => {
      // Case 1: string item
      if (typeof item === "string") {
        return {
          key: item.toLowerCase(),
          label: item,
        };
      }

      // Case 2: object item (backend)
      if (item && typeof item === "object") {
        return {
          key:
            (item.icon_key ||
              item.icon ||
              item.type ||
              "default")
              .toString()
              .toLowerCase(),

          // 🔥 IMPORTANT FIX
          label:
            item.item_name ||
            item.title ||
            item.name ||
            item.label ||
            "Restricted Item",
        };
      }

      return null;
    })
    .filter(Boolean)
    // remove duplicates (same label)
    .filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          i => i.label === item.label
        )
    );

  if (normalizedItems.length === 0) {
    return null;
  }

  /* ================= RENDER ================= */
  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="fw-semibold">
          Prohibited Items
        </div>
        <span className="text-muted">•••</span>
      </div>

      {/* GRID */}
      <Row className="g-4">
        {normalizedItems.map((item, index) => {
          const Icon = ICONS[item.key] || Ban;

          return (
            <Col
              key={`${item.key}-${index}`}
              xs={6}
              md={4}
              lg={3}
            >
              <div className="text-center">
                {/* ICON CIRCLE */}
                <div
                  className="mx-auto mb-2 position-relative d-flex align-items-center justify-content-center"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "3px solid #F26CF9",
                  }}
                >
                  <Icon
                    size={26}
                    strokeWidth={2}
                    color="#1C2346"
                    style={{ zIndex: 2 }}
                  />

                  {/* SLASH */}
                  <span
                    style={{
                      position: "absolute",
                      width: 72,
                      height: 3,
                      backgroundColor: "#F26CF9",
                      transform: "rotate(-45deg)",
                      zIndex: 3,
                    }}
                  />
                </div>

                {/* LABEL */}
                <div
                  className="small fw-medium"
                  style={{ lineHeight: 1.25 }}
                >
                  {item.label}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}
