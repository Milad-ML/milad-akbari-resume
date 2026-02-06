// Smooth in-page navigation and section switching
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      // Set active nav
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show target section
      sections.forEach((section) => {
        section.classList.toggle(
          "active-section",
          section.id === targetId
        );
      });

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
  const defaultNav = document.querySelector('.nav-link[data-target="experience"]');
  if (defaultNav) defaultNav.classList.add("active");

  // Accordion behavior
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((acc) => {
    const header = acc.querySelector(".accordion-header");
    const body = acc.querySelector(".accordion-body");

    // Start with first accordion in each section open (optional)
    const parentSection = acc.closest(".section");
    const firstInSection =
      parentSection && parentSection.querySelector(".accordion") === acc;

    if (firstInSection) {
      acc.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
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
          sibBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (!isOpen) {
        acc.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        acc.classList.remove("open");
        body.style.maxHeight = null;
      }
    });
  });

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});