import { useState, useEffect, useMemo } from "react";

export const PayoutSupportedCountries = () => {
  const PAYOUT_METHODS = [
    { value: "all", label: "All" },
    { value: "stablecoin", label: "Stablecoin" },
    { value: "connect", label: "Bank account" },
    { value: "paypal", label: "PayPal" },
  ];

  const [countries, setCountries] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("all");
  const showCount = 21;

  useEffect(() => {
    fetch("https://app.dub.co/api/supported-countries")
      .then((r) => r.json())
      .then((data) => setCountries(data))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return countries.filter((c) => {
      const matchesSearch =
        !q ||
        (c.name || "").toLowerCase().includes(q) ||
        (c.code || "").toLowerCase().includes(q);
      const methods = Array.isArray(c.methods) ? c.methods : [];
      const matchesMethod =
        payoutMethod === "all" || methods.includes(payoutMethod);
      return matchesSearch && matchesMethod;
    });
  }, [countries, searchQuery, payoutMethod]);

  if (!countries.length) return <div style={{ height: "200px" }} />;

  const displayed = expanded ? filtered : filtered.slice(0, showCount);
  const isCollapsed = filtered.length > showCount && !expanded;

  return (
    <div className="not-prose relative">
      <div className="flex flex-col md:flex-row gap-2 pb-2">
        <input
          type="search"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-600 dark:focus:ring-neutral-600"
          aria-label="Search countries"
        />
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {PAYOUT_METHODS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPayoutMethod(value)}
              className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
                payoutMethod === value
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        style={
          isCollapsed
            ? {
                maskImage:
                  "linear-gradient(to bottom, black calc(100% - 80px), transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black calc(100% - 80px), transparent)",
                maxHeight: "420px",
                overflow: "hidden",
              }
            : { paddingBottom: expanded ? "48px" : "0" }
        }
        className="grid grid-cols-2 gap-5 py-4 sm:grid-cols-3"
      >
        {displayed.map(({ code, name, methods = [] }) => {
          const methodLabels = PAYOUT_METHODS.filter((m) =>
            methods.includes(m.value),
          )
            .map((m) => m.label)
            .join(" · ");
          return (
            <div key={code} className="flex items-start gap-3">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`}
                alt={code}
                width={32}
                height={32}
                className="size-5 shrink-0 rounded-full border border-neutral-200 shadow-sm dark:border-neutral-700 mt-0.5"
                draggable={false}
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {name}
                </div>
                {methodLabels ? (
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400">
                    <svg
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-2.5"
                    >
                      <g fill="currentColor">
                        <path
                          d="M15.25,9.75H4.75c-1.105,0-2-.895-2-2V3.75"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <polyline
                          fill="none"
                          points="11 5.5 15.25 9.75 11 14"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                    {methodLabels}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          No countries match your filters.
        </p>
      ) : (
        filtered.length > showCount && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute left-1/2 -translate-x-1/2 transform rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm text-neutral-500 shadow-sm hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            style={{ bottom: isCollapsed ? "24px" : "-8px" }}
          >
            {expanded
              ? "Show less"
              : `Show ${filtered.length - showCount} more`}
          </button>
        )
      )}
    </div>
  );
};
