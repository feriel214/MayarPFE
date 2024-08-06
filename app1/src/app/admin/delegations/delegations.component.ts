import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-delegations',
  templateUrl: './delegations.component.html',
  styleUrls: ['./delegations.component.css']
})
export class DelegationsComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  delegations: any;
  regions:any;
  newDelegation: any = {
    codeDel: '',
    libelleDel: '',
    region_id: null
  };
  editDelegationData: any = {
    idDel: null,
    codeDel: '',
    libelleDel: '',
    region_id: null
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllRegions();
    this.getAllDelegations();
  }

  getAllDelegations() {
    this.adminService.getAllDelegations().subscribe((res: any) => {
      console.log("Delegations: ", res);
      this.delegations = res;
    });
  }

  addDelegation() {

    let body={

    }
    console.log("this.newDelegation",this.newDelegation)
    this.adminService.addDelegation(this.newDelegation).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        text: 'Delegation has been added successfully!',
        icon: 'success',
      }).then(() => {
        this.getAllDelegations();
        this.newDelegation.codeDel = '';
        this.newDelegation.libelleDel = '';
        this.newDelegation.region_id = null;
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
      });
    });
  }

  editDelegation(delegation: any) {
    this.editDelegationData.idDel = delegation.idDel;
    this.editDelegationData.codeDel = delegation.codeDel;
    this.editDelegationData.libelleDel = delegation.libelleDel;
    this.editDelegationData.region_id = delegation.region_id;
  }

  updateDelegation() {
    this.adminService.editDelegation(this.editDelegationData.idDel, this.editDelegationData).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        text: 'Delegation has been updated successfully!',
        icon: 'success',
      }).then(() => {
        this.getAllDelegations();
        this.clearEditData();
        // Close modal if using Bootstrap modal (example with Renderer2)
        // this.renderer.addClass(document.getElementById('EditModalalert'), 'hide');
      });
    }, error => {
      Swal.fire({
        title: 'Error',
        text: error.error.error,
        icon: 'error',
      });
    });
  }

  deleteDelegationById(id: number) {
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
        this.adminService.deleteDelegationById(id).subscribe((res: any) => {
          Swal.fire(
            'Deleted!',
            'Delegation has been deleted.',
            'success'
          );
          this.getAllDelegations();
        });
      }
    });
  }
  getRegionName(regionId: number): string {
    const region = this.regions.find((region: any) => region.idReg === regionId);
    return region ? region.libelleReg : 'Unknown Region';
  }
  clearEditData() {
    this.editDelegationData.idDel = null;
    this.editDelegationData.codeDel = '';
    this.editDelegationData.libelleDel = '';
    this.editDelegationData.region_id = null;
  }

  getAllRegions() {
    this.adminService.getAllRegions().subscribe((res: any) => {
      console.log("*******Regions ", res);
      this.regions = res;
    });
  }
}
