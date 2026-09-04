/**
 * Trading Catalog Interactive Search & Filtering Engine
 * Bhairava Enterprises
 */

const TRADING_CATALOG = [
  { id: "cat-01", name: "Hydraulic component enquiry", category: "hydraulic-components", categoryName: "Hydraulic Components", spec: "Provide the make, part number, quantity and application.", description: "Bhairava Enterprises reviews hydraulic component requirements against customer-supplied details.", badge: "By enquiry" },
  { id: "cat-02", name: "Pipe and fitting enquiry", category: "pipes-fittings", categoryName: "Pipes & Fittings", spec: "Provide the material, size, connection type and quantity.", description: "Pipe, adapter and fitting requirements are checked before a quotation is prepared.", badge: "By enquiry" },
  { id: "cat-03", name: "Fastener and consumable enquiry", category: "fasteners-consumables", categoryName: "Fasteners & Consumables", spec: "Provide the item description, grade if known, size and quantity.", description: "Industrial fastener and consumable enquiries are handled against the requested specification.", badge: "By enquiry" },
  { id: "cat-04", name: "Industrial lubricant enquiry", category: "lubricants", categoryName: "Industrial Lubricants", spec: "Provide the lubricant type, grade or equipment recommendation, pack size and quantity.", description: "Lubricant requirements are reviewed using the customer-supplied grade and equipment information.", badge: "By enquiry" }
];

/* Escapes catalog text before it is interpolated into an HTML template.
   Item specs legitimately contain `"` (e.g. `1/4" to 2"`), which would
   otherwise terminate the `data-subject` attribute early. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
  const catalogGrid = document.getElementById('catalogGrid');
  const searchInput = document.getElementById('catalogSearch');
  const filterBtns = document.querySelectorAll('.catalog-filter-btn');
  const resultsCount = document.getElementById('resultsCount');

  if (!catalogGrid) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function renderCatalog() {
    const q = searchQuery.trim().toLowerCase();

    const filtered = TRADING_CATALOG.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !q ||
                          item.name.toLowerCase().includes(q) ||
                          item.spec.toLowerCase().includes(q) ||
                          item.categoryName.toLowerCase().includes(q) ||
                          item.badge.toLowerCase().includes(q) ||
                          item.description.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${TRADING_CATALOG.length} industrial items`;
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <svg class="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <h4 class="text-lg font-semibold text-[#0B1046]">No Matching Industrial Items Found</h4>
          <p class="text-sm text-slate-600 mt-1">Try adjusting your search keywords or category filters.</p>
        </div>
      `;
      return;
    }

    catalogGrid.innerHTML = filtered.map(item => `
      <div class="card-industrial flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-xl transition-all duration-200">
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span class="badge-navy text-[11px]">${escapeHtml(item.categoryName)}</span>
            <span class="badge-orange text-[10px]">${escapeHtml(item.badge)}</span>
          </div>
          <h3 class="font-bold text-[#0B1046] text-base leading-snug mb-2">${escapeHtml(item.name)}</h3>
          <p class="text-xs text-slate-600 mb-3 leading-relaxed">${escapeHtml(item.description)}</p>

          <div class="spec-grid mb-4">
            <div class="spec-item">
              <span class="spec-label">Specification:</span>
              <span class="spec-value text-xs font-mono">${escapeHtml(item.spec)}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <a href="mailto:info@bhairavaent.com?subject=Enquiry%20for%20${encodeURIComponent(item.name)}"
             class="text-xs font-semibold text-[#0B1046] hover:text-[#E8531F] inline-flex items-center gap-1 transition-colors min-h-[2.75rem]">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Email Specs
          </a>
          <button type="button"
                  data-enquire-target
                  data-subject="${escapeHtml(item.name)}"
                  data-section="Trading Items"
                  class="btn-primary text-xs py-2 px-4">
            Enquire Now
          </button>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderCatalog();

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });

    // Pressing Enter/Go on a mobile keyboard should dismiss it, not reload
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchInput.blur();
      }
    });
  }

  // Filter category buttons
  filterBtns.forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-category') === activeCategory));

    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#0B1046]', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      btn.classList.add('bg-[#0B1046]', 'text-white');
      btn.setAttribute('aria-pressed', 'true');

      activeCategory = btn.getAttribute('data-category') || 'all';
      renderCatalog();
    });
  });
});
