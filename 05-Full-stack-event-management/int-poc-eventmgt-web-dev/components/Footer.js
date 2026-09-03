"use client";

import Link from "next/link";
import { Facebook, X, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-light py-4 rounded-4 mt-3">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <div className="d-flex justify-content-md-start justify-content-center flex-md-nowrap flex-wrap">
          {/* LEFT */}
          <div className="text-grey-90 fs-body-sm fw-medium"> Copyright
            © {new Date().getFullYear()} Eventify
          </div>

          {/* CENTER LINKS */}
          <div className="d-flex gap-3 fs-14 ms-6">
            <Link href="/privacy-policy" className="text-grey-70 fs-body-sm fw-regular text-decoration-none">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-grey-70 fs-body-sm fw-regular text-decoration-none">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="text-grey-70 fs-body-sm fw-regular text-decoration-none">
              Contact
            </Link>
          </div>
        </div>

        {/* RIGHT SOCIAL ICONS */}
        <div className="d-flex justify-content-end gap-3">
          {[
            { Icon: Facebook, label: "Facebook" },
            { Icon: X, label: "X" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Youtube, label: "Youtube" },
            { Icon: Linkedin, label: "LinkedIn" },
          ].map(({ Icon, label }) => (
            <Link
              key={label}
              href="#"
              aria-label={label}
              className="social-ico text-grey-90 "
            >
              <Icon size={18} strokeWidth={1.25} fill="none" className="social-svg" />
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
}
