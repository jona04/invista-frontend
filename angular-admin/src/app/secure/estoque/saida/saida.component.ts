import { MatSort, Sort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SaidaChapa } from 'src/app/interfaces/saida-chapa';
import { SaidaChapaService } from 'src/app/services/saida.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quantidade', 'chapa', 'categoria', 'data', 'observacao'];

  dataSource: any;
  sortedData: SaidaChapa[];
  saidas: SaidaChapa[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private saidaChapaService: SaidaChapaService
  ) { }

  ngOnInit(): void {
    this.saidaChapaService.all().subscribe(
      saidas => {
        this.saidas = saidas;
        this.dataSource = new MatTableDataSource(this.saidas);
        this.dataSource.sort = this.sort;
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.saidas.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'quantidade':
          return compare(a.quantidade, b.quantidade, isAsc);
        case 'marca':
          return compare(a.quantidade, b.quantidade, isAsc);
        case 'chapa':
          return compare(a.chapa, b.chapa, isAsc);
        case 'categoria':
          return compare(a.categoria, b.categoria, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
