import { EventEmitter, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NavigationService } from '../service/NavigationService';
import { PatientSelectionService } from '../service/patientSelected/patient-selected.service';
import { SessionStorageService } from '../service/SessionStorageService';
import { DmiOpdService } from '../service/ServiceClient/dmi-opd.service';
import { I18nService } from '../../Shared/i18n/i18n.service'; 
import { ControlServiceAlertify } from '../../Shared/Control/ControlRow';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as PDFObject from 'pdfobject';
import { ParametrageService } from '../../parametrage/ServiceClient/parametrage.service';


export interface ExmaneDTO {
  // code: any;
  // codeAdmission: number;
  // codeEtatPaiement: number;
  // dateCreate: string;
  // codeNatureAdmission: number;
  // codePatient: number;
  // codePrestation: number;
  // typeExamen: string;


  code: any,
  codeAdmission: any

  codeNatureAdmission: any
  codePatient: any,
  codePrestation: any
  dateCreate: any
  userCreate: any

}

// declare const PDFObject: any;
@Component({
  selector: 'app-request-opd',
  templateUrl: './request-opd.component.html',
  styleUrls: ['./request-opd.component.css' 
    , '.../../../src/assets/css/StyleApplication.css'],
  providers: [MessageService, ConfirmationService]
})
export class RequestOPDComponent implements OnInit {

  NotSelectedPatient: boolean = false;
  SelectedPatient: boolean = false;
  codeAdmission: string | null = null; // Define type for codeAdmission

  cols!: any[];
  colsRadio!: any[];

  // pdfData!: Blob;
  first = 0;
  Add!: string;

  VisibleAddReqLabo = false;
  VisibleAddReqRadio = false;
  visibleModalPrint = false;

  userCreate = sessionStorage.getItem("userName");

  selectedReqLab: any;
  dataRequestLabo = new Array<any>();
  dataPrestationLabo = new Array<any>();
  SelectedPrestationLabo: any[] = [];
  colsTabReqLabo!: any[];

  dataRequestRadio = new Array<any>();
  dataPrestationRadio = new Array<any>();
  SelectedPrestationRadio: any[] = [];
  colsTabReqRadio!: any[];
  selectedReqRadio: any;

  visDelete = false;
  formHeader = "";
  constructor(private CtrlAlertify: ControlServiceAlertify, public param_service: ParametrageService,
    public i18nService: I18nService, private dmi_opd_service: DmiOpdService,
    private patientSelectionService: PatientSelectionService, private navigationService: NavigationService,
    private sessionStorageService: SessionStorageService, private router: Router,
    private messageService: MessageService ,private http: HttpClient) { }

  navigateToAdmissionList() {
    this.navigationService.navigateToAdmissionList();
  }
  reloadCurrentRoute() {

    setTimeout(() => {
      window.location.reload();
    }, 1);

  }

