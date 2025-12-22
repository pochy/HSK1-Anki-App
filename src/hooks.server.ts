import type { HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = ({
  error,
  event,
  status,
  message,
}) => {
  // プリレンダリング時の base パス関連のエラーを抑制
  const errorMessage =
    message || (error instanceof Error ? error.message : "Unknown error");

  if (errorMessage.includes("does not begin with `base`")) {
    console.warn(
      "Suppressed base path error during prerendering:",
      errorMessage
    );
    return {
      message: "Navigation error suppressed",
      status: 404,
    };
  }

  return {
    message: errorMessage,
    status: status || 500,
  };
};
