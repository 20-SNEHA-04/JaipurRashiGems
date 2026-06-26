/* ==========================================================================
   JAIPUR RASHI GEMS - ELITE 3D CELESTIAL WEBGL & CANVAS ENGINE (three-engine.js)
   ========================================================================== */

/**
 * Elite 3D WebGL / Canvas 2D Interactive Suite for Astrological Gemstones.
 * Creates a stunning luxury impression with gold-dusted starfields, 
 * an interactive 3D Zodiac Wheel, and a 3D Navagraha Planetary Orbit display.
 * Includes graceful 2D high-performance canvas fallbacks if WebGL fails.
 */

window.initCosmicSolarHero = function() {
    const container = document.getElementById('hero-webgl-canvas-container');
    if (!container) return;

    // Clear any existing canvases
    container.innerHTML = '';

    // Check if Three.js is loaded
    if (typeof THREE !== 'undefined') {
        try {
            initThreeHero(container);
            return;
        } catch (e) {
            console.warn("Three.js hero initialization failed, falling back to Elite 2D particles:", e);
        }
    }
    initCanvas2DHero(container);
};

// --- Three.js WebGL Premium Starfield / Nebula for Hero Banner ---
function initThreeHero(container) {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0E1A, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 1500 gold and white celestial dust particles
    const geometry = new THREE.BufferGeometry();
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorGold = new THREE.Color('#c9a84c');
    const colorWhite = new THREE.Color('#f8f8ff');
    const colorViolet = new THREE.Color('#3d255a');

    for (let i = 0; i < count; i++) {
        // Starfield coords
        positions[i * 3] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 400;

        // Blending stars color palette
        const rand = Math.random();
        let chosenColor = colorWhite;
        if (rand > 0.75) {
            chosenColor = colorGold;
        } else if (rand > 0.6) {
            chosenColor = colorViolet;
        }

        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Star point texture simulation
    const material = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Subtle light source for glowing dust
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse movement response
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        starField.rotation.y += 0.0006;
        starField.rotation.x += 0.0002;

        // Parallax effect on camera
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup reference
    container.addEventListener('remove', () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
    });
}

// --- High Performance 2D Canvas Fallback Hero ---
function initCanvas2DHero(container) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const particles = [];
    const colors = ['#f8f8ff', '#c9a84c', '#d4af37', '#3d255a'];

    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: (Math.random() - 0.5) * 0.15
        });
    }

    let frameId;
    const draw = () => {
        frameId = requestAnimationFrame(draw);
        ctx.fillStyle = 'rgba(10, 14, 26, 0.2)'; // trail effect
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = p.radius * 4;
            ctx.shadowColor = p.color;
            ctx.fill();

            // Update
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        });
        ctx.shadowBlur = 0; // reset
    };
    draw();

    const handleResize = () => {
        width = canvas.width = container.clientWidth;
        height = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    container.addEventListener('remove', () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
    });
}


// --- Astrological Suites ---
window.cosmicSuite = {
    // 3D/Interactive Zodiac Rashi Wheel Creator
    initZodiacWheel: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        if (typeof THREE !== 'undefined') {
            try {
                initThreeZodiac(container);
                return;
            } catch (e) {
                console.warn("Three.js Zodiac failed, falling back to interactive Canvas 2D:", e);
            }
        }
        initCanvas2DZodiac(container);
    },

    // 9 Planetary Orbit Display Creator (Navagraha)
    initPlanetaryOrbits: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        if (typeof THREE !== 'undefined') {
            try {
                initThreePlanets(container);
                return;
            } catch (e) {
                console.warn("Three.js Planets failed, falling back to Canvas 2D Orbits:", e);
            }
        }
        initCanvas2DPlanets(container);
    }
};

