import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/service/site.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabdebord-site',
  templateUrl: './tabdebord-site.component.html',
  styleUrls: ['./tabdebord-site.component.css']
})
export class TabdebordSiteComponent {
  site = {
    idSite: '',
    codesite: '',
    nomsite: '',
    region: '',
    delegotion: '',
    secteur: '',
    x: 0,
    y: 0,
    fournisseur: '',
    HBA: '',
    antenne: '',
    alimentation: '',
    acces: ''
  };



  archiveData: any;
  ficheMisServiceUrl: string | undefined;
  APDUrl:string | undefined;
  ficheExpUrl:string | undefined;
  show: string | undefined;







  contractUrl: string | undefined;
  docFinanciereData: any = {}; 
  siteData: any[] = [];
  regions: string[] = ['region1', 'region2', 'region3'];
  delegotions: any[] = [];
  fournisseurs: any[] = [];
  sites: any[] = [];
  selectedSiteCode: any;
  selectedidSite: any;
  selectedidCel: any;
  constructor(private route: ActivatedRoute, private siteService: SiteService, private router: Router) {}

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

  updateFournisseur(): void{

    console.log('Fetching Fournisseurs...');
    this.siteService.getFinanciereByRegionAndDelegotion(this.site.region, this.site.delegotion).subscribe(
      (response: any[]) => {
        console.log('fournisseurs:', response);
        this.fournisseurs = response;
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );}




  updateSites(): void {
    console.log('Fetching sites...');
    this.siteService.getSiteByRegionAndDelegotionAndFournisseur(this.site.region, this.site.delegotion,this.site.fournisseur).subscribe(
      (response: any[]) => {
        console.log('Sites:', response);
        this.sites = response;
      },
      (error: any) => {
        console.error('Error fetching sites:', error);
      }
    );
  }

  storecodesite(id: any): void {
    this.selectedSiteCode = id;
    console.log('Selected Site Code:', this.selectedSiteCode);

    this.siteService.getidSiteBycode(this.selectedSiteCode).subscribe(
      (response: any) => {
        this.selectedidSite = response.idSite;
        console.log('Selected id Site:', this.selectedidSite);
        this.fetchSiteData();
        this.fetchDocFinanciereData();
        this.  fetchArchiveData();  
        this.show="A";
      },
      (error: any) => {
        console.error('Error fetching id Site:', error);
      }
    );
  }

  fetchSiteData(): void {
    this.siteService.getSiteById(this.selectedSiteCode).subscribe(
      data => {
        this.siteData = data;
        console.log('Selected Site:', this.siteData);
      },
      error => {
        console.error('Error fetching site data:', error);
      }
    );
  }

  fetchDocFinanciereData(): void {
    this.siteService.getDocById(this.selectedSiteCode).subscribe(
      data => {
        console.log('API Response:', data); // Check API response structure
        this.docFinanciereData = data.docFinanciere;
        this.contractUrl = data.contract_url;
        console.log('Doc Financiere Data:', this.docFinanciereData);
      },
      error => {
        console.error('Error fetching doc financiere data:', error);
      }
    );
  }
  

  fetchArchiveData(): void {
    this.siteService.getArchById(this.selectedSiteCode).subscribe(
      data => {
        console.log('API Response:', data); // Check API response structure
        this.archiveData = data.archive;
        this.ficheMisServiceUrl = data.ficheMisService_url;
        this.APDUrl = data.APD_url;
        this.ficheExpUrl = data.ficheExp_url;
        console.log('Archive Data:', this.archiveData);
      },
      error => {
        console.error('Error fetching archive data:', error);
      }
    );
  }






}
