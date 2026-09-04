/* Site interactions: navigation, modal, validation and status messages. */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initEnquiryModal();
  initFormValidation();
  setActiveNavLink();
});

/* Scroll lock shared by the drawer and the modal.
   Reference counted so closing one while the other is open does not release
   the lock early. Locks html as well as body — iOS Safari ignores
   `overflow:hidden` on body alone. */
let scrollLockCount = 0;

function lockScroll() {
  scrollLockCount += 1;
  if (scrollLockCount === 1) {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }
}

function keepFocusInside(event, container) {
  if (event.key !== 'Tab') return;
  const items = [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(item => !item.hidden && item.offsetParent !== null);
  if (!items.length) return;

  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* Sticky Header Scroll Effect */
function initStickyHeader() {
  const header = document.querySelector('.header-sticky');
  if (!header) return;

  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      header.classList.toggle('header-scrolled', window.scrollY > 20);
      ticking = false;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  header.classList.toggle('header-scrolled', window.scrollY > 20);
}

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileMenuCloseBtn');

  if (!toggleBtn || !drawer) return;

  let isOpen = false;

  const openDrawer = () => {
    if (isOpen) return;
    isOpen = true;
    drawer.classList.remove('translate-x-full');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    lockScroll();
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    if (!isOpen) return;
    isOpen = false;
    drawer.classList.add('translate-x-full');
    drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
    unlockScroll();
  };

  // Start closed so the off-screen links are not tab-reachable
  drawer.setAttribute('aria-hidden', 'true');
  toggleBtn.setAttribute('aria-expanded', 'false');

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDrawer();
      toggleBtn.focus();
    }
    if (isOpen) keepFocusInside(e, drawer);
  });

  // Close menu on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Rotating the phone to landscape can cross the md breakpoint, leaving the
  // drawer open over a desktop layout with the scroll still locked.
  const desktopQuery = window.matchMedia('(min-width: 768px)');
  const handleBreakpoint = (e) => {
    if (e.matches) closeDrawer();
  };

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', handleBreakpoint);
  } else if (typeof desktopQuery.addListener === 'function') {
    desktopQuery.addListener(handleBreakpoint);
  }
}

/* Universal Enquiry Modal Handler */
function initEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;

  modal.setAttribute('aria-hidden', 'true');

  // Global triggers for modal buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-enquire-target]');
    if (trigger) {
      e.preventDefault();
      const subject = trigger.getAttribute('data-subject') || 'General Industrial Enquiry';
      const section = trigger.getAttribute('data-section') || 'General';
      openEnquiryModal(subject, section, trigger);
    }
  });

  modal.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeEnquiryModal);
  });

  // Tapping the dimmed backdrop closes the dialog — the expected gesture on
  // mobile, where the small X is an awkward target.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEnquiryModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeEnquiryModal();
    }
    if (!modal.classList.contains('hidden')) keepFocusInside(e, modal);
  });
}

/* Element that opened the modal, so focus can be restored on close */
let modalReturnFocus = null;

function openEnquiryModal(subject, section, trigger) {
  const modal = document.getElementById('enquiryModal');
  if (!modal || !modal.classList.contains('hidden')) return;

  const reqField = modal.querySelector('#modal_requirement');
  const sectionField = modal.querySelector('#modal_originating_section');
  const modalTitle = modal.querySelector('#modalSubjectTitle');

  if (reqField && subject) {
    reqField.value = `Enquiry regarding: ${subject}`;
  }
  if (sectionField) {
    sectionField.value = section || 'Website Modal';
  }
  if (modalTitle) {
    modalTitle.textContent = `Enquire: ${subject}`;
  }

  modalReturnFocus = trigger || null;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.setAttribute('aria-hidden', 'false');
  lockScroll();

  // Focus the first text field. `preventScroll` stops mobile Safari from
  // scrolling the locked page behind the dialog.
  const firstInput = modal.querySelector('input:not([type="hidden"])');
  if (firstInput) firstInput.focus({ preventScroll: true });
}

function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  if (!modal || modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.setAttribute('aria-hidden', 'true');
  unlockScroll();

  if (modalReturnFocus && document.contains(modalReturnFocus)) {
    modalReturnFocus.focus({ preventScroll: true });
  }
  modalReturnFocus = null;
}

