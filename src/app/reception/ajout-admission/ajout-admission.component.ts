import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ControlServiceAlertify } from '../../Shared/Control/ControlRow';
import { CalanderTransService } from '../../Shared/CalanderService/CalanderTransService';
import { InputValidationService } from '../../Shared/Control/ControlFieldInput';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { I18nService } from '../../Shared/i18n/i18n.service';
import { Router } from '@angular/router';
import { ReceptionService } from '../ServiceClient/reception.service';
import { ParametrageService } from '../../parametrage/ServiceClient/parametrage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { CliniqueLabelPipe } from '../../Shared/Pipe/CliniqueLabelPipe';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from '../../Shared/EcrypteService/EncryptionService';

@Component({
  selector: 'app-ajout-admission',
  templateUrl: './ajout-admission.component.html',
  styleUrls: ['./ajout-admission.component.css', '.../../../src/assets/css/StyleApplication.css'],
  providers: [ConfirmationService, MessageService, InputValidationService, CalanderTransService, ControlServiceAlertify,CliniqueLabelPipe]
})
export class AjoutAdmissionComponent implements OnInit   {
 
 
  selctedOptions =false;
  AraiaDis: boolean = false;
  HeaderListPatient = '';
  HeaderRecherchePatient = '';
  formHeader = ".....";


  code = null;
  actif = false;
  codeSaisie = "";
  CodePatientAdm = 'NULL';
  NomPatientFullLtRecherche = "";
  NomPatientFullArRecherche = "";
  TelPatientRecherche = "";

