/* Sanity content loader with the authored HTML as a safe fallback. */
(async () => {
  try {
    const query = encodeURIComponent('*[_type == "home"][0]{contactHeading,contactCopy,contacts[]{label,url,visible}}');
    const response = await fetch(`https://a6owxxb5.api.sanity.io/v2025-01-01/data/query/production?query=${query}`, {cache: 'no-store'});
    if (!response.ok) return;
    const content = (await response.json()).result;
    if (!content) return;
    const heading = document.querySelector('.contact h2');
    const copy = document.querySelector('.contact p');
    if (heading && content.contactHeading) {
      const parts = content.contactHeading.split('Web3.');
      heading.textContent = parts[0];
      if (parts.length > 1) { const em = document.createElement('em'); em.textContent = 'Web3.'; heading.appendChild(em); }
    }
    if (copy && content.contactCopy) copy.textContent = content.contactCopy;
    const links = [...document.querySelectorAll('.contact-links a')];
    (content.contacts || []).filter(item => item.visible !== false).forEach((item, index) => {
      const link = links[index]; if (!link) return;
      link.href = item.url; link.textContent = item.label;
    });
  } catch (_) { /* authored HTML remains the fallback */ }
})();
