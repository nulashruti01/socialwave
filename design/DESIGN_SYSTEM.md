# SocialWave Premium Home Screen UI Design System

## 🎨 Design Philosophy

The SocialWave home screen UI embodies a **2026 futuristic mobile app aesthetic** with emphasis on:
- Clean, minimal interface
- Premium glassmorphism effects
- Neon gradient accents (pink, purple, cyan)
- Dark mode first approach
- Smooth, intentional animations
- Exceptional spacing hierarchy
- High engagement-focused interactions

---

## 📐 Color Palette

### Primary Colors
| Color | Hex | Purpose |
|-------|-----|---------|
| Dark Background | `#0a0e27` | Main app background |
| Secondary Background | `#151b35` | Card & section backgrounds |
| Tertiary Background | `#1a2240` | Nested component backgrounds |

### Accent Colors
| Color | Hex | Purpose |
|-------|-----|---------|
| Neon Pink | `#ec4899` | Primary action, highlights |
| Neon Purple | `#a855f7` | Secondary accent |
| Neon Cyan | `#00d9ff` | Interactive elements, active states |

### Text Colors
| Color | Hex | Purpose |
|-------|-----|---------|
| Primary Text | `#ffffff` | Main content text |
| Secondary Text | `#a0aec0` | Meta information, labels |

### Glass Effects
| Component | Opacity | Use |
|-----------|---------|-----|
| Glass Light | 5% white | Card backgrounds |
| Glass Medium | 10% white | Hover states, overlays |

---

## 🎯 Layout Structure

### 1. Top Navigation Bar
- **Height**: 64px with padding
- **Position**: Fixed/Sticky
- **Background**: Glassmorphic with 20px blur
- **Border**: 1px light border bottom
- **Components**:
  - Left: Logo with gradient text + icon
  - Right: Notification & DM icons with badge indicators
  - Backdrop filter: `blur(20px)`

### 2. Stories Carousel Section
- **Height**: 120px (80px avatar + 40px username/padding)
- **Scroll**: Horizontal, smooth, no scrollbar
- **Story Items**:
  - Circular avatars (80x80px)
  - Gradient rings for unviewed stories
  - Plus icon on "Your Story"
  - Hover: translateY(-4px)

### 3. Main Feed Section
- **Grid Layout**: 1fr for main, 320px sidebar (collapses on mobile)
- **Gap**: 2rem between main and sidebar
- **Background**: Gradient overlay across feed

#### Post Cards
- **Border Radius**: 16px
- **Background**: Glass light with border
- **Sections**:
  - Header: Author info + Follow button (border-bottom)
  - Content: Image + Caption area
  - Engagement: Like/comment/share counts
  - Actions: 4-column action buttons
  - Caption: User quote section

#### Post Actions
- **Grid**: 4 equal columns
- **Icons**: Like, Comment, Share, Save
- **Interaction**: Hover highlight + color change
- **Double-tap**: Heart animation with scale & fade

### 4. Trending Sidebar
- **Position**: Sticky at top: 100px
- **Content**:
  - Suggested creators list
  - Trending hashtags section
  - Both with hover states

### 5. Floating Bottom Navigation
- **Position**: Fixed, centered
- **Height**: 50px (4 nav items)
- **Background**: Glassmorphic with border
- **Border-Radius**: 50px (pill shape)
- **Active State**: Gradient background + neon ring animation
- **Items**: Home, Explore, Reels, Profile

---

## 🎭 Component Specifications

### Icons & Emojis
```
🏠 Home
🔍 Explore  
🎬 Reels
👤 Profile
🔔 Notifications
💬 Messages
♦ Logo (decorative)
❤️ Like (filled)
🤍 Like (empty)
💬 Comment
➡️ Share
🔖 Save
```

### Typography
- **Font Family**: System default (Apple HIG inspired)
- **Logo**: 1.5rem, 800 weight, gradient text
- **Titles**: 1rem, 700 weight
- **Body**: 0.9rem-0.95rem, 400 weight
- **Meta**: 0.75rem-0.8rem, 600 weight, secondary color

### Spacing Scale
```
0.25rem = 4px
0.5rem = 8px
0.75rem = 12px
1rem = 16px
1.25rem = 20px
1.5rem = 24px
2rem = 32px
```

---

## ✨ Animation & Transitions