// --- Three.js WebGL Zodiac Wheel Renders ---
function initThreeZodiac(container) {
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create central glowing ring
    const ringGeo = new THREE.RingGeometry(4.2, 4.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
        color: 0xc9a84c, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const zodiacRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(zodiacRing);

    // Create Zodiac constellation pointer anchors
    const zodiacSigns = [
        { name: "Aries (Mesh)", emoji: "♈", color: 0xff3366, stone: "Ruby / Coral", desc: "Burmese Ruby elevates career authority & drive instantly." },
        { name: "Taurus (Vrishabha)", emoji: "♉", color: 0xe85a4f, stone: "Opal / Diamond", desc: "Australian Fire Opal unlocks immense wealth & relationship comfort." },
        { name: "Gemini (Mithun)", emoji: "♊", color: 0x228b22, stone: "Emerald", desc: "Colombian Panna enhances clarity, business & memory." },
        { name: "Cancer (Kark)", emoji: "♋", color: 0xf8f8ff, stone: "Pearl", desc: "Basra Pearl calms stress and stabilises emotions instantly." },
        { name: "Leo (Simha)", emoji: "♌", color: 0xffaa00, stone: "Ruby", desc: "Imperial Ruby triggers self-confidence & massive fame." },
        { name: "Virgo (Kanya)", emoji: "♍", color: 0x00ff88, stone: "Emerald", desc: "Potent Emerald enhances mathematical intelligence & focus." },
        { name: "Libra (Tula)", emoji: "♎", color: 0xffc0cb, stone: "Opal / Diamond", desc: "Luxury Opal bestows absolute luxury, artistry & bliss." },
        { name: "Scorpio (Vrishchik)", emoji: "♏", color: 0xff2200, stone: "Red Coral", desc: "Italian Coral protects health and clears debt avenues." },
        { name: "Sagittarius (Dhanu)", emoji: "♐", color: 0xffd700, stone: "Yellow Sapphire", desc: "Ceylon Pukhraj aligns spiritual wealth, luck & bliss." },
        { name: "Capricorn (Makar)", emoji: "♑", color: 0x4169e1, stone: "Blue Sapphire", desc: "Kashmir Neelam provides rapid career growth & safeguards fortune." },
        { name: "Aquarius (Kumbh)", emoji: "♒", color: 0x1e90ff, stone: "Blue Sapphire", desc: "Blue Sapphire counters sade sati stress & triggers innovation." },
        { name: "Pisces (Meen)", emoji: "♓", color: 0xffb300, stone: "Yellow Sapphire", desc: "Yellow Sapphire coordinates wisdom, wealth, & divine alignment." }
    ];

    const group = new THREE.Group();
    const dotsCount = zodiacSigns.length;
    const meshes = [];

    zodiacSigns.forEach((sign, idx) => {
        const theta = (idx / dotsCount) * Math.PI * 2;
        const radius = 4.35;
        
        // Small point sphere
        const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({ color: sign.color });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        
        sphere.position.x = radius * Math.cos(theta);
        sphere.position.y = radius * Math.sin(theta);
        sphere.userData = sign;

        group.add(sphere);
        meshes.push(sphere);
    });

    scene.add(group);

    // Interactive Hover raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateDisplayCard = (data) => {
        const card = document.getElementById('zodiac-interactive-matching-card');
        if (!card) return;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; animation: fadeIn 0.3s ease;">
                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">${data.emoji} ${data.name}</h4>
                <span style="font-size:28px;">✨</span>
            </div>
            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: ${data.stone}</p>
            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">${data.desc}</p>
            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: '${data.stone.split(' / ')[0]}'});" style="margin-top:15px; width:100%;">View Certified Stones ➔</button>
        `;
    };

    const handleMouseMove = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            meshes.forEach(m => m.scale.set(1, 1, 1));
            hit.scale.set(1.6, 1.6, 1.6);
            updateDisplayCard(hit.userData);
        }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animId;
    const render = () => {
        animId = requestAnimationFrame(render);
        group.rotation.z += 0.003;
        renderer.render(scene, camera);
    };
    render();

    // Resize
    const handleResize = () => {
        const w_ = container.clientWidth;
        const h_ = container.clientHeight;
        camera.aspect = w_ / h_;
        camera.updateProjectionMatrix();
        renderer.setSize(w_, h_);
    };
    window.addEventListener('resize', handleResize);

    container.addEventListener('remove', () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
        renderer.dispose();
    });
}

// --- Interactive 2D Canvas Fallback for Zodiac ---
function initCanvas2DZodiac(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 450;
    canvas.height = 450;
    canvas.style.maxWidth = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const center = 225;
    const radius = 160;

    const zodiacSigns = [
        { name: "Aries (Mesh)", emoji: "♈", color: "#ff3366", stone: "Ruby / Coral", desc: "Burmese Ruby elevates career authority & drive instantly." },
        { name: "Taurus (Vrishabha)", emoji: "♉", color: "#e85a4f", stone: "Opal / Diamond", desc: "Australian Fire Opal unlocks immense wealth & relationship comfort." },
        { name: "Gemini (Mithun)", emoji: "♊", color: "#228b22", stone: "Emerald", desc: "Colombian Panna enhances clarity, business & memory." },
        { name: "Cancer (Kark)", emoji: "♋", color: "#f8f8ff", stone: "Pearl", desc: "Basra Pearl calms stress and stabilises emotions instantly." },
        { name: "Leo (Simha)", emoji: "♌", color: "#ffaa00", stone: "Ruby", desc: "Imperial Ruby triggers self-confidence & massive fame." },
        { name: "Virgo (Kanya)", emoji: "♍", color: "#00ff88", stone: "Emerald", desc: "Potent Emerald enhances mathematical intelligence & focus." },
        { name: "Libra (Tula)", emoji: "♎", color: "#ffc0cb", stone: "Opal / Diamond", desc: "Luxury Opal bestows absolute luxury, artistry & bliss." },
        { name: "Scorpio (Vrishchik)", emoji: "♏", color: "#ff2200", stone: "Red Coral", desc: "Italian Coral protects health and clears debt avenues." },
        { name: "Sagittarius (Dhanu)", emoji: "♐", color: "#ffd700", stone: "Yellow Sapphire", desc: "Ceylon Pukhraj aligns spiritual wealth, luck & bliss." },
        { name: "Capricorn (Makar)", emoji: "♑", color: "#4169e1", stone: "Blue Sapphire", desc: "Kashmir Neelam provides rapid career growth & safeguards fortune." },
        { name: "Aquarius (Kumbh)", emoji: "♒", color: "#1e90ff", stone: "Blue Sapphire", desc: "Blue Sapphire counters sade sati stress & triggers innovation." },
        { name: "Pisces (Meen)", emoji: "♓", color: "#ffb300", stone: "Yellow Sapphire", desc: "Yellow Sapphire coordinates wisdom, wealth, & divine alignment." }
    ];

    let currentRotation = 0;
    let hoveredIndex = -1;

    const updateDisplayCard = (idx) => {
        const card = document.getElementById('zodiac-interactive-matching-card');
        if (!card || idx === -1) return;
        const sign = zodiacSigns[idx];
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">${sign.emoji} ${sign.name}</h4>
                <span style="font-size:28px;">✨</span>
            </div>
            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: ${sign.stone}</p>
            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">${sign.desc}</p>
            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: '${sign.stone.split(' / ')[0]}'});" style="margin-top:15px; width:100%;">View Certified Stones ➔</button>
        `;
    };

    const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left - center;
        const my = e.clientY - rect.top - center;

        // Check if cursor is near ring radius
        const dist = Math.sqrt(mx * mx + my * my);
        if (Math.abs(dist - radius) < 30) {
            let angle = Math.atan2(my, mx) - currentRotation;
            if (angle < 0) angle += Math.PI * 2;
            const index = Math.floor((angle / (Math.PI * 2)) * zodiacSigns.length) % zodiacSigns.length;
            if (index !== hoveredIndex) {
                hoveredIndex = index;
                updateDisplayCard(hoveredIndex);
            }
        }
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let frame;
    const draw = () => {
        frame = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, 450, 450);
        currentRotation += 0.003;

        // Draw central outer gold ring
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.4)';
        ctx.lineWidth = 4;
        ctx.stroke();

        zodiacSigns.forEach((sign, idx) => {
            const angle = (idx / zodiacSigns.length) * Math.PI * 2 + currentRotation;
            const px = center + radius * Math.cos(angle);
            const py = center + radius * Math.sin(angle);

            // Draw planetary dot
            ctx.beginPath();
            ctx.arc(px, py, idx === hoveredIndex ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = sign.color;
            ctx.shadowBlur = idx === hoveredIndex ? 12 : 4;
            ctx.shadowColor = sign.color;
            ctx.fill();

            // Label
            ctx.fillStyle = '#f8f8ff';
            ctx.font = '10px Montserrat';
            ctx.shadowBlur = 0;
            if (idx === hoveredIndex) {
                ctx.fillText(sign.name, px + 15, py + 4);
            }
        });
    };
    draw();

    container.addEventListener('remove', () => {
        cancelAnimationFrame(frame);
    });
}


