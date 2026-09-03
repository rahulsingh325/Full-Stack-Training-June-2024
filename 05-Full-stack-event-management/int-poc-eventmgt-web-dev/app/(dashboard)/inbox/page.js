import { Suspense } from "react";
import InboxProviderClient from "./InboxProviderClient";
import InboxLayout from "./InboxLayout";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Inbox...</div>}>
      <InboxProviderClient>
        <InboxLayout />
      </InboxProviderClient>
    </Suspense>
  );
}
