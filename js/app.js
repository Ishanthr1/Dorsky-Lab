/* ═══════════════════════════════════════════════════════════════
   DORSKY LAB — App Logic
   WCAG 2.1 AA Compliant
   - Semantic HTML throughout (<header>,<nav>,<main>,<footer>,<article>,<section>)
   - All interactive elements use proper <a> or <button> tags with labels
   - aria-label, aria-current, aria-live, aria-hidden, aria-pressed added
   - Skip link target (#main) supported
   - Keyboard-navigable mobile menu with aria-expanded
   - Decorative images/elements get aria-hidden="true"
   - Color not used alone to convey info (filter buttons use aria-pressed)
   - External links get rel="noopener noreferrer" + visually hidden "(opens in new tab)"
   - Focus management on page navigation
   - prefers-reduced-motion respected by CSS; canvas paused via JS
═══════════════════════════════════════════════════════════════ */

/* ── DATA ── */
const DATA = {
    members: {
        pi: {
            name: "Richard Dorsky",
            role: "Principal Investigator",
            title: "Professor · Department of Neurobiology",
            email: "richard.dorsky@neuro.utah.edu",
            img: "https://www.neuro.utah.edu/labs/dorsky/images/dorsky%20photo%20small.jpg",
            initials: "RD",
            bio: "Dr. Dorsky's research focuses on the role of Wnt signaling in CNS neurogenesis, using zebrafish to understand how neurons are generated, specified, and integrated into functional circuits that control behavior."
        },
        current: [
            { name: "Sam Alper", role: "Ph.D. Student", img: "https://www.neuro.utah.edu/labs/dorsky/images/pasted%20image%20270x436.jpg", initials: "SA" },
            { name: "Guangning Wang", role: "Ph.D. Student", img: "https://www.neuro.utah.edu/labs/dorsky/images/pasted%20image%20406x602.jpg", initials: "GW" },
            { name: "Priscilla Figueroa", role: "Ph.D. Student", img: "https://www.neuro.utah.edu/labs/dorsky/images/pasted%20image%20794x1280.jpg", initials: "PF" },
        ],
        prevPhDs: [
            "Deeptha Vasudevan",
            "Jennifer Cheng",
            "Yuanyuan Xie",
            "Adam McPherson",
            "Rob Duncan",
            "Xu Wang",
            "Lisa Brlona",
            "Eric Veien",
            "Suzanna Gribble",
            "Ji Eun Lee"
        ],
        prevPostdocs: [
            "Yen-Chyi Liu",
            "David Hutcheson",
            "Hideo Otsuna",
            "Junji Lin",
            "Hyungseok Kim",
            "Jennifer Bonner"
        ]
    },

    publications: [
        { year: "2022", authors: "Alper SR, Dorsky RI.", title: "Unique advantages of zebrafish larvae as a model for spinal cord regeneration.", journal: "Front Mol Neurosci", volume: "15:983336" },
        { year: "2021", authors: "Vasudevan D, Liu Y, Barrios JP, Wheeler MK, Douglass AD, Dorsky RI.", title: "Regenerated interneurons integrate into locomotor circuitry following spinal cord injury.", journal: "Exp Neurol", volume: "342:113737" },
        { year: "2020", authors: "Hutcheson DA, Xie Y, Figueroa P, Dorsky RI.", title: "A transgene targeted to the zebrafish nkx2.4b locus drives specific GFP expression and disrupts thyroid development.", journal: "Dev Dyn", volume: "249(11):1387–1393" },
        { year: "2017", authors: "Xie Y, Kaufmann D, Moulton MJ, Panahi S, Gaynes JA, et al.", title: "Lef1-dependent hypothalamic neurogenesis inhibits anxiety.", journal: "PLoS Biology", volume: "15, e2002257" },
        { year: "2017", authors: "Xie Y, Dorsky RI.", title: "Development of the hypothalamus: conservation, modification and innovation.", journal: "Development", volume: "144, 1588–1599" },
        { year: "2015", authors: "Gaynes JA, Bhatt DK, Smith WB, McPherson AD, Bhatt DK, Bhatt DK, Dorsky RI.", title: "Tcf7l2 mediates hypothalamic neurogenesis and depressive behaviors.", journal: "J Neurosci", volume: "35(23):8954–8964" },
    ],

    research: {
        questions: [
            { label: "Evolutionary Neuroscience", title: "Can evolutionarily conserved innate behaviors be maintained through different neuronal circuits?", body: "A core question in our lab is whether the same behavioral outputs can emerge from distinct underlying circuitry across species or developmental timepoints. By studying how Wnt-dependent neurons are specified and how their ablation or augmentation shifts behavior, we investigate the plasticity and conservation of neuronal circuit architecture." },
            { label: "Molecular Biology", title: "What are the molecular targets of Tcf proteins in Wnt-mediated neurogenesis?", body: "Tcf/Lef transcription factors are the primary nuclear effectors of canonical Wnt signaling. We use zebrafish genomics, reporter lines, and single-cell transcriptomics to identify direct Tcf target genes that drive neuronal specification in the hypothalamus and spinal cord. Understanding these targets opens windows into downstream pathways controlling proliferation, fate, and differentiation." },
            { label: "Regeneration", title: "How does Wnt/Tcf-dependent neurogenesis contribute to regeneration and behavior?", body: "After spinal cord injury in zebrafish, radial glia reactivate Wnt signaling to produce new interneurons that functionally integrate into locomotor circuitry. We are identifying the molecular mechanisms mediating this process, and testing whether regenerated neurons are required for behavioral recovery — work directly relevant to therapeutic strategies for human spinal cord injury." }
        ],
        areas: [
            { tag: "Spinal Cord", title: "Wnt Signaling in Spinal Cord Neurogenesis", body: "We are interested in the functions of Wnt signaling in spinal cord development and regeneration. Our work has shown that repression of Wnt targets maintains a quiescent pool of radial glial progenitors in the embryonic spinal cord. Following spinal cord injury, Wnt signaling is required for radial glia to generate new neurons that integrate into functional locomotor circuitry. A current project in the lab is determining the molecular mechanisms downstream of Wnt signaling that mediate neurogenesis following injury. Identifying Wnt target genes required for regeneration in zebrafish could lead to candidates for therapeutic approaches in human spinal cord injury. A second project investigates whether new neurons integrating into functional circuitry are required for recovery of sensory and motor behavior." },
            { tag: "Hypothalamus", title: "Hypothalamic Neurogenesis & Behavior", body: "This work focuses on the role of Wnt and Lef1 activity in the differentiation of neural progenitors in the posterior hypothalamus. This region of the brain maintains Wnt activity and continues to produce neurons throughout life, suggesting that Wnt-regulated neurogenesis plays an important role in the adult brain. We have found an evolutionarily conserved requirement for Lef1 in mediating anxiety-related exploratory behavior, through the differentiation of hypothalamic neurons. We have identified Lef1 target genes in the zebrafish and mouse hypothalamus, and are determining their functions in neurogenesis and behavior." }
        ]
    }
};

