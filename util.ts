import { Timestamp } from "firebase/firestore";

export const formatDate: (postDate: Date) => string = (postDate: Date) => {
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

export const SM_IMAGE_SIZE = 150;
export const LG_IMAGE_SIZE = 250;

export const chainFilter = <T>(arr: T[], filters: ((T) => boolean)[]) => {
  filters.forEach((filter) => {
    let temp = arr.filter(filter);
    arr = temp;
    console.log(temp);
  });
  return arr;
};
