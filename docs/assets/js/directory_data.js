const statesCitiesData = {
    "cdmx": [
        { name: "Polanco", zip: ["11510", "11520", "11530"] },
        { name: "Roma Norte", zip: ["06700", "06760"] },
        { name: "Condesa", zip: ["06140", "06170"] },
        { name: "Coyoacán", zip: ["04000", "04010", "04020"] },
        { name: "Santa Fe", zip: ["01210", "01219"] }
    ],
    "guadalajara": [
        { name: "Centro", zip: ["44100", "44110"] },
        { name: "Chapalita", zip: ["44500"] },
        { name: "Providencia", zip: ["44630", "44639"] },
        { name: "Zapopan", zip: ["45010", "45110"] }
    ],
    "monterrey": [
        { name: "San Pedro Garza García", zip: ["66220", "66230"] },
        { name: "Centro", zip: ["64000", "64010"] },
        { name: "Colonia del Valle", zip: ["66240"] },
        { name: "Obispado", zip: ["64060"] }
    ],
    "puebla": [
        { name: "Centro Histórico", zip: ["72000", "72010"] },
        { name: "Angelópolis", zip: ["72190"] },
        { name: "La Paz", zip: ["72160"] }
    ],
    "tijuana": [
        { name: "Zona Río", zip: ["22010", "22020"] },
        { name: "Playas de Tijuana", zip: ["22500", "22504"] },
        { name: "Otay", zip: ["22457", "22465"] },
        { name: "Centro", zip: ["22000", "22015"] },
        { name: "La Mesa", zip: ["22105", "22110"] },
        { name: "Zona Norte", zip: ["22000"] },
        { name: "Libertad", zip: ["22400", "22410"] },
        { name: "20 de Noviembre", zip: ["22100"] },
        { name: "Santa Fe", zip: ["22656", "22666"] },
        { name: "Florido", zip: ["22244", "22245"] },
        { name: "El Lago", zip: ["22204"] },
        { name: "Villa del Álamo", zip: ["22210"] },
        { name: "El Soler", zip: ["22540"] }
    ],
    "merida": [], "leon": [], "queretaro": [], "toluca": [], "chihuahua": [],
    "sanluispotosi": [], "hermosillo": [], "morelia": [], "veracruz": [],
    "acapulco": [], "culiacan": [], "aguascalientes": [], "tuxtla": [],
    "villahermosa": [], "mazatlan": []
};

const restaurantData = {
    "cdmx": {
        "polanco": [
            { name: "Restaurante Polanco 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" },
            { name: "Restaurante Polanco 2", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "roma-norte": [
            { name: "Restaurante Roma 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "condesa": [
            { name: "Restaurante Condesa 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" }
        ],
        "coyoacan": [
            { name: "Restaurante Coyoacán 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "santa-fe": [
            { name: "Restaurante Santa Fe 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ]
    },
    "guadalajara": {
        "centro": [
            { name: "Restaurante Centro 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" },
            { name: "Restaurante Centro 2", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "chapalita": [
            { name: "Restaurante Chapalita 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" }
        ],
        "providencia": [
            { name: "Restaurante Providencia 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "zapopan": [
            { name: "Restaurante Zapopan 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ]
    },
    "monterrey": {
        "san-pedro-garza-garcia": [
            { name: "Restaurante San Pedro 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "centro": [
            { name: "Restaurante Centro Monterrey 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" },
            { name: "Restaurante Centro Monterrey 2", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "colonia-del-valle": [
            { name: "Restaurante Colonia del Valle 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "obispado": [
            { name: "Restaurante Obispado 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" }
        ]
    },
    "puebla": {
        "centro-historico": [
            { name: "Restaurante Centro Histórico 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "angelopolis": [
            { name: "Restaurante Angelópolis 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "la-paz": [
            { name: "Restaurante La Paz 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ]
    },
    "tijuana": {
        "zona-rio": [
            { name: "Restaurante Zone Río 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" },
            { name: "Restaurante Zone Río 2", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "playas-de-tijuana": [
            { name: "Restaurante Playas 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" }
        ],
        "otay": [
            { name: "Restaurante Otay 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "centro": [
            { name: "Restaurante Centro Tijuana 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" },
            { name: "Restaurante Centro Tijuana 2", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "la-mesa": [
            { name: "Restaurante La Mesa 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "zona-norte": [
            { name: "Restaurante Zona Norte 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "libertad": [
            { name: "Restaurante Libertad 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "20-de-noviembre": [
            { name: "Restaurante 20 de Noviembre 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(18).png" }
        ],
        "santa-fe": [
            { name: "Restaurante Santa Fe 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "florido": [
            { name: "Restaurante Florido 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "el-lago": [
            { name: "Restaurante El Lago 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ],
        "villa-del-alamo": [
            { name: "Restaurante Villa del Álamo 1", url: "#", img: "https://menutech.services/assets/img/LA%20COCINA%20DE%20TIJUANA%20(38).png" }
        ],
        "el-soler": [
            { name: "Restaurante El Soler 1", url: "#", img: "https://menutech.services/assets/img/herradero.png" }
        ]
    }
};

// Flattened structure for easier searching
const directoryData = [];

for (const state in restaurantData) {
    for (const citySlug in restaurantData[state]) {
        const stateCities = statesCitiesData[state] || [];
        const cityInfo = stateCities.find(c => c.name.toLowerCase().replace(/\s+/g, '') === citySlug.replace(/\s+/g, ''));
        const cityName = cityInfo ? cityInfo.name : citySlug;
        const cityZips = cityInfo ? cityInfo.zip : [];

        restaurantData[state][citySlug].forEach(rest => {
            directoryData.push({
                ...rest,
                state: state,
                city: cityName,
                zips: cityZips
            });
        });
    }
}
