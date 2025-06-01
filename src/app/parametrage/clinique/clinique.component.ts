import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../Shared/i18n/i18n.service';
import { CalanderTransService } from '../../Shared/CalanderService/CalanderTransService';
import { MenuItem } from 'primeng/api';
import { ControlServiceAlertify } from '../../Shared/Control/ControlRow';

@Component({
  selector: 'app-clinique',
  templateUrl: './clinique.component.html',
  styleUrls: ['./clinique.component.css' , '.../../../src/assets/css/StyleApplication.css'],
  providers: [CalanderTransService]
})
export class CliniqueComponent implements OnInit {
  constructor(private router: Router, private CtrlAlertify: ControlServiceAlertify,public i18nService: I18nService, private calandTrans: CalanderTransService)
  {this.calandTrans.setLangAR();}
  dataClinic!: any[];
  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }


  ngOnInit() {
    this.GetColumns();
    this.GetAllCliniqueActif()
    this.items = [
      { label: this.i18nService.getString('LabelActif') || 'LabelActif', icon: 'pi pi-file-check', command: () => { this.GetAllCliniqueActif() } },
      { label: this.i18nService.getString('LabelInActif') || 'LabelInActif', icon: 'pi pi-file-excel', command: () => { this.GetAllCliniqueInActif() } },
      { label: this.i18nService.getString('LabelAll') || 'LabelAll', icon: 'pi pi-file', command: () => { this.GetAllClinique() } },
    ];
    this.activeItem = this.items[0];
  }

  loadingData = false;
  selectedClinqiue=null;
  cols!: any[];

  GetColumns() {
    this.cols = [
      { field: 'codeSaisie', header: this.i18nService.getString('CodeSaisie') || 'CodeSaisie', type: 'text', width: '22%' },
      { field: 'designationAr', header: this.i18nService.getString('DesignationAr') || 'DesignationAr', type: 'text', width: '22%' },
      { field: 'designationLt', header: this.i18nService.getString('DesignationLt') || 'DesignationLt', type: 'text', width: '16%' },
       { field: 'actif', header: this.i18nService.getString('LabelActif') || 'LabelActif', type: 'checkbox', width: '10%' }, // exam Count
 
    ];
  }

  onRowSelect(event: any) {
    // this.designationArExam = event.data.designationArPres;
    // this.GetAllDdeForMedecin(event.data.codePrestation);
  }

  onRowUnselect(event: any) {
    this.selectedClinqiue = event.data = null;
   
  }

  GetData(){
    
  }

 
  pdfData!: Blob;
  isLoading = false; 
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  check_actif = false;
  check_inactif = false;
  formHeader = ".....";
 
  visibleModal: boolean = false;
  visibleModalPrint: boolean = false;
  visDelete: boolean = false;
  code!: number | null;
  codeSaisie: any;
  designationAr: string = 'NULL';
  designationLt: string = "NULL";
  rib!: string;
  actif!: boolean;
  visible!: boolean;
  LabelActif!: string;
   userCreate = sessionStorage.getItem("userName");
  // dataClinique = new Array<any>();
 


  GetAllClinique(){
    this.dataClinic = [
      { codeSaisie:'Clinic1', designationAr: 'مستشفى 1 ', designationLt: 'Clinic Test 1 ', actif: true },
      { codeSaisie:'Clinic2', designationAr: 'مستشفى 2 ', designationLt: 'Clinic Test 2 ', actif: true },
      { codeSaisie:'Clinic3', designationAr: 'مستشفى 3 ', designationLt: 'Clinic Test 3 ', actif: true },
      { codeSaisie:'Clinic4', designationAr: 'مستشفى 4 ', designationLt: 'Clinic Test 4 ', actif: false },
      ]

  }
  
  GetAllCliniqueActif(){
    this.dataClinic = [
      { codeSaisie:'Clinic1', designationAr: 'مستشفى 1 ', designationLt: 'Clinic Test 1 ', actif: true },
      { codeSaisie:'Clinic2', designationAr: 'مستشفى 2 ', designationLt: 'Clinic Test 2 ', actif: true },
      { codeSaisie:'Clinic3', designationAr: 'مستشفى 3 ', designationLt: 'Clinic Test 3 ', actif: true },
      ]
    
  }
    
  GetAllCliniqueInActif(){
    this.dataClinic = [ 
      { codeSaisie:'Clinic4', designationAr: 'مستشفى 4 ', designationLt: 'Clinic Test 4 ', actif: false },
      
      ]
    
  }

  GetCodeSaisie() {
    // this.param_service.GetCompteur("CodeSaisieBlocOperation").
    //   subscribe((data: any) => {
    //     this.codeSaisie = data.prefixe + data.suffixe;
    //   })
  }
  clearForm() {
    this.code == undefined;
    this.designationAr = '';
    this.designationLt = '';
    this.actif = false;
    this.visibleModal = false;
    this.codeSaisie = '';
    this.selectedClinqiue = null;
    this.onRowUnselect(event);

  }

  
  public onOpenModal(mode: string) {
  
    this.LabelActif = this.i18nService.getString('LabelActif');
    this.visibleModal = false;
    this.visDelete = false;
    this.visibleModalPrint = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#Modal');
      this.formHeader = this.i18nService.getString('Add') +' ' +this.i18nService.getString('Clinique')  ;
      this.onRowUnselect(event);
 
      this.clearForm();
      this.GetCodeSaisie();   
      this.actif = false;
      this.visible = false;
      this.visibleModal = true;
      this.code == undefined;


    }
    if (mode === 'edit') {


      if (this.code == undefined) {
        this.clearForm();
        this.onRowUnselect(event);
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showChoseAnyRowNotification();
        this.visDelete == false && this.visibleModal == false
      } else {

        button.setAttribute('data-target', '#Modal');
        this.formHeader = this.i18nService.getString('Modifier')  +' ' +this.i18nService.getString('Clinique')  ;;
  

        this.visibleModal = true;
        this.onRowSelect;

      }

    }

    if (mode === 'Delete') {

      if (this.code == undefined) {
        this.onRowUnselect;
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showChoseAnyRowNotification();
        this.visDelete == false && this.visibleModal == false
      } else {

        {
          button.setAttribute('data-target', '#ModalDelete');
          this.formHeader = this.i18nService.getString('Delete')  +' ' +this.i18nService.getString('Clinique')  ;;
          this.visDelete = true;

        }
      }

    }

    if (mode === 'Print') {
      if (this.code == undefined) {
        this.onRowUnselect;
        this.CtrlAlertify.PostionLabelNotification();
        this.CtrlAlertify.showChoseAnyRowNotification();
        this.visDelete == false && this.visibleModal == false && this.visibleModalPrint == false
      } else {
        button.setAttribute('data-target', '#ModalPrint');
        this.formHeader = "Imprimer Liste BlocOperation"
        this.visibleModalPrint = true;
        // this.RemplirePrint();

      }




    }

  }

  PostClinique(){

  }

  DeleteClinique(codeClinique:any){

  }

  
  CloseModal() {
    this.visDelete = false;
  }

  CloseModalPrint() {
    this.visibleModalPrint = false;
  }

  first = 0;

}
