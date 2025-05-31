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
export class CheckSumComponent {

  portName: string = '';
  baudRate: number = 2400;
  isConnected: boolean = false;
  outputPath: string = '';
  dataReceived: string = '';

  constructor(private http: HttpClient, private chksumService: ChecksumService) { }

  connect() {
    this.chksumService.ConnectCheckSum(this.portName, this.baudRate).subscribe({
      next: (response: ConnectionStatus) => { //Type the response
        this.isConnected = response.success;
        if (response.success) {
          console.log('Connection successful:', response.message);
          this.getXMLData();
         
        } else {
          console.error('Connection failed:', response.error);
          //Display the error message in the UI.
        }
      },
      error: (error) => {
        console.error('HTTP request error:', error); //Log HTTP errors separately
      }
    });
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
    this.chksumService.DisConnectCheckSum().subscribe({
      next: (response) => {
        this.isConnected = false;
        console.log('Connection successful:', response);
      },
      error: (error) => {
        console.error('Connection failed:', error); 
      }
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
        this.errorMessage = 'Upload failed: ' + error.error; // Display error message
      }
    });
  } else {
    this.errorMessage = 'Please select an XML file.'; // Display error message if no file selected
  }
}
}