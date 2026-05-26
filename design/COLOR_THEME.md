# SocialWave Color Theme & CSS Variables

## 🎨 Complete Color Palette

### Background Gradient System
```
Primary Background:     #0a0e27 (very dark blue)
Secondary Background:   #151b35 (dark blue)
Tertiary Background:    #1a2240 (slightly lighter blue)
```

### Glassmorphism Effects
```
Glass Light (5%):    rgba(255, 255, 255, 0.05)
Glass Medium (10%):  rgba(255, 255, 255, 0.1)
Border Light (8%):   rgba(255, 255, 255, 0.08)
```

### Text Colors
```
Primary Text:        #ffffff (white)
Secondary Text:      #a0aec0 (light blue-gray)
Muted Text:          Derived from secondary with opacity
```

### Accent Colors (Neon Gradients)
```
Accent Pink:         #ec4899 (hot pink)
Accent Purple:       #a855f7 (vibrant purple)
Accent Cyan/Neon:    #00d9ff (bright cyan)
```

### Semantic Colors
```
Success:   Green gradient
Warning:   Orange/amber
Error:     Red/pink
Info:      Cyan
Neutral:   Gray palette
```

---

## 📋 CSS Custom Properties

### Root Variables (Recommended for All Components)
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0e27;
  --bg-secondary: #151b35;
  --bg-tertiary: #1a2240;
  
  /* Glass Effects */
  --glass-light: rgba(255, 255, 255, 0.05);
  --glass-medium: rgba(255, 255, 255, 0.1);
  --border-light: rgba(255, 255, 255, 0.08);
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  
  /* Accents */
  --accent-pink: #ec4899;
  --accent-purple: #a855f7;
  --accent-neon: #00d9ff;
  
  /* Effects */
  --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.2);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Usage Examples
```css
/* Background */
background: var(--bg-primary);
background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));

/* Text */
color: var(--text-primary);
color: var(--text-secondary);

/* Cards */
background: var(--glass-light);
border: 1px solid var(--border-light);
backdrop-filter: blur(10px);

/* Accents */
color: var(--accent-neon);
background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));

/* Shadows */
box-shadow: var(--shadow-lg);

/* Transitions */
transition: var(--transition);
```

---

## 🎬 Gradient Definitions

### Primary Gradient (Used Most)
```css
linear-gradient(135deg, #ec4899, #a855f7, #00d9ff)
```
**Used for**: 
- Logo text
- Follow buttons
- Active nav states
- Story avatar rings
- Creator avatars
- Accent highlights

### Dark Background Gradient
```css
linear-gradient(135deg, #0a0e27 0%, #151b35 100%)
```
**Used for**: Main page background

### Secondary Accent
```css
linear-gradient(135deg, #a855f7, #00d9ff)
```
**Used for**: Secondary actions, alt buttons

### Pink to Cyan Accent
```css
linear-gradient(90deg, #ec4899, #00d9ff)
```
**Used for**: Loading indicators, underlines, borders

---

## 🌈 Color Application Guide

