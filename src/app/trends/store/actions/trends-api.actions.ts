import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const deleteTrendSuccess = createAction(
  '[Trends/API] Delete Trend Success'
);

export const deleteTrendError = createAction('[Trends/API] Delete Trend Error');
