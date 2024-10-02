import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Toast, ToastPosition, ToastType } from './models/toast.model';

@Injectable()
export class ToastsService {
  public toastSubject = new BehaviorSubject<Toast>(new Toast(false));

  public show(
    title: string,
    message: string,
    seconds: number = 5,
    type: ToastType = ToastType.Info,
    position: ToastPosition = ToastPosition.BottomRight
  ) {
    const toast = new Toast(true);
    toast.message = message;
    toast.title = title;
    toast.type = type;
    toast.position = position;

    this.toastSubject.next(toast);
    setTimeout(() => {
      this.toastSubject.next(new Toast(false));
    }, (seconds <= 0 ? 5 : seconds) * 1000);
  }
}
