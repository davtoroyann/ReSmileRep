// ===================================================================================================
// Code to determine whether the user has logged in via phone or PC, and what operating system the user is using
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};
// ===================================================================================================
// body _touch and _pc

if (isMobile.any()) {
    document.body.classList.add('_touch');
    // ------------------------------------------
    // Submenu active in touch screen devices
    let menuArrows = document.querySelectorAll('.nav-header__item-arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', (e) => {
                menuArrow.parentElement.classList.toggle('nav-header__item-active');
            })
        }
    }
    // ------------------------------------------

} else {
    document.body.classList.add('_pc');
}

// ===================================================================================================

// Slider
/* - Slider Elements - */
let slider = document.querySelector('.container-slider__list');
let slides = document.querySelectorAll('.container-slider__content');
let paginationMain = document.querySelector('.container-slider__pagination');
let currentSlideIndex = 0;
let paginationCircles = [];
let sliderWidth;

/* Function to set slider width */
function setSliderWidth() {
    sliderWidth = slider.clientWidth;
    showSlide();
}

/* - Slider Pagination - */
function createPaginationCircles() {
    let div = document.createElement('div');
    div.className = 'container-slider__pagination-item';
    paginationMain.appendChild(div);
    paginationCircles.push(div);
}
function addPagination() {
    slides.forEach(createPaginationCircles);
    paginationCircles[0].classList.add('active');
    paginationCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => changeSlide(index));
    })
}
/* - Slider Active Class - */
function addActiveClass() {
    paginationCircles[currentSlideIndex].classList.add('active');
}
function removeActiveClass() {
    paginationCircles[currentSlideIndex].classList.remove('active');
}
/* - Slider Show Slide - */
function showSlide() {
    slider.style.transform = `translateX(-${currentSlideIndex * sliderWidth}px)`;
}
/* - Slider Change - */
function changeSlide(slideIndex) {
    removeActiveClass();
    currentSlideIndex = slideIndex;
    addActiveClass();
    showSlide();
}
/* - Slider Next - */
function nextSlide() {
    let newSlideIndex = currentSlideIndex + 1;
    if(newSlideIndex > slides.length - 1) {
        newSlideIndex = 0;
    }
    changeSlide(newSlideIndex);
}
/* - Slider Previous - */
function previousSlide() {
    let newSlideIndex = currentSlideIndex - 1;
    if(newSlideIndex < 0) {
        newSlideIndex = slides.length - 1;
    }
    changeSlide(newSlideIndex);
}

// Add event listener to window resize
window.addEventListener('resize', setSliderWidth);
/* - Slider Function Activation - */
addPagination();
setSliderWidth();
// ===================================================================================================

// ===================================================================================================
// Choices Menu
let choiceSelects = document.querySelectorAll('.container-signup__menu');
choiceSelects.forEach(choiceSelect => {
    new Choices(choiceSelect, {
        searchEnabled: false,
        itemSelectText: ''
    });
});
// ===================================================================================================

// ===================================================================================================
// Calendar in Sign up section
let datepicker = new Datepicker('#datepicker');
// ===================================================================================================

// ===================================================================================================
// Tabs for Doctors section
let tabs = document.querySelectorAll('.tabs-doctors__item');
let contents = document.querySelectorAll('.content-doctors');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab=>{tab.classList.remove('tab-on')});
        tab.classList.add('tab-on');
        contents.forEach(content=>{content.classList.remove('content-on')});
        contents[index].classList.add('content-on');
    })
})

// Subtabs for Doctors section
let subtabs = document.querySelectorAll('.item-subtab');
let subtabsContents = document.querySelectorAll('.subtab-doctors__content');
let subtabsName = document.querySelectorAll('.item-subtab__name');
let subtabsAbout = document.querySelectorAll('.item-subtab__about');

subtabs.forEach((subtab, index) =>{
    subtab.addEventListener('click', ()=>{
        subtabs.forEach(subtab=>{subtab.classList.remove('subtab-on')});
        subtab.classList.add('subtab-on');
        subtabsContents.forEach(subtabcontent=>(subtabcontent.classList.remove('subtabcontent-on')));
        subtabsContents[index].classList.add('subtabcontent-on');
        subtabsName.forEach(subtabName=>(subtabName.classList.remove('white-on')));
        subtabsName[index].classList.add('white-on');
        subtabsAbout.forEach(subtabAbout=>(subtabAbout.classList.remove('white-on')));
        subtabsAbout[index].classList.add('white-on');

        
    })
})

// ===================================================================================================

