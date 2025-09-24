window.HELP_IMPROVE_VIDEOJS = false;

class AudioCarousel {
    constructor(element) {
        this.carousel = element;
        this.container = element.querySelector('.audio-carousel-container');
        this.items = element.querySelectorAll('.audio-carousel-item');
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        
        this.createNavigation();
        this.createPagination();
        this.updateCarousel();
    }
    
    createNavigation() {
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav prev';
        prevBtn.innerHTML = '‹';
        prevBtn.addEventListener('click', () => this.prev());
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav next';
        nextBtn.innerHTML = '›';
        nextBtn.addEventListener('click', () => this.next());
        
        this.carousel.appendChild(prevBtn);
        this.carousel.appendChild(nextBtn);
    }
    
    createPagination() {
        const pagination = document.createElement('div');
        pagination.className = 'carousel-pagination';
        
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i));
            pagination.appendChild(dot);
        }
        
        this.carousel.appendChild(pagination);
        this.pagination = pagination;
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * 100;
        this.container.style.transform = `translateX(${translateX}%)`;
        
        // Update pagination
        const dots = this.pagination.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }
    
    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
}

$(document).ready(function() {
    // Initialize custom audio carousels
    const carousels = document.querySelectorAll('.audio-carousel');
    carousels.forEach(carousel => {
        new AudioCarousel(carousel);
    });
    
    // Remove bulma carousel initialization completely
    // bulmaSlider.attach(); // Keep this only if you use sliders elsewhere
});
