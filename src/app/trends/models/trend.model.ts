import { FormControl } from '@angular/forms';

import { TrendProvider } from './trend-provider.model';

export interface Trend {
  id: string;
  title: string;
  body: string[];
  provider: TrendProvider;
  image: string;
  url: string;
  createdAt: Date;
}

export interface TrendBody {
  title: string;
  body: string;
  url: string;
  provider: string;
  image: string;
}

export type OptionalTrend = Trend | null;

export type TrendForm = {
  title: FormControl<string>;
  body: FormControl<string>;
  url: FormControl<string>;
  provider: FormControl<string>;
};
