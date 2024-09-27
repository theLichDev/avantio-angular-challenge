import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Trend, TrendForm } from '../models/trend.model';
import { TrendSideFormService } from './trend-side-form.service';

@Component({
  selector: 'app-trend-side-form',
  templateUrl: './trend-side-form.component.html',
  styleUrls: ['./trend-side-form.component.scss'],
})
export class TrendSideFormComponent implements OnInit, OnDestroy {
  protected isSideFormOpen: boolean = false;
  protected isEditMode: boolean = false;

  protected trendForm = new FormGroup<TrendForm>({
    url: new FormControl('', { nonNullable: true }),
    provider: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true }),
    body: new FormControl('', { nonNullable: true }),
  });

  private subscription: Subscription = new Subscription();

  constructor(private trendSideFormService: TrendSideFormService) {}

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
    // here dispatch acction, connect the store
    if (this.isEditMode) {
      console.log('Save changes');
    } else {
      console.log('Create new trend');
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
