

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
const finiteColorIndicator = document.getElementById('secondColorIndicator');
const angleInput = document.getElementById('angleInput');
const firstInputPiker = document.getElementById('firstColorIndicator');
const labelLeftInput = document.getElementById('labelLeftInput');
const labelRightInput = document.getElementById('labelRightInput');
const buttonGradientBg = document.getElementById('buttonGradientBg');
const manual = document.getElementById('manual');
const closeManualButton = document.getElementById('closeManualButton');
const buttonGradientManual = document.getElementById('buttonGradientManual');
const buttonOpenManual = document.getElementById('buttonOpenManual');

let midCol;

let angleGradientButton = 0;
function buttonAnimate() {
	requestAnimationFrame(buttonAnimate);
	buttonGradientBg.style.background = 'conic-gradient(from ' + angleGradientButton + 'deg at 49.92% 50%, ' + hexToHSL(startInputValue).hsl + ' 0%, ' + midColorNew() + ' 25%, '  + hexToHSL(finiteInputValue).hsl + ' 50%, ' + midColorNew() + ' 75%, ' + hexToHSL(startInputValue).hsl + ' 100%)';
	buttonGradientManual.style.background = 'conic-gradient(from ' + angleGradientButton + 'deg at 49.92% 50%, ' + hexToHSL(startInputValue).hsl + ' 0%, ' + midColorNew() + ' 25%, '  + hexToHSL(finiteInputValue).hsl + ' 50%, ' + midColorNew() + ' 75%, ' + hexToHSL(startInputValue).hsl + ' 100%)';
	angleGradientButton += 0.5;
}
buttonAnimate();

let manualOpen = false;

document.addEventListener('click', (e) => {
	if(manualOpen == false && e.target.id == 'buttonOpenManual') {
		manual.classList.remove('hidden-manual');
		setTimeout(() => {manual.classList.remove('hidden');}, 0);
		manualOpen = true;
	} else if(manualOpen == true && e.target.id == 'closeManualButton' || e.target.id != 'manual' && e.target.tagName != 'OL' && e.target.tagName != 'LI' && e.target.tagName != 'A') {
		closeManual();
	}
})

function closeManual() {
	manual.classList.add('hidden');
	setTimeout(() => {manual.classList.add('hidden-manual');}, 0);
	manualOpen = false;
}

// Скрывает Label
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

function fixInputColor(InputValue) {
	let fixColor;
	let newColorArray = [];
	if(InputValue.split('').length==3) {
		fixColor = InputValue.split('');
		for(let i = 0; i < 3; i++) {
			newColorArray.push(fixColor[i]);
			newColorArray.push(fixColor[i]);
		}
		fixColor = newColorArray.join('');
	} else {
		fixColor = InputValue;
	}
	return fixColor;
}

firstColorIndicator.style.backgroundColor = '#fff';
finiteColorIndicator.style.backgroundColor = '#000';
gradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%), hsl(0, 0%, 0%))';
prettyGradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%), hsl(0, 0%, 0%))';
angle = 0;

function processInput(startInputValue, finiteInputValue,angle) {
	if(finiteInputElement.value !== '') {
		labelRightInput.classList.add('hidden');
	} else if(startInputElement.value !== '') {
		labelLeftInput.classList.add('hidden');
	} else if(finiteInputElement.value === ''){
		finiteInputValue = '000000';
	}

	angleGradient = String(angle);
	if (angleGradient.trim() !== '' && parseFloat(angleGradient) !== NaN) {
		angle = 90 + Number(angleGradient);
	} else if (angleGradient.trim() === '') {
		angle = 90;
	}
	firstColorIndicator.value = '#' + fixInputColor(startInputValue);
	finiteColorIndicator.value = '#' + fixInputColor(finiteInputValue);
	gradient.style.background = 'linear-gradient(' + angle + 'deg,' + hexToHSL(startInputValue).hsl + ',' + hexToHSL(finiteInputValue).hsl + ')';
	prettyGradient.style.background = 'linear-gradient(' + angle + 'deg,' + hexToHSL(startInputValue).hsl + ',' + midColorNew() + '50%,' + hexToHSL(finiteInputValue).hsl + ')';
	
	if (startInputValue.trim() === '' && finiteInputValue.trim() === '') {
	} else if(startInputValue.trim() === '') {
		firstColorIndicator.style.backgroundColor = '#fff';
		gradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%),' + hexToHSL(finiteInputValue).hsl + ')';
		prettyGradient.style.background = 'linear-gradient(' + angle + 'deg, hsl(0, 0%, 100%),' + hexToHSL(finiteInputValue).hsl + ')';
	} 
}

function fixInputHashtag(colorIndicatorValue) {
	let InputValue = colorIndicatorValue.value;
	InputValue = InputValue.split('');
	InputValue.splice(0,1);
	return InputValue.join('');
}

firstColorIndicator.addEventListener('input', () => {
	startInputElement.value = fixInputHashtag(firstColorIndicator);
	startInputValue = startInputElement.value;
	processInput(startInputValue,finiteInputValue,angle);
	labelLeftInput.classList.add('hidden');
});
startInputElement.addEventListener('input', () => {
	startInputValue = startInputElement.value;
	// startInputValue = fixInputHashtag(startInputValue);
	if(startInputValue == '') {
		startInputValue = 'ffffff';
	}
	processInput(startInputValue,finiteInputValue,angle);
});
finiteColorIndicator.addEventListener('input', () => {
	finiteInputElement.value = fixInputHashtag(finiteColorIndicator);
	finiteInputValue = finiteInputElement.value;
	processInput(startInputValue,finiteInputValue,angle);
	labelRightInput.classList.add('hidden');
});
finiteInputElement.addEventListener('input', () => {
	finiteInputValue = finiteInputElement.value;
	processInput(startInputValue,finiteInputValue,angle);
});
angleInput.addEventListener('input', () => {
	let newAngleArray = [];
	let angleConst = angleInput.value;
	console.log('angleInput.value = ' + angleInput.value);
	angle = angleInput.value;
	let angleArray = angle.split('');
	for(let i = 0; i < angleArray.length; i++) {
		if(!isNaN(Number(angleArray[i]))) {
			newAngleArray.push(angleArray[i]);
		}
	}
	angle = newAngleArray.join('');
	angle = Number(angle);
	console.log(angle);
	angleInput.value = angle;
	if(angleConst == '') {
		angleInput.value = '';
	}
	processInput(startInputValue,finiteInputValue,angle);
});

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

