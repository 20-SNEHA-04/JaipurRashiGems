import re

with open('js/database.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's map all direct folder files to their direct Google Drive raw thumbnail links
mappings = {
    # Exclusive
    "alexandrite-stone": "1r9bF5CYr--RAqeXpFKRRcSc2ae6Q5E_i",
    "burmese-ruby-old": "1iiTjgPEUCN1Bs53v1EJAhsmdn1_bDDaE",
    "colombian-emerald-panna": "1yUOb4Kw2hcpyExvzpDE2J3iPe2m7ZaEH",
    "cornflower-blue-sapphire": "1ammDYoNefkAvF58TqdrsTAO2OjSG7imy",
    "kashmir-blue-sapphire": "1ZN_PcxTNN7r_yzGlFfNTDFstdL_D-s2_",
    "no-oil-emerald": "1QMpN2dHajKmLyA286EeBdBRiVEq_fImk",
    "padparadscha-sapphire": "1ZMlbtBBBEsRWYd22R5vPmr4DgC0n28tv",
    "panjshir-emerald": "1SroB0rsWr-F43pC-qagjJtqEySNNoAIQ",
    "paraiba-tourmaline": "1jEqZVjBFszvjgsmsYuyx6kS8kx9FIuSc",
    "pigeon-blood-ruby": "1CXKaU6R3akBpxuxzwYIoWEnvfU6-e7s6",
    "pink-sapphire-stone": "18nwQV41S2KGCOHutYXFjufQwD6voe_Vw",
    "royal-blue-sapphire": "1u3dxGu414AITWTv-2O4y_2iaysCF0SBJ",
    "tanzanite-stone": "1kAa0ZKvoFyFB49_uSC0z3EVZM-7hLbFS",
    "vivid-green-emerald": "1IWpJ9CDELyxHLAkknrTSsPHs-PJ0bN6e",
    # Popular
    "amethyst-stone-jamunia": "1Wzdei0kZya18keQsTDJzCZ6Wp0qNwlA0",
    "citrine-stone-sunela": "1tEc_sJY1v9nVjZUVMmppIleJMHhDCmJ-",
    "fire-opal-mexican": "1HGWmhebcbfJ76QVja_ujyAjVB6BUFeY1",
    "garnet-stone-mozambique": "1fMQKiqLBEgr-_t4gv4k64khpgUkhHvSc",
    "iolite-neeli": "1I9WPF6iE01efMHM3068sYh6NHUNUmTFa",
    "navratna-set": "12IpMJJYufIH6fdVuEVMipWqV1rrbfmhB",
    "opal-dudhiya-pathar": "19xq4ZKpGnZuIIfWVFl9Snls7JrR9xesW",
    "peridot-stone-pakistan": "1yLfenMVXJlMfRCpbLsjTo4La_IV4FB6U",
    "pitambari-neelam-premium": "1-oboinrxS2Wrz-r5Qiwe6p9Rbz7PF0uq",
    "turquoise-stone-tibetan": "1Qf4QcTTqa0PG8krN2BVM9k0TFIESFUaS",
    "white-coral-premium": "18_-MELCJGDvuiWgibkKXSYc9XSlQighi",
    "yellow-topaz-premium": "1qk5Tsb4NA5Gvgt8fPEtpYPcqQNXITkAB",
    "zircon-stone-jarkan": "1tdGsadXqEwjFmw2ygZkyDNrd96V06an-",
    # Zodiac
    "zodiac-blue-sapphire": "18hLL_uoGw5mJIbZO-y-3ExPln_6yTRts",
    "zodiac-cats-eye": "1Zz5V2DtCEZYkBN7EnLrAEwgVawFr5BTu",
    "zodiac-emerald": "1Sf96NGzLcKfHhAhyjRV1KP0cEXIxrmzC",
    "zodiac-hessonite": "17nOBZ1Vtvee9pLaAae3sM2u_G0Cku_77",
    "zodiac-pearl": "119ZPN2_YKrlEl-etGHCYqfiiZ15ztZmm",
    "zodiac-red-coral": "1fit9rVLApUniFHoBwpT2_COg7jRLq41Y",
    "zodiac-ruby": "1751xnbtwIWyJLYeMM9-5KjTaeAHTHULX",
    "zodiac-white-sapphire": "16xPXIcqz-EPoYnGge-oiSlo5VQExT6EA",
    "zodiac-yellow-sapphire": "15TkIBLYm4qtLFhkbgiW8T5GkcCydGNn0",
    # Other
    "amber-stone-premium": "1wTijw_bu5ly2pu-Vv-lGnMBF_yUAg7kS",
    "ametrine-stone-premium": "1WCkfl9--Z6fHsb_yMf1s8jM9KHrnbBGg",
    "aquamarine-stone-premium": "12fEmGECgp-zMoTolE4BqKjX5ylY8Ih6O",
    "blue-topaz-swiss": "1afzumRQMnRaD3xKdSS4Why3AuTVlBaTB",
    "blue-zircon-pailin": "1x8SfdvAP-ECMQGRTWndx4pqci3Bff5a_",
    "kyanite-nepal": "1zRb7effDdZxM672NHJCON4SR22L7GYUV",
    "lapis-lazuli-afghan": "14gH7lxgQOawprtSBtNHeZe4wUBtBTfqS",
    "moldavite-czech": "1kWqFsICr2ODTjjxtL7djF5fqO8uj-Ecx",
    "moonstone-sri-lanka": "1h025nTvUt4vXm-ryUpWtbrPL3Z3YlW8-",
    "spinel-burmese": "1Xj3iRFEQNLsRzyXooZrjlXVoAIEMoSpG",
    "star-ruby-surya": "1wxLK-0lLRR2poHW0a0pNHnXEnfgmwSwU",
    "tourmaline-multicolor": "19ydtdY9lZfV6eR49Lpi2vfRF4ytGOfmF"
}

# We need to inject driveImage: "https://lh3.googleusercontent.com/u/0/d/FILE_ID=w400-h400-p" directly inside every matching id bracket in database.js
for pid, fid in mappings.items():
    img_url = f'https://lh3.googleusercontent.com/u/0/d/{fid}=w400-h400-p'
    # Find id: "pid" and add driveImage: "img_url" right after it or right after image: "..."
    # Let's target: id: "pid",\s*name:
    pattern = rf'(id:\s*"{pid}",)'
    replacement = rf'\1\n      driveImage: "{img_url}",'
    code = re.sub(pattern, replacement, code)

with open('js/database.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Mapped direct driveImage streams to all unheated database items successfully!")
