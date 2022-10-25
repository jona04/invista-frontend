import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './../../services/user.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalUsers: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Nome', 'Email', 'Ações'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.all().subscribe(
      users => {
        this.dataSource.data = users;
        this.totalUsers = users.length;
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
