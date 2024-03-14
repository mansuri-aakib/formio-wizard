import { Injector } from '@angular/core';
import { FormioCustomComponentInfo } from '../formio lib/elements.common';
import { registerCustomFormioComponent } from '../formio lib/register-custom-component';
import { CustRenderer } from './cust-renderer.component';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'CustRenderer',
  selector: 'cust-renderer',
  title: 'Custom Renderer',
  group: 'custom',
  icon: 'code',
};

export function registerCustRendererComponent(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, CustRenderer, injector);
}