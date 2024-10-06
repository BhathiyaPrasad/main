export const initializeMixedContent = () => {
  if (process.env.NODE_ENV === "development") {
    // Create a meta tag to allow mixed content
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "upgrade-insecure-requests";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }
};
