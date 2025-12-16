# Logo Setup Guide

## How to Add Your Logo

### Option 1: Using an Image File (Recommended)

1. **Add your logo file to the `public/` folder:**
   - Supported formats: PNG, JPG, SVG
   - Recommended size: 200x200px or larger (will be scaled)
   - Name it one of: `logo.png`, `logo.svg`, `logo.jpg`, `zoma-logo.png`, etc.

2. **Update Logo.js:**
   - Open `src/components/Logo.js`
   - Find the line: `const hasLogo = false;`
   - Change to: `const hasLogo = true;`
   - Update the image src path:
   ```javascript
   <img 
     src="/logo.png"  // Change to your filename
     alt="Zoma Coffee Roaster Logo" 
     className="logo-image"
   />
   ```

### Option 2: Quick Method (No Code Changes)

1. Add your logo file to `public/` folder as `logo.png` or `logo.svg`
2. Uncomment the img tag in `Logo.js` (around line 45)
3. The logo will automatically load!

### Option 3: Replace SVG

1. Open `src/components/Logo.js`
2. Replace the `<DefaultLogoSVG />` component with your custom SVG code
3. Or modify the existing SVG colors/styling

## Logo Requirements

- **Format**: PNG (with transparency), JPG, or SVG
- **Size**: Minimum 200x200px (will be scaled to 80-120px)
- **Background**: Transparent PNG recommended
- **File Size**: Keep under 100KB for fast loading

## Current Logo

The app currently shows a coffee-themed placeholder logo. Replace it with your brand logo following the steps above.

## Testing

After adding your logo:
1. Save the file
2. Refresh your browser
3. The logo should appear in the header
4. If it doesn't load, check:
   - File is in `public/` folder
   - Filename matches exactly (case-sensitive)
   - File format is supported

## Styling

Logo styling is in `src/components/Logo.css`. You can adjust:
- Size: `.logo-image { max-width: 120px; }`
- Animation: Remove or modify `@keyframes logoFloat`
- Position: Adjust `.logo-container` styles

