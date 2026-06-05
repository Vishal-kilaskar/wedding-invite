"use client";

import { useState, useEffect } from "react";

interface Wish {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

interface Rsvp {
  id: string;
  name: string;
  phone: string | null;
  attendees: number;
  events: string[];
  message: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"wishes" | "rsvp" | "settings">("wishes");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    fetchWishes();
    fetchRsvps();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/admin/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (error) {
      console.error("Failed to fetch wishes:", error);
    }
  };

  const fetchRsvps = async () => {
    try {
      const res = await fetch("/api/rsvp");
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      }
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    }
  };

  const handleApproveWish = async (id: string) => {
    try {
      await fetch("/api/admin/wishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: true }),
      });
      fetchWishes();
    } catch (error) {
      console.error("Failed to approve wish:", error);
    }
  };

  const handleDeleteWish = async (id: string) => {
    try {
      await fetch("/api/admin/wishes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchWishes();
    } catch (error) {
      console.error("Failed to delete wish:", error);
    }
  };

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme);
    try {
      await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
      // Apply theme to document
      document.documentElement.setAttribute("data-theme", newTheme === "default" ? "" : newTheme);
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  };

  const tabs = [
    { id: "wishes" as const, label: "Wishes", count: wishes.filter((w) => !w.approved).length },
    { id: "rsvp" as const, label: "RSVPs", count: rsvps.length },
    { id: "settings" as const, label: "Settings", count: 0 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: "var(--color-primary-dark)" }}>
      <h1
        className="text-3xl font-bold mb-8 text-center"
        style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)" }}
      >
        Wedding Admin Panel
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-6 py-3 rounded-full font-semibold transition-all relative"
            style={{
              backgroundColor: activeTab === tab.id ? "var(--color-accent)" : "rgba(255,255,255,0.05)",
              color: activeTab === tab.id ? "var(--color-primary-dark)" : "var(--color-secondary)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center"
                style={{ backgroundColor: "#ef4444", color: "white" }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {/* Wishes Tab */}
        {activeTab === "wishes" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
              Pending Wishes ({wishes.filter((w) => !w.approved).length})
            </h2>
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${wish.approved ? "rgba(34,197,94,0.3)" : "rgba(212,175,55,0.2)"}`,
                }}
              >
                <div>
                  <p className="font-semibold" style={{ color: "var(--color-accent)" }}>
                    {wish.name}
                  </p>
                  <p className="mt-1" style={{ color: "var(--color-secondary)", opacity: 0.8 }}>
                    {wish.message}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-secondary)", opacity: 0.5 }}>
                    {new Date(wish.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!wish.approved && (
                    <button
                      onClick={() => handleApproveWish(wish.id)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: "#22c55e", color: "white" }}
                    >
                      Approve ✓
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: "#ef4444", color: "white" }}
                  >
                    Delete ✕
                  </button>
                </div>
              </div>
            ))}
            {wishes.length === 0 && (
              <p className="text-center py-8" style={{ color: "var(--color-secondary)", opacity: 0.5 }}>
                No wishes yet.
              </p>
            )}
          </div>
        )}

        {/* RSVP Tab */}
        {activeTab === "rsvp" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: "var(--color-secondary)" }}>
                RSVPs ({rsvps.length})
              </h2>
              <p style={{ color: "var(--color-accent)" }}>
                Total Guests: {rsvps.reduce((sum, r) => sum + r.attendees, 0)}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ color: "var(--color-secondary)" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                    <th className="p-3 text-sm" style={{ color: "var(--color-accent)" }}>Name</th>
                    <th className="p-3 text-sm" style={{ color: "var(--color-accent)" }}>Phone</th>
                    <th className="p-3 text-sm" style={{ color: "var(--color-accent)" }}>Guests</th>
                    <th className="p-3 text-sm" style={{ color: "var(--color-accent)" }}>Events</th>
                    <th className="p-3 text-sm" style={{ color: "var(--color-accent)" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td className="p-3">{rsvp.name}</td>
                      <td className="p-3">{rsvp.phone || "-"}</td>
                      <td className="p-3">{rsvp.attendees}</td>
                      <td className="p-3 text-sm">{rsvp.events.join(", ")}</td>
                      <td className="p-3 text-sm">{new Date(rsvp.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {rsvps.length === 0 && (
              <p className="text-center py-8" style={{ color: "var(--color-secondary)", opacity: 0.5 }}>
                No RSVPs yet.
              </p>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            {/* Theme selector */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
                Color Theme
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "default", name: "Royal Blue & Ivory", colors: ["#1e3a5f", "#fffff0", "#d4af37"] },
                  { id: "rose-gold", name: "Navy & Rose Gold", colors: ["#1b2838", "#faf5f0", "#b76e79"] },
                  { id: "pastel-pink", name: "Pastel Pink & Gold", colors: ["#8b4557", "#fff5f7", "#d4af37"] },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className="p-4 rounded-xl transition-all hover:scale-105"
                    style={{
                      border: `2px solid ${theme === t.id ? "var(--color-accent)" : "rgba(255,255,255,0.1)"}`,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex gap-2 mb-3 justify-center">
                      {t.colors.map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-secondary)" }}>
                      {t.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Music settings */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-secondary)" }}>
                Background Music
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--color-secondary)", opacity: 0.7 }}>
                Upload an MP3 file to the <code>/public/audio/</code> folder and update the filename below.
              </p>
              <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                Current: wedding-music.mp3
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
