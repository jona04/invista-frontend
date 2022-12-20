import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chapa } from 'src/app/interfaces/chapa';
import { ChapaService } from 'src/app/services/chapa.service';

@Component({
  selector: 'app-chapas',
  templateUrl: './chapas.component.html',
  styleUrls: ['./chapas.component.css']
})
export class ChapasComponent implements OnInit, AfterViewInit {
  
  filterValue: string;
  allChapas: Chapa [] = [];
  dataLoaded: boolean;
  totalChapas: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'nome', 'valor', 'estoque', 'acoes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chapaService: ChapaService) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.chapaService.all().subscribe(
      chapas => {
        this.allChapas = chapas;
        this.dataSource.data = chapas;
        this.totalChapas = chapas.length;
        this.dataLoaded = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onKeyFilter(event?: any): void {
    this.dataSource.data = this.allChapas.filter((chapa: any) => 
      chapa.nome.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    this.totalChapas = this.dataSource.data.length;
  }

  cleanFilterValue(): void {
    this.filterValue = '';
    this.dataSource.data = this.allChapas;
    this.totalChapas = this.dataSource.data.length;
  }
}
