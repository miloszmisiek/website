export function initRetroForm(
  formId: string,
  submitId: string,
  statusId: string,
  onSuccess?: (data: FormData) => void,
  validate?: (data: FormData) => string | null
): void {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const submitBtn = document.getElementById(submitId) as HTMLInputElement | null;
  const statusBox = document.getElementById(statusId);
  if (!form || !submitBtn || !statusBox) return;

  function showStatus(type: "success" | "error", overrideMsg?: string): void {
    statusBox!.className = `guestbook-status guestbook-status--${type}`;
    if (type === "success") {
      const sub = statusBox!.dataset.successSub
        ? `<p>${statusBox!.dataset.successSub}</p>`
        : "";
      statusBox!.innerHTML = `<p class="blink"><b>${statusBox!.dataset.success ?? ""}</b></p>${sub}`;
    } else {
      const msg = overrideMsg ?? statusBox!.dataset.error ?? "";
      statusBox!.innerHTML = `<p><b>${msg}</b></p>
        <button type="button" class="retro-retry-btn">${statusBox!.dataset.tryAgain ?? ""}</button>`;
      statusBox!.querySelector(".retro-retry-btn")?.addEventListener("click", reset);
    }
    statusBox!.style.display = "block";
  }

  function reset(): void {
    statusBox!.style.display = "none";
    statusBox!.className = "guestbook-status";
    form!.style.display = "";
    submitBtn!.disabled = false;
    submitBtn!.value = submitBtn!.dataset.originalValue ?? "";
  }

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(form);

    if (validate) {
      const err = validate(formData);
      if (err) {
        showStatus("error", err);
        return;
      }
    }

    submitBtn.dataset.originalValue = submitBtn.value;
    submitBtn.value = submitBtn.dataset.submitting ?? "[ SENDING... ]";
    submitBtn.disabled = true;
    form.style.display = "none";
    const body = new URLSearchParams();
    formData.forEach((v, k) => body.append(k, String(v)));

    try {
      const res = await fetch(window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        onSuccess?.(formData);
        showStatus("success");
      } else {
        form.style.display = "";
        submitBtn.disabled = false;
        submitBtn.value = submitBtn.dataset.originalValue ?? "";
        showStatus("error");
      }
    } catch {
      form.style.display = "";
      submitBtn.disabled = false;
      submitBtn.value = submitBtn.dataset.originalValue ?? "";
      showStatus("error");
    }
  });
}
