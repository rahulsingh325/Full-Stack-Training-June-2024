"use client";

import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import api from "@/helper/api";
import OrganizationForm from "@/components/organization/OrganizationForm";

export default function OrganizationPage() {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganization();
  }, []);

  const loadOrganization = async () => {
    try {
      const res = await api.get("/organization/list");
      setOrganization(res.data?.[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="border-0 rounded-4 p-4 text-center">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card className="border-0 rounded-4 p-4 bg-white">
      <h5 className="fw-semibold mb-3">Organization</h5>

      <OrganizationForm
        data={organization}
        onSuccess={loadOrganization}
      />
    </Card>
  );
}
