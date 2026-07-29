# Ainenad.com Comprehensive Website Build Prompt

Act as a senior creative developer, interaction designer, motion director and WebGL engineer.

Build a production-quality, scroll-driven portfolio website for **ainenad.com**. Combine the editorial composition of Reference Image 1 with the brand system from Reference Image 2. Use the spatial storytelling principles observed on Noomo Agency's website, but create an original experience for ainenad.com.

## Required Inputs

- **Reference Image 1:** the Synchronized Digital Studio screenshot. Use it for composition, scale, cropping, asymmetry, negative space and editorial tension.
- **Reference Image 2:** the dark ainenad.com concept. Use it as the definitive source for color, typography, navigation styling and interface details.
- **Brand asset:** `logo.svg`. Use this file as the exact logo source.
- **Portfolio content:** use real project titles, descriptions, categories, images and links when they exist. Keep content data-driven.

Do not copy either reference's company name, text, layout, assets or source code. Do not copy Noomo's branding, 3D models or exact scene composition.

## Work Sequence

1. Inspect the existing project and identify its framework, routing, styling system, asset pipeline and build commands.
2. Locate and inspect `logo.svg`. Record its aspect ratio and safe area before building the intro.
3. Confirm the two visual references are available.
4. Map the page sections, content and animation ranges.
5. Generate and validate the 10-second entrance video through Higgsfield MCP and Google Veo.
6. Build the live website and the seamless transition from the video to the hero.
7. Test desktop, tablet, mobile, keyboard navigation, reduced motion, WebGL failure and video failure.
8. Report the files changed, commands run, performance results and remaining limitations.

Do not stop after producing a mockup. Build the working site.

## Brand System

### Logo

Use `logo.svg` exactly as supplied.

Do not redraw, regenerate, re-typeset, stretch, crop or distort it. Do not change the portrait, expression, calligraphic wordmark, proportions or negative space.

Treat the logo as one unified asset. You may move, scale, fade or mask-reveal the complete logo. Do not animate its internal parts independently.

### Typography

Use:

- **Manrope** for display typography, headings, body copy and interface labels.
- **IBM Plex Mono** for navigation, project numbers, categories, dates, technical metadata, coordinates and small status labels.

Display typography:

- Weight: 300 to 500.
- Size: `clamp(7rem, 15vw, 15rem)` on large screens.
- Line-height: 0.76 to 0.88.
- Letter-spacing: -0.06em to -0.035em.
- Use extreme scale, cropping, overlap and negative space to create the editorial impact of Reference Image 1.

Do not introduce a serif display typeface. Recreate the reference's dramatic typographic composition with Manrope.

### Color Palette

Use:

- Near black: `#0C0D0E`
- Soft ivory: `#F2EEE5`
- Acid lime: `#C8FF3D`
- Muted gray: `#747675`
- Raised dark surface: `#141617`
- Subtle border: `rgba(242, 238, 229, 0.18)`

Color balance:

- 80 to 88 percent near black.
- 10 to 18 percent ivory and gray.
- 2 to 4 percent acid lime.

Reserve acid lime for active navigation, project numbers, thin rules, status indicators, focus states, arrows, progress, primary actions and occasional 3D reflections.

Do not add blue, pink or multicolor gradients.

### Background

Use a near-black cinematic background with:

- Fine monochromatic noise.
- A restrained fabric or paper texture.
- A soft vignette.
- Slow dark shadow movement.
- Subtle lighting variation.

Keep the texture quiet enough to preserve readability. Avoid obvious grunge, heavy film grain and lens flares.

## 10-Second Entrance Video

Replace the conventional preloader with a cinematic liquid-metal logo formation.

The physical idea may recall the liquid-metal droplet reformation associated with *Terminator 2*, but the result must remain original. Do not reproduce movie footage, characters, actors, locations, camera shots, logos, music or recognizable sound effects.

### Generation Tool

Use:

- Higgsfield MCP.
- The newest available Google Veo model that supports reference images and native synchronized audio.
- Duration: exactly 10 seconds.
- Aspect ratio: 16:9.
- Desktop master: 1920 by 1080 or the highest supported landscape resolution.
- Sound: enabled.
- Quality: highest practical production setting.
- Required final asset: `logo.svg`.

Before generating:

1. Inspect the available Higgsfield MCP tools and model list.
2. Confirm that a Google Veo model with synchronized sound is available.
3. Do not substitute another model without reporting the limitation.
4. If Higgsfield cannot accept SVG, rasterize `logo.svg` to a transparent PNG at 2048px or larger.
5. Preserve the SVG's proportions, edges and negative space.
6. Use end-frame conditioning when the model supports it.

