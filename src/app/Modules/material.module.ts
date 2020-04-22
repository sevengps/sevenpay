import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
  MatSidenavModule,
   MatTableModule,
   MatDividerModule,
   MatIconModule,
   MatInputModule,
   MatToolbarModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule} from '@angular/material';



const MaterialModules = [
  MatButtonModule,
  MatSidenavModule,
  MatTableModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTabsModule,
  MatGridListModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports: [
    MaterialModules
  ]
})
export class MaterialModule { }
