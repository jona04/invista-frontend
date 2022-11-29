import { EntradaChapaService } from './../../../services/entrada.service';
import { MatSort, Sort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EntradaChapa } from 'src/app/interfaces/entrada-chapa';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'quantidade', 'marca', 'valorUnitario', 'chapa', 'categoria', 'data'];

  dataSource: any;
  sortedData: EntradaChapa[];
  entradas: EntradaChapa[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private chapaEntradaService: EntradaChapaService
  ) { }

  ngOnInit(): void {
    this.chapaEntradaService.all().subscribe(
      entradas => {
        this.entradas = entradas;
        this.dataSource = new MatTableDataSource(this.entradas);
        this.dataSource.sort = this.sort;
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.entradas.slice();
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
        case 'valorUnitario':
          return compare(a.valorUnitario, b.valorUnitario, isAsc);
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
