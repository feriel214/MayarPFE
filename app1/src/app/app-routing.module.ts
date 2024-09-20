import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { ListSiteComponent } from './sites/list-site/list-site.component';
import { DocumentationSiteComponent  } from './sites/documentation-site/documentation-site.component';
import { DocfinanciereSiteComponent  } from './sites/docfinanciere-site/docfinanciere-site.component';

import { Cellule2GComponent  } from './cellule/cellule2-g/cellule2-g.component';
import { Cellule3GComponent  } from './cellule/cellule3-g/cellule3-g.component';
import { Cellule4GComponent  } from './cellule/cellule4-g/cellule4-g.component';

import { TabdebordSiteComponent } from './sites/tabdebord-site/tabdebord-site.component';
import { TabdeboardCelluleComponent } from './cellule/tabdeboard-cellule/tabdeboard-cellule.component';

import { RegionsComponent } from './admin/regions/regions.component';
import { DelegationsComponent } from './admin/delegations/delegations.component';
import { UsersComponent } from './admin/users/users.component';
import { SecteursComponent } from './admin/secteurs/secteurs.component';
import { FournisseursComponent } from './admin/fournisseurs/fournisseurs.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { DashboardIngRadioComponent } from './dashboard-ing-radio/dashboard-ing-radio.component';
import { DashboardFinancierComponent } from './dashboard-financier/dashboard-financier.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { AddSiteComponent } from './sites/add-site/add-site.component';
import { EditSiteComponent } from './sites/edit-site/edit-site.component';




const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  { path:'register',component:RegisterComponent},
 
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'login', component: LoginComponent },
  { path:'admin',component: DashboardAdminComponent ,
    children:[
      {path:'list/sites',component:ListSiteComponent},
      {path:'add/site',component:AddSiteComponent},
      {path:'edit/site/:id',component:EditSiteComponent},
      { path:'list/regions',component:RegionsComponent},
      { path:'list/delegations',component:DelegationsComponent},
      { path:'list/users',component:UsersComponent},
      { path:'list/secteurs',component:SecteursComponent},
      { path:'list/fournisseurs',component:FournisseursComponent},
      {path:'cellule2G',component:  Cellule2GComponent },
      {path:'cellule3G',component:  Cellule3GComponent },
      {path:'cellule4G',component:  Cellule4GComponent },
      {path:'docfinsite',component:  DocfinanciereSiteComponent },
      {path:'docsite',component:  DocumentationSiteComponent },
      {path:'tbsite',component: TabdebordSiteComponent},
      {path:'tbCel',component: TabdeboardCelluleComponent }
    ]},
 
    { path:'financier',component: DashboardFinancierComponent ,
      children:[
      {path:'docfinsite',component:  DocfinanciereSiteComponent },
      {path:'tbsite',component: TabdebordSiteComponent},
      {path:'tbCel',component: TabdeboardCelluleComponent }
    ]},

    { path:'ingRadio',component: DashboardIngRadioComponent ,
    children:[
     
      {path:'list/sites',component:ListSiteComponent},
      {path:'cellule2G',component:  Cellule2GComponent },
      {path:'cellule3G',component:  Cellule3GComponent },
      {path:'cellule4G',component:  Cellule4GComponent },
      {path:'docfinsite',component:  DocfinanciereSiteComponent },
      {path:'tbsite',component: TabdebordSiteComponent},
      {path:'tbCel',component: TabdeboardCelluleComponent }
    ]},

    { path:'manager',component: DashboardManagerComponent ,
    children:[
      {path:'tbsite',component: TabdebordSiteComponent},
      {path:'tbCel',component: TabdeboardCelluleComponent }
    ]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
