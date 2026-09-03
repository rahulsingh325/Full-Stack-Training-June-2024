"use client";

import FeedbackCard from "./FeedbackCard";
import PaginationFooter from "@/components/pagination/PaginationFooter";

export default function FeedbackList({
  items = [],
  pagination,
  onPageChange,
}) {
  return (
    <>
      <div className="row g-4">
        {items.map((item) => (
          <div key={item.id} className="col-xl-4 col-md-6">
            <FeedbackCard
              data={{
                name: item.reviewer_name,
                date: item.created_at,
                rating: item.overall_rating,
                comment: item.comment,
                event: item.event_name,
                category: item.category_name,
              }}
            />
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center text-muted py-5">
            No feedback found
          </div>
        )}
      </div>

      <PaginationFooter
        page={pagination.page}
        pageSize={pagination.page_size}
        totalItems={pagination.total_count}
        onPageChange={onPageChange}
      />
    </>
  );
}
