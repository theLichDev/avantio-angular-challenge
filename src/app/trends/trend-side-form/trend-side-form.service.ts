import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { OptionalTrend } from '../models/trend.model';

@Injectable()
export class TrendSideFormService {
  isOpenSubject = new BehaviorSubject<boolean>(false);
  trendToEditSubject = new BehaviorSubject<OptionalTrend>(null);

  openTrendSideForm(trendToEdit: OptionalTrend = null) {
    this.isOpenSubject.next(true);
    this.trendToEditSubject.next(trendToEdit);
  }

  closeTrendSideForm() {
    this.isOpenSubject.next(false);
    this.trendToEditSubject.next(null);
  }
}
