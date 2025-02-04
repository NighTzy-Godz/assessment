import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderError(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  if (error && "status" in error) {
    if ((error.status as number) >= 500) {
      toast.error("Unexpected Error Happened", { id: "unexpected_error" });
      return;
    } else {
      toast.error(error.data as string, { id: "error_data" });
    }
  }
  if (error && "originalStatus" in error) {
    if (error.originalStatus >= 500) {
      toast.error("Unexpected Error Happened", { id: "unexpected_error" });
      return;
    } else {
      toast.error(error.data, { id: "error_data" });
    }
  }
}

export function setStorageItem(name: string, value: any) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(name, serializedValue);
  } catch (error) {
    console.error(`Error setting item ${name} in localStorage:`, error);
  }
}

export function getStorageItem(name: string) {
  try {
    const serializedValue = localStorage.getItem(name);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting item ${name} from localStorage:`, error);
    return null;
  }
}

export function removeStorageItem(name: string) {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error(`Error removing item ${name} from localStorage:`, error);
  }
}
