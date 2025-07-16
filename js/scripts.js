window.addEventListener('load', function() {


	//loaded
	setTimeout(function() {
		document.body.classList.add('loaded');
	}, 1000);


	//more section
	let sectionMoreBoxes = document.querySelectorAll('.section-more-box');

	sectionMoreBoxes.forEach(section => {
		let boxInnerWrap = section.querySelector('.box-inner-wrap');
		let innerWrap = section.querySelector('.inner-wrap');

		if (boxInnerWrap && innerWrap) { 
			let boxInnerWrapOffset = boxInnerWrap.offsetTop;
			innerWrap.style.paddingTop = boxInnerWrapOffset + 'px';
		}
	});
	document.querySelectorAll('.js-btn-more').forEach(button => {
		button.addEventListener('click', function(event) {
			this.classList.toggle('active');
			event.preventDefault();

			const sectionMore = this.closest('.section-main-box');
			const isActive = sectionMore.classList.toggle('active-more');
			console.log(isActive)
			if (isActive) {
				window.scrollTo({
					top: sectionMore.offsetTop + window.scrollY + 100,
					behavior: 'smooth'
				});
			} else {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}
		});
	});


	//active section
	const scrollContainer = document.getElementById('wrap-scroll');
	const sections = document.querySelectorAll('.section-main-box');
	function getVisibleSection() {
		let visibleSection = null;
		sections.forEach(section => {
			const rect = section.getBoundingClientRect();
			section.classList.remove('active');
			if (rect.top >= 0 && rect.top < window.innerHeight) {
				visibleSection = section;
				section.classList.add('active');
			}
		});

		return visibleSection;
	}
	scrollContainer.addEventListener('scroll', () => {
		const currentSection = getVisibleSection();
		if (currentSection) {
			currentSection.classList.add('active')
		}
	});


	
	
	
	

	//parallax
	scrollContainer.addEventListener('scroll', function() {
		const scrolled = window.scrollY;

		const parallaxElements = document.querySelectorAll('.js-parallax');

		parallaxElements.forEach(element => {
			const offset = element.getBoundingClientRect().top;
			const speed = 0.5; 
			const translateY = (scrolled - offset) * speed;

			element.style.transform = `translateY(${translateY}px)`;
		});
	});


	// items animate and schema
	function isElementInViewport(el) {
		let rect = el.getBoundingClientRect();
		return (rect.top <= window.innerHeight);
	}
	scrollContainer.addEventListener('scroll', function() {
		let items = document.querySelectorAll('.item-animation');
		let sectionSchema = document.querySelector('.ani-line');
		let windowHeight = window.innerHeight + window.pageYOffset;
		
		items.forEach(function(item) {
			if (isElementInViewport(item) && item.offsetTop < windowHeight) {
				item.classList.add('item-active');
			}
		});
		if (isElementInViewport(sectionSchema) && sectionSchema.offsetTop < windowHeight) {
			sectionSchema.classList.add('active');
		}
	});




	



});


