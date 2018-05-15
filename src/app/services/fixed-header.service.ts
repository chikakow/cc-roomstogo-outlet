import {Inject, Injectable, OnDestroy, PLATFORM_ID, Renderer2} from '@angular/core';
import {ScreenService} from './screen.service';
import {Subscription} from 'rxjs/Subscription';
import {isPlatformBrowser} from '@angular/common';
import {DOCUMENT} from '@angular/common';
import {Renderer2Service} from './renderer2.service';

@Injectable()
export class FixedHeaderService implements OnDestroy {

  private subscription: Subscription;
  isBrowser = false;
  private timeouts: any[] = [];
  private renderer: Renderer2;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
              @Inject(DOCUMENT) private document: any,
              private rendererService: Renderer2Service,
              private screenService: ScreenService) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.renderer = this.rendererService.renderer;
      this.subscription = this.screenService.screenResizeIsLarge$.subscribe(() => {
        this.recalcAndSetHeight();
      });
    }
  }

  private recalcAndSetHeight() {

    this.timeouts.push(setTimeout(() => {

      const header =  this.document.getElementById('mainHeader');
      const headerHeight = header.offsetHeight;
      const bodyElement = this.document.getElementsByTagName('body')[0];
      const menuNavElement = this.document.getElementById('mainNav');

      if (this.screenService.isScreenSmall || this.screenService.isScreenExtraSmall) {

        this.renderer.setStyle(menuNavElement, 'top', headerHeight + 'px');
        this.renderer.setStyle(bodyElement, 'padding-top', headerHeight + 'px');

      } else {

        this.renderer.setStyle(bodyElement, 'padding-top', '0');
      }
    }, 5));
  }

  public setTotalHeight(): void {
    if (this.isBrowser) {
      this.recalcAndSetHeight();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.subscription.unsubscribe();
      this.timeouts.forEach(t => clearTimeout(t));
    }
  }
}
