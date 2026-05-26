# Clickable Prototype Behavior Specifications — SocialWave

Purpose: Provide step-by-step interactive behavior descriptions for a clickable prototype (Figma/Framer/Adobe XD) covering all 10 app flows. Use these mappings to implement high-fidelity navigation, gestures, and microinteractions.

General prototype rules
- Global transitions: default crossfade 180ms + translateY 6px for modal entries; use `--sw-motion-base` (220ms) for primary interactions. Use reduced-motion variants where OS setting is enabled.
- Tap target: 44x44 minimum. Use semantic labels for accessibility.
- States: default, hover/press, active, disabled, loading.

Legend
- Tap: single tap/click
- DoubleTap: quick double tap
- LongPress: hold for 400ms
- SwipeUp/Down/Left/Right: swipe gestures
- ModalSheet: bottom sheet overlay

Screens and clickable behavior

1) Splash Screen
- Initial: Play Lottie animated logo (600ms draw, infinite slow pulse).
- Auto-flow: After auth check (token valid), crossfade to `Home` (Delay 500ms). If not authenticated, transition to `Auth.Login`.
- Prototype steps:
  - On load: animate logo -> after 1100ms -> Navigate to `Home` or `Login`.

2) Authentication Flow
- `Auth.Login` (screen)
  - Elements: Email input, Password input, `Login` primary, `Sign up` link, `Forgot password`, Social buttons.
  - Interactions:
    - Tap `Login`: show loading spinner (button morph width shrink 160ms), then navigate to `Home` on success (crossfade 220ms). On error, shake input area and show inline toast.
    - Tap `Sign up`: Navigate to `Auth.SignUp` with slide-left (220ms).
    - Tap `Forgot password`: open `Auth.Forgot` as ModalSheet (220ms vertical slide).
    - Tap Social button: show micromodal with provider flow -> on success navigate `Home`.
- `Auth.SignUp`
  - Multi-step: Step1 (username), Step2 (email+password), Step3 (avatar). Use top progress dots; on `Next` animate content slide left.
  - On complete: animate confetti lottie over screen (350ms) then Navigate `Home`.
- `Auth.Forgot`
  - Enter email -> `Send` -> show `Check Your Email` confirmation modal. Provide `Open Email App` CTA (external link simulated in prototype).

3) Home Feed
- Layout: `Stories` (carousel) pinned at top, `PostCard` list below.
- Story interactions:
  - Tap StoryBubble => open `StoryModal` (full-screen), progress bar auto-advance; tap area left/right for prev/next; swipeDown to dismiss.
  - LongPress StoryBubble => show preview popover.
- PostCard interactions:
  - DoubleTap image => play like animation (heart burst), toggle like state.
  - Tap Like icon => small pop animation + update count.
  - LongPress PostCard => open QuickActions (contextual menu) with `Save`, `Remix`, `Report` (ModalSheet).
  - Tap Comment => navigate to `PostDetail` as modal (slide up).
  - Tap Share => open native share sheet simulation.
  - Infinite scroll: when near end (last 3 items), show skeleton loaders and append next page.
- Reels preview:
  - Small vertical cards inline; Tap preview => navigate to `Reels` (full-screen) with fade + scale.

4) Reels / Short Video
- Entry: full-screen vertical player with subtle top status info.
- Controls:
  - Single Tap center => pause/play toggle with pulse effect on play.
  - DoubleTap anywhere => like (big heart) + small pop + haptic (simulate vibration layer).
  - SwipeUp => load next reel (fast slide 220ms). SwipeDown => previous.
  - SwipeRight => open `Profile` for reel author (slide right 220ms).
  - Tap Music pill => open `AudioDetail` sheet with waveform and `Use in Remix` CTA.
- Composer: tap floating `+` -> open `Create` modal (500ms sheet).

5) Explore / Search
- Search bar behaviors:
  - On focus: expand with elevation and show suggestion chips.
  - Typing: show AI-suggestion list (fade-in), suggestions tappable to autofill search and navigate to results.
- Grid behaviors:
  - Tap tile => open `PostDetail` (card modal). LongPress => preview overlay (scale up 6px + shadow).
  - Filters button => open `Filters` panel (ModalSheet) with toggles; apply -> animate grid reflow.

6) Profile Screen
- Header interactions:
  - Tap Avatar => open `AvatarEditor` modal (cropper). LongPress avatar => show story gallery.
  - Tap `Edit Profile` => navigate to `ProfileEdit` (sheet) with animated fields.
- Tabs:
  - Tap `Posts/Reels/Tagged` => content crossfade and lazy-load the grid. Fast swipe left/right to change tabs.
- Creator dashboard:
  - Tap metrics cards => open details overlay (analytics charts), with drill-down interactions.

7) Messaging UI
- Threads list:
  - Tap thread => open `ChatScreen` (slide left).
  - LongPress thread => show actions `Pin`, `Mute`, `Delete` (contextual menu).
- Chat screen interactions:
  - Typing area: mention (`@`) suggestions drop up; tap suggestion => create mention token in caption.
  - Send voice note: press-and-hold mic button -> record (waveform grows), release -> send; slide left to cancel during recording.
  - Image share: tap `+` -> media picker -> select -> show upload progress -> inline message.
  - Typing indicator: show 3-dot bubble at bottom left of chat with pulsing microanimation.
  - Video call: tap call icon -> show `Calling` modal -> accept opens `InCall` overlay.

8) Notifications
- Feed grouping:
  - Collapsed group header shows summary (e.g., "3 people liked your post"); Tap group => expand (slide down) to show items.
  - Follow requests: inline Accept / Decline buttons with optimistic UI; Accept => show `Follow accepted` toast.

9) Create Post Flow
- Entry paths: FAB center, `Create` in bottom nav, or share from Reels.
- Steps:
  - Media Picker: drag/drop reorder; tap thumbnail -> open Editor.
  - Editor: crop tool, filter presets, selective adjustments. Each tool action animates panel in from right.
  - Caption editor: mention/hashtag autocomplete dropdown; AI-suggest CTA -> fill suggestions.
  - Preview: shows final card; `Publish` -> show progress overlay (percent) then success -> push to `Home` with new post inserted at top (animate insert: height expand 0->auto, fade-in).

10) Settings & Privacy
- Theme toggle: immediate theme crossfade (200ms) and persist to local storage.
- Privacy toggles: each toggle shows confirmation when changed to private (ModalSheet).
- Notification scheduling: open time picker (native-style) in a modal.

Prototype mapping (Figma/Framer quick mappings)
- Use Frame links to map screens:
  - From `Splash` -> conditional to `Home` or `Login`.
  - Common modals use overlay frames with "Close" on background tap or swipeDown.
- Gestures: attach swipe and long-press gestures to frames for `Reels`, `Stories`, and `Chat` recording.
- Component interactions: define variants for `PostCard` (default/liked/saved/loading) and switch variants on action.

Accessibility & reduced-motion
- Provide an alternate flow that disables non-essential animations when the system reduced-motion flag is set.
- Ensure keyboard focus states for prototype hotspots and add aria-labels in component descriptions.

Developer notes
- Export Lottie JSON for animated logo and heart burst (or simulate with layered keyframes).
- Provide a tokens JSON (`tokens.json`) for direct variable import.

---

File: [design/prototype_behaviors.md](design/prototype_behaviors.md)
