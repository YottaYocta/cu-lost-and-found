import { Timestamp } from "firebase/firestore";

export const formatTimestamp: (timeStamp: Timestamp) => string = (
  timeStamp: Timestamp
) => {
  const postDate = timeStamp.toDate();
  const formattedTime = postDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedTime;
};

export const getDayDifference: (startDay: Date, endDay: Date) => number = (
  startDay: Date,
  endDay: Date
) => {
  const timeDifference = endDay.getTime() - startDay.getTime();
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysAgo;
};
