import { Component, Input, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ChecksumService } from '../Shared/service/ServiceClientCheckSum/checksum.service';

// Define or import the ConnectionStatus interface
export interface ConnectionStatus {
  success: boolean;
  message?: string;
  error?: string;
}


@Component({
  selector: 'app-check-sum',
  templateUrl: './check-sum.component.html',
  styleUrl: './check-sum.component.css'
})
export class CheckSumComponent implements OnInit {

  portName: string = '';
  baudRate: number = 38400;
  isConnected: boolean = false;
  outputPath: string = '';
  dataReceived: string = '';

  constructor(private http: HttpClient, private chksumService: ChecksumService) { }

  ngOnInit(): void {

    this.checkPersistentConnection();
    const baudRateLocal = JSON.parse(sessionStorage.getItem("isConnected") ?? '{}')?.baudRate;
    const portNameLocal = JSON.parse(sessionStorage.getItem("isConnected") ?? '{}')?.portName?.toString() || ''; // Ensure portName is a string
    if (sessionStorage.getItem("isConnected") != null || sessionStorage.getItem("isConnected") != undefined) {
      this.baudRate = baudRateLocal ? parseInt(baudRateLocal) : 38400; // Default to 38400 if not set
      this.portName = portNameLocal ? (portNameLocal) : ""; // Default to 38400 if not set
    } else {

    }

  }

  connect() {
    this.chksumService.ConnectCheckSum(this.portName, this.baudRate).subscribe({
      next: (response: ConnectionStatus) => { //Type the response
        this.isConnected = response.success;
        if (response.success) {

          const connectionSettings = {
            portName: this.portName,
            baudRate: this.baudRate,
            isConnected: true //Set isConnected to true *before* sending the request.
          };


          console.log('Connection successful:', response.message);
          sessionStorage.setItem('isConnected', JSON.stringify(connectionSettings));

        } else {
          console.error('Connection failed:', response.error);
          sessionStorage.removeItem('isConnected');
          //Display the error message in the UI.
        }
      },
      error: (error) => {
        console.error('HTTP request error:', error); //Log HTTP errors separately
        sessionStorage.removeItem('isConnected');
      }
    });
  }

  checkPersistentConnection() {
    const authUser = sessionStorage.getItem('USER');
    if (authUser) {
      this.connect(); //Automatically connect if auth-user is present
    } else {
      this.isConnected = false;
      // this.connectionStatus = 'Disconnected';
    }
  }
  getXMLData() {
    this.chksumService.GETdataCheckSum().subscribe({
      next: (xmlData: string) => {
        this.dataReceived = xmlData;
        console.log('XML Data Received:', xmlData);
        // Process the XML data using a library like 'xml2js' or similar
      },
      error: (error) => {
        console.error('Error fetching XML data:', error);
      }
    });
  }
  disconnect() {
    this.chksumService.DisConnectCheckSum().subscribe(
      (response: ConnectionStatus) => {
        this.isConnected = response.success;
        console.log('Connection successful:', response);
        sessionStorage.removeItem('isConnected');

      });
  }


  // Add a method to handle file received from backend
  handleFileReceived(data: any) {
    this.dataReceived = data;
  }

  xmlFile: File | undefined;
  errorMessage: string = ''; //Added for error display

  onFileSelected(event: any) {
    this.xmlFile = event.target.files[0];
  }


  uploadXML() {
    this.errorMessage = ''; //Clear error messages.
    if (this.xmlFile) {
      this.chksumService.uploadXML(this.xmlFile).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          this.errorMessage = response; // Display success message
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.xmlFile = undefined;  
          this.errorMessage = 'Upload failed: ' + error.error; // Display error message
        }
      });
    } else {
      this.xmlFile = undefined;  
      this.errorMessage = 'Please select an XML file.'; // Display error message if no file selected
    }
  }
}