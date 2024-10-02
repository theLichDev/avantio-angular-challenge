import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToastsService } from './toasts.service';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule],
  exports: [ToastComponent],
  providers: [ToastsService],
})
export class ToastsModule {}
