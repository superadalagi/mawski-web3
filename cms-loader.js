/* CMS content loader. Falls back silently when content is unavailable. */
(async () => {
  try {
    const response = await fetch('/content/home.json', { cache: 'no-store' });
    if (!response.ok) return;
    const content = await response.json();
    const heading = document.querySelector('.contact h2');
    const copy = document.querySelector('.contact p');
    if (heading && content.contact_heading) {
      const parts = content.contact_heading.split('Web3.');
      heading.textContent = parts[0];
      if (parts.length > 1) {
        const em = document.createElement('em');
        em.textContent = 'Web3.';
        heading.appendChild(em);
      }
    }
    if (copy && content.contact_copy) copy.textContent = content.contact_copy;
    const links = [...document.querySelectorAll('.contact-links a')];
    (content.contacts || []).filter(item => item.visible !== false).forEach((item, index) => {
      const link = links[index];
      if (!link) return;
      link.href = item.url;
      link.textContent = item.label;
    });
  } catch (_) {
    // The authored HTML remains the offline fallback.
  }
})();
