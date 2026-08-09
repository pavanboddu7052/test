# Video Celebration Setup Guide

Welcome! This guide explains how to use the **Video Celebration** feature in your wedding invitation website.

## 📁 Files Added

- **`video-celebration.html`** - Main HTML file with video celebration interface
- **`celebration-video.js`** - JavaScript file that handles video playback and effects
- **`VIDEO_SETUP_GUIDE.md`** - This setup guide

## 🎬 Features

✨ **Auto-play after 2 seconds** - Video automatically plays 2 seconds after clicking "ENTER"
📹 **Video Upload** - Upload your own celebration video (MP4, WebM, OGG)
🎉 **Celebratory Effects** - Confetti animation and celebration messages
🎵 **Background Music** - Automatically plays wedding music during celebration
📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
🎨 **Beautiful UI** - Matches your wedding website theme with gold accents

## 🚀 Quick Start

### Option 1: Upload Video to Repository

1. **Prepare your video file** (celebration.mp4, video.mp4, etc.)
   - Recommended format: MP4 (H.264 codec)
   - Max size: 100MB for optimal GitHub Pages performance
   - Duration: 30 seconds to 5 minutes recommended

2. **Upload video to repository:**
   - Navigate to your repo: `pavanboddu7052/test`
   - Create a new folder: `Couplepics/` (or use existing one)
   - Upload your video file there
   - Commit the changes

3. **Update the default video path** in `celebration-video.js`:
   ```javascript
   // Line ~17: Update the default video paths
   const videoPaths = [
       'Couplepics/celebration.mp4',    // ← Your video path
       'celebration.mp4',
       'Couplepics/video.mp4',
       'video.mp4'
   ];
   ```

4. **Access the page:**
   - Open: `https://pavanboddu7052.github.io/test/video-celebration.html`
   - Or add a link in your `index.html` to this page

### Option 2: Upload Video via Browser

1. Open `video-celebration.html` in your browser
2. Click **"Choose Video File"** button
3. Select a video from your computer
4. Click **"ENTER THE CELEBRATION"** button
5. Video will auto-play after 2 seconds!

## 🎯 How It Works

### Step-by-Step Flow:

1. **User Loads Page**
   - Celebration page displays with upload option
   - Default wallpaper (RAW2.jpeg) shown as background

2. **User Clicks "ENTER THE CELEBRATION"**
   - Overlay fades in with 2-second countdown
   - Video background becomes visible
   - Content slides out

3. **After 2 Seconds**
   - Video automatically starts playing
   - Celebration text appears over video
   - Confetti animation starts
   - Wedding music plays (if available)

4. **Video Ends**
   - "Thank You" message displays
   - Page resets, ready for replay

## 🎬 Video Specifications

| Specification | Details |
|---|---|
| **Recommended Format** | MP4 (H.264/AVC codec) |
| **Resolution** | 1920x1080 (Full HD) or higher |
| **Duration** | 30 seconds to 5 minutes |
| **Max File Size** | 100MB (GitHub Pages limit) |
| **Supported Formats** | MP4, WebM, OGG, MOV |
| **Frame Rate** | 24-60 FPS |
| **Audio** | Optional (can be muted) |

## 🎨 Customization Options

### Change Colors
Edit the CSS in `video-celebration.html`:
```css
/* Gold accent color */
.enter-button {
    background: linear-gradient(135deg, #D4AF37, #F0D47A);
}

/* Button text color */
color: #0A1628;
```

### Adjust Delay Time
Edit `celebration-video.js`:
```javascript
// Line ~105: Change countdown duration
let countdown = 2;  // ← Change this number (in seconds)
```

### Change Celebration Message
Edit `celebration-video.js`:
```javascript
// Line ~165: Customize message
overlay.innerHTML = `
    <div style="...">
        <div>🎉 Your Custom Message Here! 🎉</div>
    </div>
`;
```

### Adjust Confetti Amount
Edit `celebration-video.js`:
```javascript
// Line ~185: Change confetti count
const confettiCount = 50;  // ← Increase for more confetti
```

## 📝 Integration with Main Website

### Add Link to Main Wedding Page

In your `index.html` or `New.html`, add this button:

```html
<!-- Add this in the hero section or anywhere you want -->
<a href="video-celebration.html" class="btn btn-gold" target="_blank">
    🎬 Watch Celebration Video
</a>
```

### Or Embed in Same Page

To show video celebration in an iframe:

```html
<section id="video-section">
    <iframe src="video-celebration.html" width="100%" height="600px" 
            frameborder="0" style="border-radius: 10px;"></iframe>
</section>
```

## 🔧 Troubleshooting

### Video Won't Play
1. ✓ Check file format is MP4, WebM, or OGG
2. ✓ Verify file is uploaded to repository
3. ✓ Check file path in `celebration-video.js`
4. ✓ Try uploading via browser instead

### Video Takes Too Long to Load
1. ✓ Reduce video file size (compress with FFmpeg)
2. ✓ Use MP4 format (most compatible)
3. ✓ Reduce video resolution if > 1080p
4. ✓ Check internet connection

### Audio Not Playing
1. ✓ Video file must have audio track
2. ✓ Or check Wedding.mp3 is in repository
3. ✓ Browser may block autoplay - user can unmute

### Confetti Not Showing
1. ✓ Check browser console for errors (F12)
2. ✓ Verify CSS animations are not disabled
3. ✓ Try different browser

### Mobile Issues
1. ✓ Video may need user gesture to play
2. ✓ Try clicking play button on video controls
3. ✓ Ensure video is in portrait mode for mobile
4. ✓ Check browser supports video playback

## 📱 Mobile Optimization

For better mobile experience:

1. **Landscape Mode** - Video plays better in landscape
2. **File Size** - Keep under 50MB for faster load
3. **Resolution** - 1280x720 is sufficient for mobile
4. **Testing** - Test on iPhone and Android devices

## 🎥 Recommended Video Content

Ideas for celebration videos:

- 📽️ Couple dancing together
- 🎪 Pre-wedding photoshoot highlights
- 📸 Engagement video montage
- 🎬 Love story video
- 🎉 Friends and family wishes compilation
- 💒 Wedding ceremony highlights
- 🎊 Reception celebration clips

## 💾 Backup & Version Control

Keep your videos safe:

1. Store original videos locally
2. Commit to GitHub
3. Keep backup copy on cloud storage
4. Document video details in commit message

Example commit message:
```
Add celebration video - 2min wedding highlights montage (45MB)
```

## 🔐 Privacy Notes

- Videos uploaded to GitHub public repo are accessible to everyone
- For private celebrations, use GitHub private repo
- Consider video size for bandwidth usage
- Test video before sharing with guests

## 📞 Support

### Common Issues & Solutions:

**"404: Video not found"**
- ✓ Verify video is in Couplepics folder
- ✓ Check file name spelling (case-sensitive on GitHub)
- ✓ Try uploading again

**"Video plays but with no sound"**
- ✓ Unmute the video (speaker icon)
- ✓ Check video file has audio track
- ✓ Browser may restrict autoplay with audio

**"Video quality is poor"**
- ✓ Re-upload higher resolution video
- ✓ Check original video quality
- ✓ Try different compression settings

## 🎊 Final Tips

✨ Test everything before sharing with guests
✨ Use high-quality video for best experience
✨ Keep file sizes reasonable for page load
✨ Have fun with the celebration! 🎉

---

**Made with ❤️ for your wedding celebration!**

Need help? Check the code comments or create an issue in your repository.