
document.addEventListener('DOMContentLoaded', () => {


	//*POSITIONING ELEMENTS IN A CIRCLE
	function elementsOnCircle(){
		let num = 10, //number of elenents
			wrap = document.querySelector('.circle-dashed').offsetHeight, //wrapper diameter
			radius = wrap/2,
			elements = document.querySelectorAll('.dish-item'); 
	
	
		for(let i = 0; i < num; i++){
	
			let f = 2/num * i * Math.PI;
			let left = radius + radius * Math.sin(f) + 'px';
			let top = radius + radius * Math.cos(f) + 'px';
	
			elements[i].style.left = left;
			elements[i].style.top = top;
			elements[i].style.transform = 'translate(-50%, -50%)'
		};

	};

	elementsOnCircle();

	function resetCircle(){
		let elements = document.querySelectorAll('.dish-item'),
			num = 10;

		for(let i = 0; i < num; i++){
			elements[i].style.left = '';
			elements[i].style.top = '';
			elements[i].style.transform = '';
		};
	};


	window.addEventListener('resize', ()=> {
		resetCircle();
		elementsOnCircle();
	});

	//*SPINER ROTATING


	//Variables
	let circle = document.querySelector('.circle-dashed'),
		prevBtn = document.querySelector('.prev'),
		nextBtn = document.querySelector('.next'),
		elements = document.querySelectorAll('.dish-item'),
		circleBg = document.querySelector('.circle-bg'),
		mainCircle = document.querySelector('.dish-center'),
		price = document.querySelector('.dish-price'),
		name = document.querySelector('.dish-name'),
		descr = document.querySelector('.dish-descript'),
		btn = document.querySelector('.dish-button'),

		spiner = {
			angle: 0, // current angle
			item: 5,  // active item (to of the circle)
			active: document.querySelector('.active'),
			activeBg: document.querySelector('.active').style.backgroundImage,
		},

		food = {
			chickenSalad: {
				price: '$32',
				color: 'orange',
				name: 'Green Goddess Chicken Salad',
				descr: 'It is a non vegetarian salad which consists of the green goddess dressing mixed with chicken, peppers, olives and celery.',
				btnClass: 'btn-orange',
				navClass: 'nav-orange',
				bgClass: 'bg-orange'

			},
			cucumberSalad: {
				price: '$35',
				color: 'green',
				name: 'Asian Cucumber Salad',
				descr: 'Asian Cucumber Salad Recipe made with crunchy cucumber, onion, rice wine vinegar, and a few secret ingredients!',
				btnClass: 'btn-green',
				navClass: 'nav-green',
				bgClass: 'bg-green'
			}

		};

		mainCircle.style.backgroundImage = spiner.activeBg;//default element on center circle



	//*Changing backgrounds and text

	function changeContent() {

		//Selected element display on center circle
		spiner.activeBg = document.querySelector('.active').style.backgroundImage
		mainCircle.style.backgroundImage = spiner.activeBg;


		//Adding elements to spiner
		spiner.isChickenSalad = document.querySelector('.active').classList.contains('chicken-salad')
		spiner.isCucumberSalad = document.querySelector('.active').classList.contains('cucumber-salad')
		


		switch(true){ //*select active element to change content

			case spiner.isChickenSalad:

				price.textContent = food.chickenSalad.price;
				price.classList.add(food.chickenSalad.color);
				name.textContent = food.chickenSalad.name;
				descr.textContent = food.chickenSalad.descr;
				btn.classList.add(food.chickenSalad.btnClass);
				circleBg.classList.add(food.chickenSalad.bgClass);
				prevBtn.classList.add(food.chickenSalad.navClass);
				nextBtn.classList.add(food.chickenSalad.navClass);
				break;

			case spiner.isCucumberSalad:

				price.textContent = food.cucumberSalad.price;
				price.classList.add(food.cucumberSalad.color);
				name.textContent = food.cucumberSalad.name;
				descr.textContent = food.cucumberSalad.descr;
				btn.classList.add(food.cucumberSalad.btnClass);	
				circleBg.classList.add(food.cucumberSalad.bgClass);
				prevBtn.classList.add(food.cucumberSalad.navClass);
				nextBtn.classList.add(food.cucumberSalad.navClass);
				break;
		};



	};


	function clearClass(){

		price.classList.remove('orange', 'green');
		btn.classList.remove('btn-orange', 'btn-green');
		prevBtn.classList.remove('nav-orange', 'nav-green');
		nextBtn.classList.remove('nav-orange', 'nav-green');
		circleBg.classList.remove('bg-orange', 'bg-green');
		

	}


	//* Previous Button

	prevBtn.addEventListener('click', ()=> {
		spiner.angle -= 36 //- angle of one element
		circle.style.transform = `rotate(${spiner.angle}deg)` 
		elements[spiner.item].classList.remove('active');

		//Loop left
		if(spiner.item > 0){ 
			spiner.item -= 1
		}else{
			spiner.item = elements.length - 1
		};

		mainCircle.classList.remove('animate-plate');
		mainCircle.classList.add('animate-plate');
		mainCircle.onanimationend = ()=> {mainCircle.classList.remove('animate-plate')};

		elements[spiner.item].classList.add('active');

		clearClass();

		changeContent();

	});


	//* Next Button

	nextBtn.addEventListener('click', ()=> {
		spiner.angle += 36 // + angle of one element
		circle.style.transform = `rotate(${spiner.angle}deg)`
		elements[spiner.item].classList.remove('active');

		// Loop right
		if(spiner.item < (elements.length-1)){
			spiner.item += 1
		}else{
			spiner.item = 0
		};

		mainCircle.classList.remove('animate-plate');
		mainCircle.classList.add('animate-plate');
		mainCircle.onanimationend = ()=> {mainCircle.classList.remove('animate-plate')};

		elements[spiner.item].classList.add('active');

		clearClass();

		changeContent();

	});
 

})
