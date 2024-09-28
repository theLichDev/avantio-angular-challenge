import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Trend, TrendBody, TrendForm } from '../models/trend.model';
import { TrendSideFormService } from './trend-side-form.service';
import {
  createTrend,
  updateTrend,
} from '../store/actions/trend-side-form.actions';

const TrendDefaultValue: TrendBody = {
  url: '',
  provider: '',
  title: '',
  body: '',
  // Imagen de ejemplo, no editable en el formulario pero necesaria para la llamada a la api
  image: 'https://emtstatic.com/2020/02/iStock-170222445.jpg',
};

@Component({
  selector: 'app-trend-side-form',
  templateUrl: './trend-side-form.component.html',
  styleUrls: ['./trend-side-form.component.scss'],
})
export class TrendSideFormComponent implements OnInit, OnDestroy {
  protected isSideFormOpen: boolean = false;
  protected isEditMode: boolean = false;
  protected selectedTrendId: string = '';

  protected trendForm = new FormGroup<TrendForm>({
    url: new FormControl('', { nonNullable: true }),
    provider: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    body: new FormControl('', { nonNullable: true }),
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private trendSideFormService: TrendSideFormService,
    private store: Store
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.trendSideFormService.isOpenSubject.subscribe((isOpen) => {
        this.isSideFormOpen = isOpen;
      })
    );

    this.subscription.add(
      this.trendSideFormService.trendToEditSubject.subscribe((trendToEdit) => {
        if (trendToEdit) {
          this.isEditMode = true;
          this.selectedTrendId = trendToEdit.id;
          this.initTrendForm(trendToEdit);
        } else {
          this.isEditMode = false;
          this.resetForm();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeSideForm() {
    this.trendSideFormService.closeTrendSideForm();
  }

  saveTrend() {
    if (this.isEditMode) {
      this.store.dispatch(
        updateTrend({
          id: this.selectedTrendId,
          trendBody: { ...TrendDefaultValue, ...this.trendForm.value },
        })
      );
    } else {
      this.store.dispatch(
        createTrend({
          trendBody: { ...TrendDefaultValue, ...this.trendForm.value },
        })
      );
    }
  }

  initTrendForm(trend: Trend) {
    this.trendForm.patchValue({
      url: trend.url,
      provider: trend.provider,
      title: trend.title,
      body: trend.body.toString(),
    });
  }

  resetForm() {
    this.trendForm.reset();
  }
}
