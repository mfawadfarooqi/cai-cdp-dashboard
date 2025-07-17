import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  imports: [
    HeaderComponent,
    NgClass,
    RouterLink,
    RouterOutlet,
    FooterComponent,
    NgIf,
    RouterLinkActive,
    NgForOf
  ],
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  userRole: string | any;

  menuItems = [
    { label: 'Dashboard', icon: 'fas fa-home', route: 'dashboard', expanded: false, children: [] },
    {
      label: 'Feeds', icon: 'fa-solid fa-bomb', route: 'threatExposure', expanded: false,children: []

    },
    { label: 'Deception MapView', icon: 'fa-solid fa-database', route: 'dataLeakage', expanded: false, children: []
    },
    { label: 'Incident Analysis', icon: 'fa-solid fa-shield-halved', route: 'brandSecurity', expanded: false, children: []
    },
    { label: 'Reporting', icon: 'fa-solid fa-share-nodes', route: 'socialMediaImpersonations', expanded: false, children: [] },
    { label: 'User Management', icon: 'fa-solid fa-globe', route: 'globalThreatIntelligence', expanded: false, children: [

      ]
    },

  ];

  menuItemUser = [
    { label: 'Manage Users', icon: 'people', route: 'mamgeUser', expanded: false, children: [] },
    { label: 'Manage Organizations', icon: 'apartment', route: 'mamageOragnization', expanded: false, children: [] }
  ];
  constructor() {}

  ngOnInit() {


  }

  toggleSubMenu(item: any): void {
    item.expanded = !item.expanded;
  }


}
