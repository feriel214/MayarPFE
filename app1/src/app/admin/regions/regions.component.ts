import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  regions: any;
  newRegion: any = {
    libelleReg: ''
  };
  editRegionData: any = {
    libelleReg: ''
  };
  idReg:any;
  constructor(private adminService: AdminService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getAllRegions();
  }

  getAllRegions() {
    this.adminService.getAllRegions().subscribe((res: any) => {
      console.log("*******Regions ", res);
      this.regions = res;
    });
  }

  addRegion() {
    this.adminService.addRegion(this.newRegion).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        text: 'Region à été ajoutée avec succées!',
        icon: 'success',
      }).then(() => {
        this.getAllRegions();
        this.newRegion.libelleReg = '';
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
      });
    });
  }

  editRegion(region:any) {
    //updateRegion(region)
  
    this.idReg=region.idReg;
    this.editRegionData.libelleReg=region.libelleReg;
   
  }
  updateRegion(){
    let body={
      libelleReg:this.editRegionData.libelleReg
    }
    this.adminService.editRegion(this.idReg,body ).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        text: 'Region à été modifiée avec succées!',
        icon: 'success',
      }).then(() => {
        this.getAllRegions();
        this.editRegionData.idReg = null;
        this.editRegionData.libelleReg = '';
        this.renderer.addClass(document.getElementById('EditModalalert'), 'hide'); // Example of adding a hide class
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
      });
    });

  }
  deleteRegionById(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteRegionById(id).subscribe((res: any) => {
          Swal.fire(
            'Deleted!',
            'Region has been deleted.',
            'success'
          );
          this.getAllRegions();
        });
      }
    });
  }

  deleteRegionByName(name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteRegionByName(name).subscribe((res: any) => {
          Swal.fire(
            'Deleted!',
            'Region has been deleted.',
            'success'
          );
          this.getAllRegions();
        });
      }
    });
  }

  setEditRegion(region: any) {
    this.editRegionData.idReg = region.idReg;
    this.editRegionData.libelleReg = region.libelleReg;
  }
}
