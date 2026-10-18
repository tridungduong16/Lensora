# Face tracking assets

The virtual try-on processes camera frames locally in a dedicated worker using
`@mediapipe/tasks-vision` **0.10.32** (Apache-2.0).

`face_landmarker.task` is Google's Face Landmarker float16 model, version **1**:
https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task

SHA-256: `64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff`

The package's SIMD and non-SIMD WASM loaders/binaries are copied into `wasm/`
by `scripts/prepare-try-on.mjs`, automatically before `npm run dev` and
`npm run build`. That generated directory is ignored by Git and included in
the deployment's `public/` directory. Deployments must run the normal build.
The runtime and model are served by this website; the feature uses no external
CDN and makes no camera-image uploads.

Model documentation and terms:
https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker

MediaPipe license:
https://github.com/google-ai-edge/mediapipe/blob/master/LICENSE

Photographic frame masks, their source references and calibration are in
`src/lib/try-on-frames.ts`. Each mask uses the existing catalogue photograph;
the rim is clipped to its traced contour and the lens labels/background are
removed locally. Sunglass lenses use an illustrative tint. This is a frontal
2D appearance preview, not a 3D model, a physical measurement or a fit guarantee.
Recalibrate masks whenever a source photograph changes. Unknown models have no
try-on button until their own asset is calibrated.
