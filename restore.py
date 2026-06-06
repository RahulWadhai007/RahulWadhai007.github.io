# -*- coding: utf-8 -*-
import re

with open('projects.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_html = """      <div class="pgrid">
        <!-- Project 1: Agentic Text-to-SQL Engine -->
        <div class="pcard-unified glass rev d1">
          <!-- TOP: title bar -->
          <div class="pcard-title-bar">
            <div class="pinfo-header">
              <span class="pnum-badge">// PROJECT_01 · LangGraph &amp; PostgreSQL</span>
              <span class="pico-sm">??</span>
            </div>
            <h3 class="ptitle-new">Agentic Text-to-SQL Engine with Autonomous Self-Correction</h3>
          </div>

          <!-- MEDIA panel -->
          <div class="pmedia-panel">
            <div class="pmedia-tabs">
              <button class="pmedia-tab active" data-target="p01-video">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Video
              </button>
              <button class="pmedia-tab" data-target="p01-slides">
                <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Slides
              </button>
            </div>
            <div class="pmedia-viewport">
              <div class="pmedia-pane active" id="p01-video">
                <div class="pmedia-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>[ Insert Project 1 Demo Video &lt;iframe&gt; Here ]</span>
                </div>
              </div>
              <div class="pmedia-pane" id="p01-slides"
                   data-slides-url="https://docs.google.com/presentation/d/YOUR_SLIDES_ID_1/embed?start=false&amp;loop=false&amp;delayms=3000">
                <div class="pmedia-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  <span style="color:var(--violet);">LangGraph Architecture &amp; State Machinery</span>
                  <button class="btn btn-g btn-load-slides" onclick="loadSlides(this.closest('.pmedia-pane'))">? Load Slides</button>
                </div>
              </div>
            </div>
          </div>

          <!-- BOTTOM: info panel -->
          <div class="pinfo-panel">
            <p class="pstack-new">Python · LangGraph · PostgreSQL · Llama-3 (8B) · FastAPI · Docker</p>
            <div class="pimpact-rows">
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Challenge:</b> Naive text-to-SQL wrappers crash on complex queries — hallucinated schemas, syntax errors, and broken joins make them unreliable for production BI.</span></div>
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Solution:</b> Architected a stateful AI agent using LangGraph that translates natural language into complex PostgreSQL queries with a deterministic self-correction loop — reruns sandbox SQL, reads system error logs, and retries until execution succeeds.</span></div>
            </div>
            <div class="metric-chip">? SQL queries validated before returning data to users</div>
          </div>
        </div>

        <!-- Project 2: PII Privacy Firewall AI Proxy -->
        <div class="pcard-unified glass rev d2">
          <div class="pcard-title-bar">
            <div class="pinfo-header">
              <span class="pnum-badge">// PROJECT_02 · Enterprise AI Security</span>
              <span class="pico-sm">???</span>
            </div>
            <h3 class="ptitle-new">Enterprise AI Gateway &amp; PII Privacy Proxy</h3>
          </div>

          <div class="pmedia-panel">
            <div class="pmedia-tabs">
              <button class="pmedia-tab active" data-target="p02-video">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Video
              </button>
              <button class="pmedia-tab" data-target="p02-slides">
                <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Slides
              </button>
            </div>
            <div class="pmedia-viewport">
              <div class="pmedia-pane active" id="p02-video">
                <div class="pmedia-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>[ Insert Project 2 Demo Video &lt;iframe&gt; Here ]</span>
                </div>
              </div>
              <div class="pmedia-pane" id="p02-slides"
                   data-slides-url="https://docs.google.com/presentation/d/YOUR_SLIDES_ID_2/embed?start=false&amp;loop=false&amp;delayms=3000">
                <div class="pmedia-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  <span style="color:var(--violet);">PII Redaction Architecture</span>
                  <button class="btn btn-g btn-load-slides" onclick="loadSlides(this.closest('.pmedia-pane'))">? Load Slides</button>
                </div>
              </div>
            </div>
          </div>

          <div class="pinfo-panel">
            <p class="pstack-new">Python · FastAPI · Hugging Face (RoBERTa / Presidio) · Docker · Redis</p>
            <div class="pimpact-rows">
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Challenge:</b> "Shadow AI" data leakage — employees paste proprietary code, customer PII, and financial data into cloud LLMs, violating GDPR and HIPAA compliance.</span></div>
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Solution:</b> Built an AI middleware proxy that intercepts prompts via a local NER pipeline (RoBERTa/Presidio), masks PII before it leaves the network, sends sanitized prompts to the cloud LLM, then re-injects original data into the response.</span></div>
            </div>
            <div class="metric-chip" style="color:var(--vbright); background:rgba(139,92,246,0.08); border-color:rgba(139,92,246,0.2);">?? Zero PII exposure to external LLM APIs (HIPAA/GDPR compliant)</div>
          </div>
        </div>

        <!-- Project 3: Automated MLOps Pipeline -->
        <div class="pcard-unified glass rev d3">
          <div class="pcard-title-bar">
            <div class="pinfo-header">
              <span class="pnum-badge">// PROJECT_03 · MLOps &amp; Fine-Tuning</span>
              <span class="pico-sm">??</span>
            </div>
            <h3 class="ptitle-new">Automated MLOps Pipeline for LLM Synthetic Distillation</h3>
          </div>

          <div class="pmedia-panel">
            <div class="pmedia-tabs">
              <button class="pmedia-tab active" data-target="p03-video">
                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Video
              </button>
              <button class="pmedia-tab" data-target="p03-slides">
                <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Slides
              </button>
            </div>
            <div class="pmedia-viewport">
              <div class="pmedia-pane active" id="p03-video">
                <div class="pmedia-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>[ Insert Project 3 Demo Video &lt;iframe&gt; Here ]</span>
                </div>
              </div>
              <div class="pmedia-pane" id="p03-slides"
                   data-slides-url="https://docs.google.com/presentation/d/YOUR_SLIDES_ID_3/embed?start=false&amp;loop=false&amp;delayms=3000">
                <div class="pmedia-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  <span style="color:var(--violet);">Cost-Effective AI: LLM Distillation &amp; LoRA Fine-Tuning</span>
                  <button class="btn btn-g btn-load-slides" onclick="loadSlides(this.closest('.pmedia-pane'))">? Load Slides</button>
                </div>
              </div>
            </div>
          </div>

          <div class="pinfo-panel">
            <p class="pstack-new">Python · PyTorch · Hugging Face (PEFT / LoRA) · FastAPI · SQLite · Docker</p>
            <div class="pimpact-rows">
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Challenge:</b> Running heavy foundation models (GPT-4o) for repetitive data extraction is cost-prohibitive at scale.</span></div>
              <div class="pimpact-row-new"><span class="bullet">?</span><span><b>Solution:</b> End-to-end MLOps pipeline that intercepts high-quality JSON outputs from a "Teacher" model into SQLite, then auto-triggers LoRA/QLoRA fine-tuning on a 2B "Student" model once a 500-sample threshold is reached.</span></div>
            </div>
            <div class="metric-chip">?? 90%+ reduction in token/compute costs while maintaining task accuracy</div>
          </div>
        </div>
      </div>
"""

js_code = """
  <script>
    function switchMediaTab(card, paneId) {
      card.querySelectorAll('.pmedia-tab').forEach(t => t.classList.remove('active'));
      card.querySelectorAll('.pmedia-pane').forEach(p => p.classList.remove('active'));
      const matchingTab = card.querySelector(.pmedia-tab[data-target=""]);
      if (matchingTab) matchingTab.classList.add('active');
      const targetPane = document.getElementById(paneId);
      if (targetPane) targetPane.classList.add('active');
    }
    function loadSlides(pane) {
      if (pane.hasAttribute('data-loaded')) return;
      const url = pane.dataset.slidesUrl;
      if (!url) return;
      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.allow = 'autoplay';
      iframe.allowFullscreen = true;
      pane.innerHTML = '';
      pane.appendChild(iframe);
      pane.setAttribute('data-loaded', 'true');
    }
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.pmedia-tab');
      if (tab) {
        e.preventDefault();
        const card = tab.closest('.pcard-unified');
        if (card) switchMediaTab(card, tab.dataset.target);
        return;
      }
      const loadBtn = e.target.closest('.btn-load-slides');
      if (loadBtn) {
        const pane = loadBtn.closest('.pmedia-pane');
        if (pane) loadSlides(pane);
      }
    });
  </script>