/* Client-side Form Validation */
function initFormValidation() {
  const forms = document.querySelectorAll('.js-validate-form');

  forms.forEach(form => {
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    const isWeb3FormsTarget = /api\.web3forms\.com\/submit\/?$/i.test(form.action);

    // Clear a field's error as soon as it is corrected, rather than leaving
    // stale red text until the next submit attempt.
    fields.forEach(field => {
      const clearIfValid = () => {
        if (!getFieldError(field)) clearFieldError(field);
      };
      field.addEventListener('input', clearIfValid);
      field.addEventListener('change', clearIfValid);
    });

    form.addEventListener('submit', (e) => {
      let firstInvalid = null;

      fields.forEach(field => {
        const msg = getFieldError(field);
        if (msg) {
          showFieldError(field, msg);
          if (!firstInvalid) firstInvalid = field;
        } else {
          clearFieldError(field);
        }
      });

      if (firstInvalid) {
        e.preventDefault();
        // Scroll the first problem into view — on a phone the invalid field is
        // often well off-screen from the submit button.
        firstInvalid.focus({ preventScroll: true });
        firstInvalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      if (isWeb3FormsTarget) {
        // Deliberately NOT submitted over fetch/XHR. The Web3Forms endpoint
        // returns no Access-Control-Allow-Origin header, so an AJAX POST is
        // sent but its response is blocked by CORS and the visitor sees
        // "Failed to fetch" even though the enquiry was delivered. A native
        // form POST is a top-level navigation and is exempt from CORS, so the
        // browser follows the `redirect` hidden field to the thank-you page.
        // This also keeps the form working with JavaScript disabled.
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          // Guard against double submission while the navigation is in flight
          submitBtn.setAttribute('disabled', 'true');
          submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
          submitBtn.textContent = 'Sending…';

          // If the navigation is blocked or the user returns via the back
          // button, restore the button rather than leaving it dead.
          setTimeout(() => {
            submitBtn.removeAttribute('disabled');
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            submitBtn.textContent = 'Send Requirement';
          }, 10000);
        }

        return; // let the native submit proceed
      }

      e.preventDefault();

      const nameVal = form.querySelector('[name="name"]')?.value.trim() || 'Customer';

      if (form.id === 'modalEnquiryForm') {
        closeEnquiryModal();
      }

      showToast(`Thank you, ${nameVal}! Your enquiry has been sent to Bhairava Enterprises. Our engineering team will contact you promptly.`, 'success');
      form.reset();
    });
  });
}

function getFieldError(field) {
  const value = field.value.trim();

  if (!value) return 'This field is required';
  if (field.type === 'email' && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }
  if (field.type === 'tel' && !validatePhone(value)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return '';
}

function showFieldError(field, msg) {
  const parent = field.parentElement;
  if (!parent) return;

  field.classList.add('border-red-500');
  field.setAttribute('aria-invalid', 'true');

  let errEl = parent.querySelector('.error-msg');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'error-msg text-xs text-red-600 mt-1 block';
    parent.appendChild(errEl);
  }
  errEl.textContent = msg;
}

function clearFieldError(field) {
  field.classList.remove('border-red-500');
  field.removeAttribute('aria-invalid');

  const errEl = field.parentElement?.querySelector('.error-msg');
  if (errEl) errEl.remove();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  // Accept a 10-digit Indian mobile with optional +91 / 0 prefix and any
  // spacing, dashes or brackets the user types.
  const digits = phone.replace(/\D/g, '');
  return /^(?:91|0)?[6-9]\d{9}$/.test(digits);
}

/* Toast Notification Utility */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    // Positioning lives in styles.css so it stays inside the viewport on
    // phones instead of hanging off the left edge.
    toastContainer.setAttribute('role', 'status');
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `p-4 rounded-lg shadow-xl text-white font-medium flex items-start justify-between gap-3 transition-all duration-300 transform translate-y-4 opacity-0 ${
    type === 'success' ? 'bg-[#0B1046] border-l-4 border-[#E8531F]' : 'bg-red-600'
  }`;

  const body = document.createElement('div');
  body.className = 'flex items-start gap-3 min-w-0';
  body.innerHTML = `
    <svg class="w-6 h-6 text-[#E8531F] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `;

  // textContent, not innerHTML — `message` embeds a value the visitor typed
  // into the name field, so interpolating it as markup would execute it.
  const text = document.createElement('span');
  text.className = 'text-sm leading-snug break-words';
  text.textContent = message;
  body.appendChild(text);

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'text-gray-300 hover:text-white font-bold text-lg leading-none flex-shrink-0 p-1 -m-1';
  dismiss.setAttribute('aria-label', 'Dismiss notification');
  dismiss.textContent = '×';
  dismiss.addEventListener('click', () => toast.remove());

  toast.append(body, dismiss);
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 6000);
}

/* Set Active Nav Link based on Current Page */
function setActiveNavLink() {
  // Tolerates `/`, `/index.html` and extensionless routes like `/about`
  const file = window.location.pathname.split('/').pop() || 'index.html';
  const currentPage = file.replace(/\.html$/, '') || 'index';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    const linkPage = href.replace(/\.html$/, '');
    const isActive = linkPage === currentPage;

    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
