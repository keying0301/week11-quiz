
var cloudPositionXRatio = 0.2; 
var cloudPositionYRatio = 0.3; 
var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
        window.addEventListener("resize", resizeCanvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;}

		// Smoke Stack
		function drawSmokeStack() {
			ctx.fillStyle = "#777";
			ctx.fillRect(canvas.width / 2 - 30, canvas.height - 100, 60, 100);
			ctx.fillStyle = "#555";
			ctx.fillRect(canvas.width / 2 - 20, canvas.height - 140, 40, 40);
		}

		// Clouds
		function drawCloud(x, y) {
			ctx.beginPath();
			ctx.arc(x, y, 30, 0, Math.PI * 2);
			ctx.arc(x + 30, y - 30, 30, 0, Math.PI * 2);
			ctx.arc(x + 90, y - 30, 30, 0, Math.PI * 2);
			ctx.arc(x + 120, y, 30, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = "#fff";
			ctx.fill();
		}

		function drawClouds() {
            var cloudPositionX = canvas.width * cloudPositionXRatio;
            var cloudPositionY = canvas.height * cloudPositionYRatio;
            
            drawCloud(cloudPositionX, cloudPositionY);
          }
          

		// Birds
		var birds = [];

		function createBird(x, y) {
			return {
				x: x,
				y: y,
				width: 50,
				height: 30,
				speed: Math.random() * 2 + 1 // random speed between 1 and 3
			};
		}

		function createBirds() {
			birds.push(createBird(canvas.width, Math.random() * (canvas.height - 100)));
		}

		function drawBird(bird) {
			ctx.fillStyle = "#000";
			ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
		}

		function moveBirds() {
			birds.forEach(function(bird) {
				bird.x -= bird.speed;
			});
			birds = birds.filter(function(bird) {
				return bird.x + bird.width > 0;
			});
		}

		function drawBirds() {
			birds.forEach(function(bird) {
				drawBird(bird);
			});
		}

		// Emit Smoke
		var isSmoking = false;
		var smokeCount = 0;
		var maxSmokeCount = 10;
		var darknessLevel = 0;

		function emitSmoke() {
			if (isSmoking) return;
			isSmoking = true;
			smokeCount++;
			if (smokeCount >= maxSmokeCount) {
				isSmoking = false;
				smokeCount = 0;
			}
			darknessLevel = smokeCount * 0.1;
			updateDarkness();
		}

		function updateDarkness() {
			canvas.style.backgroundColor = "rgba(0, 0, 0, " + darknessLevel + ")";
		}

		document.getElementById("btn").addEventListener("click", emitSmoke);

		// Animation Loop

		function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSmokeStack();
            drawClouds();
            drawBirds(); 
            requestAnimationFrame(animate);
        }
          

		animate();