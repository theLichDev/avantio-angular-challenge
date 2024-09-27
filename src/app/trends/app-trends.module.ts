import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppTrendsRoutingModule } from './app-trends-routing.module';
import { AuthInterceptor } from './auth-interceptor';
import { TrendDetailComponent } from './trend-detail/trend-detail.component';
import { TrendService } from './trend.service';
import { TrendsListComponent } from './trends-list/trends-list.component';
import { trendsEffects } from './store/effects';
import { trendsFeatureKey, trendsReducer } from './store/reducers';
import { TrendSideFormComponent } from './trend-side-form/trend-side-form.component';
import { TrendSideFormService } from './trend-side-form/trend-side-form.service';

@NgModule({
  declarations: [
    TrendsListComponent,
    TrendDetailComponent,
    TrendSideFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppTrendsRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(trendsFeatureKey, trendsReducer),
    EffectsModule.forFeature(trendsEffects),
  ],
  exports: [TrendsListComponent, TrendSideFormComponent],
  providers: [
    TrendService,
    TrendSideFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppTrendsModule {}
