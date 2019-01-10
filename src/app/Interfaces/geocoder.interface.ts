export interface AddressComponent {
  short_name: string;
  long_name: string;
  postcode_localities: string[];
  types: string[];
}

export interface Geometry {
  location: object;
  location_type: object;
  viewport: object;
  bounds: object;
}

export interface GeocoderInterface {
  results: {
    types: [];
    formatted_address: string;
    address_components: AddressComponent[];
    partial_match: boolean;
    place_id: string;
    postcode_localities: string[];
    geometry: Geometry;
  }[];
}
