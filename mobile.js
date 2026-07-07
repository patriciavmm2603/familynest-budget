
(function familyNestMobileLayer() {
  const labels = {
    dashboard: "Dashboard",
    cashguard: "Keep in Account",
    template: "Base Template",
    budget: "Monthly Plan",
    transactions: "CSV Review",
    allowance: "Personal Money",
    debt: "Debt Tracker",
    income: "Income",
    compare: "Compare Months",
    closeout: "Closeout"
  };

  function clickExisting(selector) {
    const el = document.querySelector(selector);
    if (el) el.click();
  }

  function goToView(view) {
    const navButton = document.querySelector(`#nav [data-view="${view}"], #nav button[data-view="${view}"], [data-view="${view}"]`);
    if (navButton) navButton.click();
    document.body.classList.remove("fn-mobile-more-open");
    setTimeout(syncMobileUI, 80);
  }

  function syncMobileUI() {
    document.body.classList.add("fn-mobile-ready");

    const active = document.body.dataset.activeView || "dashboard";
    const label = document.querySelector("#fnMobileScreenLabel");
    if (label) label.textContent = labels[active] || "FamilyNest";

    document.querySelectorAll("[data-fn-mobile-view]").forEach(button => {
      button.classList.toggle("active", button.dataset.fnMobileView === active);
    });

    labelTableCells();
  }

  function labelTableCells() {
    document.querySelectorAll("table").forEach(table => {
      const headers = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim().replace(/\s+/g, " "));
      if (!headers.length) return;

      table.querySelectorAll("tbody tr").forEach(row => {
        Array.from(row.children).forEach((cell, index) => {
          if (!cell.getAttribute("data-label")) {
            cell.setAttribute("data-label", headers[index] || "");
          }
        });
      });
    });
  }

  document.addEventListener("click", event => {
    const viewButton = event.target.closest("[data-fn-mobile-view]");
    if (viewButton) {
      goToView(viewButton.dataset.fnMobileView);
      return;
    }

    if (event.target.closest(".fn-mobile-tools-btn") || event.target.closest(".fn-mobile-more-tab")) {
      document.body.classList.toggle("fn-mobile-more-open");
      return;
    }

    const actionButton = event.target.closest("[data-fn-mobile-action]");
    if (!actionButton) return;

    const action = actionButton.dataset.fnMobileAction;
    document.body.classList.remove("fn-mobile-more-open");

    if (action === "copy-month") clickExisting("#copyMonthBtn");
    if (action === "delete-month") clickExisting("#deleteMonthBtn");
    if (action === "export") clickExisting("#exportBtn");
    if (action === "logout") clickExisting("#logoutBtn");
    if (action === "refresh") location.reload();
  });

  document.addEventListener("change", event => {
    if (event.target && event.target.id === "fnMobileImportBackup") {
      const original = document.querySelector("#importBackup");
      if (original && event.target.files && event.target.files.length) {
        const dt = new DataTransfer();
        Array.from(event.target.files).forEach(file => dt.items.add(file));
        original.files = dt.files;
        original.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  });

  const observer = new MutationObserver(syncMobileUI);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-active-view"] });

  window.addEventListener("load", () => setTimeout(syncMobileUI, 250));
  window.addEventListener("resize", () => setTimeout(syncMobileUI, 150));
})();
