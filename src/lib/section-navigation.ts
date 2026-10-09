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
  // Keep the heading consistently below the measured sticky header. Do not center
  // short sections: that creates avoidable blank space and differs from native hashes.
  const gap = Math.max(16, Math.min(28, parseFloat(styles.paddingTop || "0") * .2));
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.max(0, Math.min(maxScroll, headingTop - headerHeight - gap));
}
