import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import the service
import { Subscription } from 'rxjs';
import { PatientSelectionService } from './service/patientSelected/patient-selected.service';
import { I18nService } from '../Shared/i18n/i18n.service';
 
@Component({
  selector: 'app-menu-dmi',
  templateUrl: './menu-dmi.component.html',
  styleUrls: ['./menu-dmi.component.css', '.../../../src/assets/css/DMI.css']
})
export class MenuDMIComponent implements OnInit, OnDestroy {
  constructor(  private router: Router,  private cdRef: ChangeDetectorRef  , public patientSelectionService: PatientSelectionService,public i18nService: I18nService) { }

  CodeAdmission: string = ''; // Initialize with an empty string
  PatientName: string = ''; // Initialize with an empty string
  codeSaisiePatient: string = ''; // Initialize with an empty string
  private subscription: Subscription = new Subscription();
  storedPatientData:any;
  ngOnInit() {

    // this.applyMarginStyle();

    this.router.navigate(['/menu_dmi/list_admission_opd']); 
    // if(sessionStorage.getItem("codeAdmissionSelected") != null || sessionStorage.getItem("codeAdmissionSelected") != undefined){
 
      this.subscription = this.patientSelectionService.selectedAdmissionCode$.subscribe(codeSaisie => {
        this.CodeAdmission = codeSaisie ?? '';;
        this.cdRef.detectChanges(); 
        // this.savePatientDataToSessionStorage(); // Save to session storage
      });
      this.subscription = this.patientSelectionService.selectedPatientName$.subscribe(Name => {
        this.PatientName = Name ?? '';;
        this.cdRef.detectChanges(); 
        // this.savePatientDataToSessionStorage(); // Save to session storage
      });

      this.subscription = this.patientSelectionService.selectedcodeSaisiePatient$.subscribe(codeSaisiePatient => {
        this.codeSaisiePatient = codeSaisiePatient ?? 'vv';;
        this.cdRef.detectChanges(); 
        // this.savePatientDataToSessionStorage(); // Save to session storage
      });


    // }else{
    //   this.patientSelectionService.setSelectedPatientCode(' ');
    //   this.patientSelectionService.setSelectedPatientName( ' ');
    // }

    

    // this.updateLinkVisibility();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.applyMarginStyle();
  }

 

  // applyMarginStyle() {
  //   this.ngZone.runOutsideAngular(() => {
  //     const navItems = document.querySelectorAll('.list-admission-item') as NodeListOf<HTMLElement>;
  //     navItems.forEach(item => {
  //       item.classList.add('active'); //add this class
  //     });
  //   });
  // }

}