"""

new_content = re.sub(r'<div class="pgrid">.*?</div>\n    </div>', new_html + '\n    </div>', html, flags=re.DOTALL)
new_content = new_content.replace('</body>', js_code + '\n</body>')

with open('projects.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

css_code = """
/* -------------------------------------------------------
   UNIFIED PROJECT CARDS
   ------------------------------------------------------- */
.pcard-unified {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2rem;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.4s, box-shadow 0.4s, border-color 0.4s;
  position: relative;
}
.pcard-unified:hover {
  border-color: rgba(139,92,246,0.42); 
  box-shadow: 0 24px 60px rgba(0,0,0,0.55), var(--gv);
}
.pcard-title-bar {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,0,0,0.2);
}
.pinfo-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}
.pnum-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.pico-sm {
  font-size: 1.2rem;
  filter: drop-shadow(0 0 8px rgba(139,92,246,0.6));
}
.ptitle-new {
  font-family: 'Space Mono', monospace;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--white);
}

.pmedia-panel {
  display: flex;
  flex-direction: column;
  background: #000;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.pmedia-tabs {
  display: flex;
  background: rgba(15,23,42,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.pmedia-tab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: none;
  color: var(--muted);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.pmedia-tab svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
.pmedia-tab:hover {
  color: var(--white);
  background: rgba(255,255,255,0.05);
}
.pmedia-tab.active {
  color: var(--cyan);
  background: rgba(34,211,238,0.08);
}
.pmedia-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
}

.pmedia-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.pmedia-pane {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.pmedia-pane.active {
  opacity: 1;
  pointer-events: auto;
}
.pmedia-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--muted);
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
}
.pmedia-pane iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.pinfo-panel {
  padding: 2rem;
}
.pstack-new {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--cyan);
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}
.pimpact-rows {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}
.pimpact-row-new {
  display: flex;
  gap: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--muted);
}
.pimpact-row-new .bullet {
  color: var(--vbright);
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
.pimpact-row-new b {
  color: var(--white);
  font-weight: 500;
}
.metric-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: rgba(34,211,238,0.08);
  border: 1px solid rgba(34,211,238,0.2);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: var(--cyan);
  margin-bottom: 1.5rem;
}

/* Light mode adjustments */
body.light-mode .pcard-unified {
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px);
  border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: inset 0 0 20px rgba(255,255,255,0.6), 0 8px 32px rgba(0, 0, 0, 0.04);
}
body.light-mode .pcard-title-bar {
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
body.light-mode .ptitle-new {
  color: #1A202C;
}
body.light-mode .pmedia-tabs {
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
body.light-mode .pmedia-tab {
  color: #334155;
}
body.light-mode .pmedia-tab.active {
  background: rgba(3, 105, 161, 0.08);
  color: #0369a1;
}
body.light-mode .pstack-new {
  color: #6d28d9;
}
body.light-mode .metric-chip {
  color: #0369a1;
  border-color: rgba(3, 105, 161, 0.5);
  background: rgba(3, 105, 161, 0.06);
}

/* Override existing pgrid */
.pgrid {
  display: flex !important;
  flex-direction: column !important;
  gap: 2rem !important;
}
"""

with open('assets/css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_code)
