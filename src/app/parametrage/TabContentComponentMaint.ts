import { Component, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, OnDestroy, Type } from '@angular/core';

@Component({
  selector: 'app-tab-content-param',
  template: `` // No template needed here
})
export class TabContentComponentParam implements OnInit, OnDestroy {
  @Input() component: Type<any> | undefined; //Important @Input()
  componentRef: any = null; // To store the component reference

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    if (this.component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.componentRef = this.viewContainerRef.createComponent(factory);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}