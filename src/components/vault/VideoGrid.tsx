export interface FootageItem {
  id: string;
  title: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function VideoGrid({ footage }: { footage: FootageItem[] }) {
  if (footage.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-paper-dim/50 px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          No footage yet
        </p>
        <p className="mt-2 text-sm text-mist">
          Your survey footage will appear here once processing is complete.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {footage.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft"
        >
          <div className="aspect-video bg-ink">
            <video
              src={`/api/footage/${item.id}`}
              controls
              preload="metadata"
              className="h-full w-full bg-ink object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-xs text-mist truncate">{item.originalName}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-mist">
              <span>{formatSize(item.size)}</span>
              <span>
                {new Date(item.uploadedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