### Logo Accuracy

The final logo must match `logo.svg`.

Do not depend on the video model to render the logo accurately. Use the SVG as the exact end frame and compositing target.

If the generated liquid form differs:

1. Keep the generated liquid animation through approximately 8.3 seconds.
2. Blend the liquid silhouette toward the exact SVG between 8.3 and 9.2 seconds.
3. Replace the generated mark with the exact SVG-rendered logo by 9.2 seconds.
4. Hold the exact logo through the final frame.

The transition must read as one continuous material transformation.

### Visual Direction

Scene:

- Near-black environment using `#0C0D0E`.
- Dark reflective ground or black void.
- No visible horizon.
- Ivory reflections using `#F2EEE5`.
- Tiny acid-lime reflections using `#C8FF3D`.
- Restrained haze.
- High contrast.

Liquid:

- Dense polished liquid metal.
- Convincing surface tension.
- Rounded droplets in different sizes.
- Heavy, controlled merging.
- Small satellite droplets absorbed into larger forms.
- Chrome reflections with ivory highlights.

Avoid cartoon splashes, humanoid forms, faces, skeletons, weapons, movie references and generic silver puddles.

### Camera

Use one continuous shot:

- Start low and close.
- Move forward with a slow dolly.
- Add an orbit of no more than 8 to 12 degrees.
- Keep the center composition stable.
- Avoid handheld motion and rapid cuts.
- Finish directly in front of the completed logo.

Align the final camera, logo size and logo position with the first frame of the live hero.

### Video Timeline

#### 0.0 to 1.0 seconds

Begin in near-total darkness. Show scattered liquid-metal droplets on or just above a black reflective surface. Use a low industrial room tone and small metallic ticks.

#### 1.0 to 3.0 seconds

Pull the droplets toward the center as if a controlled magnetic field attracts them. Small droplets move first. Larger droplets respond with more inertia. Add quiet wet-merging sounds and a low magnetic sub-bass pull.

#### 3.0 to 5.8 seconds

Lift the droplets into flowing metallic streams. Let the streams arc toward the center and collide. Each collision creates a restrained splash, ripples and small droplets that return to the mass. Synchronize the impacts with sound.

#### 5.8 to 7.8 seconds

Stretch and redistribute the combined mass into the broad silhouette of `logo.svg`. Open the logo's negative spaces as the liquid withdraws from interior areas. Keep the transformation visible and physical.

#### 7.8 to 9.2 seconds

Refine the silhouette. Reduce ripples, absorb the remaining droplets and clean the edges. Blend into the exact SVG-rendered mark. Add one restrained acid-lime light sweep.

#### 9.2 to 10.0 seconds

Hold the exact logo, centered and still. Resolve the sound with a controlled low impact, a short metallic shimmer and a clean tail.

### Sound

Generate synchronized sound with Google Veo.

Use:

- Low industrial room tone.
- Magnetic sub-bass pull.
- Small metallic droplets.
- Liquid merging.
- Restrained collision impacts.
- Rising tonal pressure during formation.
- One deep final lock-in impact.
- A short metallic shimmer.

Avoid dialogue, loud explosions, trailer music, recognizable film effects and music associated with *Terminator*.

### Browser Playback

Browsers block autoplay with sound before user interaction. Provide:

- Primary button: **ENTER WITH SOUND**
- Secondary button: **ENTER MUTED**
- A visible sound toggle.
- A visible skip control.
- Escape-key skip behavior.
- Keyboard focus and activation.
- `playsinline`.
- Poster image.

Use IBM Plex Mono for entry controls, ivory text, a thin acid-lime border and a near-black background.

If the visitor does not interact, allow muted autoplay where supported. Do not attempt to bypass browser policies.

### Transition to the Live Hero

At approximately 9.2 seconds:

1. Position the live `logo.svg` over the completed video logo.
2. Match size, location and proportions.
3. Crossfade from the video mark to the live SVG.
4. Reveal navigation and construction lines.
5. Introduce the first oversized Manrope words.
6. Remove the video container at 10 seconds without a flash or layout shift.
7. Allow scrolling immediately.

The last video frame and first live frame must appear identical.

The video must fail open. If loading or playback fails, show the live SVG and continue to the hero.

### Video Deliverables

Create:

1. High-quality desktop master.
2. Optimized H.264 MP4.
3. WebM version where supported.
4. Reduced-size mobile version.
5. Silent poster frame.
6. Muted fallback.
7. Exact final logo frame as PNG.

Target:

- Desktop web video below 8 to 10 MB.
- Mobile video below 4 to 6 MB.
- Preload the poster or metadata, not the entire video.
- Load the site behind the video.

For reduced motion, show the exact logo with a short opacity transition and an optional **PLAY INTRO** control.

## Global Layout

Use a 12-column desktop grid with generous outer margins.

Use Reference Image 1 for:

- Oversized words.
- Asymmetric positioning.
- Typography that crosses columns.
- Cropped text at viewport edges.
- Thin construction lines.
- Small informational blocks among large display type.
- Layered foreground and background elements.

Use Reference Image 2 for:

- Logo treatment.
- Near-black, ivory and acid-lime palette.
- Manrope and IBM Plex Mono.
- Navigation styling.
- Outlined controls.
- Project-index presentation.

## Navigation

Place the logo or approved compact mark in the upper-left. Place navigation in the upper-right:

- WORK
- ABOUT
- NOTES
- CONTACT

Use IBM Plex Mono in uppercase. Add a small acid-lime menu indicator.

Keep navigation visible during the hero, condense it after the hero and reduce it during cinematic transitions. Show the active section with a lime indicator.

## Live Hero

Create a 100vh hero pinned for 180 to 250vh.

Use enormous Manrope words such as:

- DIGITAL
- CREATIVE
- INTELLIGENCE
- STORYTELLING

Adapt the final language to the portfolio's real positioning.

Composition:

- One word across the upper half.
- One word cropped by the left edge.
- One word crossing the lower portion.
- The exact ainenad.com logo as the personal signature.
- A narrow positioning statement near the center-right.
- An outlined **PROJECT INDEX** button in the lower-right.
- Thin ivory and acid-lime construction lines.
- A small IBM Plex Mono scroll label.

Motion:

- Move words vertically at different rates.
- Add restrained horizontal drift.
- Scale selected words between 0.92 and 1.08.
- Move the logo more slowly than the type.
- Introduce one central 3D object from depth.
- Fade small copy before the project sequence.
- Move the project-index control out before the transition.
- Limit pointer parallax to 6 to 8px.

Drive the motion with scroll. Do not autoplay the hero timeline after the entrance video finishes.

## Selected Work

Create one persistent WebGL scene for the hero and selected-work sequence. Reuse one renderer.

Pin the selected-work stage for 500 to 700vh. Present three to five real projects.

Each project includes:

- One original 3D object.
- One enormous Manrope category word behind it.
- Acid-lime project number.
- IBM Plex Mono discipline labels.
- Project title and description.
- Outlined **VIEW PROJECT** control.

Possible category words:

- IDENTITY
- INTERACTIVE
- INTELLIGENCE
- SYSTEMS
- STORYTELLING

Possible object language:

- Glossy black sculpture.
- Ivory dimensional letterform.
- Smoked-glass interface layers.
- Acid-lime wireframe.
- Chrome modular form.
- Project-specific abstract object.

Avoid colorful generic blobs.

For every transition:

1. Fade current metadata.
2. Move and rotate the current object toward the camera.
3. Exit it below or beside the viewport.
4. Move the category word vertically.
5. Introduce the next word from the opposite direction.
6. Bring the next object forward from depth.
7. Settle the object.
8. Reveal the next metadata.
9. Hold the completed state for 50 to 80vh.

Use ScrollTrigger scrub values around 0.7 to 1.1. Keep rotations within 10 to 25 degrees. Use scale ranges around 0.75 to 1.35.

## About and Capabilities

Release the pinned stage into an editorial section.

Use a large statement such as:

**I COMBINE CREATIVE DIRECTION, DIGITAL DESIGN AND APPLIED AI.**

Place the statement on the left and a compact explanation on the right. Add a mono section number, a thin lime rule and capability columns.

Let a few ivory or dark 3D fragments drift in the background. Reduce the motion intensity.

## Featured Project Panel

Bring a large image or video panel from below:

- Initial scale: 0.8.
- Initial `rotateX`: 6 to 8 degrees.
- Final scale: 1.
- Final `rotateX`: 0.
- Dark frame.
- Thin ivory border.
- Acid-lime project number.

Lazy-load media and provide a poster.

## Testimonials

Use the statement:

**GOOD WORK IS SYNCHRONIZED.**

