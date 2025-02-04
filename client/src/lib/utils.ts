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
    } else {
      toast.error(error.data as string, { id: "error_data" });
    }
  }
  if (error && "originalStatus" in error) {
    if (error.originalStatus >= 500) {
      toast.error("Unexpected Error Happened", { id: "unexpected_error" });
    } else {
      toast.error(error.data, { id: "error_data" });
    }
  }
}