// ===================================================================================================
// Subtabs Arrows 
document.addEventListener('DOMContentLoaded', () => {
    function hiddenTabs(container) {
        const tabs = container.querySelectorAll('.item-subtab');
        tabs.forEach((tab, index) => {
            if (index >= 4) {
                tab.classList.add('item-subtab__hidden');
            }
        });
    }

    function toggleTabs(event) {
        const arrow = event.target;
        const container = arrow.closest('.subtab-doctors');
        if (!container) return;
        const hiddenTabs = container.querySelectorAll('.item-subtab.item-subtab__hidden');
        if (hiddenTabs.length > 0) {
            hiddenTabs.forEach(tab => {
                tab.classList.remove('item-subtab__hidden');
            });
        } else {
            const tabs = container.querySelectorAll('.item-subtab');
            tabs.forEach((tab, index) => {
                if (index >= 4) {
                    tab.classList.add('item-subtab__hidden');
                }
            });
        }
        arrow.classList.toggle('arrow-open');
    }

    const subtabContainers = document.querySelectorAll('.subtab-doctors');
    const arrowsOpen = document.querySelectorAll('.arrow__icon');
    subtabContainers.forEach(subtabContainer => {
        hiddenTabs(subtabContainer);
        arrowsOpen.forEach(arrowOpen => {
            arrowOpen.addEventListener('click', toggleTabs);
        })
    });
    
});


// ===================================================================================================

// ===================================================================================================
// Section License
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.slider-license__wrapper');
    const slideLicenseItems = Array.from(document.querySelectorAll('.slider-license__slide'));
    const licenseArrowPrev = document.querySelector('.slider-license__arrow-left');
    const licenseArrowNext = document.querySelector('.slider-license__arrow-right');
    let currentLicIndex = 0;

    function updateTranslateValues() {
        let containerWidth = slidesContainer.clientWidth;
        let translateValue;
        if (containerWidth <= 970) {
            translateValue = containerWidth * 0.22; 
        } else {
            translateValue = containerWidth * 0.29; 
        }
    
        slidesContainer.style.setProperty('--translate-prev', `-${translateValue}px`);
        slidesContainer.style.setProperty('--translate-next', `${translateValue}px`);
        }

    function updateSlides() {
        slideLicenseItems.forEach((slide, index) => {
            slide.classList.remove('slider-license__slide-active', 'slider-license__slide-next', 'slider-license__slide-prev');
            slide.style.zIndex = '';
            slide.style.transform = '';
            if (index === currentLicIndex) {
                slide.classList.add('slider-license__slide-active');
                slide.style.zIndex = '1';
            } else if (index === (currentLicIndex - 1 + slideLicenseItems.length) % slideLicenseItems.length) {
                slide.classList.add('slider-license__slide-prev');
                slide.style.zIndex = '-1';
            } else if (index === (currentLicIndex + 1) % slideLicenseItems.length) {
                slide.classList.add('slider-license__slide-next');
                slide.style.zIndex = '-1';
        }
    });
    }

    function goToSlide(index) {
        currentLicIndex = (index + slideLicenseItems.length) % slideLicenseItems.length;
        updateSlides();
    }

    licenseArrowPrev.addEventListener('click', () => {
        goToSlide(currentLicIndex - 1);
    });

    licenseArrowNext.addEventListener('click', () => {
        goToSlide(currentLicIndex + 1);
    });

    window.addEventListener('resize', updateTranslateValues);

    updateTranslateValues();
    updateSlides();
    });
// ===================================================================================================

// ===================================================================================================
// Tabs for Smile section
let tabsSmiles = document.querySelectorAll('.tabs-smile__item');
let contentsSmiles = document.querySelectorAll('.tabs-smile__content');

tabsSmiles.forEach((tabSmile, index) => {
    tabSmile.addEventListener('click', ()=>{
        tabsSmiles.forEach(tabSmile=>{tabSmile.classList.remove('tabs-smile__item-on')});
        tabSmile.classList.add('tabs-smile__item-on');
        contentsSmiles.forEach(contentSmile=>{contentSmile.classList.remove('tabs-smile__content-on')});
        contentsSmiles[index].classList.add('tabs-smile__content-on');
    })
})
// ===================================================================================================

