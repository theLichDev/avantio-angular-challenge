import { createAction, props } from '@ngrx/store';
import { TrendBody } from '../../models/trend.model';

export const createTrend = createAction(
  '[Trend Side Form] Create Trend',
  props<{ trendBody: TrendBody }>()
);

export const updateTrend = createAction(
  '[Trend Side Form] Update Trend',
  props<{ id: string; trendBody: TrendBody }>()
);
