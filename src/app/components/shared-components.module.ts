import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
    declarations: [
        PrivacyPolicyComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        IonicModule,
        RouterModule,
    ],
    exports: [
        PrivacyPolicyComponent
    ]
})
export class SharedComponentsModule {
}
