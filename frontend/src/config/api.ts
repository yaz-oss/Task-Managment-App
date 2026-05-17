const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiUrl = (path: string) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const getGoogleAuthUrl = () => {
  const url = new URL(apiUrl("/auth/google"));

  if (typeof window !== "undefined") {
    url.searchParams.set("returnTo", window.location.origin);
  }

  return url.toString();
};
