// ===== 50 Fashion Products =====
const products = [
    // TOPS (15 items)
    { id: 1, name: "Classic White Tee", price: 59, category: "tops", badge: "bestseller", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80", sizes: ["XS","S","M","L","XL"] },
    { id: 2, name: "Premium Black Tee", price: 59, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80", sizes: ["XS","S","M","L","XL"] },
    { id: 3, name: "Oversized Sweater", price: 99, category: "tops", badge: "new", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 4, name: "Cashmere Knit", price: 189, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1608228088998-57828365d486?w=600&q=80", sizes: ["S","M","L"] },
    { id: 5, name: "Linen Shirt", price: 89, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 6, name: "Silk Blouse", price: 149, category: "tops", badge: "new", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 7, name: "Striped Polo", price: 79, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1625910513413-5fc45b32e18d?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 8, name: "Merino Wool Sweater", price: 139, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1614975059251-992f11792571?w=600&q=80", sizes: ["S","M","L"] },
    { id: 9, name: "Cropped Tank", price: 49, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 10, name: "Oxford Button-Down", price: 99, category: "tops", badge: "bestseller", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 11, name: "Ribbed Turtleneck", price: 79, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 12, name: "Graphic Tee", price: 55, category: "tops", badge: "new", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 13, name: "Henley Long Sleeve", price: 69, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 14, name: "Pima Cotton V-Neck", price: 65, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80", sizes: ["XS","S","M","L","XL"] },
    { id: 15, name: "Lightweight Cardigan", price: 119, category: "tops", badge: null, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", sizes: ["S","M","L"] },

    // BOTTOMS (15 items)
    { id: 16, name: "Slim Fit Jeans", price: 129, category: "bottoms", badge: "bestseller", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80", sizes: ["28","30","32","34","36"] },
    { id: 17, name: "Wide Leg Trousers", price: 139, category: "bottoms", badge: "new", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 18, name: "Chino Pants", price: 99, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80", sizes: ["28","30","32","34"] },
    { id: 19, name: "Pleated Midi Skirt", price: 109, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 20, name: "Tailored Shorts", price: 79, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 21, name: "High-Waist Jeans", price: 149, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80", sizes: ["24","26","28","30","32"] },
    { id: 22, name: "Linen Pants", price: 119, category: "bottoms", badge: "new", image: "https://images.unsplash.com/photo-1559334417-a57bd929f003?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=600&q=80", sizes: ["S","M","L"] },
    { id: 23, name: "Cargo Pants", price: 129, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 24, name: "Straight Leg Denim", price: 139, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&q=80", sizes: ["28","30","32","34"] },
    { id: 25, name: "Wrap Skirt", price: 89, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 26, name: "Jogger Pants", price: 89, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1519235106695-49c6308c1389?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 27, name: "Culottes", price: 99, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 28, name: "Leather Pants", price: 249, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 29, name: "Denim Shorts", price: 69, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", sizes: ["24","26","28","30"] },
    { id: 30, name: "Maxi Skirt", price: 119, category: "bottoms", badge: null, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&q=80", sizes: ["XS","S","M","L"] },

    // OUTERWEAR (12 items)
    { id: 31, name: "Wool Overcoat", price: 349, category: "outerwear", badge: "bestseller", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 32, name: "Leather Jacket", price: 399, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&q=80", sizes: ["S","M","L"] },
    { id: 33, name: "Denim Jacket", price: 159, category: "outerwear", badge: "new", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80", sizes: ["XS","S","M","L","XL"] },
    { id: 34, name: "Trench Coat", price: 279, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1525450824786-227cbef70703?w=600&q=80", sizes: ["S","M","L"] },
    { id: 35, name: "Puffer Jacket", price: 199, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1544923246-77307dd628b7?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 36, name: "Blazer", price: 229, category: "outerwear", badge: "bestseller", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", sizes: ["XS","S","M","L"] },
    { id: 37, name: "Bomber Jacket", price: 179, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 38, name: "Rain Jacket", price: 149, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80", sizes: ["S","M","L"] },
    { id: 39, name: "Shearling Coat", price: 449, category: "outerwear", badge: "new", image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1515434324519-a5218b0bd07e?w=600&q=80", sizes: ["S","M","L"] },
    { id: 40, name: "Quilted Vest", price: 129, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80", sizes: ["S","M","L","XL"] },
    { id: 41, name: "Suede Jacket", price: 299, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80", sizes: ["S","M","L"] },
    { id: 42, name: "Cropped Jacket", price: 169, category: "outerwear", badge: null, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80", sizes: ["XS","S","M","L"] },

    // ACCESSORIES (8 items)
    { id: 43, name: "Leather Belt", price: 79, category: "accessories", badge: null, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", sizes: ["S","M","L"] },
    { id: 44, name: "Wool Scarf", price: 69, category: "accessories", badge: "new", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1457545195570-67f207084966?w=600&q=80", sizes: ["One Size"] },
    { id: 45, name: "Leather Tote", price: 249, category: "accessories", badge: "bestseller", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80", sizes: ["One Size"] },
    { id: 46, name: "Sunglasses", price: 129, category: "accessories", badge: null, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80", sizes: ["One Size"] },
    { id: 47, name: "Minimalist Watch", price: 199, category: "accessories", badge: null, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80", sizes: ["One Size"] },
    { id: 48, name: "Cashmere Beanie", price: 59, category: "accessories", badge: null, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?w=600&q=80", sizes: ["One Size"] },
    { id: 49, name: "Crossbody Bag", price: 179, category: "accessories", badge: "new", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&q=80", sizes: ["One Size"] },
    { id: 50, name: "Gold Necklace", price: 89, category: "accessories", badge: null, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80", sizes: ["One Size"] }
];

// ===== State =====
let cart = JSON.parse(localStorage.getItem('evalon_cart')) || [];
let currentFilter = 'all';
let currentSort = 'featured';
let selectedSizes = {};

// ===== DOM Elements =====
const els = {
    productsGrid: document.getElementById('productsGrid'),
    cartBtn: document.getElementById('cartBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    cartFooter: document.getElementById('cartFooter'),
    cartPricing: document.getElementById('cartPricing'),
    cartDiscountInfo: document.getElementById('cartDiscountInfo'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    cartClose: document.getElementById('cartClose'),
    navToggle: document.getElementById('navToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    header: document.getElementById('header'),
    modalOverlay: document.getElementById('modalOverlay'),
    modal: document.getElementById('modal'),
    modalContent: document.getElementById('modalContent'),
    modalClose: document.getElementById('modalClose'),
    toast: document.getElementById('toast'),
    resultsCount: document.getElementById('resultsCount'),
    sortSelect: document.getElementById('sortSelect')
};