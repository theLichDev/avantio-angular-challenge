export class Toast {
  public visible: boolean;
  public title: string;
  public message: string;
  public position: ToastPosition;
  public type: ToastType;

  constructor(visible: boolean) {
    this.visible = visible;
    this.position = ToastPosition.BottomRight;
    this.type = ToastType.Info;
  }
}

export enum ToastPosition {
  TopRight = 'position-top-right',
  TopLeft = 'position-top-left',
  BottomRight = 'position-bottom-right',
  BottomLeft = 'position-bottom-left',
}

export enum ToastType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
}