### For Text
- **Primary Content**: Use `--text-primary` (#ffffff)
- **Meta/Labels**: Use `--text-secondary` (#a0aec0)
- **Links/Interactive**: Use `--accent-neon` (#00d9ff)
- **Highlights**: Use `--accent-pink` (#ec4899)

### For Backgrounds
- **Main Container**: Use `--bg-primary`
- **Cards/Sections**: Use `--glass-light`
- **Hover States**: Use `--glass-medium`
- **Nested Components**: Use `--bg-tertiary`

### For Borders
- **Light Dividers**: Use `--border-light`
- **Active Indicators**: Use `--accent-neon`
- **Hover Effects**: Use gradient with accent colors

### For Shadows
- **Large Cards**: Use `--shadow-lg`
- **Small Buttons**: Use `--shadow-sm`
- **Glow Effects**: Use accent color with rgba

---

## 🎨 Color Combinations Chart

### Text on Background
| Text | Background | Contrast | Usage |
|------|-----------|----------|-------|
| #ffffff | #0a0e27 | High ✓ | Primary text |
| #a0aec0 | #0a0e27 | Good ✓ | Secondary text |
| #ffffff | rgba(255,255,255,0.05) | High ✓ | Text on glass |
| #ec4899 | #0a0e27 | High ✓ | Accent text |
| #00d9ff | #0a0e27 | High ✓ | Highlight text |

### Button Styles
```
Default:
  Background: var(--glass-light)
  Border: var(--border-light)
  Color: var(--text-secondary)
  Hover: var(--glass-medium)

Primary (Follow):
  Background: linear-gradient(135deg, #ec4899, #a855f7)
  Color: #ffffff
  Hover: Lift + shadow

Active/Highlighted:
  Background: Gradient with neon
  Border: var(--accent-neon)
  Color: #ffffff
  Box-shadow: Neon glow
```

---

## 📱 Dark Mode (Default)

The entire design system is built for dark mode first:
- Dark backgrounds reduce eye strain
- Neon accents pop against dark
- Glass effects visible on dark base
- Consistent with 2026 aesthetic trends

**Future Light Mode** (if needed):
```css
--bg-primary: #ffffff
--bg-secondary: #f5f5f5
--text-primary: #1a1a1a
--text-secondary: #666666
/* Maintain accent colors but adjust opacity values */
```

---

## 🎯 Accessibility Considerations

### Contrast Ratios
- Primary text on background: 21:1 ✓ (WCAG AAA)
- Secondary text on background: 5:1 ✓ (WCAG AA)
- Interactive elements: 4.5:1+ ✓ (WCAG AA)

### Color Blind Friendly
- Don't rely solely on color to convey info
- Use icons + labels for important actions
- Ensure text/icon combinations work in grayscale

### Focus States
```css
:focus {
  outline: 2px solid var(--accent-neon);
  outline-offset: 2px;
}
```

---

## 🔄 Dynamic Color Usage

### Hover States Pattern
```css
/* Card hover */
background: var(--glass-light) → var(--glass-medium)
border-color: var(--border-light) → rgba(168, 85, 247, 0.3)

/* Icon hover */
color: var(--text-secondary) → var(--accent-neon)

/* Button hover */
transform: translateY(-2px)
box-shadow: 0 8px 16px rgba(236, 72, 153, 0.3)
```

### Active States Pattern
```css
/* Active nav item */
background: linear-gradient(135deg, #ec4899, #a855f7)
box-shadow: 0 0 20px rgba(236, 72, 153, 0.4)
animation: pulse 2s ease-in-out infinite

/* Active like button */
color: var(--accent-pink)
```

---

## 🎨 Design Tokens Summary

| Token | Value | Context |
|-------|-------|---------|
| spacing-xs | 0.25rem | Minimal gaps |
| spacing-sm | 0.5rem | Small gaps |
| spacing-md | 1rem | Standard gaps |
| spacing-lg | 1.5rem | Large gaps |
| spacing-xl | 2rem | XL gaps |
| radius-sm | 6px | Small buttons |
| radius-md | 8px | Standard |
| radius-lg | 12px | Cards |
| radius-full | 50px | Pills |
| transition-fast | 150ms | Quick feedback |
| transition-normal | 300ms | Standard |
| transition-slow | 600ms | Animations |
| blur-sm | 10px | Small glass |
| blur-md | 20px | Navbar glass |
| shadow-sm | 0 4px 12px rgba(0,0,0,0.2) | Small |
| shadow-lg | 0 20px 40px rgba(0,0,0,0.4) | Large |

---

## 💡 Implementation Tips

### 1. Always Use Variables
```css
/* ❌ Bad */
background: #ec4899;

/* ✅ Good */
background: var(--accent-pink);
```

### 2. Gradients for Emphasis
```css
/* ✅ Use gradient for primary actions */
background: linear-gradient(135deg, var(--accent-pink), var(--accent-purple));

/* ✅ Use solid color for secondary */
background: var(--glass-light);
```

### 3. Glass Effect Layering
```css
/* ✅ Complete glass effect */
background: var(--glass-light);
border: 1px solid var(--border-light);
backdrop-filter: blur(10px);

/* ✅ Just borders */
border: 1px solid var(--border-light);
```

### 4. Text Color Hierarchy
```css
/* ✅ Most important content */
color: var(--text-primary);

/* ✅ Supporting info */
color: var(--text-secondary);

/* ✅ Interactive elements */
color: var(--accent-neon);
```

---

## 🔍 Color Verification

To verify colors in browser DevTools:
1. Inspect element
2. Find computed styles
3. Hover over color values
4. Check against this palette

### Common Issues
- **Low contrast**: Use `--text-primary` instead of `--text-secondary` for main content
- **Glass effect not visible**: Ensure element behind has sufficient contrast
- **Gradients look dull**: Check if correct blend mode is set
- **Animation flashing**: Verify `will-change` and `transform` properties

---

**Last Updated**: May 24, 2026  
**Theme Version**: 1.0 - Dark Mode  
**Spec Compliance**: WCAG 2.1 AA/AAA
