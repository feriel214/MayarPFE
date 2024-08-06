import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-docfinanciere-site',
  templateUrl: './docfinanciere-site.component.html',
  styleUrls: ['./docfinanciere-site.component.css']
})
export class DocfinanciereSiteComponent {
  site = {
    codesite: '',
    nomsite: '',
    region: '',
    delegotion: '', // Keeping the field name as delegotion
    secteur: '',
    x: 0,
    y: 0,
    fournisseur: '',
    HBA: '',
    antenne: '',
    alimentation: '',
    acces: ''
  };

  formattedDateContract: string = '';
  formattedDateMAJ: string = '';
  proprietaire: string = '';
  montant: string = '';
  datecontract: string = '';
  datemaj: string = '';
  contractFile: File | undefined ;
  regions: string[] = ['region1', 'region2', 'region3'];
  delegotions: any ; // Initialize as an empty array
  sites: any[] = []; // Initialize as an empty array
  // selectedSiteCode: string | null = null; 
  selectedSiteCode: any;
  selectedIddocfin: any;

  //////////////new Data 

  formattedDateContractnew: string = '';
  formattedDateMAJnew: string = '';
  proprietairenew: string = '';
  montantnew: string = '';
  datecontractnew: string = '';
  datemajnew: string = '';
  contractFilenew:  File | undefined ;





  DocFinanceData = {

    propritere: '',
    montant:0,
    ddatecontrac:'',
    datamaj:'',
  };









// showUpdateForm: any;
  constructor(private route: ActivatedRoute,private siteService: SiteService, private router: Router) {}


  ngOnInit(): void {
    this.updateDelegations();
  }




  updateDelegations(): void {
    this.siteService.getdelegbyregion(this.site.region).subscribe(
      (response: any[]) => {
        console.log('region', this.site.region);
        this.delegotions = response.map((site: any) => site.delegotion);
        console.log("Selected delegations: ", this.delegotions);
      },
      (error: any) => {
        console.error('Error fetching delegations:', error);
      }
    );
  }


  updateSites(): void {
    console.log('Fetching sites...');
    this.siteService.getSitesByRegionAndDelegotion(this.site.region, this.site.delegotion).subscribe(
      (response: any[]) => {
        console.log('Sites:', response);
        this.sites = response; // Assign the array of site objects to this.sites
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );
  }
  storecodesite(id: any): void {
    this.selectedSiteCode = id;
    console.log('Selected Site Code:', this.selectedSiteCode);


    this.siteService.getiddocfin(this.selectedSiteCode).subscribe(
      (response: any) => {
        this.selectedIddocfin = response.iddocfin;
        console.log('Selected id doc fin:', this.selectedIddocfin);
      },
      (error: any) => {
        console.error('Error fetching id doc fin:', error);
      }
    );






    

  }


  


// Inside your Angular component class
handleContratDateChange(event: any): void {
  // Retrieve the selected date from the input
  const selectedDate = new Date(event.target.value);

  // Format the date

  this.formattedDateContract = this.formatDate(selectedDate);
  // Display the formatted date in the console
  console.log('Formatted Date Contrat:',this.formattedDateContract );
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add a leading zero if the month is < 10
  const day = date.getDate().toString().padStart(2, '0'); // Add a leading zero if the day is < 10
  return `${year}-${month}-${day}`;



}


handleMajDateChange(event: any): void {
  // Retrieve the selected date from the input
  const selectedDate = new Date(event.target.value);

  // Format the date
  this.formattedDateMAJ = this.formatDate(selectedDate);

  // Display the formatted date in the console
  console.log('Formatted Date Mise à jour :', this.formattedDateMAJ);
}

formatDate2(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add a leading zero if the month is < 10
  const day = date.getDate().toString().padStart(2, '0'); // Add a leading zero if the day is < 10
  return `${year}-${month}-${day}`;



}





handleAPDFileInput(event: any): void {
  this.contractFile = event.target.files[0];
  console.log("file ",this.contractFile)
}

  ajouterfinance(): void {
    // Prepare form data
    const formData = new FormData();
    
    if (this.contractFile) {
      formData.append('contract', this.contractFile);
    }
    formData.append('propritere', this.proprietaire );
    formData.append('montant', this.montant);
    formData.append('datecontract',  this.formattedDateContract );
    formData.append('datemaj',   this.formattedDateMAJ);
    console.log('hello mayarrrrrrrrrr');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    // Send the form data to the server with codesite as a query parameter
    this.siteService.storefinance(   this.selectedSiteCode,formData ).subscribe(
      (response: any) => {
        console.log('Archive added successfully:', response);
        // Handle success        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Document  ajoutée avec succées ! ",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: any) => {
        console.error('Error adding archive:', error);
        // Handle error
      }
    );
  }
/////////////////////////update part 


handleAPDFileInputnew(event: any): void {
  this.contractFilenew = event.target.files[0];
  console.log("file ", this.contractFilenew);
}

handleContratDateChangenew(event: any): void {
  // Retrieve the selected date from the input
  const selectedDate = new Date(event.target.value);

  // Format the date

  this.formattedDateContractnew = this.formatDatenew(selectedDate);
  // Display the formatted date in the console
  console.log('Formatted Date Contrat:',this.formattedDateContractnew );
}

formatDatenew(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add a leading zero if the month is < 10
  const day = date.getDate().toString().padStart(2, '0'); // Add a leading zero if the day is < 10
  return `${year}-${month}-${day}`;



}


handleMajDateChangenew(event: any): void {
  // Retrieve the selected date from the input
  const selectedDate = new Date(event.target.value);

  // Format the date
  this.formattedDateMAJnew = this.formatDatenew(selectedDate);

  // Display the formatted date in the console
  console.log('Formatted Date Mise à jour :', this.formattedDateMAJnew);
}













  // editFinance(){}

  showUpdateForm: boolean = false;
    








    
    saveData(): void {
      // Prepare data object
      const docFinanceData = {
        propritere: this.proprietairenew,
        montant: this.montantnew,
        datecontract: this.formattedDateContractnew,
        datemaj: this.formattedDateMAJnew
      };
    
      console.log('Preparing to update docfinanciere...');
      console.log('Data:', docFinanceData);
    
      // Send the data object to the server
      this.siteService.updateDocFinanciere(this.selectedIddocfin, docFinanceData).subscribe(
        (response: any) => {
          console.log('docfinanciere updated successfully:', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Document  modifier  avec succées ! ",
            showConfirmButton: false,
            timer: 1500
          });
    
          // Once the finance data is updated successfully, proceed to upload the contract
          if (this.contractFilenew) {
            const formData = new FormData();
            formData.append('contract', this.contractFilenew);
    
            this.siteService.uploadContract(this.selectedIddocfin, formData).subscribe(
              (uploadResponse: any) => {
                console.log('Contract uploaded successfully:', uploadResponse);
                // Handle success
                        // Handle success        
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Document  modifier  avec succées ! ",
          showConfirmButton: false,
          timer: 1500
        });
              },
              (uploadError: any) => {
                console.error('Error uploading contract:', uploadError);
                // Handle error
              }
            );
          }
        },
        (error: any) => {
          console.error('Error updating docfinanciere:', error);
          // Handle error
        }
      );
    }



    cancelUpdate() {
        // Logic to cancel the update
        // Reset any changes made in the new form
        this.showUpdateForm = false;
        Swal.fire(
          'Annulé',
          'Le formulaire a été réinitialisé.',
          'success'
        );
    
    }



  







    

}

