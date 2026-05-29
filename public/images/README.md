# Image drop folders (use these aspect ratios)

| Folder | Ratio | Used for |
|--------|-------|----------|
| `heroes/16x9/` | **16:9** | Page heroes (Services, About, Blog, etc.) |
| `home/5x7/` | **5:7** | Home page hero |
| `cases/16x9/` | **16:9** | Case study cards |
| `portfolio/16x9/` | **16:9** | Portfolio wide tiles (span 6, 8, 12) |
| `portfolio/5x7/` | **5:7** | Portfolio tall tiles (span 4) |
| `team/5x7/` | **5:7** | Team headshots |
| `blog/16x9/` | **16:9** | Blog post thumbnails |

Wire images in `src/content.js` with optional fields:

```js
image: "/images/cases/northbloom-wellness.jpg",
ratio: "16/9", // optional override
```

Recommended export sizes (2× for retina):

- 16:9 → 1920×1080 or 1600×900
- 5:7 → 1000×1400 or 750×1050
