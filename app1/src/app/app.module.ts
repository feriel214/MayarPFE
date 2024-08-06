import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { AddSiteComponent } from './sites/add-site/add-site.component';
import { EditSiteComponent } from './sites/edit-site/edit-site.component';
import { ListSiteComponent } from './sites/list-site/list-site.component'; // Importez FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { DocumentationSiteComponent } from './sites/documentation-site/documentation-site.component';
import { DocfinanciereSiteComponent } from './sites/docfinanciere-site/docfinanciere-site.component';
import { TabdebordSiteComponent } from './sites/tabdebord-site/tabdebord-site.component';
import { EditdocfinanciereSiteComponent } from './sites/editdocfinanciere-site/editdocfinanciere-site.component';
import { Cellule2GComponent } from './cellule/cellule2-g/cellule2-g.component';
import { Cellule3GComponent } from './cellule/cellule3-g/cellule3-g.component';
import { Cellule4GComponent } from './cellule/cellule4-g/cellule4-g.component';
import { Report1Component } from './BI/report1/report1.component';
import { Report2Component } from './BI/report2/report2.component';
import { Report3Component } from './BI/report3/report3.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TabdeboardCelluleComponent } from './cellule/tabdeboard-cellule/tabdeboard-cellule.component';

import { RegionsComponent } from './admin/regions/regions.component';
import { SecteursComponent } from './admin/secteurs/secteurs.component';
import { FournisseursComponent } from './admin/fournisseurs/fournisseurs.component';
import { DelegationsComponent } from './admin/delegations/delegations.component';
import { AccessComponent } from './admin/access/access.component';
import { UsersComponent } from './admin/users/users.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { DashboardFinancierComponent } from './dashboard-financier/dashboard-financier.component';
import { DashboardIngRadioComponent } from './dashboard-ing-radio/dashboard-ing-radio.component';
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    LoginComponent,
    MenuComponent,
    LeftSidebarComponent,
    AddSiteComponent,
    EditSiteComponent,
    ListSiteComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DocumentationSiteComponent,
    DocfinanciereSiteComponent,
    TabdebordSiteComponent,
    EditdocfinanciereSiteComponent,
    Cellule2GComponent,
    Cellule3GComponent,
    Cellule4GComponent,
    Report1Component,
    Report2Component,
    Report3Component,
    TabdeboardCelluleComponent,
    RegionsComponent,
    SecteursComponent,
    FournisseursComponent,
    DelegationsComponent,
    AccessComponent,
    UsersComponent,
    RegisterComponent,
    DashboardAdminComponent,
    NavbarAdminComponent,
    DashboardFinancierComponent,
    DashboardIngRadioComponent,
    DashboardManagerComponent,
    DashboardComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



