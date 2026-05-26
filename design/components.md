# Component Library — SocialWave (Specs)

This document lists core UI components, props, states, and brief behavior notes to implement the UI/UX features.

## 1. AppShell / BottomNav
- Props: `activeTab`, `onNavigate(tab)`
- Structure: 5 icons (Home, Explore, Create, Reels, Profile)
- Center FAB: `onCreate()` (floating, elevated)
- Accessibility: each icon has aria-label, 44x44 touch area
- Motion: active icon scale 1 -> 1.08 on selection

## 2. PostCard
- Props: `post`, `compact`, `onLike`, `onComment`, `onShare`, `onSave`
- Structure: header (avatar, name, time), media (image/video grid), action row, caption
- Media behaviors: pinch-zoom, double-tap to like (animated), multi-image carousel
- States: loading, error, liked, saved

## 3. StoryBubble
- Props: `user`, `unread`, `onOpen`
- Visuals: avatar ring with gradient if unread, 72px diameter
- Interaction: tap opens StoryModal, long-press preview

## 4. ReelsPlayer
- Props: `reel`, `onLike`, `onComment`, `onShare`, `onNext`
- Fullscreen vertical player; gestures: swipe up -> next, double-tap -> like
- Music pill: tap to view audio details

## 5. Composer (Create)
- Props: `initialMedia`, `onPublish`
- Steps: media picker -> editor -> caption -> tags -> preview
- Editor tools: crop, filters, selective blur, AI-captions

## 6. Chat (MessageBubble)
- Props: `message`, `own`, `onPlayAudio`
- Voice note UI: waveform + scrub, duration
- Typing indicator: animated dots

## 7. ModalSheet
- Props: `visible`, `onClose`, `height` (auto or %), `children`
- Interaction: drag-to-dismiss, background glass blur

## 8. Buttons
- Primary: filled gradient, height 44, radius 12
- Secondary: ghost border, border 1px --sw-glass-border
- IconButton: circular 44px with center icon

## 9. Inputs
- Standard input: glass surface, placeholder muted, focus outline neon 2px
- Caption editor: multiline with mention (@) and hashtag (#) suggestions

## 10. NotificationItem
- Props: `notification`, `onAction`
- Grouping: can expand/collapse groups

---

Each component should export a prop-types table and storybook stories demonstrating states, accessibility examples, and reduced-motion variants.
