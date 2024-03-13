import { Injector } from '@angular/core';
import { FormioCustomComponentInfo } from '../formio lib/elements.common';
import { SyncGrid } from './sync-grid.component';
import { registerCustomFormioComponent } from '../formio lib/register-custom-component';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'syncgrid',
  selector: 'sync-grid',
  title: 'Sync Grid',
  group: 'custom',
  icon: 'code',
};

export function registerSyncGridComponent(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, SyncGrid, injector);
}