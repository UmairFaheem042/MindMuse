import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(number) {
  return number === 1 ? "1 view" : `${number} views`;
}

export function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}