"use client";

import { Row, Col, Container } from "react-bootstrap";
import { CalendarDays, ClipboardCheck, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

import api from "@/helper/api";

/**
 * COMPONENTS
 */
import StatCard from "@/components/dashboard/StatCard";
import TicketSalesCard from "@/components/dashboard/TicketSalesCard";
import SalesRevenue from "@/components/dashboard/SalesRevenue";
import PopularEvents from "@/components/dashboard/PopularEvents";
import RecentBookings from "@/components/dashboard/RecentBookings";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useRouter } from "next/navigation";
import UpcomingEventCard from "@/components/dashboard/UpcomingEventCard";
import { useNotification } from "@/context/NotificationContext";

export default function DashboardPage() {

  const [stats, setStats] = useState({
    upcomingEvents: 0,
    totalBookings: 0,
    ticketsSold: 0,
  });

  const router = useRouter();
  const [ticketSales, setTicketSales] = useState(null);
  const [revenueSummary, setRevenueSummary] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  // const [recentActivity, setRecentActivity] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { recentActivity, setRecentActivity, setUnreadCount } = useNotification();



  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    setLoading(true);

    api.get("/dashboard/all_data", {
      params: { month, year, recent_limit: 20 },
    })
      .then(res => {
        const data = res.data;

        /* ================= KPIs ================= */
        setStats({
          upcomingEvents: data?.upcoming_event_count ?? 0,
          totalBookings: data?.kpis?.total_bookings ?? 0,
          ticketsSold:
            (data?.ticket_sales?.sold_out ?? 0)
            + (data?.ticket_sales?.fully_booked ?? 0),
        });

        setTicketSales({
          total_capacity: data?.ticket_sales?.total_capacity ?? 0,
          sold_out: data?.ticket_sales?.sold_out ?? 0,
          fully_booked: data?.ticket_sales?.fully_booked ?? 0,
          available: data?.ticket_sales?.available ?? 0,
        });


        /* ================= SALES REVENUE ================= */
        setRevenueSummary(data?.kpis?.total_revenue ?? 0);
        setRevenueData(data?.revenue_trend || []);

        /* ================= POPULAR CATEGORIES ================= */
        setPopularEvents(data?.popular_categories || []);

        /* ================= BOOKINGS & ACTIVITY ================= */
        const activities = data?.activity || [];
        setRecentBookings(data?.recent_bookings || []);
        // setRecentActivity(data?.activity || []);
        setRecentActivity(activities);
        setUnreadCount(activities.length);

        /* ================= CALENDAR ================= */
        setCalendarEvents(data?.calendar_events || []);
        setUpcomingEvents(data?.upcoming_events || []);

        /* ================= FEATURED EVENT ================= */
        setFeaturedEvent(data?.featured_event || null);
      })
      .catch(err => {
        console.error("DASHBOARD API ERROR:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container fluid className="dashboard-wrapper">
      <Row className="align-items-start g-4">

        {/* ================= LEFT MAIN ================= */}
        <Col xl={8} lg={12} md={12}>

          {/* ================= STATS ================= */}
          <Row className="g-3 mb-4 ps-0">
            <Col xs={4} lg={4}>
              <StatCard
                title="Upcoming Events"
                value={loading ? "—" : stats.upcomingEvents}
                icon={CalendarDays}
              />
            </Col>

            <Col xs={4} lg={4}>
              <StatCard
                title="Total Bookings"
                value={loading ? "—" : stats.totalBookings}
                icon={ClipboardCheck}
              />
            </Col>

            <Col xs={4} lg={4}>
              <StatCard
                title="Tickets Sold"
                value={loading ? "—" : stats.ticketsSold}
                icon={Ticket}
              />
            </Col>
          </Row>

          {/* ================= SALES + POPULAR ================= */}
          <Row className="g-4 mb-4 align-items-stretch">
            <Col md={4} className="">
              <TicketSalesCard data={ticketSales} />
            </Col>

            <Col md={8} className="">
              <SalesRevenue
                summary={revenueSummary}
                data={revenueData}
              />
              <div className="mt-4">
                <PopularEvents data={popularEvents} />
              </div>
            </Col>
          </Row>

          {/* ================= ALL EVENTS (API) ================= */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-semibold mb-0">All Events</h6>
            <button
              className="btn bg-cool-grey-10 text-secondary-100 fs-10 rounded-pill px-3"
              onClick={() => router.push("/events")}
            >
              View All Event
            </button>

          </div>

          <Row className="g-4 mb-4">
            <Row className="gy-4 gx-3 mb-4 mt-0">
              {upcomingEvents.slice(0, 3).map(event => (
                <Col lg={4} md={6} key={event.event_id || event.id}>
                  <UpcomingEventCard event={event} variant="grid" variantStyle="primary" showBorder={false} />
                </Col>
              ))}
            </Row>


          </Row>

          {/* ================= RECENT BOOKINGS ================= */}
          <RecentBookings data={recentBookings} />
        </Col>

        {/* ================= RIGHT SIDEBAR ================= */}
        <Col xl={4} lg={12} className="mt-4 mt-xl-0">

          {featuredEvent && (
            <div className="rounded-4 pt-2 mb-4 ">
              <h6 className="fw-semibold mb-3">Upcoming Event</h6>
              <UpcomingEventCard
                event={featuredEvent}
                variant="sidebar"
                variantStyle="secondary"
                showBorder={true}
              />

            </div>
          )}


          {/* ================= CALENDAR ================= */}
          <div className="mb-4">
            <CalendarWidget
              calendarEvents={calendarEvents}
              upcomingEvents={upcomingEvents}
            />


          </div>

          {/* ================= RECENT ACTIVITY ================= */}
          <RecentActivity data={recentActivity} limit={4} />
        </Col>
      </Row>
    </Container>
  );
}
