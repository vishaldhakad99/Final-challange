import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';

const App = () => {
  // State
  const [imageSrc, setImageSrc] = useState(null); // Current edited image data URL
  const [originalImageSrc, setOriginalImageSrc] = useState(null); // Original for reset
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100
  });
  const [transform, setTransform] = useState({
    rotation: 0,
    flipH: false,
    flipV: false
  });

  // Refs
  const canvasRef = useRef(null);
  const originalImgRef = useRef(new Image());

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: Number(value) }));
  };

  // Transform handlers
  const rotateLeft = () => {
    setTransform(prev => ({ ...prev, rotation: (prev.rotation - 90 + 360) % 360 }));
  };

  const rotateRight = () => {
    setTransform(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
  };

  const flipHorizontal = () => {
    setTransform(prev => ({ ...prev, flipH: !prev.flipH }));
  };

  const flipVertical = () => {
    setTransform(prev => ({ ...prev, flipV: !prev.flipV }));
  };

  // Reset
  const reset = () => {
    setFilters({ brightness: 100, contrast: 100, saturation: 100 });
    setTransform({ rotation: 0, flipH: false, flipV: false });
    if (originalImageSrc) {
      setImageSrc(originalImageSrc);
    }
  };

  // Draw function
  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc || !originalImgRef.current.src) return;

    const ctx = canvas.getContext('2d');
    const img = originalImgRef.current;

    // Size canvas to fit image maintaining aspect
    const maxSize = 500;
    const aspect = img.naturalWidth / img.naturalHeight;
    let width, height;
    if (aspect > 1) {
      width = maxSize;
      height = maxSize / aspect;
    } else {
      height = maxSize;
      width = maxSize * aspect;
    }
    canvas.width = width;
    canvas.height = height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Save context
    ctx.save();

    // Apply transforms
    const centerX = width / 2;
    const centerY = height / 2;

    // Flip
    if (transform.flipH) {
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
    }
    if (transform.flipV) {
      ctx.scale(1, -1);
      ctx.translate(0, -height);
    }

    // Rotate
    ctx.translate(centerX, centerY);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    // Apply filters (CSS filter percentages)
    ctx.filter = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
    `.trim();

    // Draw image
    ctx.drawImage(img, 0, 0, width, height);

    ctx.restore();
  }, [imageSrc, filters, transform]);

  // Load image when imageSrc changes
  useEffect(() => {
    if (imageSrc) {
      originalImgRef.current.onload = drawImage;
      originalImgRef.current.src = imageSrc;
    }
  }, [imageSrc, drawImage]);

  // Redraw when filters/transform change
  useEffect(() => {
    if (imageSrc) {
      drawImage();
    }
  }, [filters, transform, drawImage]);

  // Upload handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setImageSrc(dataUrl);
        setOriginalImageSrc(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🖼️ Image Editor</h1>
        <p>Upload an image and apply real-time filters, rotations, and flips!</p>
      </div>

      <div className="main">
        <div className="image-container">
          {imageSrc ? (
            <canvas
              ref={canvasRef}
              className="image-canvas"
              alt="Edited image"
            />
          ) : (
            <div className="no-image">
              <p>📁 No image uploaded</p>
              <p>Upload an image to start editing</p>
            </div>
          )}
        </div>

        <div className="controls">
          <div className="section">
            <h3>📤 Upload Image</h3>
            <label htmlFor="file-upload" className="file-label">
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="upload-input"
            />
          </div>

          <div className="section">
            <h3>🎨 Filters</h3>
            <div className="control-group">
              <label>Brightness</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.brightness}
                  onChange={(e) => handleFilterChange('brightness', e.target.value)}
                />
                <span className="value-display">{filters.brightness}%</span>
              </div>
            </div>
            <div className="control-group">
              <label>Contrast</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.contrast}
                  onChange={(e) => handleFilterChange('contrast', e.target.value)}
                />
                <span className="value-display">{filters.contrast}%</span>
              </div>
            </div>
            <div className="control-group">
              <label>Saturation</label>
              <div className="slider-container">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.saturation}
                  onChange={(e) => handleFilterChange('saturation', e.target.value)}
                />
                <span className="value-display">{filters.saturation}%</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>🔄 Transformations</h3>
            <div className="button-group">
              <button className="rotate-btn" onClick={rotateLeft}>
                ↺ Rotate Left
              </button>
              <button className="rotate-btn" onClick={rotateRight}>
                ↻ Rotate Right
              </button>
            </div>
            <div className="button-group">
              <button className="flip-btn" onClick={flipHorizontal}>
                ↔ Flip H
              </button>
              <button className="flip-btn" onClick={flipVertical}>
                ↕ Flip V
              </button>
            </div>
          </div>

          <div className="section">
            <button className="primary-btn" onClick={reset}>
              🔄 Reset All
            </button>
            <button className="primary-btn" onClick={download} disabled={!imageSrc}>
              💾 Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
