import type { HandleServerError, HandleHttpError } from "@sveltejs/kit";

export const handleError: HandleServerError = ({ error, event }) => {
  // プリレンダリング時の base パス関連のエラーを抑制
  if (error instanceof Error && error.message.includes("does not begin with `base`")) {
    console.warn("Suppressed base path error during prerendering:", error.message);
    return {
      message: "Navigation error suppressed",
      status: 404,
    };
  }
  return {
    message: error instanceof Error ? error.message : "Unknown error",
    status: 500,
  };
};

export const handleHttpError: HandleHttpError = ({ error, event, status, message }) => {
  // プリレンダリング時の base パス関連のエラーを抑制
  if (message && message.includes("does not begin with `base`")) {
    console.warn("Suppressed base path error during prerendering:", message);
    return {
      message: "Navigation error suppressed",
      status: 404,
    };
  }
  return {
    message: message || "Unknown error",
    status: status || 500,
  };
};

