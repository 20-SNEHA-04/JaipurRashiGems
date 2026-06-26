/* ==========================================================================
   JAIPUR RASHI GEMS - SYSTEMATIC DYNAMIC SEO ENGINE (seo.js)
   ========================================================================== */

class SEOManager {
    constructor() {}

    optimizeSEO(view, params, products) {
        let title = "Jaipur Rashi Gems | Certified Luxury Gemstones & Vedic Astrological Recommendations";
        let desc = "Buy certified 100% natural planetary gemstones online at Jaipur Rashi Gems. Custom luxury gold rings, expert astrologer consultations, Basra pearls, Ceylon sapphires.";
        
        let schemaData = null;

        // Custom Title, Meta Descriptions, & Schema configuration per view
        switch (view) {
            case 'home':
                title = "Jaipur Rashi Gems | Certified Natural Gemstones Online | Vedic Astrology Recommendations";
                desc = "Explore our premium selection of certified natural loose gemstones, astrological rings, and personalized planetary solutions. GIA/IGI laboratory validated.";
                schemaData = this.getHomeFAQSchema();
                break;
                
            case 'collection':
                let catVal = params.gemstone || params.val || params.category || "Treasures";
                title = `Buy Natural Certified ${catVal} Online | Jaipur Rashi Gems`;
                desc = `Shop certified unheated unheated ${catVal} stones direct from Ceylon, Kashmir, and Myanmar. Certified astrological potency, standard 10-day returns.`;
                schemaData = this.getCollectionBreadcrumbSchema(catVal);
                break;

            case 'product-detail':
                const p = products.find(item => item.sku === params.sku);
                if (p) {
                    title = `Certified Natural ${p.name} (${p.carats}ct) | Jaipur Rashi Gems`;
                    desc = `Buy genuine ${p.origin} Sourced ${p.gemstone}. unheated natural loose stone for planet ${p.planet}. Certified GIA/IGI, SKU ${p.sku}. Sourced by Jaipur Rashi Gems.`;
                    schemaData = this.getProductSchema(p);
                }
                break;

            case 'recommendation':
                title = "Free Vedic Horoscope Gemstone Recommendation | Jaipur Rashi Gems";
                desc = "Calculate your astrological planetary lord and ascertain which planetary gemstone suits your Career, Health, or Relationship requirements according to Vedic Shastra.";
                break;

            case 'compare':
                title = "Compare Loose Astrological Gemstones | Jaipur Rashi Gems";
                desc = "Directly analyze geolocial weights, custom cuts, lab certificates, and pricing details of up to three gemstones side-by-side.";
                break;

            case 'checkout':
                title = "Secure SSL Vedic Checkout | Jaipur Rashi Gems";
                desc = "Securely complete your luxury certified natural gemstone or personalized ring order. Multi-currency, Stripe, & Razorpay supported.";
                break;

            default:
                break;
        }

        // Programmatically rewrite page metadata
        document.title = title;
        
        const metaDescNode = document.querySelector('meta[name="description"]');
        if (metaDescNode) {
            metaDescNode.setAttribute('content', desc);
        }

        // Inject JSON-LD Schema
        const schemaScript = document.getElementById('seo-schema');
        if (schemaScript && schemaData) {
            schemaScript.textContent = JSON.stringify(schemaData, null, 2);
        } else if (schemaScript) {
            schemaScript.textContent = '';
        }
    }

    getHomeFAQSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Are gemstones from Jaipur Rashi Gems certified?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Every single gemstone is shipped with an authentic, government-registered laboratory certificate (GIA, IGI, or GRT Jaipur Lab) to verify species, origin, and unheated treatment."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How does the Astrology Gemstone Finder work?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our free recommender tool calculates your Ascendant, Moon sign, and planetary placements using Vedic astrology, and recommends the precise stone to maximize career, wealth, and wellness."
                    }
                }
            ]
        };
    }

    getCollectionBreadcrumbSchema(catVal) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://jaipurrashigems.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": catVal,
                    "item": `https://jaipurrashigems.com/#collection?category=${catVal}`
                }
            ]
        };
    }

    getProductSchema(p) {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.name,
            "image": "https://jaipurrashigems.com/assets/gems-placeholder.jpg",
            "description": p.desc,
            "sku": p.sku,
            "mpn": p.sku,
            "brand": {
                "@type": "Brand",
                "name": "Jaipur Rashi Gems"
            },
            "offers": {
                "@type": "Offer",
                "url": `https://jaipurrashigems.com/#product-detail?sku=${p.sku}`,
                "priceCurrency": "USD",
                "price": p.priceUSD,
                "itemCondition": "https://schema.org/NewCondition",
                "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            }
        };
    }
}

// Instantiate global dynamic SEO engine
window.seoManager = new SEOManager();
