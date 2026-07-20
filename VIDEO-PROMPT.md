# Hero footage — generation brief

Target: a **5-second seamless loop**, dark, with the lit doorway left of centre
and empty wet asphalt on the right for the headline to sit on.

Generate in Google Flow / Runway / Kling / Luma. Expect to run it 3–5 times and
keep the best take — these models read prompts loosely.

---

## Prompt A — primary

> A quiet Istanbul side street at three in the morning, shot from across the road.
> Rain has stopped and the asphalt is black and wet, holding long soft reflections.
> Left of centre, the window and doorway of a small late-night lokanta spill warm
> amber light onto the pavement; a faint red neon glow bleeds into the puddles
> beside it. Thin steam drifts slowly from a vent near the doorway. The right
> third of the frame is empty wet road and shadow. The camera is locked off and
> completely static. Only the steam, the faint shimmer of reflected light on water,
> and one slow drip of rain from an awning are moving. Deep shadows, rich blacks,
> cinematic anamorphic look, shallow depth of field, warm amber and deep red
> against near-black. Seamless 5-second loop with identical starting and ending
> frames, flawless looping, ultra-detailed 4K, photographic realism, no people,
> no cars, no signage text, no lettering, no logos, no readable writing anywhere
> in frame.

## Prompt B — alternate framing

Same street, tighter and more abstract. Use if A comes back too busy.

> Extreme close detail of black wet asphalt at night, filling the frame, with the
> soft out-of-focus reflection of a warm amber shop window and a red neon sign
> stretched across the water. A single drop falls and its ripple spreads slowly
> outward. The camera is static and looking straight down at a slight angle.
> Near-black with warm amber and deep red reflections only. Extremely slow, gentle
> motion. Seamless 5-second loop with identical starting and ending frames,
> ultra-detailed 4K, cinematic realism, no people, no text, no lettering, no logos.

---

## Why the prompt is built this way

**Locked-off camera.** The guide suggests a slow push-in. Do not do that here —
a push-in cannot loop. The frame at second 5 is closer than the frame at second
0, so the cut back to the start jumps. A static camera with moving *elements*
loops cleanly. This is the single biggest cause of visible seams.

**Steam, reflections and ripples** are the right things to have moving. They are
formless, so the eye cannot track a specific shape back to its starting position
and notice the repeat. Anything with a recognisable silhouette — a person
walking, a passing car, a swinging sign — makes the loop obvious.

**No text, anywhere.** Generators mangle lettering, and Turkish characters (ı, İ,
ş, ğ) worst of all. A misspelt "Sarıhan" baked into the hero cannot be fixed.
The real wordmark goes in HTML on top, where it is crisp, correct, selectable,
and readable by search engines.

**Empty right third.** Composed deliberately so the headline has somewhere to
live. Dead-centre subjects force the copy to fight the image, which is why so
many AI hero sections end up with a heavy scrim flattening the video into
wallpaper. If the subject sits left, the copy can sit right at full contrast and
the footage stays legible as footage.

**Dark by design.** White text needs a dark plate under it. Getting that from
the footage itself is free; getting it from a scrim costs you the image.

---

## When it comes back

Drop the file in as `assets/hero-source.mp4` and run:

```powershell
.\build-loop.ps1
```

That produces the web-ready `hero-loop.mp4` and a `hero-poster.jpg`.

**If the loop still visibly jumps**, run it as a ping-pong instead:

```powershell
.\build-loop.ps1 -PingPong
```

Ping-pong plays the clip forward then reversed, so the first and last frames are
identical by construction and the seam *cannot* show — it works on any footage,
including clips that were never generated as loops. The cost is that motion
visibly reverses, which reads as natural on steam, water and reflections (it has
no inherent direction) but looks wrong on anything that falls or pours. For this
concept it is safe.
