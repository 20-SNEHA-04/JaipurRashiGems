// SPA Router for JaipurRashiGems
const Router = {
  routes: {},

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  },

  add(path, handler, seo = {}) {
    this.routes[path] = { handler, seo };
  },

  handleRoute() {
    let hash = window.location.hash || "#/";
    let routePath = hash;
    let params = {};

    // Check for dynamic routes like #/gemstone/:id or #/blog/:slug
    let matchedRoute = null;
    for (const pattern in this.routes) {
      const patternParts = pattern.split("/");
      const hashParts = routePath.split("/");

      if (patternParts.length === hashParts.length) {
        let match = true;
        let tempParams = {};
        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(":")) {
            tempParams[patternParts[i].substring(1)] = hashParts[i];
          } else if (patternParts[i] !== hashParts[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          matchedRoute = pattern;
          params = tempParams;
          break;
        }
      }
    }

    const appContainer = document.getElementById("app-view");
    if (!appContainer) return;

    // Trigger luxury loading bar
    let loader = document.getElementById("page-loader-line");
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "page-loader-line";
      loader.className = "page-loader-line";
      document.body.appendChild(loader);
    }
    loader.classList.add("active");

    // Fade out
    appContainer.classList.add("fade-out");

    setTimeout(() => {
      if (matchedRoute) {
        const route = this.routes[matchedRoute];
        // Set SEO Meta
        document.title = route.seo.title || "Jaipur Rashi Gems | Premium Astrological Gemstones";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute("content", route.seo.description || "Buy 100% natural, unheated precious and semi-precious gemstones. Custom rings, pendants, bracelets in gold & silver.");
        }

        // Render target
        route.handler(params);
        
        // Scroll to top
        window.scrollTo(0, 0);
      } else {
        // Fallback to home
        window.location.hash = "#/";
      }
      
      // Stop loader & Fade in
      loader.classList.remove("active");
      appContainer.classList.remove("fade-out");
      appContainer.classList.add("fade-in");
      setTimeout(() => appContainer.classList.remove("fade-in"), 400);
    }, 250);
  }
};

window.Router = Router;
