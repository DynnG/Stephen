# Stephen Villamor — Portfolio Website

A mobile-first portfolio website for **Stephen Villamor**, Furniture & Cabinet Maker based in Cebu, Philippines.

Designed using **Google Stitch** as the visual source of truth, featuring an artisan timber aesthetic, mobile swipeable project showcase, technical capabilities catalog, and 1-tap commission contact channels.

---

## 🛠️ Tech Stack & Architecture

- **HTML5 & Modern CSS**: Pure semantic markup, responsive viewport layout, safe-area inset support for modern smartphones (iPhone dynamic island & Android notch).
- **Tailwind CSS**: Custom artisan palette (`wood-charcoal`, `wood-walnut`, `wood-amber`, `wood-sand`, `wood-cream`, etc.).
- **Google Fonts**:
  - `Space Grotesk` (Headlines & branding)
  - `Hanken Grotesk` (Body & reading)
  - `JetBrains Mono` (Technical specs, badges, and tools)
- **Material Symbols Outlined**: Google iconography for woodworking and craft tools.
- **Swipeable Carousel**: Native CSS snap carousel (`scroll-snap-type: x mandatory`) with touch swipe support on smartphones and desktop arrow navigation.

---

## 🚀 How to Run Locally

You can run this project in any of the following ways:

### Option 1: Double-click / Open in Browser (Zero Install)
Simply double-click `index.html` or open it with your web browser (Chrome, Edge, Safari, Firefox). No build step required!

### Option 2: Using Vite Dev Server
```bash
npm install
npm run dev
```

### Option 3: Using Python Built-in Server
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000`.

---

## 📸 Replacing Project Placeholders with Real Photos

When project photos are ready:

1. Save your photos into the `assets/images/` directory:
   - `assets/images/project-01.jpg` (Custom Cabinetry)
   - `assets/images/project-02.jpg` (Solid Timber Dining Table)
   - `assets/images/project-03.jpg` (Modular Storage Unit)
   - `assets/images/project-04.jpg` (Workshop Utility Bench)
   - `assets/images/profile.jpg` (Workshop Profile Photo)

2. Open `index.html` and replace the placeholder inside any project card:
   ```html
   <!-- Replace the placeholder <div> with: -->
   <img 
     src="assets/images/project-01.jpg" 
     alt="Custom Cabinetry" 
     class="w-full aspect-[4/3] object-cover rounded border border-wood-border/80 mb-3"
     loading="lazy"
   />
   ```

---

## 📱 Mobile-First Breakpoint Testing

Optimized and verified across:
- **360px** (Compact Android phones)
- **390px** (iPhone standard)
- **430px** (iPhone Pro Max / Android flagships)
- **768px** (Tablets)
- **1024px+** (Laptops & Desktops)

Touch targets are strictly sized at a minimum of **48px - 52px** height for comfortable thumb tapping.
