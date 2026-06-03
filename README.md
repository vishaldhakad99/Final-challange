# Image Editor Web App

A full-stack image editing application built with **React** (frontend) and **Node.js/Express** (backend).

## ✨ Features


- **Image Upload**: Drag & drop or file select
- **Real-time Filters**: Brightness, Contrast, Saturation (0-200%)
- **Transformations**: Rotate left/right (±90°), Flip horizontal/vertical
- **Reset**: Restore original image & defaults
- **Download**: Export edited image as PNG
- **Responsive UI**: Works on desktop & mobile
- **Smooth animations** & modern design

## 📁 Folder Structure

```
finalchallange/
├── client/           # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/           # Node.js/Express backend
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

Dependencies are already installed!

### 1. Build the React app
```bash
cd client
npm run build
cd ..
```

### 2. Start the server
```bash
cd server
npm start
```

### 3. Open in browser
Visit `http://localhost:5000`

## 🛠️ Development Mode

### Frontend (with hot reload)
```bash
cd client
npm start
```
(Frontend runs on http://localhost:3000, proxies API to backend)

### Backend
```bash
cd server
npm run dev
```
(Uses nodemon for auto-restart)

## 📸 How to Use

1. **Upload** an image using the upload button
2. **Adjust filters** using sliders (real-time preview)
3. **Transform** with rotate/flip buttons
4. **Reset** to original anytime
5. **Download** your edited image

## 🏗️ Technical Details

### Frontend (React)
- **Canvas API** for real-time image manipulation
- **CSS Filters** for brightness/contrast/saturation
- **Context transforms** for rotation/flipping
- **Hooks**: useState, useRef, useEffect, useCallback
- **Responsive design** with CSS Grid/Flexbox

### Backend (Node.js/Express)
- Serves React build files
- CORS enabled
- Multer for optional file uploads (`POST /upload`)
- Production-ready static file serving

## 🎨 Filters & Transforms

| Feature | Implementation |
|---------|----------------|
| Brightness | `ctx.filter = brightness(X%)` |
| Contrast | `ctx.filter = contrast(X%)` |
| Saturation | `ctx.filter = saturate(X%)` |
| Rotate | `ctx.rotate(angle)` |
| Flip H/V | `ctx.scale(-1,1)` / `ctx.scale(1,-1)` |
| Reset | State reset + redraw |

## 🔒 Security & Performance
- Client-side editing (no server image processing needed)
- Canvas sized dynamically to image aspect ratio
- Debounced redraws for smooth performance
- Only PNG download for quality

## 📦 Scripts Available

**Client:**
- `npm start` - Dev server (localhost:3000)
- `npm run build` - Production build
- `npm test` - Run tests

**Server:**
- `npm start` - Production server
- `npm run dev` - Dev with nodemon

## 🤝 Troubleshooting

- **Port conflict?** Change `PORT=5001 npm start`
- **npm audit warnings?** Normal for CRA, run `npm audit fix` if needed
- **CORS issues?** Already configured

## 🚀 Next Features (ideas)
- More filters (blur, hue, grayscale)
- Crop tool
- Layers support
- Undo/redo history
- Server-side image processing for large files


*Tested on Chrome/Firefox/Safari. Works with JPG, PNG, WebP images up to 10MB.*

