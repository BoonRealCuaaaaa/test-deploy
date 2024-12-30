/**
 * Parses a duration string and returns the total duration in milliseconds.
 * The duration string can include values for milliseconds (ms), seconds (s),
 * minutes (m), hours (h), and days (d).
 *
 * @param duration - The duration string to parse.
 * @returns The total duration in milliseconds.
 */
const parseDuration = (duration: string) => {
  const units = {
    ms: 1,
    s: 1000,
    sec: 1000,
    secs: 1000,
    second: 1000,
    seconds: 1000,
    m: 60000,
    min: 60000,
    mins: 60000,
    minute: 60000,
    minutes: 60000,
    h: 3600000,
    hr: 3600000,
    hrs: 3600000,
    hour: 3600000,
    hours: 3600000,
    d: 86400000,
    day: 86400000,
    days: 86400000,
  };

  const regex =
    /(\d+\.?\d*)\s*(ms|s|sec|secs|second|seconds|m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days)/gi;
  let totalMilliseconds = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(duration)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (units[unit]) {
      totalMilliseconds += value * units[unit];
    }
  }

  return totalMilliseconds;
};

const DateTimeUtils = {
  parseDuration,
};

export default DateTimeUtils;
