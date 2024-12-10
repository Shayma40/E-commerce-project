const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db')


const products = [
    // Women
    {
        name: "VELVET MIDI DRESS",
        description: "Round-neck dress with a front knot and asymmetric sleeves. Featuring a gold buckle detail and gathers at the waist, a front vent at the hem and concealed back zip fastening.",
        price: 159.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 15,
        image: "https://static.zara.net/assets/public/e8d9/632e/e7b24d89b061/623e5c1f8d89/09662617903-p/09662617903-p.jpg?ts=1730301462488&w=750",
        category: "Women"
    },
    {
        name: "LONG SEQUINNED KNIT DRESS",
        description: "Round neck, long sleeve dress. Sequin appliqué detail. Inner lining. Button opening at the back.",
        price: 219.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 25,
        image: "https://static.zara.net/assets/public/5a16/bd00/7fc440599f71/8fd67a0271f6/05536131401-p/05536131401-p.jpg?ts=1730633680147",
        category: "Women"
    },
    {
        name: "MARINE STRAIGHT-LEG HIGH-WAIST JEANS WITH POCKETS",
        description: "Slim Fit - Relaxed Leg - High Waist ZW ZARA WOMAN JEANS, High-waist jeans with back patch pockets. Seamless hems. Front zip fly and top button fastening.",
        price: 159.00,
        sizes: ["24", "26", "28", "30"],
        stock: 20,
        colors: ["blue", "indigo"],
        image: "https://static.zara.net/assets/public/50ff/a6de/372f4d49aafa/b19749347880/09632259404-p/09632259404-p.jpg?ts=1730665619474",
        category: "Women"
    },
    {
        name: "SATIN BLOUSE",
        description: "A classic satin blouse with a tailored fit and delicate detailing.",
        price: 65.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 12,
        colors: ["navy blue", "blue", "black"],
        image: "https://static.zara.net/photos///2022/V/0/1/p/7969/046/446/2/w/824/7969046446_1_1_1.jpg?ts=1644423515323",
        category: "Women"
    },
    {
        name: "DOUBLE-FACED FAUX SHEARLING JACKET",
        description: "Collared jacket with a tab and long sleeves. Front welt pockets. Zip-up front. Featuring trims and a contrast lining.",
        price: 319.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 10,
        image: "https://static.zara.net/assets/public/0788/87c1/cab44a18a63b/ccb9d6ecd99e/06318267712-a2/06318267712-a2.jpg?ts=1730633957134",
        category: "Women"
    },
    {
        name: "LONG SLEEVE COTTON T-SHIRT",
        description: "Collared jacket with a tab and long sleeves. Front welt pockets. Zip-up front. Featuring trims and a contrast lining.",
        price: 89.90,
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 40,
        colors: ["white", "black", "beige"],
        image: "https://static.zara.net/assets/public/0d5d/12a6/796b4144a466/572fb712a5b8/00858672250-p/00858672250-p.jpg?ts=1730637583272",
        category: "Women"
    },
    {
        name: "BELTED BLAZER",
        description: "Blazer made of viscose yarn. Featuring a V-neck, long sleeves with shoulder pads, front welt pockets, an adjustable faux leather belt, matching lining and hidden button fastening at the front.",
        price: 219.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        stock: 60,
        colors: ["black", " Anthracite grey", "ice"],
        image: "https://static.zara.net/assets/public/5e35/f2b1/0c51453795e1/e429b33012bf/08941178805-p/08941178805-p.jpg?ts=1730639848287",
        category: "Women"
    },
    
    // Men
    {
        name: "COTTON - WOOL T-SHIRT",
        description: "Relaxed fit T-shirt made of a cotton and wool blend. Featuring a high neck and long sleeves.",
        price: 159.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 25,
        image: "https://static.zara.net/assets/public/18ec/0bc4/3f7e4a60ae9d/ea0aee36bef6/05372316800-a1/05372316800-a1.jpg?ts=1730642160633&w=563",
        category: "Men"
    },
    {
        name: "T-SHIRT WITH CONTRAST PATCH",
        description: "Regular-fit T-shirt with a round neck and short sleeves. Contrast patch appliqué on the front.",
        price: 129.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 18,
        image: "https://static.zara.net/assets/public/7fba/8881/566d4ee7bedc/95be0e282f22/06224318251-a1/06224318251-a1.jpg?ts=1720014341256&w=563",
        category: "Men"
    },
    {
        name: "WATERPROOF TECHNICAL JACKET",
        description: "Lightweight jacket made of waterproof technical fabric.",
        price: 529.00,
        sizes: ["S", "M", "L", "XL"],
        colors:["black", "Orange", "Brown"],
        stock: 30,
        image: "https://static.zara.net/assets/public/ec23/faf8/083e4c36a565/0ca5f3d92a0a/03286311800-p/03286311800-p.jpg?ts=1730637745013&w=563",
        category: "Men"
    },
    {
        name: "STRAIGHT-LEG JEANS",
        description: "Faded straight-leg jeans. Featuring a five-pocket design and button fly.",
        price: 150.00,
        sizes: ["36", "38", "40", "44", "46"],
        stock: 32,
        colors: ["Grey", "Blue", "Charcoal", " Mid-blue"],
        image: "https://static.zara.net/assets/public/7ec7/c718/4355420280d2/2f24e8eaea78/08062310802-p/08062310802-p.jpg?ts=1730630035986&w=563",
        category: "Men"
    },
    {
        name: "COMFORT SUIT",
        description: "Slim fit blazer made of a viscose blend fabric. Notched lapel collar. Long sleeves with buttoned cuffs. Chest welt pocket and hip flap pocket detail. Interior pocket detail. Back vents at the hem. Buttoned front.Slim fit trousers made of a viscose blend fabric. Front pockets and back welt pockets. Front zip fly and top button fastening.",
        price: 730.00,
        sizes: ["36", "38", "40", "44", "46"],
        stock: 52,
        colors: ["Grey", "Blue", "black"],
        image: "https://static.zara.net/assets/public/42ff/0ff0/24054689ae80/ce4341b63dd3/T9000000200-p/T9000000200-p.jpg?ts=1730640730758&w=563",
        category: "Men"
    },
    {
        name: "WATER-REPELLENT PUFFER GILET",
        description: "Puffer gilet made of technical fabric with a water-repellent finish. Faux shearling lined interior. High neck and sleeveless. Welt pockets on the hip and inside pocket detail. Adjustable hem with elastic at the sides. Zip-up front.",
        price: 269.00,
        sizes: ["S", "M", "L", "XL"],
        stock: 32,
        image: "https://static.zara.net/assets/public/7ec7/c718/4355420280d2/2f24e8eaea78/08062310802-p/08062310802-p.jpg?ts=1730630035986&w=563",
        category: "Men"
    },
    {
        name: "CHELSEA BOOTS WITH POINTED TOE",
        description: "Chelsea boots. Plain upper. Two elastic side gores and pull tab at the back for slipping on with ease. Pointed toe.",
        price: 199.00,
        sizes: ["36", "38", "40", "44", "46"],
        stock: 62,
        colors: ["Dark tan"],
        image: "https://static.zara.net/assets/public/914c/bf51/4a8c429a8f62/1083fda8c168/12001420709-e2/12001420709-e2.jpg?ts=1722336066651&w=563",
        category: "Men"
    },
    // Kids
    {
        name: "BALLOON JEANS",
        description: " Jeans with an adjustable inner waistband and front button fastening. Snap-button fastening on size 6. Front pockets and patch pockets on the back.",
        price: 109.00,
        sizes: ["6Y", "7Y", "8Y", "9Y", "10Y", "12Y"],
        stock: 30,
        image: "https://static.zara.net/assets/public/606f/4dc3/97754bd788ba/df46af8c897c/04551704400-e1/04551704400-e1.jpg?ts=1730635649273&w=563",
        category: "Kids"
    },
    {
        name: "SEQUINNED ORGANZA DRESS",
        description: "Round neck dress with long sleeves and elasticated cuffs. Featuring a buttoned teardrop opening at the back, sequin appliqués and matching lining.",
        price: 179.00,
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
        stock: 25,
        image: "https://static.zara.net/assets/public/4a07/fb40/4f5b4be79830/50cb7fbdb044/04786719712-e1/04786719712-e1.jpg?ts=1730641386995&w=563",
        category: "Kids"
    },
    {
        name: "VELVET SHINY T-SHIRT",
        description: "Short sleeve T-shirt with a round neck and elasticated trims. Featuring a cut-out detail on the back and shiny appliqués.",
        price: 75.90,
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        stock: 20,
        image: "https://static.zara.net/assets/public/eb40/8e70/9fe54e4cb904/5c56df575485/01165821800-e1/01165821800-e1.jpg?ts=1730716796541&w=563",
        category: "Kids"
    },
    {
        name: "CHUNKY SNEAKERS",
        description: "Multi-piece sneakers. Adjustable lace-up fastening. Flexible insole. Contrast-coloured chunky rubber sole.",
        price: 139.00,
        sizes: ["30", "32", "34", "36"],
        stock: 15,
        image: "https://static.zara.net/assets/public/3aa1/ad97/c4574991a8c4/98c4c38a198c/13484330802-e1/13484330802-e1.jpg?ts=1730624993117&w=563",
        category: "Kids"
    },
    {
        name: "SWEATSHIRT AND JOGGERS SET",
        description: "Two-piece set. Sweatshirt with a round neck and long sleeves. Ribbed trims. Text detail on the chest. Joggers with an elasticated waistband and adjustable drawstrings on the front. Side pockets and a patch pocket on the back.",
        price: 109.00,
        sizes: ["6-7Y", "8-9Y", "10-12Y", "14Y"],
        stock: 40,
        image: "https://static.zara.net/assets/public/5a2e/f38c/60774313b7cb/6a67bc21d434/00039890687300-p/00039890687300-p.jpg?ts=1727365233469&w=563",
        category: "Kids"
    },
    {
        name: "BASIC T-SHIRT",
        description: "Round neck T-shirt with long sleeves.",
        price: 39.00,
        sizes: ["6-7Y", "8-9Y", "10-12Y", "14Y"],
        stock: 55,
        colors: ["white", "navy blue", "balck", "khaki", " Brown / Taupe ", "mid blue", "Mustard", "wine", " Duck blue"],
        image: "https://static.zara.net/assets/public/8fbe/803e/eb15452c8e75/b19cdb3fce7a/01887790250-p/01887790250-p.jpg?ts=1727365736701&w=563",
        category: "Kids"
    },
    {
        name: "EMBROIDERED SWEATSHIRT",
        description: "Oversize fit sweatshirt made of cotton. The neckline, cuffs and hem are finished in rib knit fabric. The garment features embroidery on the front.",
        price: 75.00,
        sizes: ["1Y", "2Y", "3Y", "5Y"],
        stock: 45,
        image: "https://static.zara.net/assets/public/6898/4b09/001d44c9a9e6/648cde6ed254/05643911717-e1/05643911717-e1.jpg?ts=1730641919518&w=563",
        category: "Kids"
    },
    // Accessories
    {
        name: "JACQUARD SCARF",
        description: "Scarf made with 26% wool. Matching fringed edges.",
        price: 120.00,
        colors: ["Grey"],
        stock: 25,
        image: "https://static.zara.net/assets/public/42fa/3509/18614c658b67/c9f1a1d5c93a/03920442802-a1/03920442802-a1.jpg?ts=1730638922222&w=563",
        category: "Accessories"
    },
    {
        name: "FLORAL METAL HAIR CLIP",
        description: "Hair clip with coloured raised metal flower appliqués.",
        price: 69.00,
        colors: ["Black"],
        stock: 50,
        image: "https://static.zara.net/assets/public/d94d/d79e/0d074206846b/a0e7de4b780b/04736240800-e1/04736240800-e1.jpg?ts=1730627361444&w=563",
        category: "Accessories"
    },
    {
        name: "COWBOY WOOL HAT",
        description: "Wide-brimmed hat made of 100% wool. Crown with diamond-shaped leather pieces with studs.",
        price: 159.00,
        colors: ["Black"],
        stock: 20,
        image: "https://static.zara.net/assets/public/9785/2839/817b4ac5bf0f/b9f578b244f5/01023229800-e2/01023229800-e2.jpg?ts=1725625003123&w=563",
        category: "Accessories"
    },
    {
        name: "FAUX-FUR SHOULDER BAG",
        description: "Faux fur shoulder bag. Zip closure. Adjustable shoulder strap.",
        price: 89.90,
        colors: ["Ecru White"],
        stock: 20,
        image: "https://static.zara.net/assets/public/cade/28fb/68294c7abcef/8e2b5c140d48/11285430002-e1/11285430002-e1.jpg?ts=1730626351209&w=563",
        category: "Accessories"
    },
    {
        name: "CAP WITH EMBROIDERED SLOGAN",
        description: "Peak cap with contrast embroidery on the front. Adjustable at the back.",
        price: 85.00,
        colors: ["Camel"],
        stock: 50,
        image: "https://static.zara.net/assets/public/0061/48bf/15f54f1ab76d/6b8c496ee537/03920380707-p/03920380707-p.jpg?ts=1730635774259&w=750",
        category: "Accessories"
    },
    {
        name: "METAL FRAME SUNGLASSES",
        description: "Sunglasses with a round metal frame and polarised lenses. Case included.",
        price: 270.00,
        colors: ["Golden"],
        stock: 78,
        image: "https://static.zara.net/assets/public/64ae/f176/219b43909e32/20d8d30335c9/02907303303-e1/02907303303-e1.jpg?ts=1730632109455&w=563",
        category: "Accessories"
    },
    {
        name: "BASIC 100% SILK TIE",
        description: "Tie made of textured silk.",
        price: 130.00,
        colors: ["Black", "Blue"],
        stock: 48,
        image: "https://static.zara.net/assets/public/5555/d8b7/71e24263a2bc/9d6ddd2c8522/09569570400-e1/09569570400-e1.jpg?ts=1730625747720&w=563",
        category: "Accessories"
    },
    // Beauty
    {
        name: "Hydrating Face Cream",
        description: "A lightweight hydrating face cream infused with natural ingredients for glowing skin.",
        price: 45.90,
        stock: 25,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-NWOsd2uYhxBg4mXRDqQFBQppqoVLp3qHoA&s",
        category: "Beauty"
    },
    {
        name: "LIGHTLY BLOOM 100 ML",
        description: "Eau de parfum. The scent reveals notes of lotus flower, peony and musk. It’s an elegant, enveloping and comfortable fragrance.",
        price: 89.90,
        stock: 30,
        image: "https://static.zara.net/assets/public/54c1/aa00/df534230845b/b7a7f7c85df1/20130248999-ult/20130248999-ult.jpg?ts=1720015546592&w=750",
        category: "Beauty"
    },
    {
        name: "Lipstick Set",
        description: "A set of 3 vibrant lipsticks in a range of shades, perfect for any occasion.",
        price: 35,
        colors: ["nude", "red", "pink", "orchid", "indigo" ],
        stock: 20,
        image: "https://m.media-amazon.com/images/I/71LKj-MDZTL.jpg",
        category: "Beauty"
    },
    {
        name: "Nourishing Hair Oil",
        description: "A blend of natural oils to nourish and hydrate your hair.",
        price: 30,
        stock: 18,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFDcKjcBjrGWyY7fGd27LsftpXa1QEhFULQ&s",
        category: "Beauty"
    },
    {
        name: "KABUKI BRUSH",
        description: "Short and smooth dense-bristle brush, ideal for applying foundation and providing optimum coverage immediately.",
        price: 65.00,
        stock: 38,
        image: "https://static.zara.net/assets/public/d715/a005/e7fe4a609b49/0cbd71cb6c13/1647362350884/1647362350884.jpg?ts=1726883576474&w=750",
        category: "Beauty"
    },
    {
        name: "VIBRANT LEATHER + OUD VIBRANT LEATHER 60ML",
        description: "Vibrant Leather is the balance between the pacific and romantic side of woody notes and the vitality and intensity of leather. Jérôme Epinette, perfumer of Vibrant Leather.",
        price: 99.00,
        stock: 48,
        image: "https://static.zara.net/assets/public/1f67/d479/b7c741968258/ef53b902e6c7/20210726999-020-p/20210726999-020-p.jpg?ts=1704987447044&w=750",
        category: "Beauty"
    },
    //BestSeller
    {
        name: "CHUNKY LEATHER TRAINERS",
        description: "Monochrome sneakers. Leather upper. Chunky sole.",
        price: 239.00,
        stock: 48,
        sizes: ["36", "38", "40", "45"],
        colors: ["white"],
        image: "https://static.zara.net/assets/public/539c/6537/297e4a97bc79/63db81b8d5f9/12274320001-e2/12274320001-e2.jpg?ts=1722335089545&w=750",
        category: "BestSeller"
    },
    {
        name: "SPLIT LEATHER DOUBLE-STRAP SANDALS",
        description: "Leather sandals with a split leather finish. Two wide straps across the instep with hook-and-loop fastening. Chunky sole.",
        price: 179.00,
        stock: 48,
        sizes: ["37", "38", "40", "42", "44"],
        colors: [" Sand Brown", "Taupe Grey"],
        image: "https://static.zara.net/assets/public/5813/ea37/564549b0a12e/d1e567112a04/12774420107-e2/12774420107-e2.jpg?ts=1730639290270&w=563",
        category: "BestSeller"
    },
    {
        name: "SOFT HOODED BELTED COAT",
        description: "Coat with a hood and lapel collar. Long sleeves. Side welt pockets. Matching fabric tie belt. Double-breasted button fastening.",
        price: 219.00,
        stock: 48,
        image: "https://static.zara.net/assets/public/f99b/2fe6/3eea40df8541/c02a510643bf/03046328712-e1/03046328712-e1.jpg?ts=1724836909031&w=563",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Ecru", "black", "beige"],
        category: "BestSeller"
    },
    {
        name: "CHUNKY KNIT TOP",
        description: "Sleeveless top featuring a round neck, front patch pockets and front fastening with gold buttons.",
        price: 139.00,
        stock: 48,
        colors: ["Navy blue", "Pistachio"],
        sizes: ["S", "L", "M"],
        image: "https://static.zara.net/assets/public/4bf1/c914/167d4866af77/7fa01d3b6906/05802112401-a1/05802112401-a1.jpg?ts=1730629764202&w=563",
        category: "BestSeller"
    },
    {
        name: "PLUSH TROUSERS WITH LABEL APPLIQUÉ",
        description: "Mid-waist trousers crafted in a cotton yarn. Featuring an elasticated waist with adjustable drawstrings, a tonal label detail on the front and wide legs.",
        sizes: ["S", "L", "M", "XL"],
        colors: ["Reddish"],
        price: 139.00,
        stock: 48,
        image: "https://static.zara.net/assets/public/4491/55be/e7b94d4b9c6d/25f0423d319c/01165807609-p/01165807609-p.jpg?ts=1730641678017&w=563",
        category: "BestSeller"
    },
    {
        name: "BELT TROUSERS",
        description: "Trousers made of a cotton blend yarn. Mid-waist fit with belt loops. Side pockets and welt pockets in the back. Adjustable belt with metal buckle. Front crease detail. Zip fly, top button and metal hook fastening.",
        price: 199.00,
        stock: 48,
        sizes: ["XS", "S", "M"],
        colors: ["black", "khaki"],
        image: "https://static.zara.net/assets/public/f6b8/6313/5168451182f3/711d46c9da76/09479272505-p/09479272505-p.jpg?ts=1730643499507&w=563",
        category: "BestSeller"
    },
];


connectDB();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error.message);
        process.exit(1);
    }
};

seedProducts();



module.exports = products;