// ===================================================================================================
//  Before and After in Smile Section
document.addEventListener('DOMContentLoaded', () => {
    const smileItems = document.querySelectorAll('.smile-item');
    
    smileItems.forEach(item => {
        const beforeImage = item.querySelector('.smile-item__before');
        const dragme = item.querySelector('.smile-item__dragme');
        let isDragging = false;
        
        function onMouseMove(event) {
        if (!isDragging) return;
        const rect = item.getBoundingClientRect();
        let x = event.clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        dragme.style.left = `${x}px`;
        beforeImage.style.width = `${x}px`;
        }
        
        function onTouchMove(event) {
        if (!isDragging) return;
        const rect = item.getBoundingClientRect();
        let x = event.touches[0].clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        dragme.style.left = `${x}px`;
        beforeImage.style.width = `${x}px`;
        }
        
        function onMouseDown(event) {
        isDragging = true;
        dragme.classList.add('dragging');
        beforeImage.classList.add('dragging');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        event.preventDefault();
        }
        
        function onTouchStart(event) {
        isDragging = true;
        dragme.classList.add('dragging');
        beforeImage.classList.add('dragging');
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        event.preventDefault();
        }
        
        function onMouseUp() {
        isDragging = false;
        dragme.classList.remove('dragging');
        beforeImage.classList.remove('dragging');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        beforeImage.style.width = '50%';
        beforeImage.classList.add('before-after__trs');
        dragme.style.left = '50%';
        dragme.classList.add('before-after__trs');
        }
        
        function onTouchEnd() {
        isDragging = false;
        dragme.classList.remove('dragging');
        beforeImage.classList.remove('dragging');
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        beforeImage.style.width = '50%';
        beforeImage.classList.add('before-after__trs');
        dragme.style.left = '50%';
        dragme.classList.add('before-after__trs');
        }

        dragme.addEventListener('mousedown', onMouseDown);
        dragme.addEventListener('touchstart', onTouchStart);
        item.addEventListener('mouseleave', onMouseUp);
        item.addEventListener('touchend', onTouchEnd);
    });
    });


// ===================================================================================================

// ===================================================================================================
// Section Review
let revSliderList = document.querySelector('.review-frame__list');
let revSliderItem = document.querySelectorAll('.item-review');
let revPagination = document.querySelector('.review-frame__pagination');
let revArrowPrev = document.querySelector('.review-frame__arrow-left');
let revArrowNext = document.querySelector('.review-frame__arrow-right');
let revCurrentIndex = 0;
let revPaginationCircles = [];
let revSliderListWidth = revSliderList.clientWidth;

// Set Review Section size at any medias
function revSliderResize() {
    revSliderListWidth = revSliderList.clientWidth;
    revShowSlide()
}
// Section Review Pagination
function createRevPaginations() {
    let div = document.createElement('div');
    div.className = 'review-frame__pagination-item';
    revPagination.appendChild(div);
    revPaginationCircles.push(div);
}
function addRevPaginations() {
    revSliderItem.forEach(createRevPaginations);
    revPaginationCircles[0].classList.add('review-active');
    revPaginationCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => revChangeSlide(index));
    })
}
// Section Review Slider Active Class
function addRevActiveClass() {
    revPaginationCircles[revCurrentIndex].classList.add('review-active');
}
function removeRevActiveClass() {
    revPaginationCircles[revCurrentIndex].classList.remove('review-active');
}
// Section Review Show Slide
function revShowSlide() {
    revSliderList.style.transform = `translateX(-${revCurrentIndex * revSliderListWidth}px)`;
}
// Section Review Change Slide
function revChangeSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < revPaginationCircles.length) {
        removeRevActiveClass();
        revCurrentIndex = slideIndex;
        addRevActiveClass();
        revShowSlide();
    }
}
// Section Review Next Slide
function revNextSlide() {
    let newSlideIndex = revCurrentIndex + 1;
    if (newSlideIndex >= revPaginationCircles.length) {
        newSlideIndex = 0;
    }
    revChangeSlide(newSlideIndex);
}
// Section Review Previous Slide
function revPreviousSlide() {
    let newSlideIndex = revCurrentIndex - 1;
    if (newSlideIndex < 0) {
        newSlideIndex = revPaginationCircles.length - 1;
    }
    revChangeSlide(newSlideIndex);
}
// Add event listener to window resize
window.addEventListener('resize', revSliderResize);
// Pagination click event listeners
addRevPaginations();
revArrowPrev.addEventListener('click', revPreviousSlide);
revArrowNext.addEventListener('click', revNextSlide);
// ===================================================================================================

