(() => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("site-nav");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isUkrainian = document.documentElement.lang === "uk";
  const messages = isUkrainian ? {
    openNavigation: "Відкрити навігацію",
    closeNavigation: "Закрити навігацію",
    selected: (id) => `Демонстраційний приклад ${id} обрано. Показуємо контрольні етапи.`,
    awaitingApproval: (id) => `У демонстраційному прикладі ${id} перевірки завершено. Імпорт можливий лише в межах вашого дозволу. Реальні дії не виконуються.`
  } : {
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    selected: (id) => `Example ${id} selected. Illustrating delivery gates.`,
    awaitingApproval: (id) => `In example ${id}, checks are complete. Import stays within your authorization. No live actions are performed.`
  };

  const setMenuState = (open) => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? messages.closeNavigation : messages.openNavigation);
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const opening = menuToggle.getAttribute("aria-expanded") !== "true";
      setMenuState(opening);
      if (opening) {
        window.requestAnimationFrame(() => navigation.querySelector("a")?.focus());
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenuState(false);
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const scenarios = {
    change: {
      id: "APX–01",
      prompt: isUkrainian
        ? "Додайте звіт про статуси замовлень із фільтром за датою до мого тестового застосунку."
        : "Add an order status report with a date filter to my existing test application.",
      artifact: "order-status.apx"
    },
    create: {
      id: "APX–02",
      prompt: isUkrainian
        ? "Створіть клієнтську CRM із пошуком, формою редагування та дашбордом у моєму dev-середовищі."
        : "Create a customer CRM with search, an edit form and a dashboard in my development environment.",
      artifact: "customer-crm.apx"
    },
    repair: {
      id: "APX–03",
      prompt: isUkrainian
        ? "Виправте фільтр дашборду: він має оновлювати потрібні регіони. Перевірте взаємодію в тестовому застосунку."
        : "Fix the dashboard filter so it refreshes the affected regions. Verify the interaction in the test app.",
      artifact: "dashboard-filters.apx"
    }
  };

  const scenarioButtons = Array.from(document.querySelectorAll(".scenario-button"));
  const missionId = document.getElementById("mission-id");
  const missionPrompt = document.getElementById("mission-prompt");
  const artifactName = document.getElementById("artifact-name");
  const missionStatus = document.getElementById("mission-status");
  const gates = Array.from(document.querySelectorAll(".gate"));
  const gateTimers = [];
  let currentScenario = "change";
  let gateObserver = null;

  const clearGateTimers = () => {
    while (gateTimers.length) window.clearTimeout(gateTimers.pop());
  };

  const finishGateSequence = (scenarioKey) => {
    gates.slice(0, -1).forEach((gate) => gate.classList.add("is-complete"));
    const finalGate = gates.at(-1);
    if (finalGate) finalGate.classList.add("is-hold");
    if (missionStatus) {
      missionStatus.textContent = messages.awaitingApproval(scenarios[scenarioKey].id);
    }
  };

  const runGateSequence = (scenarioKey = "change") => {
    clearGateTimers();
    gates.forEach((gate) => gate.classList.remove("is-complete", "is-hold"));

    if (prefersReducedMotion.matches) {
      finishGateSequence(scenarioKey);
      return;
    }

    gates.forEach((gate, index) => {
      gateTimers.push(window.setTimeout(() => {
        if (index === gates.length - 1) {
          gate.classList.add("is-hold");
          if (missionStatus) {
            missionStatus.textContent = messages.awaitingApproval(scenarios[scenarioKey].id);
          }
        } else {
          gate.classList.add("is-complete");
        }
      }, 260 + index * 430));
    });
  };

  const selectScenario = (scenarioKey) => {
    const scenario = scenarios[scenarioKey];
    if (!scenario) return;
    currentScenario = scenarioKey;
    gateObserver?.disconnect();
    gateObserver = null;

    scenarioButtons.forEach((button) => {
      const selected = button.dataset.scenario === scenarioKey;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (missionId) missionId.textContent = scenario.id;
    if (missionPrompt) missionPrompt.textContent = scenario.prompt;
    if (artifactName) artifactName.textContent = scenario.artifact;
    if (missionStatus) missionStatus.textContent = messages.selected(scenario.id);
    runGateSequence(scenarioKey);
  };

  scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => selectScenario(button.dataset.scenario));
  });

  const workOrder = document.querySelector(".work-order");
  if (workOrder && "IntersectionObserver" in window) {
    gateObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      gateObserver.disconnect();
      gateObserver = null;
      runGateSequence(currentScenario);
    }, { threshold: 0.3 });
    gateObserver.observe(workOrder);
  } else if (workOrder) {
    runGateSequence(currentScenario);
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
