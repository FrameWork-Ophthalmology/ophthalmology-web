import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../Shared/i18n/i18n.service';
import { MenuItem } from 'primeng/api';
import { ReceptionService } from '../../reception/ServiceClient/reception.service';
import { DatePipe } from '@angular/common';
import { CalanderTransService } from '../../Shared/CalanderService/CalanderTransService';
import { ControlServiceAlertify } from '../../Shared/Control/ControlRow';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css', '.../../../src/assets/css/StyleApplication.css'],
})
export class AdmissionComponent implements OnInit {
  HeaderRecherchePatient = "";
  HeaderAddPatient = "";
  HeaderListPatient: any;
  formHeader: any;
  code = null;
  codePatientNew = "";
  newNomFullAr = "";
  newNomFullLt = "";
  newAge = "";
  newGender = new Array<any>();
  selectedNewGender = null;
  numTelNew = "";
  refDoctorNew = "";
  codePatientSelected = "";
  nomFullArSelected = "";
  constructor(private recept_service: ReceptionService, private datePipe: DatePipe, private CtrlAlertify: ControlServiceAlertify,
    private router: Router, public i18nService: I18nService, private calandTrans: CalanderTransService) {

    this.calandTrans.setLangAR();

  }
  ngOnInit(): void {

    this.GetColumns();
    this.items = [
      { label: this.i18nService.getString('LabelActif') || 'LabelActif', icon: 'pi pi-file-check', command: () => { this.GetAllAdmissionActif() } },
      { label: this.i18nService.getString('LabelInActif') || 'LabelInActif', icon: 'pi pi-file-excel', command: () => { this.GetAllAdmissionInActif() } },
      { label: this.i18nService.getString('LabelAll') || 'LabelAll', icon: 'pi pi-file', command: () => { this.GetAllAdmission() } },
    ];
    this.activeItem = this.items[0];
  }



  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }



  products!: any[];
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  loadingData = false;
  selectedClinqiue = null;
  cols!: any[];

  GetColumns() {
    this.cols = [
      { field: 'codeSaisie', header: this.i18nService.getString('CodeSaisie') || 'CodeSaisie', type: 'text', width: '22%' },
      { field: 'designationArPres', header: this.i18nService.getString('DesignationAr') || 'DesignationAr', type: 'text', width: '22%' },
      { field: 'designationLtPres', header: this.i18nService.getString('DesignationLt') || 'DesignationLt', type: 'text', width: '16%' },
      { field: 'actif', header: this.i18nService.getString('LabelActif') || 'LabelActif', type: 'text', width: '10%' }, // exam Count

    ];
  }


  GetAllAdmission() {

  }

  GetAllAdmissionActif() {

  }

  GetAllAdmissionInActif() {

  }


  OpenModalRercherPatient(mode: string) {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.columnsListPatient();
    this.HeaderAddPatient = this.i18nService.getString('HeaderAddPatient');
    this.HeaderListPatient = this.i18nService.getString('HeaderListPatient');
    this.HeaderPatientSelected = this.i18nService.getString('HeaderPatientSelected');
    // this.columnsListMedecin();
    if (mode === 'RercherPatient') {
      button.setAttribute('data-target', '#ModalRercherPatient');
      this.formHeader = this.i18nService.getString('Add');
      this.onRowUnselect(event);
      this.clearSelected();
      this.visibleModalRecherPatient = true;
      this.GetAllPatient();
      this.columnsListPatient();
      this.code == undefined;
      this.newGender = [
        { label: this.i18nService.getString('Male') || 'Male', value: 1 },
        { label: this.i18nService.getString('Female') || 'Female', value: 2 },
      ]
      this.dateVisite = new Date();
      this.newTypeVisite = [
        { label: this.i18nService.getString('LabelautoriseCons') || 'LabelautoriseCons', value: this.i18nService.getString('LabelautoriseCons') || 'LabelautoriseCons' },
        { label: this.i18nService.getString('LabelControl') || 'LabelControl', value: this.i18nService.getString('LabelControl') || 'LabelControl' },

      ]

      this.dataVisite = [
        { code: '', dateVisite: '', typeVisite: '' },
      ]

      this.dataPatient = [
        { codePatient: 'ID25012930', nomFullAr: 'TEST NOM FL AR', nomFullLt: 'TEST NOM FULL LT', dateNaissance: '01/01/2025', numTel: '0910501037', diagnosis: 'TEST DIGNOSIS' },
        { codePatient: 'ID25012931', nomFullAr: 'TEST NOM FL AR 2', nomFullLt: 'TEST NOM FULL LT 2', dateNaissance: '01/02/2025', numTel: '0910501038', diagnosis: 'TEST DIGNOSIS 2' },
        { codePatient: 'ID25012932', nomFullAr: 'TEST NOM FL AR 3', nomFullLt: 'TEST NOM FULL LT 3', dateNaissance: '01/04/2025', numTel: '0910501039', diagnosis: 'TEST DIGNOSIS 3' }
      ]

    }
  }


  onRowSelect(event: any) {
    this.code = event.data.code;
  }
  onRowUnselect(event: any) {
    this.code = event.data = null;
  }

  clearSelected(): void {
    this.code == undefined;
  }


  columnTabsListPatient!: any[];
  columnsListPatient() {
    this.columnTabsListPatient = [
      { field: 'codePatient', header: this.i18nService.getString('CodePatient'), width: '10%' },
      { field: 'NomFullAr', header: this.i18nService.getString('NomFullAr'), width: '20%' },
      // { field: 'NomFullLt', header: this.i18nService.getString('NomFullLt') , width:'20%'},
      { field: 'DateNais', header: this.i18nService.getString('DateNaiss'), width: '10%' },
      { field: 'TelPatient', header: this.i18nService.getString('NumTel'), width: '10%' },
      { field: 'diagnosis', header: this.i18nService.getString('diagnosis'), width: '20%' }
    ];
  }

  HeaderPatientSelected = "";

  dataPatient = new Array<any>();
  listPatientPushed = new Array<any>();
  ListPatientTried = new Array<any>();
  GetAllPatient() {
    this.recept_service.GetPatient().subscribe((data: any) => {
      this.ListPatientTried = data;

    })
  }

  onOpenModalAdmission(mode: string) {

  }
  SelectedPatientFromList: any = null;


  onRowSelectFromTabsRecherchePatient(event: any) {
    this.SelectedPatientFromList = event.data;
    this.codePatientSelected = event.data.codePatient;
    this.nomFullArSelected = event.data.nomFullAr;

  }
  onRowUnselectFromTabsRecherPatient(event: any) {
    this.SelectedPatientFromList = new Array<any>();
    this.codePatientSelected = "";
    this.nomFullArSelected = "";

  }

  ReinitialiserSearch() {

  }

  visibleModalRecherPatient = false;
  CloseModalRecherPatient() {
    this.visibleModalRecherPatient = false;
  }
  dateNaissance: any;
  transformDateFormatDateNaissance() {
    this.dateNaissance = this.datePipe.transform(this.dateNaissance, "yyyy-MM-dd")
  };

  DateTempNewDateNaissance: any;
  formatInputNewDateNaissance(event: any) {  // Use any because of p-calendar event type
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    event.target.value = inputValue;
    this.DateTempNewDateNaissance = inputValue;
    this.tryParseAndSetDateNewDateNaissance(inputValue);
  }
  tryParseAndSetDateNewDateNaissance(inputValue: string) {
    let parts = inputValue.split('/');
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      let year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        this.dateNaissance = new Date(year, month, day);
      }
    }
  }




  /// 
  dateVisite: any = null;
  transformDateFormatDateVisite() {
    this.dateVisite = this.datePipe.transform(this.dateVisite, "yyyy-MM-dd")
  };

  DateTempNewDateVisite: any;
  formatInputNewDateVisite(event: any) {  // Use any because of p-calendar event type
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    event.target.value = inputValue;
    this.DateTempNewDateVisite = inputValue;
    this.tryParseAndSetDateNewDateVisite(inputValue);
  }
  tryParseAndSetDateNewDateVisite(inputValue: string) {
    let parts = inputValue.split('/');
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      let year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        this.dateVisite = new Date(year, month, day);
      }
    }
  }

  newTypeVisite = new Array<any>();
  selectedNewTypeVisite = null;

  dataVisite = new Array<any>();
  ReasonVisite = "";
  PastMedicalHistory = "";
  PriorSurgery = "";
  CurrentMedications = "";
  SystemicDisease = "";
  AllergyHistory = "";
  addNewRow() {
    const newRow: any = {
      code: this.dataVisite.length + 1, // Assign a new code (adjust as needed)
      dateVisite: '',         // Set default date to today
      typeVisite: '',                    // Initialize typeVisite (will be updated by the dropdown)
    };
    this.dataVisite.push(newRow);
  }

  openModal(mode: string, index: number) {
    this.selectedVisiteRowIndex = index;
    this.visibleModalAdmission = false;
    this.visibleModalRecherPatient = false;

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.LabelHistory = this.i18nService.getString('LabelHistory');
    this.LabelRefraction = this.i18nService.getString('LabelRefraction');
    

    const patientSelectedFromList = this.SelectedPatientFromList && this.SelectedPatientFromList.codePatient && this.SelectedPatientFromList.nomFullAr;

    console.log("  this.selectedVisiteRowIndex , ", this.selectedVisiteRowIndex);
    if (patientSelectedFromList) {
      // Patient selected from the list
      this.codePatientSelected = this.SelectedPatientFromList.codePatient;
      this.nomFullArSelected = this.SelectedPatientFromList.nomFullAr;
    } else if (this.codePatientNew && this.newNomFullAr) {
      // Patient data entered manually
      this.codePatientSelected = this.codePatientNew;
      this.nomFullArSelected = this.newNomFullAr;

    } else {
      // No patient selected or data entered
      this.CtrlAlertify.PostionLabelNotification();
      this.CtrlAlertify.showChoseAnyPatientNotification();
      this.visibleModalRecherPatient = true; // Show patient selection modal
      return; // Prevent further execution
    }

    if (mode === 'selectPatientAdded') {
      const isValid = this.validateAdmissionData(index);
      if (isValid) {
        this.visibleModalAdmission = true;
        this.ListRefractiveAid=[
          { label: 'Glasses', value: 'Glasses' },
          { label: 'RGP Contact Lens', value: 'RGP Contact Lens' },
          { label: 'Soft Contact Lens', value: 'Soft Contact Lens' },
         
        ]
      } else {
        this.visibleModalAdmission = false;
        this.visibleModalRecherPatient = true;
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showNotificationِCustom("PleaseChoiseDateVisteOrTypeViste"); //Show alert for missing data
      }


    } else if (mode === 'voirDetailsVisite') {
      // Handle 'voirDetailsVisite' mode
    }
  }


  selectedVisiteRowIndex: number | null = null;

  validateAdmissionData(index: number): boolean {
    if (index >= 0 && index < this.dataVisite.length) {
      const rowData = this.dataVisite[index];
      return rowData.dateVisite && rowData.typeVisite;  
    }
    return false; //Invalid index
  }
  removeRow(index: number) {
    if (index !== 0) {
      this.dataVisite.splice(index, 1);
    }

  }

  visibleModalAdmission = false;

  CloseModalAddAdmission() {

    this.visibleModalAdmission = false;
  }
  LabelHistory = "";
  LabelRefraction="";
  RefractiveAid:any;

  ListRefractiveAid=new Array<any>();
  usingSince="";
  RightEyeRef="";
  LeftEyeRef="";
  VisionRE="";
  VisionLE="";
  NearVisionRE="";
  NearVisionLE="";
  uCVARE="";
  uCVALE="";
  pINHOLERE=""; 
  pINHOLELE="";
  RefractionLE="";
  RefractionRE="";
}
