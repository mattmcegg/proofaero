"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { VideoGrid, type FootageItem } from "@/components/vault/VideoGrid";

interface Survey {
  id: string;
  surveyNumber: string;
  propertyAddress: string;
  zip: string;
  type: string;
  status: string;
}

export default function AdminSurveyUploadPage() {
  const params = useParams();
  const surveyId = params.id as string;

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [footage, setFootage] = useState<FootageItem[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSurvey = useCallback(async () => {
    const res = await fetch(`/api/surveys/${surveyId}`);
    const data = await res.json();
    if (res.ok) {
      setSurvey(data.survey);
      setFootage(data.footage);
    }
  }, [surveyId]);

  useEffect(() => {
    loadSurvey();
  }, [loadSurvey]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;

    setError("");
    setSuccess("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const res = await fetch(`/api/admin/surveys/${surveyId}/footage`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }

    setSuccess("Footage uploaded successfully");
    setTitle("");
    setFile(null);
    loadSurvey();
  }

  async function handleDelete(footageId: string) {
    if (!confirm("Delete this footage?")) return;

    const res = await fetch(`/api/admin/surveys/${surveyId}/footage`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ footageId }),
    });

    if (res.ok) loadSurvey();
  }

  if (!survey) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 text-mist sm:px-8">
        Loading survey…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/admin" className="text-sm font-medium text-aero hover:text-aero-bright">
        ← Admin
      </Link>

      <div className="mt-6">
        <h1 className="font-display text-3xl font-bold text-ink">
          Upload footage — Survey #{survey.surveyNumber}
        </h1>
        <p className="mt-2 text-mist">
          {survey.propertyAddress} · {survey.zip}
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="mt-8 max-w-xl space-y-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft"
      >
        <h2 className="font-display font-semibold text-ink">Add video</h2>

        {error && (
          <div className="rounded-lg bg-flag-red/10 px-4 py-3 text-sm text-flag-red">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <label className="block">
          <span className="text-sm font-medium text-ink">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. North roof elevation"
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-4 py-3 focus:border-aero focus:outline-none focus:ring-1 focus:ring-aero"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Video file</span>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1.5 w-full text-sm text-mist file:mr-4 file:rounded-full file:border-0 file:bg-aero file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-aero-bright"
            required
          />
        </label>

        <button
          type="submit"
          disabled={uploading || !file}
          className="rounded-full bg-aero px-6 py-3 text-sm font-semibold text-white hover:bg-aero-bright disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload footage"}
        </button>
      </form>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-ink">
            Vault footage ({footage.length})
          </h2>
          <Link
            href={`/vault/surveys/${surveyId}`}
            className="text-sm font-semibold text-aero hover:text-aero-bright"
          >
            View as member →
          </Link>
        </div>

        <div className="mt-6">
          <VideoGrid footage={footage} />
        </div>

        {footage.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {footage.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleDelete(f.id)}
                className="rounded-full border border-flag-red/30 px-3 py-1 text-xs font-medium text-flag-red hover:bg-flag-red/10"
              >
                Delete {f.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
