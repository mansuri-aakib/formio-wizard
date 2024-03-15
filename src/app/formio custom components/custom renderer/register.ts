import { Injector } from '@angular/core';
import { FormioCustomComponentInfo } from '../formio lib/elements.common';
import { registerCustomFormioComponent } from '../formio lib/register-custom-component';
import { CustRenderer } from './cust-renderer.component';
import { Components } from '@formio/angular';


let editForm = () => {
  const listComp =  Components.components.textfield.editForm();
  listComp.components[0]['components'].push({
    key: 'setting',
    label: 'Setting',
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'screenId',
        label: 'Screen Id',
        placeholder: 'Enter Screen Id',
        validate: { required: true },
      },
    ],
  })
  return listComp;
}

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'CustRenderer',
  selector: 'cust-renderer',
  title: 'Custom Renderer',
  group: 'custom',
  icon: 'code',
  editForm : editForm,
};

export function registerCustRendererComponent(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, CustRenderer, injector);
}