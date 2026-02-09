document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('directorySearch');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('directoryResults');
    const cityChips = document.querySelectorAll('#cityChips .chip');

    // Modal elements
    const menuModalEl = document.getElementById('menuModal');
    const menuModal = new bootstrap.Modal(menuModalEl);
    const menuModalLabel = document.getElementById('menuModalLabel');
    const menuIframe = document.getElementById('menuIframe');

    let currentFilter = '';

    function renderDirectory(filterText = '', cityFilter = '') {
        resultsContainer.innerHTML = '';

        const filtered = directoryData.filter(item => {
            const searchLower = filterText.toLowerCase();
            const matchesText = !filterText ||
                item.name.toLowerCase().includes(searchLower) ||
                item.city.toLowerCase().includes(searchLower) ||
                item.state.toLowerCase().includes(searchLower) ||
                item.zip.includes(filterText);

            // For city chips, we compare using slugify
            const itemCitySlug = slugify(item.city);
            const matchesCity = !cityFilter || itemCitySlug === cityFilter;

            return matchesText && matchesCity;
        });

        if (filtered.length === 0) {
            resultsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search display-1 text-muted opacity-25"></i>
                    <p class="lead mt-3 text-muted">No encontramos resultados para tu búsqueda.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="card h-100 restaurant-card border-0 shadow-sm overflow-hidden">
                    <div class="position-relative">
                        <img src="${item.logo}" class="card-img-top p-4" alt="${item.name}" style="height: 200px; object-fit: contain; background: #fff;">
                        <span class="badge bg-light text-dark position-absolute top-0 end-0 m-3 shadow-sm border">${item.city}</span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold text-truncate mb-1">${item.name}</h5>
                        <p class="text-muted small mb-3"><i class="bi bi-geo-alt me-1"></i>${item.state}, ${item.zip}</p>
                        <div class="mt-auto">
                            <button class="btn btn-primary w-100 fw-bold view-menu-btn" data-url="${item.menuUrl}" data-name="${item.name}">
                                <i class="bi bi-book me-2"></i>Ver Menú
                            </button>
                        </div>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(col);
        });

        // Add event listeners to newly created buttons
        document.querySelectorAll('.view-menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const url = e.currentTarget.getAttribute('data-url');
                const name = e.currentTarget.getAttribute('data-name');
                openMenu(url, name);
            });
        });
    }

    function openMenu(url, name) {
        menuModalLabel.textContent = name;
        menuIframe.src = url;
        menuModal.show();
    }

    // Reset iframe when modal is closed
    menuModalEl.addEventListener('hidden.bs.modal', () => {
        menuIframe.src = '';
    });

    searchBtn.addEventListener('click', () => {
        renderDirectory(searchInput.value, currentFilter);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            renderDirectory(searchInput.value, currentFilter);
        }
        // Live search if more than 2 chars
        if (searchInput.value.length > 2 || searchInput.value.length === 0) {
            renderDirectory(searchInput.value, currentFilter);
        }
    });

    cityChips.forEach(chip => {
        chip.addEventListener('click', () => {
            cityChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.getAttribute('data-filter');
            renderDirectory(searchInput.value, currentFilter);
        });
    });

    // Initial render
    renderDirectory();
});
