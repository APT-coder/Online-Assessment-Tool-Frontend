import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { NgFor, NgIf } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface User {
  name: string;
}

interface Role {
  role: string;
  numberOfUsers: number;
  users: User[];
}
@Component({
  selector: 'app-trainer-table',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule,NgIf,NgFor,FontAwesomeModule],
  templateUrl: './trainer-table.component.html',
  styleUrl: './trainer-table.component.scss'
})
export class TrainerTableComponent {
  roles: Role[] = [
    {
        role: 'trainer',
        numberOfUsers: 5,
        users: [
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Alice Johnson' },
            { name: 'Bob Brown' },
            { name: 'Charlie Davis' }
        ]
    },
    {
        role: 'trainer manager',
        numberOfUsers: 3,
        users: [
            { name: 'Emily Clark' },
            { name: 'David Lee' },
            { name: 'Sophie Turner' }
        ]
    },
    {
        role: 'assistant trainer',
        numberOfUsers: 2,
        users: [
            { name: 'Henry Adams' },
            { name: 'Lucy White' }
        ]
    }
];

expandedRoles: string[] = [];

toggleRoleExpansion(role: string) {
    const index = this.expandedRoles.indexOf(role);
    if (index === -1) {
        this.expandedRoles.push(role);
    } else {
        this.expandedRoles.splice(index, 1);
    }
}

calculateUserTotal(roleName: string): number {
    const role = this.roles.find(r => r.role === roleName);
    return role ? role.numberOfUsers : 0;
}
pencilIcon: IconDefinition = faPencilAlt;
trashIcon: IconDefinition = faTrashAlt;
}
