export interface Hero {
  name: string;
  heroid: string;
  key: string;
}

export interface HeroApiResponse {
  status: boolean;
  data: Hero[];
}
