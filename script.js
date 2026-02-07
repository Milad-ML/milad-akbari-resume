// Smooth in-page navigation and section switching
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  const setActiveSection = (targetId) => {
    navButtons.forEach((btn) => {
      const isActive = btn.getAttribute("data-target") === targetId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-current", isActive ? "page" : "false");
    });

    sections.forEach((section) => {
      const isTarget = section.id === targetId;
      section.classList.toggle("active-section", isTarget);
      section.setAttribute("aria-hidden", isTarget ? "false" : "true");
    });
  };

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      setActiveSection(targetId);

      // Smooth scroll slightly above section
      const yOffset = -12;
      const y =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Default active nav
  setActiveSection("experience");

  // Accordion behavior
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((acc) => {
    const header = acc.querySelector(".accordion-header");
    const body = acc.querySelector(".accordion-body");
    const bodyId = `accordion-body-${Math.random().toString(36).slice(2, 10)}`;

    body.id = bodyId;
    header.setAttribute("aria-controls", bodyId);
    header.setAttribute("aria-expanded", "false");

    // Start with first accordion in each section open (optional)
    const parentSection = acc.closest(".section");
    const firstInSection =
      parentSection && parentSection.querySelector(".accordion") === acc;

    if (firstInSection) {
      acc.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
      header.setAttribute("aria-expanded", "true");
    }

    header.addEventListener("click", () => {
      const isOpen = acc.classList.contains("open");

      // Close others in the same section (accordion group behavior)
      const siblings = parentSection
        ? parentSection.querySelectorAll(".accordion")
        : [];
      siblings.forEach((sib) => {
        if (sib !== acc) {
          sib.classList.remove("open");
          const sibBody = sib.querySelector(".accordion-body");
          const sibHeader = sib.querySelector(".accordion-header");
          sibBody.style.maxHeight = null;
          sibHeader.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current
      if (!isOpen) {
        acc.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      } else {
        acc.classList.remove("open");
        body.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
