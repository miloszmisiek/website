export function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function initDialup(): void {
  const d = document.getElementById("dialup");
  if (!d) return;
  const hide = () => { d.style.display = "none"; };
  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide);
  }
}