  visibleModalRecherPatient = false;
  visibleModalAddPatient = false;
  visibleModalAddAdmissionOperation = false;
  visibleModal = false;
  constructor(private fb: FormBuilder, private CtrlAlertify: ControlServiceAlertify, private calandTrans: CalanderTransService,
    private datePipe: DatePipe ,
    public i18nService: I18nService, private router: Router, private primengConfig: PrimeNGConfig,private pipe:CliniqueLabelPipe,
    private encryptionService: EncryptionService, private recept_service: ReceptionService, private param_service: ParametrageService) {
    this.calandTrans.setLangAR();


  }

  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }

  ngOnInit(): void {
    this.GetColumns();
    this.primengConfig.ripple = true;

    this.items = [
      { label: this.i18nService.getString('LabelActif') || 'LabelActif', icon: 'pi pi-file-check', command: () => { this.GetAllCliniqueActif() } },
      { label: this.i18nService.getString('LabelInActif') || 'LabelInActif', icon: 'pi pi-file-excel', command: () => { this.GetAllCliniqueInActif() } },
      { label: this.i18nService.getString('LabelAll') || 'LabelAll', icon: 'pi pi-file', command: () => { this.GetAllClinique() } },
    ];
    this.activeItem = this.items[0];

    this.formcommentLeftEye = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });

    this.formcommentRightEye = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });

    this.formcommentLeftEyeFundus = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });

    this.formcommentRightEyeFundus = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });


    this.formFundusOperation = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });


    this.formOptometryOperation = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });


    this.formPressureOperation = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });

    this.formCornealOperation = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });
    /////////  diagnosis
    this.formDiagnosis = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });
    this.formPastHistory = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });
    this.formReasonVisite = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });
    this.formchiefComplaint = this.fb.group({
      text: ['', Validators.required] // Add validators as needed
    });
 // Set the minimum date (e.g., 100 years ago from today)
    const today = new Date();
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  }



  ////// body

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



  GetAllClinique() {

  }

  GetAllCliniqueActif() {

  }

  GetAllCliniqueInActif() {

  }




  /////// modal recherche patient 

  // columnTabsListPatient!: any[];
  // columnsListPatient() {
  //   this.columnTabsListPatient = [

  //     // { field: '', header: '' },
  //     { field: 'codePatient', header: this.i18nService.getString('CodePatient') },
  //     { field: 'NomFullAr', header: this.i18nService.getString('NomFullAr') },
  //     { field: 'NomFullLt', header: this.i18nService.getString('NomFullLt') },
  //     { field: 'TelPatient', header: this.i18nService.getString('NumTel') },
  //     { field: 'DateNais', header: this.i18nService.getString('DateNaiss') }

  //   ];


  // }
  HeaderAddPatient = "";
  HeaderPatientSelected = "";
  newGender = new Array<any>();
  dateVisite: any = null;
  newTypeVisite = new Array<any>();
  dataVisite = new Array<any>();
  selectedNewTypeVisite = null;
  nomFullArSelected = '';
  codePatientSelected = '';
  newNomFullAr = '';
  newNomFullLt = '';
  newAge :any;
  numTelNew = '';
  refDoctorNew = '';
  selectedNewGender = null;
  OpenModalRercherPatient(mode: string) {
    // const button = document.createElement('button');
    // button.type = 'button';
    // button.style.display = 'none';
    // button.setAttribute('data-toggle', 'modal');
    // this.columnsListPatient();
    // this.HeaderRecherchePatient = this.i18nService.getString('HeaderRecherchePatient');
    // this.HeaderListPatient = this.i18nService.getString('HeaderListPatient');
    // // this.columnsListMedecin();
    // if (mode === 'RercherPatient') {
    //   button.setAttribute('data-target', '#ModalRercherPatient');
    //   this.formHeader = this.i18nService.getString('Add');
    //   this.onRowUnselect(event);
    //   this.clearSelected();
    //   this.actif = false;
    //   this.visibleModal = false;
    //   this.visibleModalAddPatient = false;
    //   this.visibleModalRecherPatient = true;
    //   this.GetAllPatient();
    //   this.code == undefined;
    //   this.NomPatientFullLtRecherche = '';
    //   this.NomPatientFullArRecherche = '';
    //   this.TelPatientRecherche = ''

    // }








    this.nomFullArSelected = "";
    this.codePatientSelected = "";

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
        { label: this.i18nService.getString('LabelautoriseCons') || 'LabelautoriseCons', value: 1},
        { label: this.i18nService.getString('LabelControl') || 'LabelControl', value: 2},

      ]


      this.ListRSLTClinique = [
        { value: '1', label: 'CLINIC TEST' },
      ]
      this.dataVisite = [
        { code: '1', dateVisite: this.datePipe.transform(this.dateVisite, "yyyy-MM-dd"), typeVisite: this.newTypeVisite[0].value   },
      ]

      this.dataPatient = [
        { codePatient: 'ID25012930', nomFullAr: 'فلان بن فلان ', nomFullLt: 'TEST NAME FULL LT', dateNaissance: '01/01/2025', numTel: '0910501037', diagnosis: 'TEST DIGNOSIS' },
        { codePatient: 'ID25012931', nomFullAr: '2 فلان بن فلان', nomFullLt: 'TEST NAME FULL LT 2', dateNaissance: '01/02/2025', numTel: '0910501038', diagnosis: 'TEST DIGNOSIS 2' },
        { codePatient: 'ID25012932', nomFullAr: 'فلان بن فلان 3', nomFullLt: 'TEST NAME FULL LT 3', dateNaissance: '01/04/2025', numTel: '0910501039', diagnosis: 'TEST DIGNOSIS 3' }
      ]

    }
  }



  onRowSelect(event: any) {
    this.code = event.data.code;
    this.actif = event.data.actif;
    this.codeSaisie = event.data.codeSaisie;
    // this.rib = event.data.rib;

    console.log('vtData : ', event);
  }
  onRowUnselect(event: any) {
    console.log('row unselect : ', event);
    this.code = event.data = null;
  }

  clearSelected(): void {
    this.code == undefined;
    this.actif = false;
  }



  dataPatient = new Array<any>();
  listPatientPushed = new Array<any>();
  ListPatientTried = new Array<any>();
  GetAllPatient() {
    // this.recept_service.GetPatient().subscribe((data: any) => {
    //   this.ListPatientTried = data;

    // })
  }

  leftEye = '';
  rightEye = '';
  probMedicaux = '';
  ProbMedicaux = "";
  selectedCliniqueReqOperation = null;
  selectedCliniqueOperation = null;
  selectedCliniqueAdm: number | null = null;
  selectedOperation = null;
  // selectedRSLTFundusRight :any;
  // selectedRSLTFundusLeft : any ;


  selectedRSLTFundusRight: { label: string } = { label: '' };
  selectedRSLTFundusLeft: { label: string } = { label: '' };
  ListRSLTFundus: { value: any; label: string }[] = []; // Example type

  // ListRSLTFundus = new Array<any>();
  ListRSLTClinique = new Array<any>();
  ListRSLTOperation = new Array<any>();
  rightEyePressure = '';
  leftEyePressure = '';
  prixMoyeneOperation: any = '';
  commentLeftEye = '';
  commentLeftEyeFundus = '';
  commentRightEye = '';
  areaPressureOperation = '';
  areaOptometryOperation = '';
  areaFundusOperation = '';
  areaCornealOperation: any;

  commentRightEyeFundus = '';
  formcommentRightEye!: FormGroup;
  formcommentLeftEye!: FormGroup;
  formcommentLeftEyeFundus!: FormGroup;
  formcommentRightEyeFundus!: FormGroup;
  formPressureOperation!: FormGroup;
  formOptometryOperation!: FormGroup;
  formFundusOperation!: FormGroup;
  formCornealOperation!: FormGroup;

  formDiagnosis!: FormGroup;
  formchiefComplaint!: FormGroup;
  formPastHistory!: FormGroup;
  formReasonVisite!: FormGroup;
  areaDiagnosis = '';
  areachiefComplaint = '';
  areaPastHistory = '';
  areaReasonVisite = '';


  // SelectedPatientFromList: any;
  nomFullArNew = '';
  nomFullArOperation = '';
  nomFullLtNew = '';
  TelPatientNew = '';
  nomFullArAdm = '';
  NomFullLtAdm = '';
  TelPatientAdm = '';
  codePatient = 'NULL';
  codePatientNew = '';
  codePatientOperation = '';
  age = "";
  newCodeSaisieAdmOperation = '';
  IDPatient = 'NULL';
  timeOperation: string = '23:59';



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
  ReinitialiserSearch() {
    // this.NomPatientFullLt = '';
    // this.NomPatientFullAr = '';
    // this.TelPatient = ''
  }
  dateNaissanceAdm: string | Date = '';
  dateNaissanceRecherche: string | Date = '';
  DateTempRecherche: any;
  dateNaissanceNew: any;
  transformDateFormatRecherche() {
    if (this.dateNaissanceRecherche) {
      this.DateTempRecherche = this.datePipe.transform(this.dateNaissanceRecherche, 'dd/MM/yyyy')!;
    }
  };


  formatInputRecherche(event: any) {  // Use any because of p-calendar event type
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    event.target.value = inputValue;
    this.DateTempRecherche = inputValue;
    this.tryParseAndSetDateRecherche(inputValue);
  }
  tryParseAndSetDateRecherche(inputValue: string) {
    let parts = inputValue.split('/');
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      let year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        this.dateNaissanceRecherche = new Date(year, month, day);
      }
    }
  }



  CloseModalRecherPatient() {
    this.visibleModalRecherPatient = false;
    // this.NomPatientFullAr == "NULL";
    // this.NomPatientFullLt == "NULL";
    this.SelectedPatientFromList = '';
    this.dateNaissanceAdm = new Date();
    this.dateNaissanceNew = new Date();
    this.dateNaissanceRecherche = new Date();
    this.visibleModalAdmission = false;
  }




  onOpenModalAdmission(mode: string) {

    this.visibleModal = false;
    this.visibleModalAddPatient = false;
    this.visibleModalNewAdmission = false;
    this.visibleModalAddAdmissionOperation = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    if (mode === 'choisir') {
      button.setAttribute('data-target', '#ModalAddAdmission');
      this.formHeader = this.i18nService.getString('NewFile');
      this.LabelOptometry = this.i18nService.getString('LabelOptometry');
      this.LabelPressure = this.i18nService.getString('LabelPressure');
      this.LabelFundus = this.i18nService.getString('LabelFundus');
      this.LabelCorneal = this.i18nService.getString('LabelCorneal');
      this.LabelOperation = this.i18nService.getString('Operation');
      this.LabelDiagnosis = this.i18nService.getString('diagnosis');

      this.ListRSLTFundus = [
        { value: '1', label: 'Positive' },
        { value: '2', label: 'Negative' },
      ]

      this.dataCorneal = [
        { eye: 'OD ( اليمنى )', K1: '', K2: '', Axis: '', commentaire: '' },
        { eye: 'OS ( اليسرى )', K1: '', K2: '', Axis: '', commentaire: '' },]


      this.ListRSLTOperation = [
        { value: '1', label: 'OPERATION TEST' },
      ]

      this.ListRSLTClinique = [
        { value: '1', label: 'CLINIC TEST' },
      ]
      this.columnsTabCorneal();
      this.onRowUnselect(event);
      this.clearSelected();

      this.visibleModalNewAdmission = true;
      this.visibleModalAddPatient = false;
      sessionStorage.setItem("CodePatientTemp", this.SelectedPatientFromList);
      this.visibleModalRecherPatient = false;
      this.getCodeSaisieAdmissionOPD();






      this.code == undefined;

      this.nomFullArAdm = '';
      this.NomFullLtAdm = '';
      this.CodePatientAdm = '';
      this.selectedCliniqueAdm = null;


      this.commentLeftEye = '';
      this.commentLeftEyeFundus = '';
      this.commentRightEye = '';
      this.commentRightEyeFundus = '';
      this.rightEye = '';
      this.leftEye = '';
      this.rightEyePressure = '';
      this.leftEyePressure = '';
      this.selectedRSLTFundusRight = { label: '' };
      this.selectedRSLTFundusLeft = { label: '' };
      this.selectedCliniqueReqOperation = null;
      this.selectedOperation = null;
      this.prixMoyeneOperation = '';


      this.dataCorneal = [
        { eye: 'OD ( اليمنى )', K1: '', K2: '', Axis: '', commentaire: '' },
        { eye: 'OS ( اليسرى )', K1: '', K2: '', Axis: '', commentaire: '' },]
      this.formcommentLeftEye = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });

      this.formcommentRightEye = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });

      this.formcommentLeftEyeFundus = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });

      this.formcommentRightEyeFundus = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });


      this.formFundusOperation = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });


      this.formOptometryOperation = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });


      this.formPressureOperation = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });

      this.formCornealOperation = this.fb.group({
        text: ['', Validators.required] // Add validators as needed
      });



    } else if (mode === 'addNewPatient') {
      button.setAttribute('data-target', '#ModalAddPatient');
      this.formHeader = this.i18nService.getString('AddNewPatient');
      this.onRowUnselect(event);
      this.clearSelected();
      this.visibleModalRecherPatient = false;
      this.visibleModal = false;
      this.visibleModalAddPatient = true;
      this.GetCompteurPatient();
      this.codePatient = '';
      // this.NomPatientFullAr = '';
      // this.NomPatientFullLt = '';
      // this.TelPatient = '';
      this.code == undefined;



    }

    if (mode === 'ouvrirAdmissionOperation') {


      if (this.selectedCliniqueReqOperation == null || this.selectedCliniqueReqOperation == undefined || this.selectedCliniqueReqOperation == '' || this.dateOperation == null || this.selectedOperation == null || this.selectedOperation == '') {
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showNotificationِCustom('CliniqueOrDateOperationRequired');
 
        this.visibleModalAddAdmissionOperation = false;
        this.visibleModalNewAdmission = true;
        this.visibleModalAddPatient = false;
        return;

      } else {
        button.setAttribute('data-target', '#ModalAddAdmissionOperation');
        this.formHeader = this.i18nService.getString('OpenFileOperation');
        console.log('okkkk');
        this.visibleModalAddAdmissionOperation = true;
        this.visibleModalNewAdmission = false;
        this.visibleModalAddPatient = false;


        this.LabelDetailsOperation = this.i18nService.getString('LabelDetailsOperation');
        this.LabelDiagnosisOperation = this.i18nService.getString('LabelDiagnosisOperation');


        // load data from old modal  
        this.areaOptometryOperation = 'OD Optometry : ' + this.rightEye + '\n' +
          'OS Optometry : ' + this.leftEye + '\n' +
          'Comment OD Optometry : ' + this.commentRightEye.trim() + '\n' +
          'Comment OS Optometry : ' + this.commentLeftEye.trim();


        this.areaPressureOperation = 'OD Pressure : ' + this.rightEyePressure + ' mmHG' + '\n' +
          'OS Pressure : ' + this.leftEyePressure + ' mmHG' + '\n';

        const selectedLeftFundus = this.ListRSLTFundus.find(item => item.value === this.selectedRSLTFundusLeft);
        const selectedRightFundus = this.ListRSLTFundus.find(item => item.value === this.selectedRSLTFundusRight);
        this.areaFundusOperation = 'OD Fundus : ' + (selectedRightFundus?.label ?? '') + '\n' +
          'OS Fundus : ' + (selectedLeftFundus?.label ?? '') + '\n' +
          'Comment OD Fundus : ' + (this.commentRightEyeFundus ?? '') + '\n' +
          'Comment OS Fundus : ' + (this.commentLeftEyeFundus ?? '') + '\n'

        this.selectedCliniqueOperation = this.selectedCliniqueReqOperation;
        this.nomFullArOperation = this.nomFullArAdm ?? '';
        this.codePatientOperation = this.CodePatientAdm ?? '';
        this.dateOperationFixed = this.dateOperation;


        this.areaCornealOperation = this.dataCorneal.map(item =>
          `Eye: ${item.eye}  K1: ${item.k1 ?? ''}  D , K2: ${item.k2 ?? ''} D  , Axis: ${item.axis ?? ''} ° , Commentaire: ${item.commentaire ?? ''}\n`
        ).join('');

        this.age = '36';
        this.newCodeSaisieAdmOperation = 'AD0250023902'
      }




    }




  }


  openModalAdmissionOperation(mode: string) {

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';



  }

  ReturnModal(mode: string) {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'return') {
      button.setAttribute('data-target', '#ModalAddAdmission');
      this.visibleModalAddAdmissionOperation = false;
      this.visibleModalNewAdmission = true;
    }

  }

  CloseModalOperation() {
    this.visibleModalAddAdmissionOperation = false;
  }
  getCodeSaisieAdmissionOPD() {
    // this.param_service.GetCompteur("CodeSaisieADMOPD").
    //   subscribe((data: any) => {
    //     this.codeSaisie = data.prefixe + data.suffixe;
    //   })
  }
  GetCompteurPatient() {
    // this.param_service.GetCompteur("CompteurPatient").subscribe((data: any) => {
    //   this.codePatientNew = data.prefixe + data.suffixe;
    // })
  }

  PostAdmission() {

    // const formDataLeft = {
    //   text: this.formcommentLeftEye.get('text')?.value // Access the value from the form group
    // };
    // const commentLeftEye = JSON.stringify(formDataLeft, null, 2); // 2 spaces for indentation

    // const formDataRight = {
    //   text: this.formcommentRightEye.get('text')?.value // Access the value from the form group
    // };
    // const commentRightEye = JSON.stringify(formDataRight, null, 2); // 2 spaces for indentation


  }

  clearForm() {
    this.visibleModalNewAdmission = false;
    this.codePatientSelected = '';
    this.nomFullArSelected = '';
    this.SelectedPatientFromList = null;
    this.ListMedecinTried = new Array<any>();
    this.visibleModalAdmission = false;

  }

  visibleModalNewAdmission = false;

  visibleModalNewPatient = false;

  PostNewPatient() {

  }

  CloseAddModalRecherche() {
    this.visibleModalAddPatient = false;
    this.IDPatient = '';
    this.codeSaisie = '';
    this.SelectedPatientFromList = '';
    this.nomFullArAdm = '';
    this.NomPatientFullArRecherche = 'NULL';
    this.NomFullLtAdm = '';
    this.NomPatientFullLtRecherche = 'NULL';
    this.TelPatientAdm = '';
    this.TelPatientRecherche = '';
    this.dateNaissanceAdm = "";
    this.dateNaissanceNew = "";
    this.dateNaissanceRecherche = "";
    this.nomFullArNew = '';
    this.nomFullLtNew = '';
    this.TelPatientNew = '';
    this.codePatientNew = '';
    this.visibleModalAdmission = false;
  }
  transformDateFormat() {
    this.dateNaissanceNew = this.datePipe.transform(this.dateNaissanceNew, "yyyy-MM-dd")
  };
  formatInputNew(event: any) {  // Use any because of p-calendar event type
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    event.target.value = inputValue;
    this.DateTempNew = inputValue;
    this.tryParseAndSetDateNew(inputValue);
  }
  tryParseAndSetDateNew(inputValue: string) {
    let parts = inputValue.split('/');
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      let year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        this.dateNaissanceNew = new Date(year, month, day);
      }
    }
  }

  DateTempNew: any;
  
  selectedCliniqueCurrent=null;
  LabelOptometry = "";
  LabelDiagnosisOperation = "";
  LabelDetailsOperation = "";
  LabelPressure = "";
  LabelFundus = "";
  LabelCorneal = "";
  LabelOperation = "";

  minDate: Date  = new Date(); 

  columnTabsCorneal!: any[];
  columnsTabCorneal() {
    this.columnTabsCorneal = [

      { field: 'eye', header: this.i18nService.getString('Eye') },
      { field: 'K1', header: this.i18nService.getString('K1') },
      { field: 'K2', header: this.i18nService.getString('K2') },
      { field: 'Axis', header: this.i18nService.getString('Axis') },
      { field: 'commentaire', header: this.i18nService.getString('commentaire') },

    ];


  }
  dataCorneal = new Array<any>();

  dateOperation: any;
  dateOperationFixed: any = null;
  DateTempNewOperation: any;
  transformDateFormatOperation() {
    this.dateOperation = this.datePipe.transform(this.dateOperation, "yyyy-MM-dd")
  };

  formatInputNewOperation(event: any) {  // Use any because of p-calendar event type
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (inputValue.length > 0) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    event.target.value = inputValue;
    this.DateTempNewOperation = inputValue;
    this.tryParseAndSetDateNewOperation(inputValue);
  }
  tryParseAndSetDateNewOperation(inputValue: string) {
    let parts = inputValue.split('/');
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      let year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        this.dateOperation = new Date(year, month, day);
      }
    }
  }

  dateNaissance: any;
  transformDateFormatDateNaissance() {
    this.dateNaissance = this.datePipe.transform(this.dateNaissance, "yyyy-MM-dd");
    this.calculateAge();

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
    this.calculateAge();
  }

  
  calculateAge() {
    if (this.dateNaissance) {
      const birthDate = new Date(this.dateNaissance);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.newAge = age;
    } else {
      this.newAge = ""; // Or some default value if dateNaissance is empty
    }
  }

  setDateFromAge(age: number) {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    this.dateNaissance = new Date(birthYear, today.getMonth(), today.getDate());  // Month is 0-indexed
    this.dateNaissance = this.datePipe.transform(this.dateNaissance, "yyyy-MM-dd"); //update format
  }
  onAgeChange() {
    if (this.newAge !== null && this.newAge !== undefined) {
      this.setDateFromAge(this.newAge);
    } else {
      this.dateNaissance = null;  // Clear the date if age is cleared
    }
  }



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
  transformDateFormatDateVisite() {
    this.dateVisite = this.datePipe.transform(this.dateVisite, "yyyy-MM-dd")
  };

  addNewRow() {
    const newRow: any = {
      code: this.dataVisite.length + 1, // Assign a new code (adjust as needed)
      dateVisite: '',         // Set default date to today
      typeVisite: '',                    // Initialize typeVisite (will be updated by the dropdown) 
    };
    this.dataVisite.push(newRow);
  }


  // SetCurrentCliniqueVisite(index: number){

  // }
  openModal(mode: string, index: number) {
    // this.SelectedPatientFromList= '';

    const sessionValue = sessionStorage.getItem("CheckRegDef");
    const checkedRegDef = sessionValue === "true";
    this.codePatientSelected == "";
    this.nomFullArSelected == "";
    this.selectedVisiteRowIndex = index;
    this.visibleModalNewAdmission = false;
    this.visibleModalRecherPatient = false;
    this.visibleModalAdmission = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');


    const patientSelectedFromList = this.SelectedPatientFromList && this.SelectedPatientFromList.codePatient && this.SelectedPatientFromList.nomFullAr;

    // console.log("  this.selectedVisiteRowIndex , ", this.selectedVisiteRowIndex);
    if (patientSelectedFromList) {
      // Patient selected from the list
      this.CodePatientAdm = this.SelectedPatientFromList.codePatient;
      this.nomFullArAdm = this.SelectedPatientFromList.nomFullAr;
      this.TelPatientAdm = this.SelectedPatientFromList.numTel
    } else if (this.codePatientNew && this.newNomFullAr) {
      // Patient data entered manually
      this.CodePatientAdm = this.codePatientNew;
      this.nomFullArAdm = this.newNomFullAr;
      this.TelPatientAdm  = this.numTelNew;

    } else {
      // No patient selected or data entered
      this.CtrlAlertify.PostionLabelNotification();
      this.CtrlAlertify.showChoseAnyPatientNotification();
      this.visibleModalRecherPatient = true; // Show patient selection modal
      return; // Prevent further execution
    }

    if (mode === 'selectPatientAdded') {


      const isValid = this.validateAdmissionData(index);
      // const currentCliniqueSelected = ;
      if (isValid) {
        // this.visibleModalNewAdmission = true;

        // button.setAttribute('data-target', '#ModalAddAdmission');
        // this.formHeader = this.i18nService.getString('NewFile');
        // this.LabelOptometry = this.i18nService.getString('LabelOptometry');
        // this.LabelPressure = this.i18nService.getString('LabelPressure');
        // this.LabelFundus = this.i18nService.getString('LabelFundus');
        // this.LabelCorneal = this.i18nService.getString('LabelCorneal');
        // this.LabelOperation = this.i18nService.getString('Operation');
        // this.LabelDiagnosis = this.i18nService.getString('diagnosis');
        // this.ListRSLTClinique = [
        //   { value: '1', label: 'CLINIC TEST' },
        // ]
        // this.selectedCliniqueAdm = this.SetDataCliniqueCurrent(index);

 
        // this.ListRSLTFundus = [
        //   { value: '1', label: 'Positive' },
        //   { value: '2', label: 'Negative' },
        // ]

        // this.dataCorneal = [
        //   { eye: 'OD ( اليمنى )', K1: '', K2: '', Axis: '', commentaire: '' },
        //   { eye: 'OS ( اليسرى )', K1: '', K2: '', Axis: '', commentaire: '' },]


        // this.ListRSLTOperation = [
        //   { value: '1', label: 'OPERATION TEST' },
        // ]

        
        // this.columnsTabCorneal();
        // this.onRowUnselect(event);
        // this.clearSelected();

        // this.visibleModalNewAdmission = true;
        // this.visibleModalAddPatient = false;
        // sessionStorage.setItem("CodePatientTemp", this.SelectedPatientFromList);
        // this.visibleModalRecherPatient = false;
        // this.getCodeSaisieAdmissionOPD();






        // this.code == undefined;
 


        // this.commentLeftEye = '';
        // this.commentLeftEyeFundus = '';
        // this.commentRightEye = '';
        // this.commentRightEyeFundus = '';
        // this.rightEye = '';
        // this.leftEye = '';
        // this.rightEyePressure = '';
        // this.leftEyePressure = '';
        // this.selectedRSLTFundusRight = { label: '' };
        // this.selectedRSLTFundusLeft = { label: '' };
        // this.selectedCliniqueReqOperation = null;
        // this.selectedOperation = null;
        // this.prixMoyeneOperation = '';


        // this.dataCorneal = [
        //   { eye: 'OD ( اليمنى )', K1: '', K2: '', Axis: '', commentaire: '' },
        //   { eye: 'OS ( اليسرى )', K1: '', K2: '', Axis: '', commentaire: '' },]
        // this.formcommentLeftEye = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formcommentRightEye = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formcommentLeftEyeFundus = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formcommentRightEyeFundus = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });


        // this.formFundusOperation = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });


        // this.formOptometryOperation = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });


        // this.formPressureOperation = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formCornealOperation = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formDiagnosis = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });
        // this.formchiefComplaint = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });

        // this.formPastHistory = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // }); this.formReasonVisite = this.fb.group({
        //   text: ['', Validators.required] // Add validators as needed
        // });



        this.visibleModalAdmission = true;
        this.LabelRegDefferral = this.i18nService.getString('LabelRegDefferral');
     this.columnsListMedecin(); 

     this.selectedValue = 1;

     button.setAttribute('data-target', '#Modal');
     this.formHeader = this.i18nService.getString('Add');
     this.onRowUnselect(event);
     this.clearSelected();

    //  if (this.codeConvention == 'NULL' && this.codeSociete == 'NULL') {
    //    this.selectedValue == 1;
    //    this.codePriceList = 200;
    //    this.codeConvention = "NULL";
    //    this.codeSociete = "NULL";
    //  } else {
    //    this.codePriceList = this.codePriceList;
    //    this.selectedConvention = this.codeConvention;
    //    this.selectedSociete = this.codeSociete;
    //    this.selectedValue == 2;
    //  }
     sessionStorage.setItem("CodePatientTemp", this.SelectedPatientFromList);
     this.visibleModalRecherPatient = false;
     this.getCodeSaisieAdmissionOPD();



     this.RegDeferral = checkedRegDef;
     this.visibleModal = true;
     this.GetAllMedecinContientConsultation();
     if (sessionStorage.getItem("CheckRegDef") == "false") {
       this.GetAllModeReglement();
     }


     this.code == undefined;



      } else {
        this.visibleModalNewAdmission = false;
        this.visibleModalRecherPatient = true;
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showNotificationِCustom("PleaseChoiseDateVisteOrTypeViste"); //Show alert for missing data
      }

      this.codeSaisie = 'OPD250938471'

    } else if (mode === 'voirDetailsVisite') {
      // Handle 'voirDetailsVisite' mode
    }
  }


  selectedVisiteRowIndex: number | null = null;

  validateAdmissionData(index: number): boolean {
    if (index >= 0 && index < this.dataVisite.length) {
      const rowData = this.dataVisite[index];
      return rowData.dateVisite && rowData.typeVisite  ; // Ensure all required fields are filled
    }
    return false; //Invalid index
  }


  // SetDataCliniqueCurrent(index:number): number {
  //   let curentClinique = 0; // Default value if not set; 
  //   if (index >= 0 && index < this.dataVisite.length) {
  //     const rowData = this.dataVisite[index];

  //     // console.log("rowData.currentClinique" , rowData.currentClinique);
  //     curentClinique=  rowData.currentClinique;
  //     return  rowData.currentClinique; // Ensure all required fields are filled
  //   }
  //   return curentClinique;
  // }
  removeRow(index: number) {
    if (index !== 0) {
      this.dataVisite.splice(index, 1);
    }

  }

  LoadData(codePatient: any) {

  }

  GetPrixOperationSelcted(codeOperation: any) {
    // this.param_service.GetPrixOperation(codeOperation).subscribe((data: any) => {
    //   this.prixMoyeneOperation = data.prix;
    // })

    this.prixMoyeneOperation = 3850;
  }

  LabelDiagnosis = "";




  //// modal admission
  visibleModalAdmission =false;

  RegDeferral = false;
  RegDef = false;
  LabelRegDefferral = "";
  DisabledReg() {
    if (this.RegDeferral === true) {
      this.RegDef = true;
    } else {
      this.RegDef = false;
      this.GetAllModeReglement();

    }
  }
  dataModeRegelement = new Array<any>();
  dataModeRegelementPushed = new Array<any>();
  listModeReglementRslt = new Array<any>();
  GetAllModeReglement() {
    this.param_service.GetModeReglement().subscribe((data: any) => {
      this.dataModeRegelement = data;
      this.dataModeRegelementPushed = [];
      for (let i = 0; i < this.dataModeRegelement.length; i++) {
        this.dataModeRegelementPushed.push({ label: this.dataModeRegelement[i].codeSaisie + " || " + this.dataModeRegelement[i].designationAr, value: this.dataModeRegelement[i].code })
      }
      this.listModeReglementRslt = this.dataModeRegelementPushed;
    })
  }

  selectedValue: any = 0;
  selectedValueNew: any = 0;
  visbileModalPassword = false;
  decryptedValue: string = '';
  VisiblePEC    = false;
  OpenmodalPassword(mode: string) {
    this.visibleModalAdmission = false; 
    this.visibleModalAddPatient = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'passwordModal') {




      button.setAttribute('data-target', '#ModalPassword');
      this.formHeader = this.i18nService.getString('Password');
      this.visibleModalRecherPatient = false;
      this.visibleModalAdmission = true;
      this.visibleModalAddPatient = false; 
      this.visbileModalPassword = true;

    }




  }

  selectedSociete: any = null;
  dataSociete = new Array<any>();
  listSocietePushed = new Array<any>();
  ListSocieteRslt= new Array<any>();
  GetSociete() {
    this.param_service.GetSocieteActif().subscribe((data: any) => {
      this.dataSociete = data;
      this.listSocietePushed = [];
      for (let i = 0; i < this.dataSociete.length; i++) {
        this.listSocietePushed.push({ label: this.dataSociete[i].designationAr, value: this.dataSociete[i].code })
      }
      this.ListSocieteRslt = this.listSocietePushed;
    })
  }

  
  columnTabsListMedecin!: any[];
  columnsListMedecin() {
    this.columnTabsListMedecin = [

      // { field: '', header: '' },
      { field: 'codeMedecin', header: this.i18nService.getString('CodeMedecin') },
      { field: 'NomFullArMedecin', header: this.i18nService.getString('NomFullAr') },
      { field: 'NomFullLtMedecin', header: this.i18nService.getString('NomFullLt') },
      { field: 'specialite_medecin', header: this.i18nService.getString('SpecialiteMedecin') },
      { field: 'Cabinet', header: this.i18nService.getString('CabinetDesgiantion') },
      { field: 'montantConsultation', header: this.i18nService.getString('montantConsultation') }

    ];


  }
  
  sumMontantFromDetails(details: any[]): number {
    if (!details || !Array.isArray(details) || details.length === 0) {
      return 0;
    }
    if (!this.selectedConvention && this.selectedValue == 2) {
      return 0; //Condition met, return 0
    } else {
      return details.reduce((sum, detail) => sum + (detail.montant || 0), 0);
    }
  }
  codeConvention: any = null;
  ListMedecinTried = new Array<any>();
  selectedConvention: any = null;
  async GetAllMedecinContientConsultation() {
    try {
      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, "yyyy-MM-dd");
      const natureAdmOPD = sessionStorage.getItem("NatureAdmissionOPD");
      const codeNatAdmOPD = Number(natureAdmOPD);

      // Fetch codeConvention and PriceListCash concurrently
      const [planningCabinets, priceListCashResult] = await Promise.all([
        this.recept_service.GetPlanningCabinetByDateExiste(formattedDate, formattedDate).toPromise(), // toPromise() for async/await
        // this.param_service.GetParam("codeConvention").toPromise(), // Assuming you have a method to fetch codeConvention

        this.param_service.GetParam("PriceListCash").toPromise(),
      ]);

      this.codeConvention = this.selectedConvention; // Assign the results
      const priceListCashValue = priceListCashResult.valeur; // Assuming the value is in 'valeur' property

      if (planningCabinets.length === 0) {
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showNotificationِCustom("NoPlanningInThisDay");
        this.ListMedecinTried = [];
        return;
      }

      const consultationData = await this.fetchConsultationData(planningCabinets, codeNatAdmOPD, priceListCashValue);

      this.ListMedecinTried = consultationData;
      if (this.ListMedecinTried.length === 0) {
        console.log("No médecins found with consultations");
      }

    } catch (error) {
      console.error("Error fetching médecin data:", error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  }
  
  //Helper Function to improve readability and maintainability.
  async fetchConsultationData(planningCabinets: any[], codeNatAdmOPD: number, priceListCashValue: any) {
    const requests = planningCabinets.map(medecin =>
      this.param_service.GetPrestationConsultationByCodeMedecinAndCodeNatureAdmission(medecin.codeMedecin, codeNatAdmOPD)
        .pipe(
          map((datax: any) => ({ medecin, codePrestation: datax.codePrestation }))
        )
    );

    const consultationData = await Promise.all(requests.map(obs => firstValueFrom(obs)));


    const priceRequests = consultationData.map(({ medecin, codePrestation }) => {
      if (this.codeConvention) {
        sessionStorage.setItem("PriceListTempSelectedTemp", this.selctedPriceListConvention);
        return this.param_service.GetDetailsPriceListByCodePriceListAndCodePrestationAnd(this.selctedPriceListConvention, codePrestation, codeNatAdmOPD)
          .pipe(
            map((dataDetailsCouverture: any) => ({
              ...medecin,
              // montantConsultation: dataDetailsCouverture.montantPEC
              montantConsultation: this.sumMontantFromDetails(dataDetailsCouverture)
            }))
          );

      } else {
        sessionStorage.setItem("PriceListTempSelectedTemp", priceListCashValue);
        return this.param_service.GetDetailsPriceListByCodePriceListAndCodePrestationAnd(priceListCashValue, medecin.medecinDTO.prestationConsultationDTO.codePrestation, codeNatAdmOPD)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              console.error('Error :', error);
              return throwError(() => new Error('Failed to Get Prestation.'));
            }),
            map((dataDetailsPL: any) => (

              {
                ...medecin,
                montantConsultation: this.sumMontantFromDetails(dataDetailsPL) || 0
              }

            ))
          );
      }
    });

    return Promise.all(priceRequests.map(obs => firstValueFrom(obs)));
  }

  selctedPriceListConvention: any;
  GetDetailsConventionSelected() {

    this.param_service.GetConventionByCode(this.selectedConvention).subscribe((date: any) => {
      this.selctedPriceListConvention = date.codePriceList;
      sessionStorage.setItem("ListCouvertureTemp", date.codeListCouverture);

    }

    );
    this.GetAllMedecinContientConsultation();

  }

  ListConventionRslt = new Array<any>();
  dataConvention = new Array<any>();
  listConventionPushed: any;
  GetListConventionFromSociete(codeSociet: number) {
    this.selectedConvention = "";
    this.param_service.GetConventionByCodeSociete(codeSociet).subscribe((data: any) => {
      this.dataConvention = data;
      this.listConventionPushed = [];
      for (let i = 0; i < this.dataConvention.length; i++) {
        this.listConventionPushed.push({ label: this.dataConvention[i].designationAr, value: this.dataConvention[i].code })
      }
      this.ListConventionRslt = this.listConventionPushed;
    })



  }
  Total: number = 0;
  SelectedPatients: any;
  SelectedMedecinFromList: any;
  onRowUnselectFromTabsMedecin(event: any) {
    this.SelectedPatients = null;
    this.Total = 0;


  }

  mntCash: any = 0;
  mntPEC: any = 0;
  mntReqPayed: any = 0;
  mntPayed: any = 0;
  onRowSelectFromTabsMedecin(event: any) {

    if (this.selectedValue == 2 && this.selectedConvention == null || this.selectedValue == 2 && this.selectedSociete == null) {


      this.CtrlAlertify.showNotificationِCustom('selctedAnyConventionOrSociete')
      this.CtrlAlertify.PostionLabelNotification();

    } else {

      if (this.selectedValue == 1) {
        this.mntCash = event.data.montantConsultation;
        this.mntPEC = 0;
        this.mntReqPayed = event.data.montantConsultation;
        this.mntPayed = event.data.montantConsultation;
        console.log("SelectedMedecinFromList  ", this.SelectedMedecinFromList)
      } else {

        if (this.selectedConvention == "" || this.selectedConvention == undefined || this.selectedConvention == null) {

          this.CtrlAlertify.showNotificationِCustom('selctedAnyConventionOrSociete')
          this.CtrlAlertify.PostionLabelNotification();
        } else {
          const conventionSelected = this.dataConvention.find(m => m.code === this.selectedConvention);

          const codeNatureAdmissionOPd = sessionStorage.getItem("NatureAdmissionOPD");
          this.param_service.GetDetailsListCouverturePrestationByCodeListCouvertureAndCodePrestationAndCodeNatureAdmission(conventionSelected.codeListCouverture, this.SelectedMedecinFromList.medecinDTO.prestationConsultationDTO.codePrestation, codeNatureAdmissionOPd).subscribe(
            (data: any) => {
              console.log("data couverure", data);
              console.log("SelectedMedecinFromList  ", this.SelectedMedecinFromList)
              this.mntCash = data.montantPatient;
              this.mntPEC = data.montantPEC;
              this.mntReqPayed = data.montantPatient;
              this.mntPayed = data.montantPatient;

            })
        }

        // GetDataFromConventionEtListCouverture


      }






      console.log("Ok medecin", event.data);
    }




  }

  first = 0;
  DisBanque: boolean = true;
  DisCaisse: boolean = true;
  selectedBanque: any = null;
  numPiece: any = null;
  selectedModeReglement: any;
  GetBanqueIfNeed() {
    const modRegSelected = this.dataModeRegelement.find(m => m.code === this.selectedModeReglement);

    if (modRegSelected.reqBanque == false) {
      this.DisBanque = true;
      this.selectedBanque = null;
      this.numPiece = '';

    } else {
      this.DisBanque = false;
      this.DisCaisse = true;
      this.GetAllBanque();
      // this.selectedCaisse = null;
    }


  }
  
  dataBanque = new Array<any>();
  dataBanquePushed: any[] = [];
  listBanqueRslt = new Array<any>();
  GetAllBanque() {
    this.param_service.GetBanque().subscribe((data: any[]) => {
      this.dataBanque = data;
      this.dataBanquePushed = [];
      for (let i = 0; i < this.dataBanque.length; i++) {
        this.dataBanquePushed.push({ label: this.dataBanque[i].codeSaisie + " || " + this.dataBanque[i].designationAr, value: this.dataBanque[i].code })
      }
      this.listBanqueRslt = this.dataBanquePushed;

      
    })
  }
  password: any;
  CloseModalPassWord() {
    this.visbileModalPassword = false;
  }

  GetIfNeedSocForAddAdmission() {

    const encryptedValue = sessionStorage.getItem('PassCashPEC');
    if (encryptedValue) {

      this.decryptedValue = this.encryptionService.decrypt(encryptedValue);

    } else {
      this.decryptedValue = 'No value found in session storage';
    }
    if (this.password != this.decryptedValue) {
      this.CtrlAlertify.PostionLabelNotification();
      this.CtrlAlertify.showNotificationِCustom("PasswordError");




    } else {
      this.password = "";

      this.visbileModalPassword = false;
      if (this.selectedValue === 1) {
        this.selectedValue = 2
        this.SelectedMedecinFromList = '';
        this.mntCash = 0;
        this.mntPEC = 0;
        this.mntPayed = 0;
        this.mntReqPayed = 0;
        this.VisiblePEC = true;
        sessionStorage.removeItem("PriceListTempSelectedTemp");
        sessionStorage.removeItem("ListCouvertureTemp");
        this.GetSociete();
        this.GetAllMedecinContientConsultation();
      } else {
        this.selectedValue = 1;
        this.VisiblePEC = false;
        this.SelectedMedecinFromList = '';
        this.selectedConvention = "";
        this.selectedSociete = "";
        this.GetAllMedecinContientConsultation();
      }
    }



  }

}
