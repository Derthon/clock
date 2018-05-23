const get = (id) => document.getElementById(id);
const getClass = (className) => document.getElementsByClassName(className);
const create = (el) => {
	return document.createElement(el)
};
const createAndSet = (el, prop, val) => {
	let element = create(el);
	element.setAttribute(prop,val);
	return element;
}

const append = (parent, child) => parent.appendChild(child);

let t = true;
let f = false;

const numbers = {
	0: [t,t,t,t,f,t,t,f,t,t,f,t,t,t,t],
	1: [f,t,f,f,t,f,f,t,f,f,t,f,f,t,f],
	2: [t,t,t,f,f,t,t,t,t,t,f,f,t,t,t],
	3: [t,t,t,f,f,t,t,t,t,f,f,t,t,t,t],
	4: [t,f,t,t,f,t,t,t,t,f,f,t,f,f,t],
	5: [t,t,t,t,f,f,t,t,t,f,f,t,t,t,t],
	6: [t,t,t,t,f,f,t,t,t,t,f,t,t,t,t],
	7: [t,t,t,f,f,t,f,f,t,f,f,t,f,f,t],
	8: [t,t,t,t,f,t,t,t,t,t,f,t,t,t,t],
	9: [t,t,t,t,f,t,t,t,t,f,f,t,t,t,t]
}

const createClock = () => {
	let hTens = create('div');
	hTens.setAttribute('id','hTens');

	let hOnes = create('div');
	hOnes.setAttribute('id','hOnes');

	let mTens = create('div');
	mTens.setAttribute('id','mTens');

	let mOnes = create('div');
	mOnes.setAttribute('id','mOnes');

	let sTens = create('div');
	sTens.setAttribute('id','sTens');

	let sOnes = create('div');
	sOnes.setAttribute('id','sOnes');

	let places = [hTens,hOnes,mTens,mOnes,sTens,sOnes];
	let squares = [
					'one','two','three','four','five',
					'six','seven','eight','nine','ten',
					'eleven','twelve','thirteen','fourteen','fifteen'
	];
	places.map((p) => p.setAttribute('class','number-container'));
	places.map((p) => squares.map((num) => { p.appendChild(createAndSet('div','class',`${num} square`)) }));

	places.splice(2,0,createAndSet('div','class','colon'));
	places[2].appendChild(createAndSet('div','class','square on top'));
	places[2].appendChild(createAndSet('div','class','square on bottom'));

	places.splice(5,0,createAndSet('div','class','colon'));
	places[5].appendChild(createAndSet('div','class','square on top'));
	places[5].appendChild(createAndSet('div','class','square on bottom'));

	return places;
}

const getTime = () => {
	let date = new Date();
	let minutes = date.getMinutes().toString();
	let hours = (date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours()).toString();
	let seconds = date.getSeconds().toString();

	hours = hours.length > 1 ? hours : `0${hours}`;
	minutes = minutes.length > 1 ? minutes : `0${minutes}`;
	seconds = seconds.length > 1 ? seconds : `0${seconds}`;

	return [hours,minutes,seconds];
}

const updateClock = (clock) => {
	let sections = getClass('number-container');
	let s1 = sections[0];
	let s2 = sections[1];
	let colon = getClass('colon')[0];
	let s3 = sections[2];
	let s4 = sections[3];
	let s5 = sections[4];
	let s6 = sections[5];
	let time = getTime();

	sections = [{number: time[0][0], contents: s1},
				{number: time[0][1], contents: s2},
				{symbol: colon},
				{number: time[1][0], contents: s3},
				{number: time[1][1], contents: s4},
				{symbol: colon},
				{number: time[2][0], contents: s5},
				{number: time[2][1], contents: s6}];

	for (let i = 0; i < sections.length; i++) {
		if (sections[i].symbol) {
			continue;
		}
		let numArr = numbers[sections[i].number];
		for (let j = 0; j < sections[i].contents.children.length; j++) {
			if (numArr[j]) {
				if (sections[i].contents.children[j].classList.contains('on')) {
					continue;
				} else {
					sections[i].contents.children[j].classList.add('on');
				}
			} else {
				sections[i].contents.children[j].classList.remove('on');
			}
		}
	}

	// console.log(`${sections[0].number}${sections[1].number} ${sections[2].number}${sections[3].number} ${sections[4].number}${sections[5].number}`);

}

const Clock = () => {
	let c = get('clock');
	createClock().map((el) => c.appendChild(el));

	console.log('Clock Completed')
	return c;
}

const startClock = (clock) => {
	setStyles();
	console.log('Styles Created!');
	setInterval(() => {
		updateClock(clock);
	},10);
}

const setStyles = () => {
	let styles = createAndSet('link', 'rel', 'stylesheet');
	styles.setAttribute('href','https://derthon.github.io/clock/styles.css');
	styles.setAttribute('type','text/css');
	document.head.appendChild(styles);
}