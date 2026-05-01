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

initRetroForm("guestbook-form", "guestbook-submit", "guestbook-status");
