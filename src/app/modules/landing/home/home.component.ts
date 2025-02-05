import { ChangeDetectorRef, Component, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
    Zoom,
    Autoplay,
    Thumbs,
    Controller,
} from 'swiper';
import { BehaviorSubject } from 'rxjs';
import { FuseCardComponent } from '@fuse/components/card';

SwiperCore.use([
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Virtual,
    Zoom,
    Autoplay,
    Thumbs,
    Controller
]);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls  : ['./home.component.scss'],
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, SwiperModule, FuseCardComponent],
})
export class LandingHomeComponent {
    @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

    show: boolean;
    thumbs: any;
    slides$ = new BehaviorSubject<string[]>(['']);
    constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) { }
    ngOnInit() { }

    getSlides() {
        this.slides$.next(Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`));
    }

    thumbsSwiper: any;
    setThumbsSwiper(swiper) {
        this.thumbsSwiper = swiper;
    }
    controlledSwiper: any;
    setControlledSwiper(swiper) {
        this.controlledSwiper = swiper;
    }

    indexNumber = 1;
    exampleConfig = { slidesPerView: 3 };
    slidesPerView: number = 4;
    pagination: any = false;

    slides2 = ['slide 1', 'slide 2', 'slide 3'];
    replaceSlides() {
        this.slides2 = ['foo', 'bar'];
    }

    togglePagination() {
        if (!this.pagination) {
            this.pagination = { type: 'fraction' };
        } else {
            this.pagination = false;
        }
    }

    navigation = false;
    toggleNavigation() {
        this.navigation = !this.navigation;
    }

    scrollbar: any = false;
    toggleScrollbar() {
        if (!this.scrollbar) {
            this.scrollbar = { draggable: true };
        } else {
            this.scrollbar = false;
        }
    }
    breakpoints = {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 4, spaceBetween: 40 },
        1024: { slidesPerView: 4, spaceBetween: 50 },
    };

    slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
    virtualSlides = Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`);

    log(log: string) {
        // console.log(string);
    }

    breakPointsToggle: boolean;
    breakpointChange() {
        this.breakPointsToggle = !this.breakPointsToggle;
        this.breakpoints = {
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 },
        };
    }

    slidesEx = ['first', 'second'];

    onSlideChange(swiper: any) {
        if (swiper.isEnd) {
            // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
            this.ngZone.run(() => {
                this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
            });
            console.log(this.slidesEx);
        }
    }
}

