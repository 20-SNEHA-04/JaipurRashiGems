// Astrological Gemstone Recommendation Engine
const RecommendationWizard = {
  step: 1,
  data: {
    name: "",
    gender: "",
    dob: "",
    tob: "",
    focus: "wealth"
  },

  render(container) {
    this.step = 1;
    this.renderStep(container);
  },

  renderStep(container) {
    let content = "";
    if (this.step === 1) {
      content = `
        <div class="luxury-card recommender-wizard">
          <div class="gold-gradient-bar"></div>
          <h2>Step 1: Personal Details</h2>
          <p class="subtitle">Enter your name and details to align your planetary frequencies.</p>
          <div class="form-group">
            <label for="rec-name">Your Full Name</label>
            <input type="text" id="rec-name" value="${this.data.name}" placeholder="Enter name...">
          </div>
          <div class="form-group">
            <label for="rec-gender">Gender</label>
            <select id="rec-gender">
              <option value="Male" ${this.data.gender === "Male" ? "selected" : ""}>Male</option>
              <option value="Female" ${this.data.gender === "Female" ? "selected" : ""}>Female</option>
              <option value="Other" ${this.data.gender === "Other" ? "selected" : ""}>Other</option>
            </select>
          </div>
          <div class="button-group">
            <button class="gold-btn btn-primary" onclick="RecommendationWizard.nextStep(1)">Next Step <span class="arrow">&rarr;</span></button>
          </div>
        </div>
      `;
    } else if (this.step === 2) {
      content = `
        <div class="luxury-card recommender-wizard">
          <div class="gold-gradient-bar"></div>
          <h2>Step 2: Birth Alignment</h2>
          <p class="subtitle">Accurate birth times help Vedic charts pinpoint planetary alignments.</p>
          <div class="form-group">
            <label for="rec-dob">Date of Birth</label>
            <input type="date" id="rec-dob" value="${this.data.dob}">
          </div>
          <div class="form-group">
            <label for="rec-tob">Time of Birth (Optional)</label>
            <input type="time" id="rec-tob" value="${this.data.tob}">
          </div>
          <div class="form-group">
            <label for="rec-focus">Aura Focus Area</label>
            <select id="rec-focus">
              <option value="wealth" ${this.data.focus === "wealth" ? "selected" : ""}>Wealth & Prosperity</option>
              <option value="health" ${this.data.focus === "health" ? "selected" : ""}>Health & Vitality</option>
              <option value="career" ${this.data.focus === "career" ? "selected" : ""}>Career & Fame</option>
              <option value="love" ${this.data.focus === "love" ? "selected" : ""}>Relationships & Harmony</option>
            </select>
          </div>
          <div class="button-group">
            <button class="gold-btn btn-secondary" onclick="RecommendationWizard.prevStep()">Back</button>
            <button class="gold-btn btn-primary" onclick="RecommendationWizard.nextStep(2)">Analyze Alignment <span class="arrow">&rarr;</span></button>
          </div>
        </div>
      `;
    } else if (this.step === 3) {
      // Calculate results
      const results = this.calculateRecommendation();
      content = `
        <div class="luxury-card recommendation-report">
          <div class="gold-gradient-bar"></div>
          <div class="report-header">
            <span class="badge gold-badge">Vedic Astrology Report</span>
            <h2>Cosmic Gemstone Blueprint</h2>
            <p>Prepared for: <strong>${this.data.name}</strong> | Focus: <strong>${this.data.focus.toUpperCase()}</strong></p>
          </div>

          <div class="report-grid">
            <div class="primary-gem-block">
              <h3>Primary Life Stone (Lagna Stone)</h3>
              <div class="gem-recommendation-card">
                <div class="gem-badge">${results.primaryPlanet}</div>
                <h4>${results.primaryStone}</h4>
                <p>Governed by <strong>${results.primaryPlanet}</strong>, this stone balances your ascendant's energy to activate rapid opportunities in <strong>${this.data.focus}</strong>.</p>
                <div class="mantra-box">
                  <strong>Planetary Mantra:</strong>
                  <p class="mantra">"${results.primaryMantra}"</p>
                </div>
                <a href="#/gemstones" class="gold-btn btn-primary btn-block text-center" style="display: block; text-decoration: none;" onclick="app.setFilter('planet', '${results.primaryPlanet}')">
                  Shop Recommended ${results.primaryStone.split(" ")[0]}s
                </a>
              </div>
            </div>

            <div class="secondary-gem-block">
              <h3>Secondary Beneficiary (Luck Stone)</h3>
              <div class="gem-recommendation-card dark">
                <div class="gem-badge silver">${results.secondaryPlanet}</div>
                <h4>${results.secondaryStone}</h4>
                <p>This supportive stone aligns with <strong>${results.secondaryPlanet}</strong> to stabilize your spiritual aura and ward off energetic blocks.</p>
                <div class="mantra-box">
                  <strong>Planetary Mantra:</strong>
                  <p class="mantra">"${results.secondaryMantra}"</p>
                </div>
                <a href="#/gemstones" class="gold-btn btn-secondary btn-block text-center" style="display: block; text-decoration: none;" onclick="app.setFilter('planet', '${results.secondaryPlanet}')">
                  Shop Recommended ${results.secondaryStone.split(" ")[0]}s
                </a>
              </div>
            </div>
          </div>

          <div class="report-footer text-center">
            <p class="small-text text-muted">All recommendations are simulated using standard Vedic formulations.</p>
            <button class="gold-btn btn-secondary" onclick="window.print()">Print Report</button>
            <button class="gold-btn btn-primary" onclick="RecommendationWizard.reset()">New Consultation</button>
          </div>
        </div>
      `;
    }

    container.innerHTML = content;
  },

  nextStep(currentStep) {
    if (currentStep === 1) {
      const nameInput = document.getElementById("rec-name");
      if (nameInput) this.data.name = nameInput.value.trim() || "Noble Seeker";
      const genderSelect = document.getElementById("rec-gender");
      if (genderSelect) this.data.gender = genderSelect.value;
      this.step = 2;
    } else if (currentStep === 2) {
      const dobInput = document.getElementById("rec-dob");
      if (dobInput) this.data.dob = dobInput.value;
      const tobInput = document.getElementById("rec-tob");
      if (tobInput) this.data.tob = tobInput.value;
      const focusSelect = document.getElementById("rec-focus");
      if (focusSelect) this.data.focus = focusSelect.value;
      this.step = 3;
    }
    const container = document.getElementById("recommender-mount");
    if (container) this.renderStep(container);
  },

  prevStep() {
    this.step = 1;
    const container = document.getElementById("recommender-mount");
    if (container) this.renderStep(container);
  },

  reset() {
    this.step = 1;
    this.data = { name: "", gender: "Male", dob: "", tob: "", focus: "wealth" };
    const container = document.getElementById("recommender-mount");
    if (container) this.renderStep(container);
  },

  calculateRecommendation() {
    // Generate pseudo-astrological matches based on the birth details or fallback defaults
    const planets = ["Jupiter", "Mercury", "Saturn", "Sun", "Venus", "Mars"];
    const dobValue = this.data.dob || "2000-01-01";
    
    // Simple deterministic hash based on date of birth
    let hash = 0;
    for (let i = 0; i < dobValue.length; i++) {
      hash += dobValue.charCodeAt(i);
    }

    const pIdx = hash % planets.length;
    const sIdx = (hash + 3) % planets.length;

    const primaryPlanet = planets[pIdx];
    const secondaryPlanet = planets[sIdx] === primaryPlanet ? planets[(sIdx + 1) % planets.length] : planets[sIdx];

    const guide = window.GemstoneDB.astrologyGuides;
    const primaryInfo = guide.planets[primaryPlanet];
    const secondaryInfo = guide.planets[secondaryPlanet];

    return {
      primaryPlanet,
      primaryStone: primaryInfo.stone,
      primaryMantra: primaryInfo.mantra,
      secondaryPlanet,
      secondaryStone: secondaryInfo.stone,
      secondaryMantra: secondaryInfo.mantra
    };
  }
};

window.RecommendationWizard = RecommendationWizard;