### Timing Functions
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)` (300ms)
- **Easing**: Standard material easing

### Key Animations

#### Hover Effects
- Cards: `translateY(-2px) + background change`
- Buttons: `scale(1.1) or translateY(-2px)`
- Icons: Color transition to accent color

#### Double-Tap Heart
```css
@keyframes heartBounce {
  0%: scale(0), opacity(1)
  50%: scale(1), opacity(1)
  100%: scale(1.2), opacity(0)
}
Duration: 600ms ease-out
```

#### Active Navigation Pulse
```css
@keyframes pulse {
  0%, 100%: box-shadow(0 0 0 0 rgba(0,217,255,0.4))
  50%: box-shadow(0 0 0 8px rgba(0,217,255,0))
}
Duration: 2s ease-in-out
```

#### Spinner
```css
@keyframes spin {
  to: transform(rotate(360deg))
}
Duration: 800ms linear
```

---

## 📱 Responsive Breakpoints

### Desktop (1024px+)
- Full layout with sidebar
- Grid: 1fr 320px
- Max-width: 1400px
- Padding: 2rem

### Tablet (768px - 1024px)
- Sidebar hidden
- Single column layout
- Padding: 1.5rem

### Mobile (480px - 768px)
- Optimized spacing
- Reduced padding: 1rem
- Stacked layout

### Small Mobile (< 480px)
- Minimal padding: 0.5rem
- Reduced story avatar: 70px
- Compact action buttons

---

## 🔐 Glass Effect Details

### Implementation
```css
backdrop-filter: blur(10px - 20px)
background: rgba(255, 255, 255, 0.05 - 0.1)
border: 1px solid rgba(255, 255, 255, 0.08)
```

### Layering
- **Level 1**: Navigation (20px blur)
- **Level 2**: Cards & Modals (10px blur)
- **Level 3**: Buttons & Small Elements (no filter)

---

## 🎨 Gradient Definitions

### Primary Accent Gradient
```css
linear-gradient(135deg, #ec4899, #a855f7, #00d9ff)
```
Used for: Logo, Follow buttons, Active states, Story rings

### Background Gradient
```css
linear-gradient(135deg, #0a0e27 0%, #151b35 100%)
```
Used for: Page background

---

## 🚀 Engagement Features

### Double-Tap Like
- Instant heart animation centered on post
- Automatic like toggle
- 600ms animation duration

### Notification Badges
- Real-time count display
- Gradient background
- Position: -5px -5px (top-right)

### Trending Indicators
- ↗️ Icon for trending hashtags
- Hover highlight effect
- Interactive click handlers

### Follow Button States
- Default: Gradient background
- Hover: Lifted shadow effect
- Active: Darker gradient

---

## 🎬 Micro-interactions Checklist

- [ ] Navbar sticky scroll behavior
- [ ] Stories horizontal smooth scroll
- [ ] Post card hover lift & glow
- [ ] Like button animation & color transition
- [ ] Double-tap heart burst animation
- [ ] Navigation tab underline animation
- [ ] Floating nav pulse on active state
- [ ] Loading spinner rotation
- [ ] Hashtag hover highlight
- [ ] Creator follow button hover
- [ ] Smooth tab transitions

---

## 🔧 Implementation Notes

### Browser Support
- Modern browsers (Chrome, Safari, Firefox, Edge)
- CSS backdrop-filter supported
- CSS Grid & Flexbox required
- ES6+ JavaScript support

### Performance Considerations
- Hardware-accelerated animations
- CSS transforms over layout changes
- Lazy loading for images
- Debounced scroll/resize handlers

### Accessibility
- Semantic HTML structure
- ARIA labels for icon buttons
- Color contrast ratios
- Focus states for keyboard navigation

---

## 📊 Component Variations

### Post Types
1. **Photo Posts**: Image + caption
2. **Text Posts**: Text only with background
3. **Reels Preview**: Video thumbnail with play icon
4. **Carousel Posts**: Multiple images with indicators

### Loading States
- Spinner with gradient border
- Skeleton loading cards
- Placeholder avatars

### Error States
- Empty state illustrations
- Helpful error messages
- Retry action buttons

---

## 🌟 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Custom color themes
- [ ] Animation preference support (prefers-reduced-motion)
- [ ] Advanced gesture support (swipe, pinch)
- [ ] Story view animation transitions
- [ ] Collaborative features animations
- [ ] Advanced filtering/search UI

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-24 | Initial design system |

---

**Design System Created**: May 24, 2026  
**Framework**: React + CSS3  
**Target**: Mobile-first, 2026 futuristic aesthetic
