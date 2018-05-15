export class GoogleMapLatLngDto {
  formatted_address: string; // "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
  geometry: GoogleMapGeometryDto;
}

export class GoogleMapGeometryDto {
  location: GoogleMapLocationDto;
  viewport: GoogleMapViewPortDto;
}


export class GoogleMapLocationDto {
  lat: number;
  lng: number;
}


export class GoogleMapViewPortDto {
  northeast: GoogleMapLocationDto;
  southwest: GoogleMapLocationDto;
}