// ===================================================================================================
// Section Clinic 
document.addEventListener('DOMContentLoaded', () => {
    const clinicContainer = document.querySelector('.slider-clinic__wrapper');
    const clinicItems = Array.from(document.querySelectorAll('.slider-clinic__item'));
    const clinicArrowPrev = document.querySelector('.slider-clinic__arrow-left');
    const clinicArrowNext = document.querySelector('.slider-clinic__arrow-right');
    let currentclinicIndex = 0;

    function updateClinicTranslateValues() {
        let containerWidth = clinicContainer.clientWidth;
        let translateValue;
        if (containerWidth <= 1130) {
            translateValue = containerWidth * 0.21; 
            if(containerWidth <= 900) {
                translateValue = containerWidth * 0.16; 
            }
        } else {
            translateValue = containerWidth * 0.272; 
        }
    
        clinicContainer.style.setProperty('--translate-prev', `-${translateValue}px`);
        clinicContainer.style.setProperty('--translate-next', `${translateValue}px`);
        }

    function updateClinicSlides() {
        clinicItems.forEach((slide, index) => {
            slide.classList.remove('slider-clinic__item-active', 'slider-clinic__item-next', 'slider-clinic__item-prev');
            slide.style.zIndex = '';
            slide.style.transform = '';
            if (index === currentclinicIndex) {
                slide.classList.add('slider-clinic__item-active');
                slide.style.zIndex = '1';
            } else if (index === (currentclinicIndex - 1 + clinicItems.length) % clinicItems.length) {
                slide.classList.add('slider-clinic__item-prev');
                slide.style.zIndex = '-1';
            } else if (index === (currentclinicIndex + 1) % clinicItems.length) {
                slide.classList.add('slider-clinic__item-next');
                slide.style.zIndex = '-1';
        }
    });
    }

    function goToSlide(index) {
        currentclinicIndex = (index + clinicItems.length) % clinicItems.length;
        updateClinicSlides();
    }

    clinicArrowPrev.addEventListener('click', () => {
        goToSlide(currentclinicIndex - 1);
    });

    clinicArrowNext.addEventListener('click', () => {
        goToSlide(currentclinicIndex + 1);
    });

    window.addEventListener('resize', updateClinicTranslateValues);

    updateClinicTranslateValues();
    updateClinicSlides();
    });
// ===================================================================================================
// ===================================================================================================
// Section Questions
let questionsItem = document.querySelectorAll('.item-questions');
let questionsText = document.querySelectorAll('.item-questions__text');
let questionArrow = document.querySelectorAll('.item-questions__arrow-image');
let questionsBody = document.querySelector('.questions-body');

questionsItem.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (questionsText[index].style.maxHeight) {
            questionsItem[index].style.background = `unset`;
            questionsItem[index].style.boxShadow = `unset`;
            questionsItem[index].style.borderRadius = `unset`;
            questionsText[index].style.maxHeight = null;
            questionArrow[index].classList.remove('questionarrow-active');
        } else {
            questionsItem.forEach(questionsItems => {
                questionsItems.style.background = `unset`;
                questionsItems.style.boxShadow = `unset`;
                questionsItems.style.borderRadius = `unset`;
            })
            questionsText.forEach(text => {text.style.maxHeight = null});
            questionArrow.forEach(arrow => {arrow.classList.remove('questionarrow-active')});
            questionsItem[index].style.background = `#fffff`;
            questionsItem[index].style.boxShadow = `7px 9px 34px rgba(70, 104, 157, 0.08)`;
            questionsItem[index].style.borderRadius = `20px`;
            questionsText[index].style.maxHeight = `${questionsText[index].scrollHeight}px`;
            questionArrow[index].classList.add('questionarrow-active');
        }
        if(questionsItem[0].style.borderRadius = `20px`) {
            questionsBody.style.borderRadius = `20px`;
        }
    });
});
// ===================================================================================================

// ===================================================================================================
// Scrolling by click for header navigation menu
let menuLinks = document.querySelectorAll('.nav-header__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if(menuIcon.classList.contains('__cross')) {
                document.body.classList.remove('__lock');
                menuIcon.classList.remove('__cross');
                menuBody.classList.remove('__left');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}
// ===================================================================================================

// ===================================================================================================
// Change header background color by scrolling
window.addEventListener('scroll', () => {
    let headerScrollWhite = document.querySelector('.header');
    const headerScrollWhiteValue = window.pageYOffset;
    if(headerScrollWhiteValue > 0) {
        headerScrollWhite.classList.add('header-white');
    } else {
        headerScrollWhite.classList.remove('header-white');
    }
});
// ===================================================================================================

// ===================================================================================================
// Burger Menu
const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.nav-header');
if(menuIcon) {
    menuIcon.addEventListener('click', (e)=> {
        document.body.classList.toggle('__lock');
        menuIcon.classList.toggle('__cross');
        menuBody.classList.toggle('__left');
    })
}
// ===================================================================================================

// ===================================================================================================
// Modal menu for imgs
document.addEventListener("DOMContentLoaded", function() {
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("modalImg");
    let modalCaptionText = document.getElementById("caption");
    let zoomableImages = document.querySelectorAll("#zoomImage");

    zoomableImages.forEach(function(image) {
      image.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalCaptionText.innerHTML = this.alt;
      });
    });
  
    let modalClose = document.getElementsByClassName("close")[0];
    modalClose.onclick = function() {
      modal.style.display = "none";
    };
  });
// ===================================================================================================
