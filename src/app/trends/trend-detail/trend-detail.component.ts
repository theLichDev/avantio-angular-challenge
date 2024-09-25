import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import { deleteTrend } from '../store/actions/trends-detail-page.actions';

@Component({
  selector: 'app-trend-detail',
  templateUrl: './trend-detail.component.html',
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  @ViewChild('deleteTrendDialog')
  deleteTrendDialog: ElementRef<HTMLDialogElement> | undefined;

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

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.deleteTrendDialog?.nativeElement.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    });
  }
}
