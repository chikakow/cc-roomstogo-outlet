import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {WindowRefService} from './window-ref.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class ScreenService {

  private isBrowser = false;

  largeBreakpoint = 1200;
  mediumBreakpoint = 992;
  smallBreakpoint = 768;
  extraSmallBreakpoint = 576;

  smallScreenHeight: 800;
  screenWidth = 1000;
  screenHeight = 800;
  screenResizeIsLarge: BehaviorSubject<boolean> = new  BehaviorSubject(true);
  screenResizeIsLarge$ = this.screenResizeIsLarge.asObservable();

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private windowRef: WindowRefService) {

    this.isBrowser = isPlatformBrowser(platformId);

    this.recalculate();

    if (this.isBrowser) {
      this.windowRef.nativeWindow.addEventListener('resize', (event) => this.onResize(event));
    }
  }

  private setScreenSize(): void {
    if (this.isBrowser) {
        this.screenWidth = this.windowRef.nativeWindow.innerWidth;
        this.screenHeight = this.windowRef.nativeWindow.innerHeight;
    }
  }

  private recalculate () {
    this.setScreenSize();
    this.screenResizeIsLarge.next(this.isLarge);
  }

  onResize ($event): void {
    this.recalculate();
  }

  // used to detect if vertical menu & mobile layout is needed
  get isLarge(): boolean {
    return this.screenWidth >= this.smallBreakpoint;
  }

  get isScreenExtraLarge(): boolean {
    return this.screenWidth >= this.largeBreakpoint;
  }

  get isScreenLarge(): boolean {
    return this.screenWidth >= this.mediumBreakpoint && this.screenWidth < this.largeBreakpoint;
  }

  get isScreenMediuml(): boolean {
    return this.screenWidth >= this.smallBreakpoint && this.screenWidth < this.mediumBreakpoint;
  }

  get isScreenSmall(): boolean {
    return this.screenWidth >= this.extraSmallBreakpoint && this.screenWidth < this.smallBreakpoint;
  }

  get isScreenExtraSmall(): boolean {
    return this.screenWidth < this.extraSmallBreakpoint;
  }
}