// --- Three.js Planets Orbit display (Navagraha) ---
function initThreePlanets(container) {
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glowing Sun model in center
    const sunGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Planetary models config matching Navagraha Vedic Orbits
    const planetsData = [
        { name: "Moon (Chandra)", color: 0xf8f8ff, size: 0.22, radius: 2.2, speed: 0.04, stone: "Pearl (Moti)", desc: "Calms mind, emotional stability & represents pure maternal energy." },
        { name: "Mars (Mangal)", color: 0xff3300, size: 0.26, radius: 3.2, speed: 0.03, stone: "Red Coral (Moonga)", desc: "Triggers authority, eliminates health boundaries & clears financial debts." },
        { name: "Mercury (Budh)", color: 0x00cc66, size: 0.24, radius: 4.2, speed: 0.025, stone: "Emerald (Panna)", desc: "Expands creativity, speech accuracy & massive business profits." },
        { name: "Jupiter (Guru)", color: 0xffd700, size: 0.45, radius: 5.5, speed: 0.015, stone: "Yellow Sapphire (Pukhraj)", desc: "Coordinates absolute divine grace, health prosperity & luck." }
    ];

    const group = new THREE.Group();
    const planetMeshes = [];

    planetsData.forEach((p) => {
        // Drawing circular orbits line helper
        const ringGeometry = new THREE.RingGeometry(p.radius - 0.02, p.radius + 0.02, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const orbitLine = new THREE.Mesh(ringGeometry, ringMaterial);
        orbitLine.rotation.x = Math.PI / 2;
        scene.add(orbitLine);

        // Planet Sphere
        const planetGeo = new THREE.SphereGeometry(p.size, 16, 16);
        const planetMat = new THREE.MeshBasicMaterial({ color: p.color });
        const mesh = new THREE.Mesh(planetGeo, planetMat);
        
        mesh.userData = { ...p, theta: Math.random() * Math.PI * 2 };
        group.add(mesh);
        planetMeshes.push(mesh);
    });

    scene.add(group);

    const updateDisplayCard = (data) => {
        const card = document.getElementById('planet-interactive-matching-card');
        if (!card) return;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; animation: fadeIn 0.3s ease;">
                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">${data.name}</h4>
                <span style="font-size:28px;">🪐</span>
            </div>
            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: ${data.stone}</p>
            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">${data.desc}</p>
            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: '${data.stone.split(' (')[0]}'});" style="margin-top:15px; width:100%;">Explore ${data.stone.split(' (')[0]}s ➔</button>
        `;
    };

    // Interactive Clicking to set focus
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseClick = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planetMeshes);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            updateDisplayCard(hit.userData);
        }
    };
    container.addEventListener('click', handleMouseClick);

    // Animation
    let animId;
    const render = () => {
        animId = requestAnimationFrame(render);
        
        planetMeshes.forEach(m => {
            m.userData.theta += m.userData.speed;
            m.position.x = m.userData.radius * Math.cos(m.userData.theta);
            m.position.z = m.userData.radius * Math.sin(m.userData.theta);
        });

        renderer.render(scene, camera);
    };
    render();

    // Resize
    const handleResize = () => {
        const w_ = container.clientWidth;
        const h_ = container.clientHeight;
        camera.aspect = w_ / h_;
        camera.updateProjectionMatrix();
        renderer.setSize(w_, h_);
    };
    window.addEventListener('resize', handleResize);

    container.addEventListener('remove', () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('click', handleMouseClick);
        renderer.dispose();
    });
}

// --- Planets 2D Canvas Fallback ---
function initCanvas2DPlanets(container) {
    const canvas = document.createElement('canvas');
    canvas.width = 450;
    canvas.height = 450;
    canvas.style.maxWidth = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const center = 225;

    const planetsData = [
        { name: "Moon (Chandra)", color: "#f8f8ff", size: 6, radius: 55, speed: 0.02, stone: "Pearl (Moti)", desc: "Calms mind, emotional stability & represents pure maternal energy." },
        { name: "Mars (Mangal)", color: "#ff3300", size: 8, radius: 85, speed: 0.015, stone: "Red Coral (Moonga)", desc: "Triggers authority, eliminates health boundaries & clears financial debts." },
        { name: "Mercury (Budh)", color: "#00cc66", size: 7, radius: 120, speed: 0.011, stone: "Emerald (Panna)", desc: "Expands creativity, speech accuracy & massive business profits." },
        { name: "Jupiter (Guru)", color: "#ffd700, size: 14", size: 13, radius: 165, speed: 0.007, stone: "Yellow Sapphire (Pukhraj)", desc: "Coordinates absolute divine grace, health prosperity & luck." }
    ];

    planetsData.forEach(p => p.theta = Math.random() * Math.PI * 2);

    const updateDisplayCard = (p) => {
        const card = document.getElementById('planet-interactive-matching-card');
        if (!card) return;
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 style="color:var(--silver-white); font-size:20px; margin-bottom:5px;">${p.name}</h4>
                <span style="font-size:28px;">🪐</span>
            </div>
            <p style="color:var(--gold-light); font-size:13px; font-weight:700; margin-bottom:12px;">Ruling Stone: ${p.stone}</p>
            <p style="color:var(--champagne-muted); font-size:12px; line-height:1.6;">${p.desc}</p>
            <button class="gold-btn btn-sm" onclick="window.router.navigate('collection', {gemstone: '${p.stone.split(' (')[0]}'});" style="margin-top:15px; width:100%;">Explore ${p.stone.split(' (')[0]}s ➔</button>
        `;
    };

    let hoveredPlanetIdx = -1;
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left - center;
        const my = e.clientY - rect.top - center;

        const dist = Math.sqrt(mx * mx + my * my);
        hoveredPlanetIdx = planetsData.findIndex(p => Math.abs(dist - p.radius) < 15);
        if (hoveredPlanetIdx !== -1) {
            updateDisplayCard(planetsData[hoveredPlanetIdx]);
        }
    });

    let frame;
    const draw = () => {
        frame = requestAnimationFrame(draw);
        ctx.clearRect(0, 0, 450, 450);

        // Draw center Sun
        ctx.beginPath();
        ctx.arc(center, center, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#ffcc00';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#ffcc00';
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        planetsData.forEach((p, idx) => {
            p.theta += p.speed;
            const px = center + p.radius * Math.cos(p.theta);
            const py = center + p.radius * Math.sin(p.theta);

            // Orbit line
            ctx.beginPath();
            ctx.arc(center, center, p.radius, 0, Math.PI * 2);
            ctx.strokeStyle = idx === hoveredPlanetIdx ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.05)';
            ctx.stroke();

            // Planet sphere
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
    };
    draw();

    container.addEventListener('remove', () => {
        cancelAnimationFrame(frame);
    });
}
