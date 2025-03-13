import { Temporal } from "@js-temporal/polyfill";

export const formatTimestamp = (timestamp: string) => {
  try {
    let instant: Temporal.Instant;

    // Check if timestamp is a numeric string or number (Unix timestamp)
    if (!isNaN(Number(timestamp))) {
      // Convert Unix timestamp (seconds) to nanoseconds for Temporal
      const epochNanoseconds = BigInt(Number(timestamp)) * 1_000_000_000n;
      instant = Temporal.Instant.fromEpochNanoseconds(epochNanoseconds);
    } else {
      // Try parsing as ISO string
      instant = Temporal.Instant.from(timestamp);
    }
    const timeZone = Temporal.Now.timeZoneId();

    // Convert to ZonedDateTime in user's timezone
    const zonedDateTime = instant.toZonedDateTimeISO(timeZone);
    return zonedDateTime.toPlainDateTime().toLocaleString();
    return instant.toLocaleString();
  } catch {
    return "Invalid timestamp";
  }
};
