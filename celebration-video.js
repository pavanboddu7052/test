/**
 * Simple Video Player
 * Handles video upload and playback
 */

(function() {
    'use strict';

    // DOM Elements
    const video = document.getElementById('celebrationVideo');
    const videoInput = document.getElementById('videoInput');
    const playButton = document.getElementById('enterButton');

    /**
     * Initialize the video player
     */
    function init() {
        setupEventListeners();
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        playButton.addEventListener('click', handlePlayClick);
        videoInput.addEventListener('change', handleVideoUpload);
    }

    /**
     * Handle play button click
     */
    function handlePlayClick() {
        if (!video.src) {
            alert('Please select a video file first');
            return;
        }
        video.play();
    }

    /**
     * Handle video file upload
     */
    function handleVideoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file');
            return;
        }

        // Create object URL for the video
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;
        
        playButton.disabled = false;
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
