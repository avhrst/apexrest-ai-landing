(() => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("site-nav");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setMenuState = (open) => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
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
    vendor: {
      id: "AR–042",
      prompt: "Build vendor onboarding with approval limits and a complete audit trail.",
      artifact: "vendor-onboarding.apx"
    },
    service: {
      id: "AR–117",
      prompt: "Create an SLA service console with escalation rules and workload visibility.",
      artifact: "service-operations.apx"
    },
    field: {
      id: "AR–208",
      prompt: "Create a mobile inspection workflow with evidence capture and supervisor review.",
      artifact: "field-inspections.apx"
    }
  };

  const scenarioButtons = Array.from(document.querySelectorAll(".scenario-button"));
  const missionId = document.getElementById("mission-id");
  const missionPrompt = document.getElementById("mission-prompt");
  const artifactName = document.getElementById("artifact-name");
  const missionStatus = document.getElementById("mission-status");
  const gates = Array.from(document.querySelectorAll(".gate"));
  const gateTimers = [];

  const clearGateTimers = () => {
    while (gateTimers.length) window.clearTimeout(gateTimers.pop());
  };

  const finishGateSequence = (scenarioKey) => {
    gates.slice(0, -1).forEach((gate) => gate.classList.add("is-complete"));
    const finalGate = gates.at(-1);
    if (finalGate) finalGate.classList.add("is-hold");
    if (missionStatus) {
      missionStatus.textContent = `${scenarios[scenarioKey].id} passed the automated checks and is waiting at the human approval gate.`;
    }
  };

  const runGateSequence = (scenarioKey = "vendor") => {
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
            missionStatus.textContent = `${scenarios[scenarioKey].id} passed the automated checks and is waiting at the human approval gate.`;
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

    scenarioButtons.forEach((button) => {
      const selected = button.dataset.scenario === scenarioKey;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (missionId) missionId.textContent = scenario.id;
    if (missionPrompt) missionPrompt.textContent = scenario.prompt;
    if (artifactName) artifactName.textContent = scenario.artifact;
    if (missionStatus) missionStatus.textContent = `${scenario.id} selected. Running delivery gates.`;
    runGateSequence(scenarioKey);
  };

  scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => selectScenario(button.dataset.scenario));
  });

  const workOrder = document.querySelector(".work-order");
  if (workOrder && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      runGateSequence("vendor");
    }, { threshold: 0.3 });
    observer.observe(workOrder);
  } else if (workOrder) {
    runGateSequence("vendor");
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
