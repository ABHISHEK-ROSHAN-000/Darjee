document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    const categoriesLink = document.querySelector('.categories-toggle');
    const categoriesWidget = document.getElementById("categoriesWidget");
    const searchInput = document.querySelector('.search-box input');
    const searchDropdown = document.getElementById("searchDropdown");

    // overlay element
    const overlay = document.getElementById('overlay');

    // helper: is any "panel" open?
    function anyPanelOpen() {
        const catOpen = categoriesWidget && (categoriesWidget.style.display === "flex");
        const searchOpen = searchDropdown && searchDropdown.classList.contains('active');
        const mobileOpen = mobileMenu && mobileMenu.classList.contains('active');
        return !!(catOpen || searchOpen || mobileOpen);
    }

    // show/hide overlay according to open panels
    function updateOverlay() {
        if (!overlay) return;
        const show = anyPanelOpen();
        overlay.classList.toggle('active', show);
        // keep aria in sync for accessibility
        overlay.setAttribute('aria-hidden', show ? 'false' : 'true');
    }

    // mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            updateOverlay();
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                updateOverlay();
            });
        });
    }

    // categories dropdown toggle
    if (categoriesLink && categoriesWidget) {
        categoriesLink.addEventListener("click", function (e) {
            e.preventDefault();
            categoriesWidget.style.display = (categoriesWidget.style.display === "flex") ? "none" : "flex";
            updateOverlay();
        });

        document.addEventListener("click", function (event) {
            if (!categoriesWidget.contains(event.target) && !categoriesLink.contains(event.target)) {
                categoriesWidget.style.display = "none";
                updateOverlay();
            }
        });
    }

    // search dropdown
    if (searchInput && searchDropdown) {
        searchInput.addEventListener("click", function (e) {
            e.stopPropagation();
            searchDropdown.classList.toggle("active");
            updateOverlay();
        });

        document.addEventListener("click", function (event) {
            if (!searchDropdown.contains(event.target) && !searchInput.contains(event.target)) {
                searchDropdown.classList.remove('active');
                updateOverlay();
            }
        });
    }

    // clicking overlay should close everything
    if (overlay) {
        overlay.addEventListener('click', function () {
            if (categoriesWidget) categoriesWidget.style.display = "none";
            if (searchDropdown) searchDropdown.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            updateOverlay();
        });
    }
});
