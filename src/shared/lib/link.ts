export const isOutboundHref = (href: string) => {
  if (href.startsWith("#")) return false;
  if (href.startsWith("/") && !href.startsWith("//")) return false;

  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
};

export const shouldOpenInNewTab = (href: string) => {
  if (isOutboundHref(href)) return true;
  if (href === "/resume") return true;

  return false;
};

export const getLinkTargetProps = (href: string) => {
  if (!shouldOpenInNewTab(href)) {
    return {};
  }

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer" as const,
  };
};