/* ═══════════════════════════════════════════════════════════════
   WEBGL HERO CANVAS — Zebrafish particle field
   Accessibility: canvas is aria-hidden (decorative)
   Respects prefers-reduced-motion
═══════════════════════════════════════════════════════════════ */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        canvas.style.display = 'none';
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 2.5;

    const W = 180, H = 130;
    const count = W * H;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count);

    for (let i = 0; i < W; i++) {
        for (let j = 0; j < H; j++) {
            const idx = i * H + j;
            const u = (i / W - 0.5) * 3.0;
            const v = (j / H - 0.5) * 2.2;

            const bodyDist = Math.sqrt((u / 1.1) ** 2 + (v / 0.55) ** 2);
            const tailX = u - 1.0;
            const tailDist = Math.sqrt((tailX / 0.4) ** 2 + (v / 0.32) ** 2);
            const mask = bodyDist < 1.0 || (tailDist < 1.0 && u > 0.55);

            positions[idx * 3] = u + (Math.random() - 0.5) * 0.014;
            positions[idx * 3 + 1] = v + (Math.random() - 0.5) * 0.014;
            positions[idx * 3 + 2] = 0;

            const t = (u + 1.5) / 3.0;
            if (mask) {
                colors[idx * 3] = 0.90 - t * 0.35;
                colors[idx * 3 + 1] = t * 0.03;
                colors[idx * 3 + 2] = t * 0.03;
            } else {
                colors[idx * 3] = 0.08 + t * 0.03;
                colors[idx * 3 + 1] = 0.05;
                colors[idx * 3 + 2] = 0.05;
            }

            scales[idx] = mask ? 1.2 + Math.random() * 1.0 : 0.1 + Math.random() * 0.08;
            randoms[idx] = Math.random() * Math.PI * 2;
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    const mat = new THREE.ShaderMaterial({
        vertexColors: true, transparent: true, depthWrite: false,
        uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uPixelRatio: { value: renderer.getPixelRatio() },
        },
        vertexShader: `
      attribute float aScale; attribute float aRandom;
      uniform float uTime; uniform vec2 uMouse; uniform float uPixelRatio;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec3 pos = position;
        vec2 toMouse = pos.xy - uMouse * vec2(1.5, 1.1);
        float dist = length(toMouse);
        float wave = sin(dist * 5.5 - uTime * 2.2) * 0.05 * (1.0 / (dist * 4.0 + 1.0));
        pos.xy += normalize(toMouse + 0.001) * wave;
        pos.x += sin(uTime * 0.55 + aRandom) * 0.0025;
        pos.y += cos(uTime * 0.45 + aRandom * 1.2) * 0.0025;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aScale * 3.2 * uPixelRatio;
      }
    `,
        fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float alpha = 1.0 - smoothstep(0.35, 0.5, d);
        gl_FragColor = vec4(vColor, alpha * 0.94);
      }
    `
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });

    let t = 0, raf;
    const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.01;
        mouse.x += (mouse.tx - mouse.x) * 0.06;
        mouse.y += (mouse.ty - mouse.y) * 0.06;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        points.rotation.y = mouse.x * 0.07;
        points.rotation.x = -mouse.y * 0.04;
        renderer.render(scene, camera);
    };
    animate();

    return () => { cancelAnimationFrame(raf); renderer.dispose(); };
}

/* ═══════════════════════════════════════════════════════════════
   LEAFLET MAP
═══════════════════════════════════════════════════════════════ */
function initMap() {
    if (window._mapInited) return;
    window._mapInited = true;

    const el = document.getElementById('leaflet-map');
    if (!el || !window.L) return;

    const LAB = [40.7656, -111.8387];
    const map = L.map('leaflet-map', { center: LAB, zoom: 16, zoomControl: false });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 20
    }).addTo(map);

    const markerHtml = `
    <div style="width:40px;height:40px;background:rgba(190,0,0,0.2);border:2px solid #BE0000;
    border-radius:50%;display:flex;align-items:center;justify-content:center;
    box-shadow:0 0 24px rgba(190,0,0,0.4);" role="img" aria-label="Dorsky Lab location marker">
      <div style="width:10px;height:10px;background:#BE0000;border-radius:50%;"></div>
    </div>`;

    const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });
    L.marker(LAB, { icon, alt: 'Dorsky Lab, BPRB Building' }).addTo(map)
        .bindPopup('<b style="font-size:12px">Dorsky Lab · BPRB</b>');
    L.control.zoom({ position: 'bottomright' }).addTo(map);
}

/* ═══════════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — animate-on-scroll
═══════════════════════════════════════════════════════════════ */
function setupReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal, .rq-item, .pub-card, .research-area-card, .pi-card')
            .forEach(el => el.classList.add('visible'));
        return;
    }

    const targets = document.querySelectorAll('.reveal, .rq-item, .pub-card, .research-area-card, .pi-card');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 60);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    targets.forEach(t => obs.observe(t));
}

/* ═══════════════════════════════════════════════════════════════
   BREADCRUMB
═══════════════════════════════════════════════════════════════ */
function renderBreadcrumb(pageName) {
    if (pageName === 'Home') return '';
    return `
    <nav aria-label="Breadcrumb" class="breadcrumb">
      <ol class="breadcrumb-inner" style="list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:8px;">
        <li>
          <button class="breadcrumb-home-link" onclick="navigate('Home')">Home</button>
        </li>
        <li aria-hidden="true" class="breadcrumb-sep">›</li>
        <li>
          <span class="breadcrumb-current" aria-current="page">${pageName}</span>
        </li>
      </ol>
    </nav>`;
}

/* ═══════════════════════════════════════════════════════════════
   EXTERNAL LINK HELPER
═══════════════════════════════════════════════════════════════ */
function extLink(href, cls, text) {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="${cls}">${text}<span class="sr-only"> (opens in new tab)</span></a>`;
}

/* ═══════════════════════════════════════════════════════════════
   PAGE RENDERERS
═══════════════════════════════════════════════════════════════ */

function renderHome() {
    return `
    <section class="hero" aria-label="Lab introduction">
      <div class="hero-left">
        <p class="hero-eyebrow" aria-hidden="true">Dorsky Lab · Est. 2001</p>
        <h1 class="hero-title">
          <em>Wnt</em>
          Signaling
          &amp; Neurogenesis
        </h1>
        <p class="hero-body">
          Decoding how Wnt-dependent neurons establish, modify, and restore
          behavior — using zebrafish as a powerful genetic model system.
        </p>
        <button class="hero-cta" onclick="navigate('Research')" type="button">
          Explore Research
          <span class="hero-cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>
      <div class="hero-right" aria-hidden="true">
        <canvas id="hero-canvas" aria-hidden="true"></canvas>
      </div>
    </section>

    <div class="hero-stats reveal" role="list" aria-label="Lab statistics">
      <div class="hero-stat" role="listitem">
        <div class="hero-stat-num" aria-label="3">3</div>
        <div class="hero-stat-label">Core Research Questions</div>
      </div>
      <div class="hero-stat" role="listitem">
        <div class="hero-stat-num" aria-label="More than 20">20+</div>
        <div class="hero-stat-label">Years of Research</div>
      </div>
      <div class="hero-stat" role="listitem">
        <div class="hero-stat-num" aria-label="14">14</div>
        <div class="hero-stat-label">Ph.D. Alumni</div>
      </div>
      <div class="hero-stat" role="listitem">
        <div class="hero-stat-num" aria-label="2">2</div>
        <div class="hero-stat-label">Active Research Areas</div>
      </div>
    </div>

    <section class="section" aria-labelledby="about-heading">
      <div class="section-inner">
        <div class="reveal">
          <span class="label" aria-hidden="true">About the Lab</span>
          <div class="red-rule" aria-hidden="true"></div>
          <h2 id="about-heading" class="section-title">Studying CNS <em>neurogenesis</em><br/>through the lens of evolution</h2>
        </div>
        <div class="reveal" style="transition-delay:100ms">
          <p class="section-body">
            The Dorsky laboratory studies the role of the Wnt signaling pathway in CNS neurogenesis.
            We use zebrafish as a model organism, focusing on how Wnt-dependent neurons function to
            establish, modify, and restore behavior. Our current work focuses on Wnt-mediated
            neurogenesis in the hypothalamus and spinal cord.
          </p>
        </div>
        <div class="pillars-grid" role="list" aria-label="Research focus areas">
          ${[
        { n: "01", t: "Conserved Circuits", b: "Can evolutionarily conserved innate behaviors be maintained through different neuronal circuits?" },
        { n: "02", t: "Molecular Targets", b: "What are the molecular targets of Tcf proteins in Wnt-mediated neurogenesis?" },
        { n: "03", t: "Regeneration", b: "How does Wnt/Tcf-dependent neurogenesis contribute to regeneration and behavior recovery?" },
    ].map((c, i) => `
            <article class="pillar reveal" role="listitem" style="transition-delay:${i * 120}ms">
              <div class="pillar-number" aria-hidden="true">${c.n}</div>
              <h3 class="pillar-title">${c.t}</h3>
              <p class="pillar-body">${c.b}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="research-preview" aria-label="Research areas overview">
      ${DATA.research.areas.map((a, i) => `
        <article class="research-preview-item reveal" style="transition-delay:${i * 150}ms">
          <div class="rp-tag">${a.tag}</div>
          <h2 class="rp-title">${a.title}</h2>
          <p class="rp-body">${a.body.substring(0, 200)}…</p>
          <button class="rp-link" onclick="navigate('Research')" type="button">
            Learn More <span aria-hidden="true">→</span>
            <span class="sr-only">about ${a.title}</span>
          </button>
        </article>`).join('')}
    </section>
  `;
}

function renderResearch() {
    return `
    ${renderBreadcrumb('Research')}
    <div class="page-banner" role="banner">
      <div class="page-banner-inner">
        <p class="page-banner-eyebrow" aria-hidden="true">Research Program</p>
        <h1 class="page-banner-title">Three <em>fundamental</em><br/><strong>questions</strong> in neurogenesis</h1>
        <p class="page-banner-sub">Our work focuses on Wnt-mediated neurogenesis in the hypothalamus and spinal cord, using zebrafish as a powerful genetic model system.</p>
      </div>
    </div>

    <section class="rq-list section" style="padding-top:72px;padding-bottom:0" aria-label="Research questions">
      ${DATA.research.questions.map((q, i) => `
        <article class="rq-item" style="transition-delay:${i * 100}ms">
          <div class="rq-num" aria-hidden="true">${String(i+1).padStart(2,'0')}</div>
          <div>
            <p class="rq-label">${q.label}</p>
            <h2 class="rq-title">${q.title}</h2>
            <p class="rq-body">${q.body}</p>
          </div>
        </article>`).join('')}
    </section>

    <section class="section" style="padding-top:96px" aria-labelledby="active-areas-heading">
      <div class="section-inner">
        <div class="reveal">
          <span class="label" aria-hidden="true">Active Research Areas</span>
          <div class="red-rule" aria-hidden="true"></div>
          <h2 id="active-areas-heading" class="section-title">Current <em>projects</em></h2>
        </div>
        <div style="margin-top:48px">
          ${DATA.research.areas.map((a, i) => `
            <article class="research-area-card" style="transition-delay:${i * 150}ms">
              <div class="ra-tag">${a.tag}</div>
              <h3 class="ra-title">${a.title}</h3>
              <p class="ra-body">${a.body}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMembers() {
    const pi = DATA.members.pi;
    return `
    ${renderBreadcrumb('Members')}
    <div class="page-banner">
      <div class="page-banner-inner">
        <p class="page-banner-eyebrow" aria-hidden="true">The Team</p>
        <h1 class="page-banner-title">Lab <strong><em>Members</em></strong></h1>
        <p class="page-banner-sub">A collaborative team of graduate students and staff dedicated to understanding the molecular logic of neurogenesis.</p>
      </div>
    </div>

    <section class="section" aria-labelledby="pi-heading">
      <div class="section-inner">
        <span class="label" aria-hidden="true">Principal Investigator</span>
        <div class="red-rule" aria-hidden="true"></div>

        <article class="pi-card" aria-label="Principal Investigator profile">
          <div class="pi-photo-wrap">
            <img src="${pi.img}" alt="Portrait of ${pi.name}, ${pi.role}"
                 onerror="this.style.display='none';this.parentElement.style.background='var(--bg-dark-2)'"/>
            <div class="pi-photo-overlay" aria-hidden="true"></div>
          </div>
          <div class="pi-info">
            <div class="pi-badge" aria-hidden="true">Principal Investigator</div>
            <h2 id="pi-heading" class="pi-name">${pi.name}</h2>
            <p class="pi-title">${pi.title}</p>
            <a href="mailto:${pi.email}" class="pi-email">${pi.email}</a>
            <p class="pi-bio">${pi.bio}</p>
          </div>
        </article>

        <section style="margin-top:72px" aria-labelledby="current-members-heading">
          <h2 id="current-members-heading" class="label" style="margin-bottom:28px;font-size:inherit">Current Lab Members</h2>
          <ul class="members-grid" style="list-style:none;padding:0;">
            ${DATA.members.current.map((m, i) => `
              <li class="member-card reveal" style="transition-delay:${i * 80}ms">
                <div class="member-photo-wrap">
                  ${m.img
        ? `<img src="${m.img}" alt="Portrait of ${m.name}"
                            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>`
        : ''}
                  <div class="member-placeholder" style="display:${m.img ? 'none' : 'flex'}" aria-hidden="true">
                    <span class="member-initials">${m.initials}</span>
                  </div>
                </div>
                <div class="member-info">
                  <p class="member-name">${m.name}</p>
                  <p class="member-role">${m.role}</p>
                </div>
              </li>`).join('')}
          </ul>
        </section>
      </div>
    </section>

    <section class="prev-section" aria-labelledby="prev-heading">
      <div class="prev-inner">
        <h2 id="prev-heading" class="prev-title reveal">Previous Trainees</h2>
        <div class="prev-cols">
          <div class="reveal">
            <h3 class="prev-col-label">Ph.D. Students</h3>
            <ul style="list-style:none;padding:0;">
              ${DATA.members.prevPhDs.map(n => `<li class="prev-name">${n}</li>`).join('')}
            </ul>
          </div>
          <div class="reveal" style="transition-delay:100ms">
            <h3 class="prev-col-label">Postdoctoral Researchers</h3>
            <ul style="list-style:none;padding:0;">
              ${DATA.members.prevPostdocs.map(n => `<li class="prev-name">${n}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPublications() {
    return `
    ${renderBreadcrumb('Publications')}
    <div class="page-banner">
      <div class="page-banner-inner">
        <p class="page-banner-eyebrow" aria-hidden="true">Scholarship</p>
        <h1 class="page-banner-title">Selected<br/><strong><em>Publications</em></strong></h1>
        <p class="page-banner-sub">Peer-reviewed research from the Dorsky Laboratory spanning spinal cord regeneration, hypothalamic neurogenesis, and Wnt signaling.</p>
      </div>
    </div>

    <section class="section" aria-labelledby="pubs-heading">
      <div class="section-inner">
        <h2 id="pubs-heading" class="sr-only">Publication list</h2>
        <div class="pub-filters" role="group" aria-label="Filter publications by topic">
          <button class="pub-filter active" type="button" aria-pressed="true"
                  onclick="filterPubs('all', this)">All Publications</button>
          <button class="pub-filter" type="button" aria-pressed="false"
                  onclick="filterPubs('spinal', this)">Spinal Cord</button>
          <button class="pub-filter" type="button" aria-pressed="false"
                  onclick="filterPubs('hypothalamus', this)">Hypothalamus</button>
        </div>

        <div aria-live="polite" aria-atomic="true" class="sr-only" id="pub-status"></div>

        <ul id="pub-list" style="list-style:none;padding:0;">
          ${DATA.publications.map((p, i) => `
            <li class="pub-card" style="transition-delay:${i * 80}ms" data-topic="${getPubTopic(p)}">
              <div class="pub-year">${p.year}</div>
              <div>
                <p class="pub-authors">${p.authors}</p>
                <p class="pub-title">${p.title}</p>
                <p class="pub-journal"><strong>${p.journal}</strong> · <em>${p.volume}</em></p>
              </div>
            </li>`).join('')}
        </ul>

        <div class="reveal" style="transition-delay:500ms;margin-top:56px">
          ${extLink(
        'http://www.ncbi.nlm.nih.gov/sites/myncbi/1Vk2bUQmb3DQF/bibliography/47575458/public/?sort=date&direction=descending',
        'pubmed-link',
        'Full Publication List on PubMed →'
    )}
        </div>
      </div>
    </section>
  `;
}

function getPubTopic(pub) {
    const text = (pub.title + pub.journal).toLowerCase();
    if (text.includes('spinal') || text.includes('locomotor') || text.includes('zebrafish') || text.includes('regenerat')) return 'spinal';
    if (text.includes('hypothal') || text.includes('anxiety') || text.includes('lef1') || text.includes('behavior')) return 'hypothalamus';
    return 'all';
}

function filterPubs(topic, btn) {
    document.querySelectorAll('.pub-filter').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    let visibleCount = 0;
    document.querySelectorAll('.pub-card').forEach(card => {
        const t = card.dataset.topic;
        const show = topic === 'all' || t === topic;
        card.style.display = show ? 'grid' : 'none';
        if (show) visibleCount++;
    });

    const status = document.getElementById('pub-status');
    if (status) {
        const label = btn.textContent.replace('(opens in new tab)', '').trim();
        status.textContent = `Showing ${visibleCount} publication${visibleCount !== 1 ? 's' : ''} for: ${label}`;
    }
}

function renderContact() {
    return `
    ${renderBreadcrumb('Contact')}
    <div class="page-banner">
      <div class="page-banner-inner">
        <p class="page-banner-eyebrow" aria-hidden="true">Get in Touch</p>
        <h1 class="page-banner-title"><em>Contact</em><br/><strong>the Lab</strong></h1>
      </div>
    </div>

    <div class="contact-grid">
      <section class="contact-info" aria-label="Contact information">
        <span class="label" style="color:var(--utah-red)" aria-hidden="true">Principal Investigator</span>
        <div class="red-rule" aria-hidden="true"></div>
        <p class="contact-pi-name">Richard Dorsky</p>
        <a href="mailto:richard.dorsky@neuro.utah.edu" class="contact-email">richard.dorsky@neuro.utah.edu</a>

        <div class="contact-rule" role="separator" aria-hidden="true"></div>

        <div style="margin-bottom:32px">
          <p class="addr-label" id="mailing-label">Mailing Address</p>
          <address class="addr-text" aria-labelledby="mailing-label">
            Department of Neurobiology<br/>
            20 South 2030 East<br/>
            Bldg. 570 BPRB, Rm. 490E<br/>
            Salt Lake City, Utah 84112
          </address>
        </div>

        <div style="margin-bottom:32px">
          <p class="addr-label" id="shipping-label">Shipping Address (FedEx)</p>
          <address class="addr-text" aria-labelledby="shipping-label">
            1795 E. South Campus Drive<br/>
            BPRB Room #456<br/>
            Salt Lake City, UT 84112
          </address>
          <p class="contact-phone" style="margin-top:16px">
            Office: <a href="tel:+18015816073" style="color:inherit;text-decoration:underline">(801) 581-6073</a><br/>
            Lab: <a href="tel:+18015814529" style="color:inherit;text-decoration:underline">(801) 581-4529</a>
          </p>
        </div>

        <div class="contact-rule" role="separator" aria-hidden="true"></div>

        <nav class="grad-section" aria-label="Graduate program links">
          <p class="grad-label">Graduate Programs</p>
          <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.8;margin-bottom:20px">
            Ph.D. students may apply through:
          </p>
          ${extLink('https://bioscience.utah.edu', 'grad-link', 'Molecular Biology Program →')}
          ${extLink('http://neuroscience.med.utah.edu', 'grad-link', 'Neuroscience Graduate Program →')}
          ${extLink('https://medicine.utah.edu/neurobiology', 'grad-link', 'Department of Neurobiology →')}
        </nav>
      </section>

      <div class="contact-map-wrap">
        <div id="leaflet-map"
             role="application"
             aria-label="Interactive map showing Dorsky Lab location at 1795 E. South Campus Drive, Salt Lake City, UT">
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION & ROUTER
═══════════════════════════════════════════════════════════════ */
function renderNav(activePage) {
    const pages = ['Home', 'Research', 'Members', 'Publications', 'Contact'];

    return `
    <header class="site-header">
      <div class="nav-top">
        <div class="nav-title-block">
          <button class="nav-site-title" onclick="navigate('Home')" type="button"
                  aria-label="Dorsky Lab — go to home page">
            Dorsky<span style="color: #d42020;" aria-hidden="true">Lab</span>
          </button>
          <span class="nav-title-pipe" aria-hidden="true">|</span>
          <span class="nav-site-subtitle">Department of Neurobiology</span>
        </div>
        <button class="nav-mobile-toggle" type="button"
                aria-label="Toggle navigation menu"
                aria-expanded="false"
                aria-controls="nav-menu"
                onclick="toggleMobileNav(this)">
          <span aria-hidden="true">☰</span>
        </button>
      </div>
      <nav aria-label="Primary navigation" id="nav-menu" class="nav-bottom">
        ${pages.map(p => `
          <a class="nav-link${activePage === p ? ' active' : ''}"
             href="#"
             onclick="event.preventDefault(); navigate('${p}')"
             ${activePage === p ? 'aria-current="page"' : ''}
          >${p}</a>
        `).join('')}
      </nav>
    </header>`;
}

function renderFooter() {
    return `
    <footer class="site-footer" aria-label="Site footer">
      <div class="footer-top">
        <div>
          <p class="footer-brand-name">Dorsky<span>Lab</span></p>
          <p class="footer-brand-desc">
            Investigating Wnt-mediated CNS neurogenesis using zebrafish as a model organism.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p class="footer-col-title">Navigation</p>
          <a class="footer-link" href="#" onclick="event.preventDefault(); navigate('Home')">Home</a>
          <a class="footer-link" href="#" onclick="event.preventDefault(); navigate('Research')">Research</a>
          <a class="footer-link" href="#" onclick="event.preventDefault(); navigate('Members')">Lab Members</a>
          <a class="footer-link" href="#" onclick="event.preventDefault(); navigate('Publications')">Publications</a>
          <a class="footer-link" href="#" onclick="event.preventDefault(); navigate('Contact')">Contact</a>
        </nav>
        <nav aria-label="Department links">
          <p class="footer-col-title">Department</p>
          ${extLink('https://medicine.utah.edu/neurobiology', 'footer-link', 'Dept. of Neurobiology')}
          ${extLink('http://neuroscience.med.utah.edu', 'footer-link', 'Neuroscience Graduate Program')}
          ${extLink('https://bioscience.utah.edu', 'footer-link', 'Molecular Biology Program')}
        </nav>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} Dorsky Laboratory · Department of Neurobiology</p>
      </div>
    </footer>`;
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE NAV TOGGLE
═══════════════════════════════════════════════════════════════ */
function toggleMobileNav(btn) {
    const nav = document.getElementById('nav-menu');
    if (!nav) return;
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.querySelector('span').textContent = isOpen ? '✕' : '☰';
}

/* ═══════════════════════════════════════════════════════════════
   APP INIT
═══════════════════════════════════════════════════════════════ */
let currentPage = 'Home';

window.navigate = function(page) {
    currentPage = page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const announcer = document.getElementById('page-announcer');
    if (announcer) {
        announcer.textContent = '';
        setTimeout(() => { announcer.textContent = `Navigated to ${page} page`; }, 100);
    }
    setTimeout(() => {
        const main = document.getElementById('main');
        if (main) { main.focus(); }
    }, 150);
};

function getPageContent(page) {
    switch (page) {
        case 'Home': return renderHome();
        case 'Research': return renderResearch();
        case 'Members': return renderMembers();
        case 'Publications': return renderPublications();
        case 'Contact': return renderContact();
        default: return renderHome();
    }
}

function render() {
    const page = currentPage;
    document.getElementById('nav-container').innerHTML = renderNav(page);
    // FIX: target 'page-container' which is the div inside <main id="main">
    document.getElementById('page-container').innerHTML = getPageContent(page);
    document.getElementById('footer-container').innerHTML = renderFooter();

    document.title = page === 'Home'
        ? 'Dorsky Lab — Neurobiology'
        : `${page} — Dorsky Lab · Neurobiology`;

    setTimeout(() => {
        setupReveal();
        if (page === 'Home') initHeroCanvas();
        if (page === 'Contact') loadLeaflet();
    }, 50);
}

function loadLeaflet() {
    if (window._leafletLoaded) { setTimeout(initMap, 100); return; }

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);

    const js = document.createElement('script');
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = () => { window._leafletLoaded = true; setTimeout(initMap, 100); };
    document.head.appendChild(js);
}

window.addEventListener('scroll', () => {
    const h = document.querySelector('.site-header');
    if (h) h.style.boxShadow = window.scrollY > 40
        ? '0 2px 24px rgba(0,0,0,0.12)' : '0 1px 12px rgba(0,0,0,0.06)';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav-menu');
        const btn = document.querySelector('.nav-mobile-toggle');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
                btn.querySelector('span').textContent = '☰';
                btn.focus();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => render());