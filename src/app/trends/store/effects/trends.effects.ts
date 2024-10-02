import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendsDetailPageActions from '../actions/trends-detail-page.actions';
import * as TrendSideFormActions from '../actions/trend-side-form.actions';
import { TrendService } from '../../trend.service';
import { TrendSideFormService } from '../../trend-side-form/trend-side-form.service';
import { ToastsService } from 'src/app/toasts/toasts.service';
import { ToastType } from 'src/app/toasts/models/toast.model';

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsDetailPageActions.deleteTrend),
      switchMap(({ id }) => {
        return this.trendService.delete(id).pipe(
          map(() => {
            this.router.navigate(['/trends']);
            this.toastsService.show(
              'Exito',
              'Se ha borrado la noticia',
              6,
              ToastType.Success
            );
            return TrendsApiActions.deleteTrendSuccess();
          }),
          catchError(() => {
            this.toastsService.show(
              'Error',
              'No se ha podido borrar la noticia',
              6,
              ToastType.Error
            );
            return of(TrendsApiActions.deleteTrendError());
          })
        );
      })
    );
  });

  createOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendSideFormActions.createTrend),
      switchMap(({ trendBody }) => {
        return this.trendService.create(trendBody).pipe(
          map((trend) => {
            this.toastsService.show(
              'Exito',
              'Noticia creada correctamente',
              6,
              ToastType.Success
            );
            this.trendSideFormService.closeTrendSideForm();
            this.router.navigate([`/trends/${trend.id}`]);
            return TrendsApiActions.createTrendSuccess(trend);
          }),
          catchError(() => {
            this.toastsService.show(
              'Error',
              'No se ha podido crear la noticia',
              6,
              ToastType.Error
            );
            return of(TrendsApiActions.createTrendError());
          })
        );
      })
    );
  });

  updateOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendSideFormActions.updateTrend),
      switchMap(({ id, trendBody }) => {
        return this.trendService.update(id, trendBody).pipe(
          map(() => {
            this.toastsService.show(
              'Exito',
              'Noticia actualizada correctamente',
              6,
              ToastType.Success
            );
            this.trendSideFormService.closeTrendSideForm();
            return TrendsApiActions.updateTrendSuccess();
          }),
          catchError(() => {
            this.toastsService.show(
              'Error',
              'No se ha podido actualizar la noticia',
              6,
              ToastType.Error
            );
            return of(TrendsApiActions.updateTrendError);
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private trendService: TrendService,
    private router: Router,
    private trendSideFormService: TrendSideFormService,
    private toastsService: ToastsService
  ) {}
}
