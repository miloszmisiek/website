import { initDialup, escHtml } from "./utils";
import { initRetroForm } from "./form-states";

initDialup();

type GuestbookEntry = {
  name: string;
  location: string;
  message: string;
  date: string;
};

const tbody = document.getElementById("guestbook-table");
const loadingRow = document.getElementById("guestbook-loading");
const emptyMsg = tbody?.dataset.empty ?? "[No entries yet]";

fetch("/api/guestbook")
  .then((r) => r.json())
  .then((entries: GuestbookEntry[]) => {
    loadingRow?.remove();
    if (!entries.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="5" class="mono"><i>${emptyMsg}</i></td>`;
      tbody?.appendChild(tr);
      return;
    }
    entries.forEach((e, i) => {
      const date = e.date ? new Date(e.date).toLocaleDateString() : "—";
      const tr = document.createElement("tr");
      tr.innerHTML =
        `<td class="mono">${i + 1}</td>` +
        `<td><b>${escHtml(e.name)}</b></td>` +
        `<td><small>${escHtml(e.location)}</small></td>` +
        `<td>${escHtml(e.message)}</td>` +
        `<td class="mono"><small>${date}</small></td>`;
      tbody?.appendChild(tr);
    });
  })
  .catch(() => loadingRow?.remove());

initRetroForm("guestbook-form", "guestbook-submit", "guestbook-status", (data) => {
  const name = String(data.get("name") ?? "").trim();
  const location = String(data.get("location") ?? "").trim() || "—";
  const message = String(data.get("message") ?? "").trim();
  if (!tbody || !name || !message) return;

  tbody.querySelector("td[colspan]")?.closest("tr")?.remove();

  const existingRows = Array.from(tbody.querySelectorAll("tr:not(:first-child)"));
  existingRows.forEach((row, i) => {
    const numCell = row.querySelector("td.mono");
    if (numCell) numCell.textContent = String(i + 2);
  });

  const date = new Date().toLocaleDateString();
  const tr = document.createElement("tr");
  tr.innerHTML =
    `<td class="mono">1</td>` +
    `<td><b>${escHtml(name)}</b></td>` +
    `<td><small>${escHtml(location)}</small></td>` +
    `<td>${escHtml(message)}</td>` +
    `<td class="mono"><small>${date}</small></td>`;

  const firstDataRow = tbody.querySelector("tr:nth-child(2)");
  tbody.insertBefore(tr, firstDataRow ?? null);
});
