var canvas    = document.getElementById('background');
var context   = canvas.getContext('2d');
var stars     = [];
var starCount = 200;
var tau       = Math.PI * 2.0;
var step      = 1000.0 / 60.0;

for (i = 0; i < starCount; i++)
{
	stars[i] = {}; randomizeStar(stars[i], true);
}

updateStars();

setInterval(updateStars, step);

function randomizeStar(star, justSpawned)
{
	var a = Math.random() * tau;
	var s = Math.random() * 0.00001 + 0.00001;
	
	star.x = Math.random();
	star.y = Math.random();
	star.r = Math.random() * 2.0 + 1.0;
	star.z = Math.sin(a) * s;
	star.w = Math.cos(a) * s;
	star.l = (Math.random() * 6.0 + 1.0) * 1000.0;
	star.a = justSpawned ? Math.random() * star.l : 0.0;
}

function updateStars()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	for (i = 0; i < starCount; i++)
	{
		var star = stars[i];
		
		star.x += star.z * step;
		star.y += star.w * step;
		star.a += step;
		
		if (star.a >= star.l)
		{
			randomizeStar(star, false);
		}
		
		context.beginPath();
			context.fillStyle = 'white';
			context.globalAlpha = 1.0 - Math.abs((star.a / star.l - 0.5) * 2.0);
			context.arc(star.x * canvas.width, star.y * canvas.width, star.r, 0.0, tau, false);
		context.closePath();
		context.fill();
	}
}
window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

function resizeCanvas()
{
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}