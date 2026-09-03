export default function StatusTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="d-flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-2 rounded-pill border-0 ${
            activeTab === tab.value ? "bg-primary-100 text-white" : "bg-grey-10"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}
