# SocialWave UI Component Reference

## Overview
This document provides a visual and technical reference for all UI components in the SocialWave home screen design system.

---

## 🎯 Navigation Bar Component

### Premium Top Navigation
**Location**: Fixed at top, sticky positioning
**Height**: 64px

#### Features
- Glassmorphic background with blur effect
- Logo with gradient text and decorative icon
- Notification badges (counts)
- Message icon with indicator
- Smooth icon hover animations

```jsx
<nav className="premium-navbar">
  <div className="navbar-content">
    <div className="navbar-logo">
      <span className="logo-icon">♦</span>
      <span className="logo-text">SocialWave</span>
    </div>
    <div className="navbar-actions">
      <button className="nav-icon-btn">
        <span className="icon">🔔</span>
        <span className="notification-badge">3</span>
      </button>
    </div>
  </div>
</nav>
```

**CSS Variables Used**:
- `--bg-primary`: Background color
- `--glass-light`: Glassmorphism effect
- `--border-light`: Subtle border
- `--accent-pink`, `--accent-purple`, `--accent-neon`: Logo gradient

---

## 📖 Stories Section

### Horizontal Stories Carousel
**Height**: 120px total (80px avatars)
**Scroll**: Horizontal, no scrollbar
**Spacing**: 1.25rem between cards

#### Story Card Anatomy
```
┌─────────────┐
│  ✨ Avatar  │  80x80px circular
│  [Gradient] │  Gradient background
│   Ring?     │  Cyan ring if unviewed
└─────────────┘
  Your Story   Username (max 80px width)
  + Icon       Centered below avatar
```

#### States
- **Your Story**: Plus icon overlay, gradient background
- **Unviewed**: Cyan border ring + glow
- **Viewed**: Regular gradient
- **Hover**: Lift effect (translateY -4px)

#### Code Example
```jsx
<div className="stories-container">
  {stories.map((story) => (
    <div className="story-card">
      <div className="story-avatar unviewed">
        <div className="avatar-circle">😎</div>
      </div>
      <p className="story-username">user_001</p>
    </div>
  ))}
</div>
```

---

## 🎨 Post Card Component

### Modern Post Card Structure
**Border Radius**: 16px
**Max Width**: Fills container
**Background**: Glass light with border

#### Post Card Sections (Top to Bottom)

### 1. Post Header
```
┌─────────────────────────────────────┐
│  👤 Username                  [Follow] │
│     📍 Location Tag                  │
└─────────────────────────────────────┘
```

**Components**:
- Author avatar (48x48px, gradient)
- Username & location
- Follow button (gradient bg)
- Border separator below

### 2. Post Content Area
```
┌─────────────────────────────────────┐
│                                       │
│   [    Image or Video    ]           │
│   (Full width, object-fit)           │
│                                       │
│   Post caption text goes here...    │
│   Supports multi-line content       │
│                                       │
└─────────────────────────────────────┘
```

**Features**:
- Image fits 100% width
- Double-tap detection for hearts
- Heart animation on double-tap
- Text wrapping support

### 3. Engagement Stats Row
```
┌─────────────────────────────────────┐
│  ❤️ 124 likes  💬 45 comments  ➡️ 8 shares │
└─────────────────────────────────────┘
```

**Features**:
- Hover: Color change to cyan
- Hover: Cursor pointer
- Compact display

### 4. Action Buttons Row
```
┌────────┬────────┬────────┬────────┐
│ ❤️     │ 💬     │ ➡️     │ 🔖    │
│ Like   │Comment │ Share  │ Save   │
└────────┴────────┴────────┴────────┘
```

**Features**:
- 4-column grid layout
- Icon + label below
- Hover: Background highlight + color change
- Like button: Red/pink when active
- All buttons: Rounded 8px

### 5. Caption Section
```
┌─────────────────────────────────────┐
│ **@username** This is an amazing     │
│ moment captured. Love this energy! │
└─────────────────────────────────────┘
```

**Features**:
- Username bold
- Full caption text
- Secondary text color

