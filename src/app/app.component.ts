import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { CustomBreakpointObserver } from './layout';
import { selectIsLoadingState } from './store/selectors';
import { TrendSideFormService } from './trends/trend-side-form/trend-side-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));

  openTrendSideForm() {
    this.trendSideFormService.openTrendSideForm();
  }

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private trendSideFormService: TrendSideFormService
  ) {}
}
