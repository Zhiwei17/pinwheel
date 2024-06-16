let isRotating = false;
let startTime = 0;
let totalRotationTime = 0;
let winZoneAngle = 0;

function setWinZone(percent) {
    var circle = document.getElementById('win-zone');
    var length = circle.getTotalLength();
    var offset = length - length * (percent / 100);
    circle.style.strokeDasharray = length;
    circle.style.strokeDashoffset = offset;
}

// Generates a random angle between 0 and 360 degrees
var randomAngle = Math.random() * 360;
document.getElementById('win-zone').setAttribute('transform', `rotate(${randomAngle} 150 150)`);


let rangeSlider = document.getElementById('range-slider');
let rangeChangeValueText = document.getElementById('chance-value');
setWinZone(rangeSlider.value);

rangeSlider.addEventListener("input", function() {
    setWinZone(this.value);
    rangeChangeValueText.innerHTML = this.value+'%';
});


document.getElementById('spin-button').addEventListener('click', () => {

    if (!isRotating) {
        const element = document.getElementById('arrow');

        // Reset time and state values
        startTime = performance.now();
        totalRotationTime = 0;
        isRotating = true;

        // Start continuous rotation
        element.classList.add('rotating');
        element.classList.remove('stopped');

        // Function to handle total rotation duration
        function checkRotationTime() {
            if (isRotating) {
                // Calculate total accumulated rotation time
                totalRotationTime = performance.now() - startTime;

                // If desired total time is reached (e.g., 2 seconds)
                if (totalRotationTime >= 3000) {
                    // Stop continuous rotation and transition to spin-stop
                    isRotating = false;

                    // Generate a random number between 0 and 360 degrees
                    var randomRotate = Math.floor(Math.random() * 361);

                    // Apply spin-stop animation and random transform value
                    element.style.setProperty('--random-deg', randomRotate + 'deg');
                    element.classList.remove('rotating');
                    element.classList.add('stopped');

                    // Listen for the 'animationend' event to restart the animation
                    element.addEventListener('animationend', function () {
                        animateRotation();
                    }, { once: true }); //  // 'once: true' to remove the listener after it's been executed once

                } else {
                    // Continue checking time
                    requestAnimationFrame(checkRotationTime);
                }
            }
        }

        // Start checking rotation time
        checkRotationTime();
    }
});

function animateRotation() {
    var intervalId = setInterval(function () {
        if (isRotating) {
            clearInterval(intervalId);
            return
        }
        winZoneAngle -= 1; // Angle increment (rotation speed)
        document.getElementById('win-zone').setAttribute('transform', `rotate(${winZoneAngle} 150 150)`);
    }, 10); // Time interval for rotation (adjust speed by changing this value)
}

// Call function to start rotation animation
animateRotation();

// TODO:
// poder mover el win-zone
// la segunda vez que haces girar que empieza por la pos actual del arrow
// feedback al ganar
// refactor + +css