#### Double-Tap Animation
When user double-taps post:
```
Timeline:
0ms   → ❤️ appears at (50%, 50%)
300ms → Scale 1, Opacity 1
600ms → Scale 1.2, Opacity 0 (disappears)
```

#### Code Example
```jsx
<div className="modern-post-card" onDoubleClick={() => handlePostDoubleTap(post._id)}>
  <div className="post-header">
    <div className="post-author-info">
      <div className="author-avatar">U</div>
      <div className="author-details">
        <div className="author-name">@username</div>
        <div className="post-location">📍 Feed</div>
      </div>
    </div>
    <button className="follow-btn">Follow</button>
  </div>

  <div className="post-content-wrapper">
    {post.image && <img src={post.image} alt="Post" className="post-image" />}
    <div className="post-text">{post.content}</div>
    {doubleTapId === post._id && <div className="double-tap-heart">❤️</div>}
  </div>

  <div className="post-engagement">
    <div className="engagement-stats">
      <span className="like-count">124 likes</span>
      <span className="comment-count">45 comments</span>
      <span className="share-count">8 shares</span>
    </div>
  </div>

  <div className="post-actions">
    <button className={`action-btn ${isLiked ? 'liked' : ''}`}>
      <span className="action-icon">❤️</span>
      <span className="action-label">Like</span>
    </button>
    {/* More action buttons... */}
  </div>

  <div className="post-caption">
    <p><strong>@username</strong> {post.content}</p>
  </div>
</div>
```

---

## 🌟 Trending Sidebar

### Suggested Creators Section
```
┌──────────────────────────────────┐
│ ✨ Suggested Creators            │
├──────────────────────────────────┤
│ 👤 Alex Rivera                   │
│    2.5M followers        [Follow] │
├──────────────────────────────────┤
│ 👤 Sam Chen                      │
│    1.8M followers        [Follow] │
└──────────────────────────────────┘
```

**Features**:
- Creator avatar (44x44px gradient)
- Name (900 weight, primary text)
- Follower count (secondary text, smaller)
- Follow button (gradient, compact)

### Trending Hashtags Section
```
┌──────────────────────────────────┐
│ 🔥 Trending Now                  │
├──────────────────────────────────┤
│ #FutureOfTech      ↗️ 45.2K posts │
│ #CreativeMinds     ↗️ 32.8K posts │
│ #DesignLife        ↗️ 28.1K posts │
└──────────────────────────────────┘
```

**Features**:
- Hashtag in cyan color
- Post count in secondary color
- Trend indicator (↗️)
- Hover: Background highlight
- Hover: Cursor pointer

#### Code Example
```jsx
<aside className="trending-sidebar">
  <div className="trending-card">
    <h3 className="trending-title">✨ Suggested Creators</h3>
    <div className="creators-list">
      {creators.map((creator) => (
        <div key={creator.id} className="creator-item">
          <div className="creator-avatar">👤</div>
          <div className="creator-info">
            <div className="creator-name">{creator.name}</div>
            <div className="creator-followers">{creator.followers}</div>
          </div>
          <button className="follow-btn-sm">Follow</button>
        </div>
      ))}
    </div>
  </div>

  <div className="trending-card">
    <h3 className="trending-title">🔥 Trending Now</h3>
    <div className="hashtags-list">
      {hashtags.map((item) => (
        <div key={item.tag} className="hashtag-item">
          <div>
            <div className="hashtag-text">{item.tag}</div>
            <div className="hashtag-count">{item.posts} posts</div>
          </div>
          <div className="trend-indicator">↗️</div>
        </div>
      ))}
    </div>
  </div>
</aside>
```

---

## 🧭 Floating Bottom Navigation Bar

### Navigation Bar Structure
```
┌─────────────────────────────┐
│ 🏠  🔍  🎬  👤            │  Centered, fixed bottom
│ (pill-shaped container)     │
└─────────────────────────────┘
```

**Position**: Fixed, bottom 1.5rem, centered with transform
**Shape**: 50px border-radius (pill)
**Width**: 220px (50px × 4 items + 6px gap × 3 + padding)

