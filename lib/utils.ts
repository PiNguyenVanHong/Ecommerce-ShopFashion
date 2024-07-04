import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const formatter = new Intl.NumberFormat("vn-VN", {
  style: 'currency',
  currency: 'VND'
});

export const formatter2 = new Intl.NumberFormat("vi-VN", {
  style: 'currency',
  currency: 'VND',
});
