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
        "label": "Select Screen",
        "labelPosition": "top",
        "widget": "choicesjs",
        "placeholder": "Select Screen",
        "description": "",
        "tooltip": "",
        "customClass": "",
        "tabindex": "",
        "hidden": false,
        "hideLabel": true,
        "uniqueOptions": false,
        "autofocus": false,
        "disabled": false,
        "tableView": true,
        "modalEdit": false,
        "multiple": false,
        "dataSrc": "custom",
        "defaultValue": "",
        "data": {
          "resource": "",
          "url": "",
          "json": "",
          "custom": "values = JSON.parse(localStorage.getItem('FormsJson'))",
          "values": [
            {
              "label": "",
              "value": ""
            }
          ]
        },
        "dataType": "object",
        "idPath": "id",
        "valueProperty": "id",
        "template": "<span>{{ item.title }}</span>",
        "refreshOn": "",
        "clearOnRefresh": false,
        "searchEnabled": true,
        "selectThreshold": 0.3,
        "readOnlyValue": false,
        "customOptions": {},
        "useExactSearch": false,
        "persistent": true,
        "protected": false,
        "dbIndex": false,
        "encrypted": false,
        "clearOnHide": true,
        "customDefaultValue": "",
        "calculateValue": "",
        "calculateServer": false,
        "allowCalculateOverride": false,
        "validateOn": "change",
        "validate": {
          "required": false,
          "onlyAvailableItems": false,
          "customMessage": "",
          "custom": "",
          "customPrivate": false,
          "json": "",
          "strictDateValidation": false,
          "multiple": false,
          "unique": false
        },
        "unique": false,
        "errorLabel": "",
        "errors": "",
        "key": "screenId",
        "tags": [],
        "properties": {},
        "conditional": {
          "show": null,
          "when": null,
          "eq": "",
          "json": ""
        },
        "customConditional": "",
        "logic": [],
        "attributes": {},
        "overlay": {
          "style": "",
          "page": "",
          "left": "",
          "top": "",
          "width": "",
          "height": ""
        },
        "type": "select",
        "indexeddb": {
          "filter": {}
        },
        "selectFields": "",
        "searchField": "",
        "searchDebounce": 0.3,
        "minSearch": 0,
        "filter": "",
        "limit": 100,
        "redrawOn": "",
        "input": true,
        "prefix": "",
        "suffix": "",
        "dataGridLabel": false,
        "showCharCount": false,
        "showWordCount": false,
        "allowMultipleMasks": false,
        "addons": [],
        "authenticate": false,
        "ignoreCache": false,
        "lazyLoad": true,
        "fuseOptions": {
          "include": "score",
          "threshold": 0.3
        },
        "id": "e5xodt9"
      }
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