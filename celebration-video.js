/**
 * Video Celebration Script
 * Handles video upload, background video playback with 2-second delay,
 * and celebratory effects
 */

(function() {
    'use strict';

    // DOM Elements
    const video = document.getElementById('celebrationVideo');
    const enterButton = document.getElementById('enterButton');
    const videoInput = document.getElementById('videoInput');
    const fileName = document.getElementById('fileName');
    const overlay = document.getElementById('overlay');
    const celebrationContent = document.getElementById('celebrationContent');
    const videoBackground = document.querySelector('.video-background');

    // State Variables
    let selectedVideoFile = null;
    let defaultVideoPath = 'Couplepics/RAW2.jpeg'; // Fallback to default RAW wallpaper
    let videoStarted = false;
    let countdownTimer = null;

    /**
     * Initialize the celebration video system
     */
    function init() {
        setupEventListeners();
        loadDefaultVideo();
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Enter button click handler
        enterButton.addEventListener('click', handleEnterClick);

        // Video file input handler
        videoInput.addEventListener('change', handleVideoUpload);

        // Video events
        video.addEventListener('play', onVideoPlay);
        video.addEventListener('ended', onVideoEnd);
        video.addEventListener('error', onVideoError);
    }

    /**
     * Load default video from repository
     * Uses the RAW2.jpeg file as fallback
     */
    function loadDefaultVideo() {
        // Try multiple video paths
        const videoPaths = [
            'Couplepics/celebration.mp4',
        ];

        // First try to load a default video
        let videoFound = false;
        for (let path of videoPaths) {
            fetch(path, { method: 'HEAD' })
                .then(response => {
                    if (response.ok && !videoFound) {
                        video.src = path;
                        videoFound = true;
                    }
                })
                .catch(() => {
                    // File not found, try next one
                });
        }

        // If no video is found, we'll use user uploaded video or fallback image
        if (!videoFound) {
            console.log('No default video found. Waiting for user upload or using default wallpaper.');
        }
    }

    /**
     * Handle Enter button click
     * Starts 2-second countdown before video plays
     */
    function handleEnterClick() {
        if (videoStarted) return; // Prevent multiple triggers

        videoStarted = true;
        enterButton.disabled = true;
        enterButton.innerHTML = '<span class="loading"></span> Starting in 2 seconds...';

        // Show video background
        videoBackground.classList.add('active');

        // Hide content after fade
        setTimeout(() => {
            celebrationContent.style.opacity = '0';
            celebrationContent.style.pointerEvents = 'none';
        }, 1000);

        // Start countdown
        let countdown = 2;
        updateCountdownDisplay(countdown);

        countdownTimer = setInterval(() => {
            countdown--;
            updateCountdownDisplay(countdown);

            if (countdown <= 0) {
                clearInterval(countdownTimer);
                startVideoPlayback();
            }
        }, 1000);
    }

    /**
     * Update countdown display on overlay
     */
    function updateCountdownDisplay(seconds) {
        if (seconds > 0) {
            overlay.innerHTML = `<div style="font-size: 4rem; color: #D4AF37; font-weight: bold; text-shadow: 0 4px 15px rgba(0,0,0,0.7);">${seconds}</div>`;
        } else {
            overlay.innerHTML = '';
        }
    }

    /**
     * Start video playback
     */
    function startVideoPlayback() {
        if (!video.src) {
            showMessage('No video available. Please upload a video file.');
            resetState();
            return;
        }

        // Play video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video playback started');
                    launchCelebration();
                })
                .catch(error => {
                    console.error('Error playing video:', error);
                    showMessage('Unable to play video. Please check the file format.');
                    resetState();
                });
        } else {
            // Older browser
            launchCelebration();
        }
    }

    /**
     * Launch celebration effects
     */
    function launchCelebration() {
        // Create confetti
        createConfetti();

        // Play celebration sound (optional)
        playIntroSound();

        // Show celebration message
        overlay.innerHTML = `
            <div style="text-align: center; color: white; z-index: 10;">
                <div style="font-size: 3rem; margin-bottom: 20px;">🎉 🎊 🎉</div>
                <div style="font-size: 2rem; font-weight: bold; text-shadow: 0 4px 15px rgba(0,0,0,0.7);">
                    Celebrating Aditya & Srivalli!
                </div>
                <div style="font-size: 1.2rem; color: #D4AF37; margin-top: 20px;">
                    ❤️ Forever Together ❤️
                </div>
            </div>
        `;

        // Hide message after 5 seconds
        setTimeout(() => {
            overlay.innerHTML = '';
        }, 5000);
    }

    /**
     * Create confetti animation
     */
    function createConfetti() {
        const confettiCount = 50;
        const colors = ['#D4AF37', '#F0D47A', '#7CA4D4', '#FF69B4', '#FFD700'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() * 0.7 + 0.3;
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

            document.body.appendChild(confetti);

            // Remove confetti element after animation
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    /**
     * Play intro celebration sound (optional)
     */
    function playIntroSound() {
        // Try to play wedding music
        const audioFiles = ['Wedding.mp3', 'Couplepics/Wedding.mp3', 'audio/celebration.mp3'];
        
        for (let audioPath of audioFiles) {
            const audio = new Audio(audioPath);
            audio.volume = 0.3; // Lower volume
            
            audio.play().catch(() => {
                // If this audio fails, the next one will be tried in the next iteration
                // This is intentional - we don't want to spam console errors
            });
            
            break; // Only try first available
        }
    }

    /**
     * Handle video file upload
     */
    function handleVideoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('video/')) {
            showMessage('❌ Please select a valid video file');
            return;
        }

        // Validate file size (max 100MB)
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            showMessage('❌ File size exceeds 100MB limit');
            return;
        }

        selectedVideoFile = file;

        // Create object URL for the video
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;

        // Update file name display
        fileName.textContent = `✓ Selected: ${file.name} (${formatFileSize(file.size)})`;
        fileName.style.color = '#7CA4D4';

        // Reset video started state to allow replay
        videoStarted = false;
        enterButton.disabled = false;
        enterButton.textContent = 'ENTER THE CELEBRATION →';

        showMessage(`✓ Video "${file.name}" loaded successfully!`);
    }

    /**
     * Format file size for display
     */
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }

    /**
     * Video play event handler
     */
    function onVideoPlay() {
        console.log('Video is now playing');
    }

    /**
     * Video end event handler
     */
    function onVideoEnd() {
        console.log('Video has ended');
        
        // Show end message
        overlay.innerHTML = `
            <div style="text-align: center; color: white; z-index: 10;">
                <div style="font-size: 2rem; font-weight: bold; text-shadow: 0 4px 15px rgba(0,0,0,0.7);">
                    Thank You for Celebrating! 🙏
                </div>
            </div>
        `;

        setTimeout(() => {
            overlay.innerHTML = '';
        }, 3000);

        // Reset for replay
        setTimeout(resetState, 3000);
    }

    /**
     * Video error handler
     */
    function onVideoError() {
        console.error('Video loading error:', video.error);
        showMessage('❌ Error loading video. Please check the file.');
        resetState();
    }

    /**
     * Show temporary message to user
     */
    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 58, 143, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            border: 2px solid #D4AF37;
            z-index: 1000;
            font-size: 1.1rem;
            text-align: center;
            animation: fadeInUp 0.5s ease-out;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => messageDiv.remove(), 3000);
    }

    /**
     * Reset to initial state
     */
    function resetState() {
        videoStarted = false;
        videoBackground.classList.remove('active');
        celebrationContent.style.opacity = '1';
        celebrationContent.style.pointerEvents = 'auto';
        enterButton.disabled = false;
        enterButton.textContent = 'ENTER THE CELEBRATION →';

        // Reset video
        video.pause();
        video.currentTime = 0;

        if (countdownTimer) clearInterval(countdownTimer);
    }

    /**
     * Keyboard shortcuts
     */
    document.addEventListener('keydown', (event) => {
        // Press Space to toggle play/pause
        if (event.code === 'Space' && videoStarted) {
            event.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        // Press Escape to exit full celebration
        if (event.code === 'Escape' && videoStarted) {
            resetState();
        }
    });

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
