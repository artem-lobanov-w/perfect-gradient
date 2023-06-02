

const gradient = document.querySelector('.gradient');
const prettyGradient = document.querySelector('.pretty-gradient');

function hexToHSL(hex) {
	hex = '#' + hex; 
	let r = 0, g = 0, b = 0;
	if (hex.length == 4) {
	  r = '0x' + hex[1] + hex[1];
	  g = '0x' + hex[2] + hex[2];
	  b = '0x' + hex[3] + hex[3];
	} else if (hex.length == 7) {
	  r = '0x' + hex[1] + hex[2];
	  g = '0x' + hex[3] + hex[4];
	  b = '0x' + hex[5] + hex[6];
	}
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
  
	let h, s, l = (max + min) / 2;
	
	if (max == min) {
	  h = s = 0;
	} else {
	  const d = max - min;
	  s = l >= 0.5 ? d / (2.0 - max - min) : d / (max + min);
	  switch (max) {
		case r: h = (g - b) / d + (g < b ? 6.0 : 0); break;
		case g: h = (b - r) / d + 2.0; break;
		case b: h = (r - g) / d + 4.0; break;
	  }
	  h /= 6.0;
	}
	h = h * 360;
	s = s * 100;
	l = l * 100;

	r = parseInt(hex.substring(0,2), 16);
	g = parseInt(hex.substring(2,4), 16);
	b = parseInt(hex.substring(4,6), 16);

  
	return {
		hsl: 'hsla(' + h + ',' + s + '%,' + l + '%)',
		h: h,
		s: s,
		l: l,
		rgb: [r,g,b]
	};
}


let startInputValue = 'ffffff';
let finiteInputValue = '000000';
let startInputValue2 = 'ffffff';
let finiteInputValue2 = '000000';
let angle = 90;

const startInputElement = document.getElementById('startInputColor');
const finiteInputElement = document.getElementById('finiteInputColor');
const firstColorIndicator = document.getElementById('firstColorIndicator');
const midColorIndicator = document.getElementById('midColorIndicator');
const finiteColorIndicator = document.getElementById('secondColorIndicator');
const angleInput = document.getElementById('angleInput');
const firstInputPiker = document.getElementById('firstColorIndicator');
const labelLeftInput = document.getElementById('labelLeftInput');
const labelRightInput = document.getElementById('labelRightInput');
// const secondInputPiker = document.getElementById('secondColorIndicator');
// console.log(firstInputPiker.value);
let midCol;


startInputElement.addEventListener('focus', () => {
	labelLeftInput.classList.add('hidden');
})
startInputElement.addEventListener('blur', () => {
	if(!startInputElement.value) {
		labelLeftInput.classList.remove('hidden');
	}
})

finiteInputElement.addEventListener('focus', () => {
	labelRightInput.classList.add('hidden');
})
finiteInputElement.addEventListener('blur', () => {
	if(!finiteInputElement.value) {
		labelRightInput.classList.remove('hidden');
	}
})

angleInput.addEventListener('focus', () => {
	labelAngleInput.classList.add('hidden');
})
angleInput.addEventListener('blur', () => {
	if(!angleInput.value) {
		labelAngleInput.classList.remove('hidden');
	}
})