document.addEventListener("DOMContentLoaded", function() {


	

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//select style
	document.querySelectorAll('select').forEach(function(select) {
		new Choices(select);
	});

	//button scroll 
	document.querySelectorAll('.js-anchor').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let row = this.closest('.row');
			row.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
				btn.classList.remove('active');
			});
			row.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
				btn.classList.remove('active');
			});
			this.classList.add('active');
			return false;
		});
	});
	

	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (!element.closest('.no-close')) {
				element.classList.remove('active')
			}
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//slider main
	const swiperSliderMain = new Swiper('.slider-main .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		parallax: true,
		pagination: {
			el: '.slider-main-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		navigation: false,
	
	});
	function updateSlideCount() {
		const currentIndex = swiperSliderMain.realIndex + 1;
		const totalSlides = swiperSliderMain.slides.length;
		const formattedCurrent = String(currentIndex).padStart(2, '0');
		const formattedTotal = String(totalSlides).padStart(2, '0');
		document.querySelector('.footer-slider-count').textContent = `${formattedCurrent} | ${formattedTotal}`;
	}
	if (swiperSliderMain && document.querySelector('.footer-slider-count')) {
		updateSlideCount();
		swiperSliderMain.on('slideChange', updateSlideCount);
	}


	//slider inner
	const swiperSliderInner = new Swiper('.slider-inner .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: {
			el: '.slider-inner-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		navigation: false,
	});

	//slider inner photos
	const swiperSliderInnerPhotos = new Swiper('.slider-inner-photos .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		parallax: true,
		speed: 800,
		pagination: {
			el: '.slider-inner-photos-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: false,
	});

	//slider inner info
	const swiperSliderInnerInfo = new Swiper('.slider-inner-info .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		pagination: false,
		mousewheel: true,
		autoplay: false,
		navigation: false,
		breakpoints: {
			768: {
				direction: 'vertical',
			},
		},
	});
	// sync
	swiperSliderInnerInfo.on('slideChange', function () {
		swiperSliderInnerPhotos.slideTo(swiperSliderInnerInfo.activeIndex);
	});
	swiperSliderInnerPhotos.on('slideChange', function () {
		swiperSliderInnerInfo.slideTo(swiperSliderInnerPhotos.activeIndex);
	});
	// mouse wheel off on last slide
	swiperSliderInnerInfo.on('slideChange', function () {
		if (swiperSliderInnerInfo.isEnd) {
			swiperSliderInnerInfo.mousewheel.disable();
		} else {
			swiperSliderInnerInfo.mousewheel.enable();
		}
	});

	// slider photos
	const slidersPhotos = document.querySelectorAll('.section-tiles');

	slidersPhotos.forEach(sliderOne => {
		const swiperSliderPhotos = new Swiper(sliderOne.querySelector('.swiper'), {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: '.btn-action-ico.ico-arrow-main.ico-arrow-next.button-slider-photos-next',
				prevEl: '.btn-action-ico.ico-arrow-main.ico-arrow-prev.button-slider-photos-prev',
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
			},
		});

		function updateSlideCountPhotos() {
			const currentIndex = swiperSliderPhotos.realIndex + 1;
			const totalSlides = swiperSliderPhotos.slides.length;
			const formattedCurrent = String(currentIndex).padStart(2, '0');
			const formattedTotal = String(totalSlides).padStart(2, '0');
			const countElement = sliderOne.querySelector('.photos-slider-count');
			if (countElement) {
				countElement.textContent = `${formattedCurrent} | ${formattedTotal}`;
			}
		}
		const countElement = sliderOne.querySelector('.photos-slider-count');
		if (countElement) {
			updateSlideCountPhotos();
			swiperSliderPhotos.on('slideChange', updateSlideCountPhotos);
		}
	});



	//slider gallery
	const swiperGallery = new Swiper('.slider-gallery .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: {
			el: '.slider-gallery-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: false,
	
	});


	//slider slider-info-slider
	const swiperSliderSliderInfoSlider = new Swiper('.slider-info-slider .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 800,
		parallax: true,
		pagination: {
			el: '.slider-info-slider-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow-main.ico-arrow-next.button-slider-info-slider-next',
			prevEl: '.btn-action-ico.ico-arrow-main.ico-arrow-prev.button-slider-info-slider-prev',
		},
		breakpoints: {
			768: {
				pagination: {
					type: "fraction",
				},
			},
		},
	
	});


	//slider galmain
	const swiperSliderGalMain = new Swiper('.slider-galmain .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		parallax: true,
		speed: 800,
		pagination: {
			el: '.slider-galmain-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow-main.ico-arrow-next.button-slider-galmain-next',
			prevEl: '.btn-action-ico.ico-arrow-main.ico-arrow-prev.button-slider-galmain-prev',
		},
	
	});
	function updateSlideCountGalMain() {
		const currentIndex = swiperSliderGalMain.realIndex + 1;
		const totalSlides = swiperSliderGalMain.slides.length;
		const formattedCurrent = String(currentIndex).padStart(2, '0');
		const formattedTotal = String(totalSlides).padStart(2, '0');
		document.querySelector('.galmain-slider-count').textContent = `${formattedCurrent} | ${formattedTotal}`;
	}
	if (swiperSliderGalMain && document.querySelector('.galmain-slider-count')) {
		updateSlideCountGalMain();
		swiperSliderGalMain.on('slideChange', updateSlideCountGalMain);
	}


	//popup gallery slider
	const slidersPopupGallery = document.querySelectorAll('.photos-slider-box');

	slidersPopupGallery.forEach(slider => {
		const swiperMediaMain = new Swiper(slider.querySelector('.slider-media-main .swiper'), {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: false,
		});
		const previewSlides = slider.querySelectorAll('.slider-media-thumbs .sl-wrap');
		previewSlides.forEach((preview, index) => {
			preview.addEventListener('click', () => {
				swiperMediaMain.slideTo(index);
			});
		});
	});

})




