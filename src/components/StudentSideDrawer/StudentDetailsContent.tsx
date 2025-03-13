import StudentDetailDto from "@/interfaces/StudentDetailDto";
import { formatTimestamp } from "@/lib/timeUtils";
import Loading from "../common/Loading";

const StudentDetailsContent = ({
  details,
  isLoading,
  error,
}: {
  details?: StudentDetailDto;
  isLoading: boolean;
  error?: Error | null;
}) => {
  return (
    <div className="mt-2">
      <h3 className="font-semibold text-lg mb-3 text-left">
        {details?.name ?? "N/A"}
      </h3>

      {isLoading && <Loading />}
      {error && <p>Error: {error.message}</p>}
      {details && (
        <div className="space-y-4 flex flex-col text-left">
          <h2 className="font-semibold text-accent-foreground">Current Tab</h2>
          <p>{details.currentUrl ?? "N/A"}</p>
          <h2 className="font-semibold text-accent-foreground">Activity Log</h2>
          {details.history && details.history.length ? (
            details.history.map((h) => (
              <div key={h.timestamp} className="space-y-3">
                <p className="text-gray-500 text-sm">
                  {formatTimestamp(h.timestamp)}
                </p>
                <ul className="list-disc pl-5">
                  {h.urls.map((url) => (
                    <li key={url}>
                      <a href={url}>{url}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No history</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetailsContent;