Move three or four testimonial cards horizontally in response to vertical scroll. Enter from the right, overlap the cards and apply small `rotateY` and scale differences. Use dark surfaces, ivory copy, thin gray borders and acid-lime client labels.

Keep every card readable and keyboard accessible.

## Recognition

Create a spatial awards transition with oversized Manrope names and original floating objects.

Use dark chrome trophies, ivory dimensional symbols, lime wireframes and brand fragments. Move objects and words vertically at different speeds.

Finish with a static list using:

- IBM Plex Mono counts.
- Manrope organization names.
- Thin staggered rules.
- Lime hover arrows.

## Notes

Use an oversized **NOTES** heading.

Build an editorial article list with:

- Thumbnail.
- Large title.
- IBM Plex Mono category and date.
- Fine divider.
- Clipped image reveal.
- Hover scale between 1.02 and 1.04.
- Lime hover arrow.

## Contact

Use a large closing statement:

**LET'S CREATE SOMETHING WORTH REMEMBERING.**

Use an asymmetric two-column composition. Style the form with transparent inputs, ivory labels, gray rules, acid-lime focus states and an outlined lime submit button. Include a clear email link.

## Motion System

Use GSAP and ScrollTrigger. Use Three.js or React Three Fiber for spatial scenes.

Rules:

- Drive major sequences with scroll progress.
- Overlap adjacent transitions by 15 to 25 percent.
- Use transforms and opacity.
- Limit blur to 6 to 8px.
- Let text settle before users need to read it.
- Keep static areas between motion-heavy sequences.
- Avoid random movement.
- Avoid animating every element.

## Performance

- Target 60fps on current desktop hardware.
- Reuse one WebGL renderer.
- Clamp device pixel ratio to 1.5.
- Compress GLB models with Draco or Meshopt.
- Use KTX2, WebP or AVIF textures.
- Lazy-load 3D assets and media.
- Dispose of unused geometries, materials and textures.
- Pause rendering when the page is hidden.
- Provide static fallbacks when WebGL fails.
- Do not let WebGL failure block the page.
- Avoid scroll trapping.

## Accessibility

- Respect `prefers-reduced-motion`.
- Remove scroll scrubbing, perspective movement and continuous rotation in reduced-motion mode.
- Keep content in semantic HTML.
- Maintain visible acid-lime focus states.
- Support keyboard navigation.
- Meet WCAG AA contrast.
- Do not make WebGL the only source of project information.
- Keep video controls accessible.
- Allow visitors to skip the entrance video.

## Responsive Behavior

### Desktop

- Full editorial typography.
- Persistent 3D stage.
- Overlapping compositions.
- Full 10-second landscape entrance.

### Tablet

- Reduce type scale and scroll ranges by approximately 25 percent.
- Remove some background fragments.
- Simplify perspective.

### Mobile

- Create a center-safe mobile video or a dedicated 9:16 version when Veo supports it.
- Keep the logo within the middle 70 percent of the frame.
- Use shorter pinned sequences.
- Show one primary visual per project.
- Stack metadata below visuals.
- Prevent horizontal overflow.
- Replace long spatial scenes with concise reveals on lower-powered devices.

## Validation

Verify:

- Higgsfield MCP used Google Veo.
- Video duration equals 10 seconds.
- Video contains synchronized audio.
- Final logo matches `logo.svg`.
- Last video frame aligns with the live hero.
- Entry with sound works after a user gesture.
- Muted entry works.
- Skip works by pointer and keyboard.
- Reduced-motion behavior works.
- Video failure and WebGL failure both continue to the live site.
- Desktop, tablet and mobile layouts work.
- Navigation, links, form and project controls work by keyboard.
- No protected movie imagery or audio appears.
- No extra symbols or distorted logo text appear.

## Deliverables

Provide:

1. Production-ready website implementation.
2. Generated and optimized entrance-video files.
3. Exact final logo frame and poster.
4. Reusable motion components and hooks.
5. Data-driven project configuration.
6. Responsive states at 1440px, 1024px, 768px and 390px.
7. Reduced-motion, video-failure and WebGL-failure paths.
8. Animation map with pin lengths and ScrollTrigger ranges.
9. Performance, accessibility and browser verification report.
10. Final list of files changed and commands run.

The result should combine the editorial scale and asymmetric tension of Reference Image 1 with the exact ainenad.com visual system from Reference Image 2. The entrance should use an original liquid-metal formation, generated through Higgsfield MCP with Google Veo and sound, then hand off into the live Manrope, IBM Plex Mono, near-black, ivory and acid-lime website without a visible cut.
