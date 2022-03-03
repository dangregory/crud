import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('table')
  private tableEl: MatTable<User>;

  public displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'editar'];
  public userList: User[] = [];
  public bottomReached: boolean = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  @HostListener('window:scroll')
  public onScroll() {
    if (this.tableEl) {
      const table = this.tableEl['_elementRef'].nativeElement;
      let height = table.scrollHeight;
      let offset = window.scrollY + window.innerHeight;
      this.bottomReached = offset >= height;
    }
  }

  private listUsers(): void {
    this.userService.list()
      .subscribe((res: any) => this.userList = res);
  }

}
