import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../Shared/i18n/i18n.service';
import { CalanderTransService } from '../../Shared/CalanderService/CalanderTransService';
import { MenuItem } from 'primeng/api';
import { ControlServiceAlertify } from '../../Shared/Control/ControlRow';

@Component({
  selector: 'app-type-operation',
  templateUrl: './type-operation.component.html',
  styleUrls: ['./type-operation.component.css', '.../../../src/assets/css/StyleApplication.css'],
  providers: [CalanderTransService]
})
export class TypeOperationComponent {
  constructor(private router: Router, private CtrlAlertify: ControlServiceAlertify,public i18nService: I18nService, private calandTrans: CalanderTransService)
  {this.calandTrans.setLangAR();}
  products!: any[];
  @Output() closed: EventEmitter<string> = new EventEmitter();
  closeThisComponent() {
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/');
    this.closed.emit(parentUrl);
    this.router.navigate([parentUrl]);
  }


  ngOnInit() {
    this.GetColumns();
    this.items = [
      { label: this.i18nService.getString('LabelActif') || 'LabelActif', icon: 'pi pi-file-check', command: () => { this.GetAllTypeOperationActif() } },
      { label: this.i18nService.getString('LabelInActif') || 'LabelInActif', icon: 'pi pi-file-excel', command: () => { this.GetAllTypeOperationInActif() } },
      { label: this.i18nService.getString('LabelAll') || 'LabelAll', icon: 'pi pi-file', command: () => { this.GetAllTypeOperation() } },
    ];
    this.activeItem = this.items[0];
  }

  loadingData = false;
  selectedClinqiue=null;
  cols!: any[];

  GetColumns() {
    this.cols = [
      { field: 'codeSaisie', header: this.i18nService.getString('CodeSaisie') || 'CodeSaisie', type: 'text', width: '22%' },
      { field: 'designationArPres', header: this.i18nService.getString('DesignationAr') || 'DesignationAr', type: 'text', width: '22%' },
      { field: 'designationLtPres', header: this.i18nService.getString('DesignationLt') || 'DesignationLt', type: 'text', width: '16%' },
       { field: 'actif', header: this.i18nService.getString('LabelActif') || 'LabelActif', type: 'text', width: '10%' }, // exam Count
 
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
  dataTypeOperation = new Array<any>();
 


  GetAllTypeOperation(){

  }
  
  GetAllTypeOperationActif(){
    
  }
    
  GetAllTypeOperationInActif(){
    
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
      this.formHeader = this.i18nService.getString('Add') +' ' +this.i18nService.getString('TypeOperation')  ;
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
        this.formHeader = this.i18nService.getString('Modifier')  +' ' +this.i18nService.getString('TypeOperation')  ;;
  

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
          this.formHeader = this.i18nService.getString('Delete')  +' ' +this.i18nService.getString('TypeOperation')  ;;
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

  PostTypeOperation(){

  }

  DeleteTypeOperation(codeTypeOperation:any){

  }

  
  CloseModal() {
    this.visDelete = false;
  }

  CloseModalPrint() {
    this.visibleModalPrint = false;
  }

}

