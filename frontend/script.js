const API_BASE_URL = "http://localhost:5000";

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "×" : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  });
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  const data = Object.fromEntries(new FormData(form));
  button.disabled = true;
  status.textContent = "Sending…";

  try {
    const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Request failed");
    form.reset();
    status.textContent = "Message received. Thank you!";
  } catch (error) {
    status.innerHTML = 'Backend is offline. <a href="mailto:miftahuahmad86@gmail.com">Email MifTech directly ↗</a>';
  } finally {
    button.disabled = false;
  }
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55%" });
sections.forEach(section => observer.observe(section));