  reloadCurrentRoute2() {
    this.router.navigateByUrl('/menu_dmi/request_opd', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
  storedPatientData: any;
  ngOnInit(): void {
    this.storedPatientData = this.sessionStorageService.getJsonItem('codeAdmissionSelected');
    if (this.storedPatientData === undefined || this.storedPatientData === null) {
      this.NotSelectedPatient = true;
      this.SelectedPatient = false;
      this.CtrlAlertify.PostionLabelNotificationDMI();
      this.CtrlAlertify.showNotificationِCustom("PleaseSelectAnyAdmission");
      this.router.navigate(['/menu_dmi/list_admission_opd']);
    } else {

      this.patientSelectionService.setSelectedCodeAdmission(this.storedPatientData.codeSaisie || 'CodeSaisieAdmissionError');
      this.patientSelectionService.setSelectedPatientName(this.storedPatientData.patientDTO.nomCompltLt || 'NamePaitentError');
      this.patientSelectionService.setSelectedCodePatient(this.storedPatientData.patientDTO.codeSaisie || 'codeSaisiePatient');

      this.NotSelectedPatient = false;
      this.SelectedPatient = true;
      this.GetColumnsLabo();
      this.GetColumnsRadio();
      this.GetAllRequestLabobyCodeAdmission();

      this.GetAllRequestRadiobyCodeAdmission();
    }


  }



  GetAllExamenByCodeAdmissionAndTypeExamenLabo() {
    this.dmi_opd_service.GetExamenByTypeExamenAndCodeAdmission("L", this.storedPatientData.codeSaisie).subscribe(() => {

    })
  }
  GetAllExamenByCodeAdmissionAndTypeExamenRadio() {
    this.dmi_opd_service.GetExamenByTypeExamenAndCodeAdmission("R", this.storedPatientData.codeSaisie).subscribe(() => {

    })
  }

  // reportServer: string = 'http://localhost:80/ReportServer';
  // reportUrl: string = '/Pages/ReportViewer.aspx?%2fTest%2fnew';








  // PrintReportingold() {


  //   this.dmi_opd_service.GetReports()
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         let errorMessage = '';
  //         if (error.status === 401) { // Unauthorized (common for authentication issues)
  //           errorMessage = 'Unauthorized access to the report.';
  //         } else if (error.status === 500) { // Server error
  //           errorMessage = 'Server error retrieving report. Please try again later.';
  //         } else {
  //           errorMessage = `Error retrieving report: ${error.message}`;
  //         }
  //         this.handleError2(errorMessage);
  //         return throwError(() => new Error(errorMessage)); // Return an observable with the error

  //       })
  //     ).subscribe({
  //       next: (blob: Blob) => {
  //         const reader = new FileReader();
  //         reader.onload = (event: any) => {
  //           this.pdfData = event.target.result;
  //           if (this.pdfData) {
  //             this.handleRenderPdf2(this.pdfData);
  //           } else {
  //             this.handleError2("Failed to load PDF data.");
  //           }
  //         };
  //         reader.onerror = (error: any) => {
  //           this.handleError2(`Failed to read PDF: ${error}`);
  //         };
  //         reader.readAsDataURL(blob); // Call readAsDataURL after setting the event handlers
  //       },
  //       error: (error: any) => {
  //         this.handleError2(`Failed to fetch PDF: ${error.message}`);
  //       }
  //     });
  // }

  reportServer: any;
  reportPath: any;
  showParameters: any;
  parameters: any;
  language: any;
  width: any;
  height: any;
  toolbar: any;
  ssrsReportViewerOptions: any;

  // PrintReporting() {

  //   // this.reportServer = 'http://soufien:80/ReportServer?username=administrator&password=54328336';
  //   this.reportServer = `https://administrator:54328336@soufien:80/ReportServer`;
  //   this.reportPath = 'test/new';
  //   this.showParameters = "false"; //true, false, collapsed
  //   this.parameters = {
  //     "codeAdmission": "5",
  //   };
  //   this.language = "en-us";
  //   this.width = 200;
  //   this.height = 200;
  //   this.toolbar = "true";
  //   this.visibleModalPrint = true; // Show the dialog AFTER setting report parameters
  // }
  // async PrintReporting() {
  //   // ... other code ...

  //   try {
  //     // const token = await this.getToken(); // Function to get the authentication token
  //     const codeAdmission = JSON.parse(sessionStorage.getItem("auth-user") ?? '{}')?.token;
  //     // this.reportServer = `http://soufien:80/ReportServer?token=${codeAdmission}`; // Include token in URL
  //     this.reportServer = `http://administrator:54328336@soufien:80/ReportServer`;
  //     // this.reportServer = `http://soufien:80/ReportServer`;
  //     this.reportPath = 'test/new';
  //         this.showParameters = "false"; //true, false, collapsed
  //   this.parameters = {
  //     "codeAdmission": "5",
  //   };
  //   this.language = "en-us";
  //   this.width = 200;
  //   this.height = 200;
  //   this.toolbar = "true";
  //     this.visibleModalPrint = true;
  //   } catch (error) {
  //     console.error("Authentication failed:", error);
  //     // Handle authentication error appropriately (e.g., display an error message)
  //   }
  // }


  PrintReporting() {
    this.reportServer = 'http://administrator:54328336@soufien/ReportServer/' //  `http://localhost/ReportServer`;  ;
    this.reportPath = 'Reporting/editionOPD';
    this.showParameters = "false";
    this.parameters = {
      "dateFin": "01/01/2025",
      "dateDeb": "01/01/2025",
      "user": 'soufiennnDirect',
    };
    this.language = "en-us";
    this.width = 50;
    this.height = 50;
    this.toolbar = "true";
    this.visibleModalPrint = true;


    const authHeader = new HttpHeaders({
      Authorization: 'Basic ' + btoa('admininistrator:54328336') // btoa encodes to base64
    });
  
    this.http.get(`${this.reportServer}${this.reportPath}`, {
      headers: authHeader,
      responseType: 'blob', // Or appropriate type for your report response
      // withCredentials: true // Crucial for HTTP Basic Auth, check if needed for your setup
    }).subscribe(
      (response) => { 
        const url = window.URL.createObjectURL(response);
        window.open(url);
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }



  handleRenderPdf2(data: any) {
    if (data) {
      const pdfObject = PDFObject.embed(data, '#pdfContainer');
      // pdfObject.on('complete', () => {
      //     console.log('PDF rendered successfully');
      // });
      // pdfObject.on('error', (error:any) => {
      //     this.handleError2(`PDF rendering error: ${error}`);
      // });
    }
  }

  handleError2(message: string) {
    // Display an error message to the user
    console.error(message);
    // Example using PrimeNG's message service:
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  onOpenModal(mode: string) {
    this.Add = this.i18nService.getString('Add');

    this.VisibleAddReqLabo = false;
    this.VisibleAddReqRadio = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'ReqLabo') {
      button.setAttribute('data-target', '#ModalReqLabo');
      this.VisibleAddReqLabo = true;
      this.GetPrestationLabo();
      this.GetColumnsTabReqLabo();
    }
    else if (mode === 'Print') {

      if (this.selectedReqLab === undefined || this.selectedReqLab === null) {
        this.CtrlAlertify.PostionLabelNotificationDMI();
        this.CtrlAlertify.showChoseAnyRowNotificationDMI();
      } else {

        button.setAttribute('data-target', '#ModalPrint');
        this.formHeader = "Print Request Laboratory"
        this.visibleModalPrint = true;
        this.PrintReqLabo(this.selectedReqLab.code);

      }



    } else if (mode === 'ReqRad') {
      button.setAttribute('data-target', '#ModalReqLabo');

      this.VisibleAddReqRadio = true;
      this.GetPrestationRadio();
      this.GetColumnsTabReqRadio();
    } else if (mode === 'PrintRadio') {

      if (this.selectedReqRadio === undefined || this.selectedReqRadio === null) {
        this.CtrlAlertify.PostionLabelNotificationDMI();
        this.CtrlAlertify.showChoseAnyRowNotificationDMI();
      } else {

        button.setAttribute('data-target', '#ModalPrint');
        this.formHeader = "Print Request Radiology"
        this.visibleModalPrint = true;
        this.PrintReqLabo(this.selectedReqRadio.code);
      }



    }


  }
  GetColumnsLabo() {
    this.cols = [
      { field: 'codeSaisie', header: 'CodeSaisie', width: '5%', filter: "true" },
      { field: 'SourceDepenese', header: 'Exmane List', width: '5%', filter: "true" },
      { field: 'dateCreate', header: 'Date Create', width: '5%', filter: "true" },
      { field: 'userCreate', header: 'User Create', width: '5%', filter: "true" },
      { field: '', header: 'Print', width: '1%', filter: "true" },
      { field: '', header: 'Remove', width: '1%', filter: "true" },

    ];
  }

  GetColumnsRadio() {
    this.colsRadio = [
      { field: 'codeSaisie', header: 'CodeSaisie', width: '5%', filter: "true" },
      { field: 'SourceDepenese', header: 'Exmane List', width: '5%', filter: "true" },
      { field: 'dateCreate', header: 'Date Create', width: '5%', filter: "true" },
      { field: 'userCreate', header: 'User Create', width: '5%', filter: "true" },
      { field: '', header: 'Print', width: '1%', filter: "true" },
      { field: '', header: 'Remove', width: '1%', filter: "true" },

    ];
  }

  GetColumnsTabReqLabo() {
    this.colsTabReqLabo = [
      { field: 'sousFamillePrestationDTO.designationAr', header: 'Sous Famille Prestation', filter: "true", width: '25%' },

      { field: 'codeSaisie', header: 'CodeSaisie', width: '25%', filter: "true" },
      { field: 'designationLt', header: 'Designation', width: '50%', filter: "true" },
      { field: '', header: 'Choose', width: '10%', filter: "true" },

    ]
  }


  GetColumnsTabReqRadio() {
    this.colsTabReqLabo = [
      { field: 'sousFamillePrestationDTO.designationAr', header: 'Sous Famille Prestation', filter: "true", width: '25%' },

      { field: 'codeSaisie', header: 'CodeSaisie', width: '25%', filter: "true" },
      { field: 'designationLt', header: 'Designation', width: '50%', filter: "true" },
      { field: '', header: 'Choose', width: '10%', filter: "true" },

    ]
  }

  onRowUnselectFromTabReqLab(event: any) {
    this.selectedReqLab = null;
  }
  onRowUnselectFromTabReqRadio(event: any) {
    this.selectedReqRadio = null;
  }



  codeDemandeLab: any;
  onRowSelectFromTabReqLab(event: any) {
    console.log("event data code req lab ", event.data.code);
    this.codeDemandeLab = event.data.code;
  }


  codeDemandeRadio: any;
  onRowSelectFromTabReqRadio(event: any) {
    console.log("event data code req Radio ", event.data.code);
    this.codeDemandeRadio = event.data.code;
  }

  public PrintReqLabo(codeExamen: any): void {

    // console.log("selcted req lab ", this.selectedReqLab);
    this.GetReqLabForPrint(codeExamen);


  }

  public PrintReqRadio(codeExamen: any): void {

    // console.log("selcted req lab ", this.selectedReqLab);
    this.GetReqLabForPrint(codeExamen);


  }



  public RemoveReqLabo(): void {
    if (this.selectedReqLab) {
      const codeToDelete = this.selectedReqLab.code; // Get the code from the selected row



      this.dmi_opd_service.DeleteExamen(codeToDelete).subscribe({
        next: () => {
          this.dataRequestLabo = this.dataRequestLabo.filter(item => item.code !== codeToDelete); //Filter out deleted item
          this.selectedReqLab = null; //Clear selection after deletion
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request successfully deleted.' });

          this.CtrlAlertify.PostionLabelNotificationDMI();
          this.CtrlAlertify.ShowDeletedOKDMI();
          this.visDelete = false;

        },
        error: () => {
          this.CtrlAlertify.PostionLabelNotificationDMI();
          this.CtrlAlertify.showNotificationِCustom("Error")

          this.visDelete = false;

          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete request.' });
          // console.error('Error deleting request:', err);
        }
      });
    } else {
      // this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No row selected for deletion.' });
      this.CtrlAlertify.PostionLabelNotificationDMI();
      this.CtrlAlertify.showNotificationِCustom("SelctAnyRow")
      this.visDelete = false;

    }
  }


  public RemoveReqRadio(): void {
    if (this.selectedReqRadio) {
      const codeToDelete = this.selectedReqRadio.code; // Get the code from the selected row



      this.dmi_opd_service.DeleteExamen(codeToDelete).subscribe({
        next: () => {
          this.dataRequestRadio = this.dataRequestRadio.filter(item => item.code !== codeToDelete); //Filter out deleted item
          this.selectedReqRadio = null; //Clear selection after deletion
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request successfully deleted.' });

          this.CtrlAlertify.PostionLabelNotificationDMI();
          this.CtrlAlertify.ShowDeletedOKDMI();
          this.visDelete = false;

        },
        error: () => {
          this.CtrlAlertify.PostionLabelNotificationDMI();
          this.CtrlAlertify.showNotificationِCustom("Error")

          this.visDelete = false;

          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete request.' });
          // console.error('Error deleting request:', err);
        }
      });
    } else {
      // this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No row selected for deletion.' });
      this.CtrlAlertify.PostionLabelNotificationDMI();
      this.CtrlAlertify.showNotificationِCustom("SelctAnyRow")
      this.visDelete = false;

    }
  }


  detailsExamenDTOss: any = [];
  detailsAdmission = new Array<any>();
  PostExamenLabo() {

    const natureAdmOPD = sessionStorage.getItem("NatureAdmissionOPD");
    const codeNatAdmOPD = Number(natureAdmOPD);
    const permissionDMI = JSON.parse(sessionStorage.getItem("auth-user") ?? '{}')?.permissionDMI?.toLowerCase();

    const codeAdmission = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.code;
    const codePatient = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.codePatient;


    this.SelectedPrestationLabo.forEach((item: any) => {
      this.detailsExamenDTOss.push({
        code: null,
        codeAdmission: codeAdmission,

        codeNatureAdmission: codeNatAdmOPD || 2, //Default to 0 if missing
        codePatient: codePatient,
        codePrestation: item.code,
        dateCreate: item.dateCreate || '', //Corrected Date and Default to empty string
        userCreate: this.userCreate,
      })

      this.detailsAdmission.push({
        codePrestation: item.code,
        etatPaiement: false
      })

    });


    this.SelectedPrestationRadio.forEach((item: any) => {
      this.detailsExamenDTOss.push({
        code: null,
        codeAdmission: codeAdmission,

        codeNatureAdmission: codeNatAdmOPD || 2, //Default to 0 if missing
        codePatient: codePatient,
        codePrestation: item.code,
        dateCreate: item.dateCreate || '', //Corrected Date and Default to empty string
        userCreate: this.userCreate,
      })
    });


    var TypeExamenLabo = " ";
    console.log("this.SelectedPrestationLabo  ", this.SelectedPrestationLabo);
    console.log("this.SelectedPrestationRadio  ", this.SelectedPrestationRadio);
    if (this.SelectedPrestationLabo.length != 0) {
      TypeExamenLabo = "L";
    } else {
      TypeExamenLabo = "R";
    }

    let body = {
      codeAdmission: codeAdmission,
      codePatient: codePatient,
      pret: false,
      codeEtatPaiement: 2,
      dateCreate: new Date().toISOString(),
      typeExamen: TypeExamenLabo,
      detailsExamenDTOs: this.detailsExamenDTOss,
      codeMedecinDemande: 1,
      detailsAdmissionDTOs: this.detailsAdmission,
    }
    if (!permissionDMI || (permissionDMI !== 'doctor' && permissionDMI !== 'administrator')) {
      this.CtrlAlertify.PostionLabelNotificationDMI();
      this.CtrlAlertify.showNotificationِCustom("YouDontHaveAccessToSendReq");
    } else {
      this.dmi_opd_service.PostExamen(body).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error saving Exmane:', error);
          this.detailsExamenDTOss = new Array<any>();
          return throwError(() => new Error('Failed to save Exmane.'));
        })
      ).subscribe({
        next: () => {
          this.CtrlAlertify.PostionLabelNotificationDMI();
          this.CtrlAlertify.ShowSavedOKDMI();
          this.VisibleAddReqLabo = false;
          this.VisibleAddReqRadio = false;
          this.SelectedPrestationLabo = new Array<any>();
          this.SelectedPrestationRadio = new Array<any>();
          this.ngOnInit();

          this.onRowUnselectFromTabAddReqLab(event);
          this.onRowUnselectFromTabAddReqRadio(event);

        },
        error: (err) => {
          console.error("An unexpected error occurred:", err);
        }
      });

    }



  }


  // prepareDataForPost(): ExmaneDTO[] { // Use DTO type for better type safety
  //   return this.dataPrestationLabo.map((item) => {
  //     // const date = new Date(item.dateDispo); //Convert date string to Date object
  //     const natureAdmOPD = sessionStorage.getItem("NatureAdmissionOPD");
  //     const codeNatAdmOPD = Number(natureAdmOPD);

  //     const codePatient = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.codePatient;
  //     const codeAdmission = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.code;

  //     return {
  //       code: null,
  //       codeAdmission: codeAdmission,
  //       codeEtatPaiement: 2,
  //       codeNatureAdmission: codeNatAdmOPD,
  //       codePatient: codePatient,
  //       codePrestation: item.code,
  //       dateCreate:  new Date().toISOString(),
  //       typeExamen: "L"
  //     } as ExmaneDTO; // Type assertion for TypeScript
  //   }).filter(item => item !== null); //Remove null values from array
  // }


  prepareDataForPost(): ExmaneDTO[] {
    const patientData = this.storedPatientData; //For better readability

    if (!patientData || !patientData.code || !patientData.codePatient) {
      console.error("Missing patient data in sessionStorage!");
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Missing patient data' }); //PrimeNG message
      return []; //Return empty array if data is missing
    }

    const natureAdmOPD = sessionStorage.getItem("NatureAdmissionOPD");
    const codeNatAdmOPD = Number(natureAdmOPD);


    return this.SelectedPrestationLabo.map((item) => ({
      code: null,
      codeAdmission: patientData.code,

      codeNatureAdmission: codeNatAdmOPD || 2, //Default to 0 if missing
      codePatient: patientData.codePatient,
      codePrestation: item.code,
      dateCreate: item.dateCreate || '', //Corrected Date and Default to empty string
      userCreate: this.userCreate,
    }));
  }


  addNewRecords(exmenData: ExmaneDTO[]) {

    console.log("body to post examen", exmenData)

    this.dmi_opd_service.PostExamenList(exmenData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error saving Exmane:', error);
        return throwError(() => new Error('Failed to save Exmane.'));
      })
    ).subscribe({
      next: () => {
        this.CtrlAlertify.PostionLabelNotificationDMI();
        this.CtrlAlertify.ShowSavedOK();
        this.VisibleAddReqLabo = false;
        this.SelectedPrestationLabo = new Array<any>();
        this.ngOnInit();

        this.onRowUnselectFromTabAddReqLab(event);

      },
      error: (err) => {
        console.error("An unexpected error occurred:", err);
      }
    });
  }



  clearFormLabo() {
    this.VisibleAddReqLabo = false;
    this.SelectedPrestationLabo = [];

  }

  clearFormRadio() {
    this.VisibleAddReqRadio = false;

    this.SelectedPrestationRadio = [];
  }


  onRowUnselectFromTabAddReqLab(event: any) {
    const unselectedRow = event.data;
    // unselectedRow.checked = false;
    this.SelectedPrestationLabo = this.SelectedPrestationLabo.filter(item => item.code !== unselectedRow.code);

  }

  onRowUnselectFromTabAddReqRadio(event: any) {
    const unselectedRow = event.data;
    // unselectedRow.checked = false;
    this.SelectedPrestationRadio = this.SelectedPrestationRadio.filter(item => item.code !== unselectedRow.code);

  }





  onRowSelectFromTabAddReqLab(event: any) {
    const selectedRow = event.data;
    selectedRow.checked = true;
    if (!this.SelectedPrestationLabo.some(item => item.code === event.data.code)) {
      this.SelectedPrestationLabo.push(event.data);

    }



  }



  onRowSelectFromTabAddReqRadio(event: any) {
    const selectedRow = event.data;
    selectedRow.checked = true;
    if (!this.SelectedPrestationRadio.some(item => item.code === event.data.code)) {
      this.SelectedPrestationRadio.push(event.data);

    }



  }


  GetPrestationLabo() {
    this.param_service.GetPrestationByCodeTypePrestation(1).subscribe((data: any) => {
      this.dataPrestationLabo = data;
    })
  }


  GetPrestationRadio() {
    this.param_service.GetPrestationByCodeTypePrestation(2).subscribe((data: any) => {
      this.dataPrestationRadio = data;
    })
  }
  // selectedPrestationsMap = new Map<number, any>();
  onCheckboxChange(event: any, domaine: any) {
    if (event.checked) {

      if (!this.SelectedPrestationLabo.some(item => item.code === domaine.code)) {
        this.SelectedPrestationLabo.push(domaine);
      }
    } else {
      this.SelectedPrestationLabo = this.SelectedPrestationLabo.filter(item => item.code !== domaine.code);

    }
  }


  onCheckboxChangeRadio(event: any, domaine: any) {
    if (event.checked) {

      if (!this.SelectedPrestationRadio.some(item => item.code === domaine.code)) {
        this.SelectedPrestationRadio.push(domaine);
      }
    } else {
      this.SelectedPrestationRadio = this.SelectedPrestationRadio.filter(item => item.code !== domaine.code);

    }
  }


  GetAllRequestLabobyCodeAdmission() {
    const codeAdmission = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.code;
    this.dmi_opd_service.GetExamenByTypeExamenAndCodeAdmission("L", codeAdmission).subscribe((data: any) => {
      this.dataRequestLabo = data
    })
  }
  pdfData: any;
  pdfContainer: any;
  GetReqLabForPrint(codeExamen: number) {



    this.visibleModalPrint = true;

    // this.reportService.getReport(codeExamen).subscribe({
    //   next: (buffer: ArrayBuffer) => {
    //     this.displayPdf(buffer);
    //   },
    //   error: (error:any) => {
    //     console.error('Error fetching report:', error);
    //   }
    // });
  }

  // displayPdf(buffer: ArrayBuffer) {
  //   const loadingTask = pdfjsLib.getDocument(new Uint8Array(buffer));

  //   loadingTask.promise.then((pdf) => {
  //     pdf.getPage(1).then((page) => {
  //       const viewport = page.getViewport({ scale: 1.5 });
  //       const canvas = document.createElement('canvas');
  //       // *** Crucial Change: Ensure canvasContext is NOT null ***
  //       const ctx = canvas.getContext('2d')!; // The '!' asserts that ctx will not be null
  //       // If there's a possibility of getContext failing, add an error check here
  //       if (!ctx) {
  //         console.error("Failed to get 2d rendering context from canvas.");
  //         return; // or throw an error, handle appropriately
  //       }


  //       canvas.height = viewport.height;
  //       canvas.width = viewport.width;
  //       const renderContext = {
  //         canvasContext: ctx, // ctx is now guaranteed to be CanvasRenderingContext2D
  //         viewport: viewport,
  //       };

  //       page.render(renderContext).promise.then(() => {
  //         this.pdfContainer.appendChild(canvas);
  //       });
  //     });
  //   }).catch((reason) => {
  //     console.error('Error loading PDF:', reason); //Catch any errors in loading the PDF
  //   });
  // }
  handleRenderPdf(data: any) {
    const pdfObject = PDFObject.embed(data, '#pdfContainer');
  }


  CloseModalPrint() {
    this.visibleModalPrint = false;
    this.onRowUnselectFromTabReqLab(event);
    this.onRowUnselectFromTabReqRadio(event);
    this.pdfData == null;
  }

  GetAllRequestRadiobyCodeAdmission() {
    const codeAdmission = JSON.parse(sessionStorage.getItem("codeAdmissionSelected") ?? '{}')?.code;
    this.dmi_opd_service.GetExamenByTypeExamenAndCodeAdmission("R", codeAdmission).subscribe((data: any) => {
      this.dataRequestRadio = data
    })
  }

  CloseModalConfirmation() {
    this.visDelete = false;

  }

  OpenModalConfimation(mode: string) {
    this.VisibleAddReqLabo = false;
    this.VisibleAddReqRadio = false;
    this.visDelete = false;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (this.selectedReqLab == undefined || this.selectedReqLab == null || this.selectedReqLab == "") {
      this.CtrlAlertify.PostionLabelNotificationDMI();
      this.CtrlAlertify.ErrorFetchDataDMI("Select Any Row")
      this.visDelete = false;
    } else {
      if (mode === 'ConfDelete') {
        button.setAttribute('data-target', '#ModalDelete');
        this.VisibleAddReqLabo = false;
        this.visDelete = true;
      }
    }





  }

  transformExamNames(domaine: any): string {
    const maxLength = 10; // Adjust as needed
    return domaine.detailsExamenDTOs
      .map((exam: any) => (exam.designationArPrestation || '').substring(0, maxLength) + (exam.designationArPrestation && exam.designationArPrestation.length > maxLength ? "..." : ""))
      .join(', ');
  }
}