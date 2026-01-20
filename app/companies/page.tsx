"use client";

import { useEffect, useState } from "react";
import { getCompanies } from "@/lib/api";

const th: React.CSSProperties = {
  borderBottom: "1px solid #334155",
  padding: "10px",
  textAlign: "left",
  fontWeight: 600,
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #1e293b",
  padding: "10px",
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies()
      .then((data) => setCompanies(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="page">
        <h1>YC Companies</h1>

        {loading ? (
          <p>Loading companies…</p>
        ) : companies.length === 0 ? (
          <p>No companies found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Website</th>
                <th style={th}>Founded</th>
                <th style={th}>Active</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((c, i) => (
                <tr key={i}>
                  <td style={td}>{c.name}</td>

                  <td style={td}>
                    {c.domain ? (
                      <a
                        href={c.domain}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#38bdf8" }}
                      >
                        Visit
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td style={td}>{c.founded_year ?? "—"}</td>
                  <td style={td}>{c.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}