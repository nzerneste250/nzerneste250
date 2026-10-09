export function sectionContent(id: string) {
  const section = document.getElementById(id);
  if (!section) return null;
  const heading = section.querySelector<HTMLElement>(".section-title, #education-title");
  return { section, heading: heading || section };
}

export function sectionScrollTop(id: string, headerHeight: number) {
  if (id === "home") return 0;
  const content = sectionContent(id);
  if (!content) return null;
  const { section, heading } = content;
  const styles = getComputedStyle(section);
  const headingTop = heading.getBoundingClientRect().top + window.scrollY;
  const contentBottom = section.getBoundingClientRect().bottom + window.scrollY - parseFloat(styles.paddingBottom || "0");
  const contentHeight = contentBottom - headingTop;
  const available = window.innerHeight - headerHeight;
  // Center compact content only when it fits comfortably; long sections retain natural flow.
  const gap = id === "about" && contentHeight < available * .78
    ? Math.max(16, (available - contentHeight) / 2)
    : 16;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.max(0, Math.min(maxScroll, headingTop - headerHeight - gap));
}
