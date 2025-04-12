"use client";
// pages/uptime-tracker.tsx
import { useState } from "react";
import Head from "next/head";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useWebsites } from "@/hooks/useWebsites";

export default function UptimeTracker() {
  const { getWebsites, websites } = useWebsites();
  const { getToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("");

  // Add a new website to track

  const addWebsite = async () => {
    if (!newWebsiteUrl) return;
    const token = await getToken();
    await axios
      .post("http://localhost:8080/api/v1/create", {data:{url: newWebsiteUrl}},{headers:{Authorization: `Bearer ${token}`}})
      .then(() => {
        getWebsites();
      });
    // alert('hey')
    setNewWebsiteUrl("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      <Head>
        <title>Website Uptime Tracker</title>
        <meta name="description" content="Track your websites' uptime" />
      </Head>

      <main className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Website Uptime Tracker</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Website
          </button>
        </div>

        {/* Website list */}
        <div className="space-y-4">
          {websites.map((website) => (
            <div key={website.id} className="bg-gray-700 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{website.url}</h3>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    {website.url}
                  </a>
                </div>
                <div className="text-sm text-gray-400">
                  Last 10 minutes (newest to oldest)
                </div>
              </div>

              {/* Status indicators - now as vertical bars */}
              <div className="flex items-end h-24 gap-2">
                {website.websiteTicks.length === 0 ? (
                  <div>No Data available</div>
                ) : (
                  website.websiteTicks.map((tick) => (
                    <div
                      key={tick.id}
                      className={`w-8 ${tick.status === "Good" ? "bg-green-500" : "bg-red-500"} rounded-t`}
                      style={{
                        height: `${50 + 0.4 * 50}%`, // Random height between 50-100% for visual variety
                      }}
                      title={`${tick.status === "Good" ? "Up" : "Down"}`}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {websites.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No websites added yet. Click &quot;Add Website&quot; to get started.
          </div>
        )}
      </main>

      {/* Add Website Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Website</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="website-url"
                  className="block text-sm font-medium mb-1"
                >
                  Website URL
                </label>
                <input
                  id="website-url"
                  type="url"
                  placeholder="https://example.com"
                  value={newWebsiteUrl}
                  onChange={(e) => setNewWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addWebsite}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
