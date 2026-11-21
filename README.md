# Academic & Clinical E-Portfolio — Papiya Yeasmin Minu

A clean, minimalist, high-performance interactive e-portfolio created for **Papiya Yeasmin Minu**, Senior Nursing Instructor at the **College of Nursing, Mohakhali, Dhaka**, and Gazetted 2nd Class Officer under the Directorate General of Nursing and Midwifery (DGNM), Bangladesh.

Engineered following the official **e-portfolio guidelines** and designed in the modern, minimalist monochrome architecture of **Tomasz Gajda** (`figma.com/community/file/897605510384968096/portfolio-tomasz-gajda`), enhanced with dynamic animations and modern interactive visual effects.

---

## 🌟 Interactive Visual Effects & Modern Animations

1. **Interactive Neural / Constellation Background Canvas (`#bg-canvas`)**:
   - Floating particle nodes that dynamically calculate proximity and draw delicate geometric connections.
   - **Interactive Cursor Physics**: Moving your mouse near particles gently disperses and tethers them with connection lines.
   - **Theme Adaptive**: Automatically shifts color and glow opacity between Light and Dark mode.
   - **Performance Optimized**: Auto-scales based on viewport resolution and automatically pauses when the browser tab is hidden to conserve battery and CPU.

2. **Atmospheric Ambient Mesh Glows**:
   - Soft, slow-drifting Gaussian blurred gradients in the background providing depth without distracting from the clean minimalist typography.

3. **Dynamic Typing Effect**:
   - Live typewriter effect in the hero headline rotating through key clinical specializations:
     - *"Adult Critical Care & Trauma Nursing"*
     - *"Evidence-Based Pressure Ulcer Research"*
     - *"National Nurse Teachers' Curriculum Reform"*
     - *"WHO Disaster Emergency Response"*
     - *"Postgraduate Nursing Thesis Mentorship"*

4. **3D Perspective Card Tilt (`perspective(1000px)`)**:
   - Interactive 3D tilt tracking the mouse coordinates on Core Pillar cards, Featured Project cards, Academic Degree cards, and the Hero Portrait frame. Smoothly resets to neutral when unhovered.

5. **Scroll-Triggered Reveal Animations (`IntersectionObserver`)**:
   - Smooth entrance animations (`reveal-on-scroll`) with staggered delays (`reveal-delay-1`, `reveal-delay-2`, `reveal-delay-3`) as sections come into view.

6. **Animated Live Number Counters**:
   - Dynamic counting animations counting up smoothly from 0 to target metrics upon scroll (`32+ Years`, `17+ Trainings`, `1,200+ Stabilized Patients`, `11 Years Trauma Care`).

7. **Reading Scroll Progress Bar**:
   - Ultra-thin gradient bar at the top of the viewport indicating reading progress in real time.

8. **Custom Minimalist Smooth Cursor**:
   - Dual-element follower (center dot + trailing smooth inertia ring) that dynamically expands and changes blend modes when hovering over buttons, cards, links, and tabs. Auto-disabled on touch devices.

9. **Simulated Audio Equalizer Waveform in Video Section**:
   - 28 animated visualizer equalizer bars that pulse with harmonic sine waveforms in real time when toggling the video presentation play button.

10. **Magnetic Button Pull**:
    - Subtle physics pull on buttons when the pointer moves near them.

11. **Live Status Pill**:
    - Animated pulsing green beacon indicator in the hero section displaying current faculty and research guide availability.

---

## 📂 Project Architecture

```
e-portfolio-papiya-minu/
├── index.html        # Semantic HTML5 e-portfolio document
├── style.css         # Modern monochrome stylesheet with custom keyframes & print styles
├── script.js         # Interactive physics canvas, 3D tilt, counters, typing engine, modals
├── README.md         # Full documentation and deployment instructions
└── assets/
    └── profile.jpg   # Real portrait photograph of Papiya Yeasmin Minu
```

---

## 🚀 How to Open and Present

1. **Immediate Local Launch**:
   - Open [`index.html`](index.html) directly in any web browser (Google Chrome, Apple Safari, Microsoft Edge, Mozilla Firefox).
2. **Local Development Server**:
   ```bash
   cd "/Users/niamulrashid/Desktop/e-portfolio-papiya-minu"
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

---

## 🌐 Free Instant Deployment

- **GitHub Pages**: Push this folder to a GitHub repository and turn on GitHub Pages in repository settings.
- **Netlify / Vercel**: Drag and drop the `e-portfolio-papiya-minu` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop) for instant free hosting with SSL.
- **Print / PDF**: Click the top-right "Print / PDF" button to export a clean, ink-friendly multi-page CV without background animations.
