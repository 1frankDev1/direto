document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('directorySearch');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('directoryResults');
    const categoryContainer = document.getElementById('categoryChips');
    const sidebarLocations = document.getElementById('sidebarLocations');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    // Helpers
    const escapeHtml = (unsafe) => {
        if (!unsafe) return "";
        return unsafe.toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };
    const slugify = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

    // Modal elements
    const menuModalEl = document.getElementById('menuModal');
    const menuModal = new bootstrap.Modal(menuModalEl);
    const menuModalLabel = document.getElementById('menuModalLabel');
    const menuIframe = document.getElementById('menuIframe');

    let currentCity = 'tijuana'; // Default to Tijuana
    let currentCategory = '';
    let renderTimeout;
    let allDirectoryData = [];

    // Fetch data from Supabase + Local
    async function loadAllData() {
        allDirectoryData = await getBusinesses();
        initLocations();
        initCategories();
        renderDirectory('', currentCity);
    }

    // Sidebar Toggle Logic
    function toggleSidebar() {
        body.classList.toggle('sidebar-open');
        body.classList.toggle('sidebar-closed');
    }

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // Initialize Locations in Sidebar
    function initLocations() {
        if (!sidebarLocations) return;

        const cities = ['Todas', ...new Set(allDirectoryData.map(item => item.city))];
        sidebarLocations.innerHTML = '';

        cities.forEach(city => {
            const citySlug = city === 'Todas' ? '' : slugify(city);
            const btn = document.createElement('button');
            btn.className = `nav-link-custom ${citySlug === currentCity ? 'active' : ''}`;
            btn.innerHTML = `<i class="bi bi-geo-alt"></i> <span>${city}</span>`;

            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-link-custom').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCity = citySlug;
                renderDirectory(searchInput.value, currentCity, currentCategory);

                if (window.innerWidth < 992 && body.classList.contains('sidebar-open')) {
                    toggleSidebar();
                }
            });
            sidebarLocations.appendChild(btn);
        });
    }

    // Initialize Categories
    function initCategories() {
        if (!categoryContainer) return;

        const categories = ['Todos', ...new Set(allDirectoryData.map(item => item.category))];
        categoryContainer.innerHTML = '';

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `chip ${cat === 'Todos' ? 'active' : ''}`;
            btn.textContent = cat;
            btn.setAttribute('data-category', cat === 'Todos' ? '' : cat);
            btn.addEventListener('click', () => {
                document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-category');
                renderDirectory(searchInput.value, currentCity, currentCategory);
            });
            categoryContainer.appendChild(btn);
        });
    }

    function renderDirectory(filterText = '', cityFilter = '', catFilter = '') {
        resultsContainer.classList.add('results-hidden');

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            resultsContainer.innerHTML = '';

            const filtered = allDirectoryData.filter(item => {
                const searchLower = filterText.toLowerCase();
                const matchesText = !filterText ||
                    item.name.toLowerCase().includes(searchLower) ||
                    item.city.toLowerCase().includes(searchLower) ||
                    (item.state && item.state.toLowerCase().includes(searchLower)) ||
                    (item.zip && item.zip.includes(filterText)) ||
                    item.category.toLowerCase().includes(searchLower);

                const itemCitySlug = slugify(item.city);
                const matchesCity = !cityFilter || itemCitySlug === cityFilter;
                const matchesCategory = !catFilter || item.category === catFilter;

                return matchesText && matchesCity && matchesCategory;
            });

            if (filtered.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="col-12 text-center py-5 animate-fade-in">
                        <i class="bi bi-search display-1 text-muted opacity-25"></i>
                        <p class="lead mt-3 text-muted">No encontramos resultados para tu búsqueda.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach((item, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6 col-lg-4';

                const delay = (index % 9) * 0.1;
                const isRestaurant = item.category === 'Restaurantes' || item.is_restaurant;
                const mainButtonText = isRestaurant ? 'Ver Menú' : 'Ver Detalles';
                const mainButtonIcon = isRestaurant ? 'bi-qr-code-scan' : 'bi-info-circle';

                // Sanitize values
                const sName = escapeHtml(item.name);
                const sCity = escapeHtml(item.city);
                const sCategory = escapeHtml(item.category);
                const sState = escapeHtml(item.state);
                const sAddress = escapeHtml(item.address);
                const sLogo = escapeHtml(item.logo);
                const sMenuUrl = escapeHtml(item.menuUrl || item.website);

                // Social Media icons
                let socialHtml = '';
                if (item.social_media) {
                    if (item.social_media.facebook) socialHtml += `<a href="${escapeHtml(item.social_media.facebook)}" target="_blank" class="text-primary me-2"><i class="bi bi-facebook"></i></a>`;
                    if (item.social_media.instagram) socialHtml += `<a href="${escapeHtml(item.social_media.instagram)}" target="_blank" class="text-danger me-2"><i class="bi bi-instagram"></i></a>`;
                    if (item.social_media.whatsapp) socialHtml += `<a href="https://wa.me/${escapeHtml(item.social_media.whatsapp)}" target="_blank" class="text-success me-2"><i class="bi bi-whatsapp"></i></a>`;
                }

                // Additional buttons for restaurants
                let extraButtons = '';
                if (isRestaurant) {
                    if (item.order_url) {
                        extraButtons += `
                            <div class="col-6 ps-1">
                                <a href="${escapeHtml(item.order_url)}" target="_blank" class="btn btn-outline-success w-100 btn-sm" style="border-radius: 20px;">
                                    <i class="bi bi-bag-check me-1"></i>Ordena
                                </a>
                            </div>`;
                    }
                    if (item.reservation_url) {
                        extraButtons += `
                            <div class="col-6 pe-1">
                                <a href="${escapeHtml(item.reservation_url)}" target="_blank" class="btn btn-outline-primary w-100 btn-sm" style="border-radius: 20px;">
                                    <i class="bi bi-calendar-event me-1"></i>Reserva
                                </a>
                            </div>`;
                    }
                }

                col.innerHTML = `
                    <div class="card h-100 restaurant-card border-0 shadow-sm overflow-hidden animate-fade-in" style="animation-delay: ${delay}s">
                        <div class="card-img-wrapper position-relative">
                            <img src="${sLogo}" class="card-img-top" alt="${sName}">
                            <span class="badge bg-white text-dark position-absolute top-0 end-0 m-3 shadow-sm border-0" style="border-radius: 20px; padding: 8px 15px;">${sCity}</span>
                            <span class="badge bg-primary text-white position-absolute top-0 start-0 m-3 shadow-sm border-0" style="border-radius: 20px; padding: 5px 12px; font-size: 0.7rem; text-transform: uppercase;">${sCategory}</span>
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h5 class="card-title fw-bold text-truncate mb-0" style="font-size: 1.25rem;">${sName}</h5>
                                <div class="fs-5">${socialHtml}</div>
                            </div>
                            <p class="text-muted small mb-3" style="letter-spacing: 0.5px;">
                                <i class="bi bi-geo-alt-fill me-1 text-primary"></i>${sState} ${sAddress}
                            </p>

                            <div class="mt-auto">
                                <div class="row g-2 mb-2">
                                    ${extraButtons}
                                </div>
                                <button class="btn btn-custom-primary w-100 view-menu-btn" data-url="${sMenuUrl}" data-name="${sName}">
                                    <i class="bi ${mainButtonIcon} me-2"></i>${mainButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                resultsContainer.appendChild(col);
            });

            document.querySelectorAll('.view-menu-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const url = e.currentTarget.getAttribute('data-url');
                    const name = e.currentTarget.getAttribute('data-name');
                    if (url) openMenu(url, name);
                });
            });

            resultsContainer.classList.remove('results-hidden');
        }, 300);
    }

    function openMenu(url, name) {
        menuModalLabel.textContent = name;
        menuIframe.src = url;
        menuModal.show();
    }

    menuModalEl.addEventListener('hidden.bs.modal', () => {
        menuIframe.src = '';
    });

    searchBtn.addEventListener('click', () => {
        renderDirectory(searchInput.value, currentCity, currentCategory);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            renderDirectory(searchInput.value, currentCity, currentCategory);
        }
        if (searchInput.value.length > 2 || searchInput.value.length === 0) {
            renderDirectory(searchInput.value, currentCity, currentCategory);
        }
    });

    if (window.innerWidth < 992) {
        body.classList.remove('sidebar-open');
        body.classList.add('sidebar-closed');
    }

    loadAllData();
});