function processInput() {
	requestAnimationFrame(processInput);
	startInputValue = startInputElement.value;
	finiteInputValue = finiteInputElement.value;
	startInputValue2 = startInputValue;
	finiteInputValue2 = finiteInputValue;
	angleGradient = angleInput.value;
	if (angleGradient.trim() !== '' && parseFloat(angleGradient) !== NaN) {
		angle = 90 + Number(angleGradient);
		// console.log(angleGradient);
	} else if (angleGradient.trim() === '') {
		angle = 90;
	}
	
	firstColorIndicator.style.backgroundColor = hexToHSL(startInputValue).hsl ;
	finiteColorIndicator.style.backgroundColor = hexToHSL(finiteInputValue).hsl;
	gradient.style.background = 'linear-gradient(' + angle + 'deg,' + hexToHSL(startInputValue).hsl + ',' + hexToHSL(finiteInputValue).hsl + ')';
	prettyGradient.style.background = 'linear-gradient(' + angle + 'deg,' + hexToHSL(startInputValue).hsl + ',' + midColorNew() + '50%,' + hexToHSL(finiteInputValue).hsl + ')';
	
	if (startInputValue.trim() === '' && finiteInputValue.trim() === '') {
		firstColorIndicator.style.backgroundColor = '#fff';
		finiteColorIndicator.style.backgroundColor = '#000';
		gradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%), hsl(0, 0%, 0%))';
		prettyGradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%), hsl(0, 0%, 0%))';
	} else if(startInputValue.trim() === '') {
		firstColorIndicator.style.backgroundColor = '#fff';
		gradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%),' + hexToHSL(finiteInputValue).hsl + ')';
		prettyGradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%),' + hexToHSL(finiteInputValue).hsl + ')';
	} 

	const color1 = hexToHSL(startInputValue).rgb;
	
	const color2 = hexToHSL(finiteInputValue).rgb;
	// midColorIndicator.style.backgroundColor = findMidColor(color1, color2);
}
processInput();


function findMidColor(color1, color2) {
	const r1 = parseInt(color1[0], 10);
	const g1 = parseInt(color1[1], 10);
	const b1 = parseInt(color1[2], 10);
  
	const r2 = parseInt(color2[0], 10);
	const g2 = parseInt(color2[1], 10);
	const b2 = parseInt(color2[2], 10);
	
  
	const midR = Math.round(r1 + (r2 - r1) / 2);
	const midG = Math.round(g1 + (g2 - g1) / 2);
	const midB = Math.round(b1 + (b2 - b1) / 2);
  
	return 'rgb(' + midR + ', ' + midG + ', ' + midB + ')';
}

function midColorNew() {
	const startH = hexToHSL(startInputValue).h;
	const startS = hexToHSL(startInputValue).s;
	const startL = hexToHSL(startInputValue).l;
	const finiteH = hexToHSL(finiteInputValue).h;
	const finiteS = hexToHSL(finiteInputValue).s;
	const finiteL = hexToHSL(finiteInputValue).l;
	let sign = 1;
	let midH;
	if(Math.abs(startH - finiteH) > 180 && startH > 90) {
		midH = (startH + finiteH) / 2 - (180 * sign);
	} else if(Math.abs(startH - finiteH) > 180 && startH <= 90)  {
		midH = (startH + finiteH) / 2 + (180 * sign);
	} else {
		midH = (startH + finiteH) / 2;
	}
	const midS = (startS + finiteS) / 2;
	const midL = (startL + finiteL) / 2;
	midCol = 'hsl(' + midH + ',' + midS + '%,' + midL + '%)';

	return midCol;
}

const textButton = document.getElementById('textButton');
let textArrey = textButton.textContent.split('');

const button = document.getElementById('button');

prettyGradient.addEventListener('click', () => {
	const styles = getComputedStyle(prettyGradient);
	const background = styles.getPropertyValue('background');
	const start = background.indexOf('linear-gradient');
	const end = background.indexOf('))', start) + 1;
	const linearGradient = background.substring(start, end);
	navigator.clipboard.writeText('background: ' + linearGradient)
	  .then(() => console.log('Градиент скопирован в буфер обмена!'))
	  .catch(err => console.error('Ошибка копирования: ', err));

	const textNew = 'Градиент скопирован';
	const textOld = 'Скопировать градиент';
	setTimeout(function tick() {
		textButton.textContent = textNew;
		setTimeout( () => {
			textButton.textContent = textOld;
			button.style.backgroundColor = '#181818';
			button.style.transitionDuration = '0.3s';
		}, 4000);
	}, 0);

	button.style.backgroundColor = '#464646';
	button.style.transitionDuration = '0.3s';
});


