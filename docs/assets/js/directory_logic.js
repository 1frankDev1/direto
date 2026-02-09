document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('directorySearch');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('directoryResults');

    // Initial render
    renderCards(directoryData);

    // Search events
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            filterAndRender(query);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            filterAndRender(query);
        });
    }

    function filterAndRender(query) {
        const filtered = directoryData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const cityMatch = item.city.toLowerCase().includes(query);
            const stateMatch = item.state.toLowerCase().includes(query);
            const zipMatch = item.zips.some(zip => zip.includes(query));

            return nameMatch || cityMatch || stateMatch || zipMatch;
        });

        renderCards(filtered);
    }

    function renderCards(data) {
        if (!resultsContainer) return;
        resultsContainer.innerHTML = '';

        if (data.length === 0) {
            resultsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otra búsqueda (nombre, zona o código postal).</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <img src="${item.img}" class="card-img-top" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x200?text=Restaurante'">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted mb-1"><i class="bi bi-geo-alt"></i> ${item.city}, ${item.state.toUpperCase()}</p>
                        <p class="card-text small mb-3">CP: ${item.zips.join(', ')}</p>
                        <button class="btn btn-primary w-100 view-menu-btn"
                                data-name="${item.name}"
                                data-url="${item.url}">
                            Ver Menú
                        </button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(col);
        });

        // Add event listeners to newly created buttons
        document.querySelectorAll('.view-menu-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const url = btn.getAttribute('data-url');
                openMenuModal(name, url);
            });
        });
    }

    function openMenuModal(name, url) {
        const modalLabel = document.getElementById('menuModalLabel');
        const menuIframe = document.getElementById('menuIframe');

        if (modalLabel) modalLabel.textContent = name;
        if (menuIframe) menuIframe.src = url;

        const modalElement = document.getElementById('menuModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    }
});
