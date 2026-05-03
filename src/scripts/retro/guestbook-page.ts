import { initDialup, escHtml } from "./utils";
import { initRetroForm } from "./form-states";

initDialup();

type GuestbookEntry = {
  name: string;
  location: string;
  message: string;
  date: string;
};

type GuestbookResponse = {
  entries: GuestbookEntry[];
  hasMore: boolean;
};

const tbody = document.getElementById("guestbook-table");
const loadingRow = document.getElementById("guestbook-loading");
const emptyMsg = tbody?.dataset.empty ?? "[No entries yet]";
const ctaLabel = tbody?.dataset.cta ?? "[ SIGN THE GUESTBOOK ]";

const cards = document.getElementById("guestbook-cards") as HTMLElement | null;
const cardsLoadingEl = document.getElementById("guestbook-cards-loading");
const labelLocation = cards?.dataset.labelLocation ?? "Location";
const labelMessage = cards?.dataset.labelMessage ?? "Message";
const labelDate = cards?.dataset.labelDate ?? "Date";

const loadMoreWrap = document.getElementById("guestbook-load-more-wrap") as HTMLElement | null;
const loadMoreBtn = document.getElementById("guestbook-load-more") as HTMLButtonElement | null;
const labelLoad = loadMoreBtn?.dataset.labelLoad ?? "[ LOAD MORE ]";
const labelLoading = loadMoreBtn?.dataset.labelLoading ?? "[ LOADING... ]";

let currentPage = 1;
let totalLoaded = 0;

function makeCard(e: GuestbookEntry): HTMLElement {
  const date = e.date ? new Date(e.date).toLocaleDateString() : "—";
  const card = document.createElement("div");
  card.className = "retro-card";
  card.innerHTML =
    `<div class="card-head"><b>${escHtml(e.name)}</b></div>` +
    `<div class="card-field" data-label="${escHtml(labelLocation)}"><small>${escHtml(e.location)}</small></div>` +
    `<div class="card-field" data-label="${escHtml(labelMessage)}">${escHtml(e.message)}</div>` +
    `<div class="card-field" data-label="${escHtml(labelDate)}"><span class="mono"><small>${date}</small></span></div>`;
  return card;
}

function showEmptyState() {
  const emptyInner =
    `<div style="text-align:center; padding:20px 12px;">` +
    `<div style="font-family:'VT323',serif; font-size:36px; color:#000080; letter-spacing:2px;">&gt;_&lt;</div>` +
    `<div style="margin:8px 0 4px; font-family:'VT323',serif; font-size:20px;">${emptyMsg}</div>` +
    `<div style="margin-top:14px;"><a href="#guestbook-form" class="retro-btn">${escHtml(ctaLabel)}</a></div>` +
    `</div>`;
  const tr = document.createElement("tr");
  tr.innerHTML = `<td colspan="5">${emptyInner}</td>`;
  tbody?.appendChild(tr);
  const div = document.createElement("div");
  div.className = "bevel-in";
  div.style.cssText = "display:block; margin:8px 0;";
  div.innerHTML = emptyInner;
  cards?.appendChild(div);
}

function setLoadMoreVisible(visible: boolean) {
  if (loadMoreWrap) loadMoreWrap.style.display = visible ? "block" : "none";
}

function loadPage(page: number) {
  if (loadMoreBtn) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = labelLoading;
  }

  fetch(`/api/guestbook?page=${page}`)
    .then((r) => r.json())
    .then(({ entries, hasMore }: GuestbookResponse) => {
      if (page === 1) {
        loadingRow?.remove();
        cardsLoadingEl?.remove();
      }

      if (!entries.length && page === 1) {
        showEmptyState();
        setLoadMoreVisible(false);
        return;
      }

      entries.forEach((e, i) => {
        const date = e.date ? new Date(e.date).toLocaleDateString() : "—";
        const num = totalLoaded + i + 1;
        const tr = document.createElement("tr");
        tr.innerHTML =
          `<td class="mono">${num}</td>` +
          `<td><b>${escHtml(e.name)}</b></td>` +
          `<td><small>${escHtml(e.location)}</small></td>` +
          `<td>${escHtml(e.message)}</td>` +
          `<td class="mono"><small>${date}</small></td>`;
        tbody?.appendChild(tr);
        cards?.appendChild(makeCard(e));
      });

      totalLoaded += entries.length;
      currentPage = page;

      setLoadMoreVisible(hasMore);
      if (loadMoreBtn) {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = labelLoad;
      }
    })
    .catch(() => {
      if (page === 1) {
        loadingRow?.remove();
        cardsLoadingEl?.remove();
        showEmptyState();
      }
      setLoadMoreVisible(false);
      if (loadMoreBtn) {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = labelLoad;
      }
    });
}

loadPage(1);

loadMoreBtn?.addEventListener("click", () => {
  loadPage(currentPage + 1);
});

initRetroForm("guestbook-form", "guestbook-submit", "guestbook-status", (data) => {
  const name = String(data.get("name") ?? "").trim();
  const location = String(data.get("location") ?? "").trim() || "—";
  const message = String(data.get("message") ?? "").trim();
  if (!name || !message) return;

  const date = new Date().toLocaleDateString();

  if (tbody) {
    tbody.querySelector("td[colspan]")?.closest("tr")?.remove();

    const existingRows = Array.from(tbody.querySelectorAll("tr:not(:first-child)"));
    existingRows.forEach((row, i) => {
      const numCell = row.querySelector("td.mono");
      if (numCell) numCell.textContent = String(i + 2);
    });

    const tr = document.createElement("tr");
    tr.innerHTML =
      `<td class="mono">1</td>` +
      `<td><b>${escHtml(name)}</b></td>` +
      `<td><small>${escHtml(location)}</small></td>` +
      `<td>${escHtml(message)}</td>` +
      `<td class="mono"><small>${date}</small></td>`;

    const firstDataRow = tbody.querySelector("tr:nth-child(2)");
    tbody.insertBefore(tr, firstDataRow ?? null);
  }

  if (cards) {
    cards.querySelector("p.mono")?.remove();
    const entry: GuestbookEntry = { name, location, message, date };
    const card = makeCard(entry);
    cards.insertBefore(card, cards.firstChild);
  }

  totalLoaded += 1;
});
