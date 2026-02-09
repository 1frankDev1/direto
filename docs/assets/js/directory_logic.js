document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('directorySearch');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('directoryResults');
    const cityChips = document.querySelectorAll('#cityChips .chip');
    const categoryContainer = document.getElementById('categoryChips');

    // Modal elements
    const menuModalEl = document.getElementById('menuModal');
    const menuModal = new bootstrap.Modal(menuModalEl);
    const menuModalLabel = document.getElementById('menuModalLabel');
    const menuIframe = document.getElementById('menuIframe');

    let currentCity = '';
    let currentCategory = '';
    let renderTimeout;

    // Initialize Categories
    function initCategories() {
        if (!categoryContainer) return;

        const categories = ['Todos', ...new Set(directoryData.map(item => item.category))];
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
        // Smooth transition: fade out first
        resultsContainer.classList.add('results-hidden');

        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(() => {
            resultsContainer.innerHTML = '';

            const filtered = directoryData.filter(item => {
                const searchLower = filterText.toLowerCase();
                // Robust search: name, city, state, zip, and category
                const matchesText = !filterText ||
                    item.name.toLowerCase().includes(searchLower) ||
                    item.city.toLowerCase().includes(searchLower) ||
                    item.state.toLowerCase().includes(searchLower) ||
                    item.zip.includes(filterText) ||
                    item.category.toLowerCase().includes(searchLower);

                // City filter
                const itemCitySlug = slugify(item.city);
                const matchesCity = !cityFilter || itemCitySlug === cityFilter;

                // Category filter
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
                const buttonText = item.category === 'Restaurantes' ? 'Ver Menú' : 'Ver Detalles';
                const buttonIcon = item.category === 'Restaurantes' ? 'bi-qr-code-scan' : 'bi-info-circle';

                col.innerHTML = `
                    <div class="card h-100 restaurant-card border-0 shadow-sm overflow-hidden animate-fade-in" style="animation-delay: ${delay}s">
                        <div class="card-img-wrapper position-relative">
                            <img src="${item.logo}" class="card-img-top" alt="${item.name}">
                            <span class="badge bg-white text-dark position-absolute top-0 end-0 m-3 shadow-sm border-0" style="border-radius: 20px; padding: 8px 15px;">${item.city}</span>
                            <span class="badge bg-primary text-white position-absolute top-0 start-0 m-3 shadow-sm border-0" style="border-radius: 20px; padding: 5px 12px; font-size: 0.7rem; text-transform: uppercase;">${item.category}</span>
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <h5 class="card-title fw-bold text-truncate mb-1" style="font-size: 1.25rem;">${item.name}</h5>
                            <p class="text-muted small mb-4" style="letter-spacing: 0.5px;">
                                <i class="bi bi-geo-alt-fill me-1 text-primary"></i>${item.state}, CP ${item.zip}
                            </p>
                            <div class="mt-auto">
                                <button class="btn btn-custom-primary w-100 view-menu-btn" data-url="${item.menuUrl}" data-name="${item.name}">
                                    <i class="bi ${buttonIcon} me-2"></i>${buttonText}
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
                    openMenu(url, name);
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

    cityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            cityChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCity = chip.getAttribute('data-filter');
            renderDirectory(searchInput.value, currentCity, currentCategory);
        });
    });

    initCategories();
    renderDirectory();
});
