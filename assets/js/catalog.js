/**
 * Trading Catalog Interactive Search & Filtering Engine
 * Bhairava Enterprises
 */

const TRADING_CATALOG = [
  // 1. Hydraulic Components
  {
    id: 'hc-01',
    name: 'High Pressure Hydraulic Hoses (1ST / 2ST / 4SH)',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Pressure: Up to 420 bar | Temp: -40°C to +100°C | Size: 1/4" to 2"',
    description: 'Heavy duty steel wire braided and spiral hydraulic hose assemblies with crimped end fittings.',
    badge: 'In Stock'
  },
  {
    id: 'hc-02',
    name: 'Quick Release Couplings (Spring Return)',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Body Material: Carbon Steel / SS316 | Valve: Poppet Spring Return | Pressure: 300 bar',
    description: 'Flat face and poppet type quick disconnect couplings for quick fluid lines connection.',
    badge: 'Popular'
  },
  {
    id: 'hc-03',
    name: 'Directional Control Valves (Solenoid / Manual)',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Spool Type: 4/3 & 4/2 Way | Flow: 60 - 120 lpm | Voltage: 24V DC / 220V AC',
    description: 'Subplate mounted directional control valves for hydraulic power pack automation.',
    badge: 'Industrial'
  },
  {
    id: 'hc-04',
    name: 'Custom Hydraulic Manifold Blocks',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Material: Ductile Iron / Aluminum | Ports: BSPP / SAE | Max Pressure: 350 bar',
    description: 'Precision CNC machined cartridge valve manifold blocks designed for compact circuits.',
    badge: 'Custom'
  },
  {
    id: 'hc-05',
    name: 'Glycerin Filled Pressure Gauges',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Dial Size: 63mm / 100mm | Range: 0 to 600 bar | Connection: 1/4" & 1/2" BSP',
    description: 'Vibration resistant glycerin filled pressure indicators with stainless steel casing.',
    badge: 'In Stock'
  },
  {
    id: 'hc-06',
    name: 'Hydraulic Gear & Vane Pumps',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Displacement: 4cc to 100cc/rev | Pressure: 250 bar | Speed: 500 - 3000 RPM',
    description: 'High efficiency hydraulic pumps engineered for continuous industrial machinery duties.',
    badge: 'High Spec'
  },
  {
    id: 'hc-07',
    name: 'High Pressure Micron Oil Filters',
    category: 'hydraulic-components',
    categoryName: 'Hydraulic Components',
    spec: 'Rating: 3μm, 10μm, 25μm | Type: Suction / Return / In-Line | Bypass: 3.5 bar',
    description: 'High dirt holding capacity filter elements protecting sensitive hydraulic valves.',
    badge: 'Essential'
  },

  // 2. Hydraulic Pipes, Adapters & Fittings
  {
    id: 'pf-01',
    name: 'Seamless Steel Hydraulic Tubes (DIN 2391)',
    category: 'pipes-fittings',
    categoryName: 'Pipes & Fittings',
    spec: 'Material: St 37.4 / St 52.4 | OD: 6mm to 42mm | Surface: Phosphated / Galvanized',
    description: 'Cold drawn seamless precision steel tubes for high pressure hydraulic piping.',
    badge: 'DIN Standard'
  },
  {
    id: 'pf-02',
    name: 'DIN 2353 Compression Fitting Adapters',
    category: 'pipes-fittings',
    categoryName: 'Pipes & Fittings',
    spec: 'Series: Light (L) & Heavy (S) | Connection: Metric / BSP / NPT | Steel CrVI-free',
    description: 'Bite-type tube fittings with cutting rings providing leak-proof joint connections.',
    badge: 'Leak-Proof'
  },
  {
    id: 'pf-03',
    name: 'SAE Split Flange Adapters (3000 & 6000 PSI)',
    category: 'pipes-fittings',
    categoryName: 'Pipes & Fittings',
    spec: 'Size: 1/2" to 3" | Flange Code: 61 & 62 | Material: Forged Carbon Steel',
    description: 'Heavy duty split flange connection sets for high shock hydraulic pipe routing.',
    badge: 'Heavy Duty'
  },

  // 3. Fasteners & Fabrication Consumables
  {
    id: 'fc-01',
    name: 'Grade 8.8 & 10.9 High Tensile Bolts & Nuts',
    category: 'fasteners-consumables',
    categoryName: 'Fasteners & Consumables',
    spec: 'Standards: DIN 933 / DIN 912 Socket Cap | Finish: Black / Zinc Plated',
    description: 'Structural high strength fastener hardware for hydraulic machinery mounting.',
    badge: 'High Tensile'
  },
  {
    id: 'fc-02',
    name: 'Heavy Fabrication Welding Rods & Wires',
    category: 'fasteners-consumables',
    categoryName: 'Fasteners & Consumables',
    spec: 'Types: E6013, E7018, ER70S-6 MIG wire | Sizes: 2.5mm to 4.0mm',
    description: 'Low-hydrogen welding consumables ensuring crack-resistant joints on pressure vessels.',
    badge: 'Tested'
  },
  {
    id: 'fc-03',
    name: 'Industrial Grinding & Cutting Discs',
    category: 'fasteners-consumables',
    categoryName: 'Fasteners & Consumables',
    spec: 'Diameter: 4" (100mm) & 7" (180mm) | Thickness: 1mm to 6mm',
    description: 'Reinforced abrasive wheels designed for fast steel pipe cutting and weld prep.',
    badge: 'Consumable'
  },

  // 4. Lubricants
  {
    id: 'lub-01',
    name: 'Anti-Wear Hydraulic Oil 68 (ISO VG 68)',
    category: 'lubricants',
    categoryName: 'Industrial Lubricants',
    spec: 'Viscosity Index: >95 | Pack Sizes: 20L Bucket & 210L Barrel | ISO Class: HM',
    description: 'Premium anti-wear hydraulic oil providing oxidation stability & thermal protection.',
    badge: 'Top Seller'
  },
  {
    id: 'lub-02',
    name: 'Anti-Wear Hydraulic Oil 46 (ISO VG 46)',
    category: 'lubricants',
    categoryName: 'Industrial Lubricants',
    spec: 'Viscosity Grade: 46 cSt @ 40°C | Anti-Foam / Rust Inhibited | DIN 51524 Part 2',
    description: 'Versatile hydraulic fluid for machine tools, power packs, and tipper systems.',
    badge: 'High Demand'
  },
  {
    id: 'lub-03',
    name: 'High Pressure Lithium Complex Grease',
    category: 'lubricants',
    categoryName: 'Industrial Lubricants',
    spec: 'NLGI Grade: 2 & 3 | Temp Range: -20°C to +160°C | EP Additive',
    description: 'Extreme pressure grease for heavy duty machine bearings, cylinder pins and joints.',
    badge: 'EP Grade'
  }
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
