const directoryData = [
    {
        name: "El Herradero",
        city: "CDMX",
        state: "Polanco",
        zip: "11560",
        logo: "https://via.placeholder.com/150?text=El+Herradero",
        menuUrl: "https://tragalero.com/menu/el-herradero"
    },
    {
        name: "Alex's Tacos",
        city: "Tijuana",
        state: "Zona Río",
        zip: "22010",
        logo: "https://via.placeholder.com/150?text=Alexs+Tacos",
        menuUrl: "https://tragalero.com/menu/alexs-tacos"
    },
    {
        name: "Sushi Roll",
        city: "Guadalajara",
        state: "Zapopan",
        zip: "45010",
        logo: "https://via.placeholder.com/150?text=Sushi+Roll",
        menuUrl: "https://tragalero.com/menu/sushi-roll"
    },
    {
        name: "La Pizzería",
        city: "Monterrey",
        state: "San Pedro",
        zip: "66220",
        logo: "https://via.placeholder.com/150?text=La+Pizzeria",
        menuUrl: "https://tragalero.com/menu/la-pizzeria"
    },
    {
        name: "Antojitos Poblanos",
        city: "Puebla",
        state: "Centro",
        zip: "72000",
        logo: "https://via.placeholder.com/150?text=Antojitos+Poblanos",
        menuUrl: "https://tragalero.com/menu/antojitos-poblanos"
    },
    {
        name: "Hacienda Teya",
        city: "Mérida",
        state: "Yucatán",
        zip: "97000",
        logo: "https://via.placeholder.com/150?text=Hacienda+Teya",
        menuUrl: "https://tragalero.com/menu/hacienda-teya"
    },
    {
        name: "Guanajuato Grill",
        city: "León",
        state: "Guanajuato",
        zip: "37000",
        logo: "https://via.placeholder.com/150?text=Guanajuato+Grill",
        menuUrl: "https://tragalero.com/menu/guanajuato-grill"
    },
    {
        name: "Tacos El Franc",
        city: "Tijuana",
        state: "Centro",
        zip: "22000",
        logo: "https://via.placeholder.com/150?text=Tacos+El+Franc",
        menuUrl: "https://tragalero.com/menu/tacos-el-franc"
    }
];

// Helper to normalize strings for search (removes accents and special chars)
function slugify(text) {
    return text.toString().toLowerCase()
        .normalize("NFD")               // Decompose accents
        .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
