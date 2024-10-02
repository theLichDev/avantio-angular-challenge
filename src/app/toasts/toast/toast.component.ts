import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Toast } from '../models/toast.model';
import { ToastsService } from '../toasts.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  public toast: Toast;
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastsService) {}

  ngOnInit() {
    this.subscription.add(
      this.toastService.toastSubject.subscribe((toast) => {
        this.toast = toast;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public close() {
    this.toast.visible = false;
  }
}
