import { Injector } from '@angular/core';
import { FormioCustomComponentInfo } from '../formio lib/elements.common';
import { registerCustomFormioComponent } from '../formio lib/register-custom-component';
import { CustInput } from './cust-input.component';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'CustInput',
  selector: 'cust-input',
  title: 'Custom Input',
  group: 'custom',
  icon: 'code',
};

export function registerCustInputComponent(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, CustInput, injector);
}