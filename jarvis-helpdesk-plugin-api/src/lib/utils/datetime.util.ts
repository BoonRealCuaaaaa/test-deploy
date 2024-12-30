import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * Parses a duration string and returns the total duration in milliseconds.
 * The duration string can include values for milliseconds (ms), seconds (s),
 * minutes (m), hours (h), and days (d).
 *
 * @param durationStr - The duration string to parse.
 * @returns The total duration in milliseconds.
 */
const parseDuration = (durationStr: string): number => {
  const units: { [key: string]: number } = {
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

  while ((match = regex.exec(durationStr)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (units[unit]) {
      totalMilliseconds += value * units[unit];
    }
  }

  return totalMilliseconds;
};

/**
 * Formats a Date object to a relative time string.
 *
 * @param date - The date to format.
 * @returns A string representing the relative time.
 */
const formatDateToString = (date: Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Formats a duration in seconds to a human-readable string.
 *
 * @param seconds - The duration in seconds.
 * @returns A formatted duration string.
 */
const formatDurationToString = (seconds: number): string => {
  const dur = dayjs.duration(seconds * 1000);
  let formatted = '';
  let count = 0;

  if (dur.days() > 0 && count < 2) {
    formatted += `${dur.days()} days `;
    count++;
  }

  if (dur.hours() > 0 && count < 2) {
    formatted += `${dur.hours()} hours `;
    count++;
  }

  if (dur.minutes() > 0 && count < 2) {
    formatted += `${dur.minutes()} minutes `;
    count++;
  }

  if (dur.seconds() > 0 && count < 2) {
    formatted += `${dur.seconds()} seconds`;
  }
  return formatted.trim();
};

const DateTimeUtils = {
  parseDuration,
  formatDateToString,
  formatDurationToString,
};

export default DateTimeUtils;
