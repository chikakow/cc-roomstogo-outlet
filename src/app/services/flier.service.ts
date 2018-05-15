import { Injectable } from '@angular/core';
import * as Fliers from 'assets/json/flier.json';
import * as CityFliers from 'assets/json/city-filer.json';
import {FlierDto, FlierContentDto, CityFlier} from '../models/dtos/flier.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';



@Injectable()
export class FlierService {
  fliers: any = Fliers;
  cityFliers: any = CityFliers;

  constructor() { }

  private findCityFlierContent(routerUrl: string, city: string): FlierContentDto {
    const cityFlier = this.cityFliers.find((c: CityFlier) => {
      return c.city.toLowerCase().trim() === city.toLowerCase().trim();
    });

    if (!cityFlier) {
      return null;
    }

    if (routerUrl.indexOf('weekly') > -1) {
      return <FlierContentDto>cityFlier.contentWeekly;
    } else {
      return <FlierContentDto>cityFlier.contentMattress;
    }
  }

  getFlier(routerUrl: string, city: string): Observable<FlierContentDto> {

    const cityFlierContent = this.findCityFlierContent(routerUrl, city);

    if (cityFlierContent) {
      return Observable.of(<FlierContentDto>cityFlierContent);
    }

    const flier = this.fliers.find((f: FlierDto) => {
      return f.routerUrl === routerUrl.substring(1);
    });

    return Observable.of(<FlierContentDto>flier.content);
  }

  getWeeklyFlierByRegion(region: string, city: string): Observable<FlierContentDto>  {

    const cityFlierContent = this.findCityFlierContent('weekly', city);

    if (cityFlierContent) {
      return Observable.of(<FlierContentDto>cityFlierContent);
    }

    const routeBase = 'weekly/';

    const flier = this.fliers.find((f: FlierDto) => {
      return f.routerUrl === routeBase + region.toLowerCase();
    });

    if (!flier) {
      console.error(`could not find flier for region ${region} and city ${city}`);
      return Observable.of(null);
    }

    return Observable.of(<FlierContentDto>flier.content);
  }
}
