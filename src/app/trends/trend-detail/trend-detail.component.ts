import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectSelectedTrend } from '../store/selectors';
import { deleteTrend } from '../store/actions/trends-detail-page.actions';
import { TrendSideFormService } from '../trend-side-form/trend-side-form.service';
import { OptionalTrend } from '../models/trend.model';

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent implements OnInit, AfterViewInit {
  protected trend$ = this.store.select(selectSelectedTrend);
  trend: OptionalTrend;

  private subscription: Subscription = new Subscription();

  @ViewChild('deleteTrendDialog')
  deleteTrendDialog: ElementRef<HTMLDialogElement> | undefined;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private trendSideFormService: TrendSideFormService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.trend$.subscribe((trend) => {
        this.trend = trend;
      })
    );
  }

  ngAfterViewInit() {
    this.deleteTrendDialog?.nativeElement.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openTrendSideForm() {
    this.trendSideFormService.openTrendSideForm(this.trend);
  }

  openDialog(): void {
    this.deleteTrendDialog?.nativeElement.showModal();
  }

  cancelDialog(): void {
    this.deleteTrendDialog?.nativeElement.close();
  }

  acceptDialog(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(deleteTrend({ id }));
    this.deleteTrendDialog?.nativeElement.close();
  }
}
