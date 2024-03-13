import { Injector } from '@angular/core';
import { WizardComp } from './wizard.component';
import { FormioCustomComponentInfo } from '../formio lib/elements.common';
import { registerCustomFormioComponent } from '../formio lib/register-custom-component';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'wizard',
  selector: 'wizard-comp',
  title: 'Wizard',
  group: 'custom',
  icon: 'code',
};

export function registerWizardComponent(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, WizardComp, injector);
}