### Navigation Item States

#### Default State
```
┌─────┐
│ 🏠  │  Gray icon
│     │  Transparent background
└─────┘
```

#### Hover State
```
┌─────┐
│ 🏠  │  Lighter color
│     │  Lifted (translateY -3px)
└─────┘
```

#### Active State
```
┌─────┐
│ 🏠  │  White icon
│ ◯   │  Gradient background
│     │  Cyan pulse ring animation
└─────┘
```

### Animation Details

#### Pulse Animation
```css
@keyframes pulse {
  0%, 100%: box-shadow(0 0 0 0 rgba(0,217,255,0.4))
  50%: box-shadow(0 0 0 8px rgba(0,217,255,0))
}
Duration: 2s ease-in-out infinite
```

Applied via `::after` pseudo-element on active nav item

#### Code Example
```jsx
<nav className="floating-nav-bar">
  <button
    className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
    onClick={() => setActiveNav('home')}
    title="Home"
  >
    <span className="nav-icon">🏠</span>
  </button>
  {/* More nav items... */}
</nav>
```

---

## 🔘 Button Component Variations

### Follow Button (Large)
```css
Background: linear-gradient(135deg, #ec4899, #a855f7)
Padding: 0.5rem 1.25rem
Border-radius: 8px
Font-size: 0.85rem
Hover: translate(0, -2px) + shadow increase
```

### Follow Button (Small)
```css
Background: Same gradient
Padding: 0.4rem 0.8rem
Font-size: 0.75rem
Used in: Trending sidebar
```

### Action Buttons
```css
Background: Transparent (hover: glass light)
Color: Secondary text (hover: cyan)
Layout: Vertical (icon above label)
Border-radius: 8px
```

---

## 💫 Loading States

### Spinner Component
```
   ◴
  ─ ─
   ◵
```

**Animation**: Rotation 360° in 800ms linear
**Border**: 3px solid border light
**Border-top**: Cyan color
**Size**: 50px diameter
**Position**: Centered in container

### Empty State
```
┌─────────────────────────────┐
│                               │
│          👋                   │
│   Your feed is empty        │
│                               │
│  Follow users to see posts  │
│                               │
└─────────────────────────────┘
```

**Features**:
- Large emoji icon (3.5rem)
- Heading (1.5rem)
- Description (secondary text)
- Centered container with padding

---

## 🎭 Color & Glass Effect Application

### Card Background Layers
```
Level 1: var(--glass-light) = rgba(255, 255, 255, 0.05)
  ↓
Hover: var(--glass-medium) = rgba(255, 255, 255, 0.1)
  ↓
Border: var(--border-light) = rgba(255, 255, 255, 0.08)
```

### Text Color Hierarchy
```
Primary:   #ffffff (main content)
Secondary: #a0aec0 (meta information)
Accent:    #ec4899 (interactive highlights)
```

### Gradient Accent
```
linear-gradient(135deg, 
  #ec4899 (pink),
  #a855f7 (purple),
  #00d9ff (cyan)
)
```

Applied to:
- Logo text
- Follow buttons
- Navigation active state
- Story avatar rings
- Creator avatars

---

## 📱 Responsive Adjustments

| Breakpoint | Changes |
|-----------|---------|
| 1024px+ | Full layout with 320px sidebar |
| 768px-1024px | Single column, sidebar hidden |
| 480px-768px | Reduced padding (1rem), scaled buttons |
| <480px | Minimal spacing (0.5rem), compact story avatars |

---

## ✨ Interactive Features Summary

| Feature | Trigger | Animation |
|---------|---------|-----------|
| Post Like | Click heart or double-tap | Heart bounce 600ms |
| Navigation Active | Click nav item | Pulse ring animation 2s |
| Card Hover | Mouse enter | Lift + glass effect change |
| Follow Button | Hover | Lift + shadow |
| Story View | Hover | Lift 4px |
| Tab Indicator | Click tab | Gradient underline animation |

---

**Last Updated**: May 24, 2026
