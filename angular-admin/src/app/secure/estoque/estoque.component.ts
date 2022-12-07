import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { ChapaEstoque } from 'src/app/interfaces/estoque';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'estoque', 'entradas', 'saidas'];

  dataLoaded: boolean;
  range: any;
  dataSource: any;
  sortedData: ChapaEstoque[];
  estoque: ChapaEstoque[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private estoqueService: EstoqueService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    var curr = new Date; // get current date
    var last = curr.getDate() + curr.getDay(); // First day is the day of the month - the day of the week
    var first = last - 7; // last day is the first day + 6
    var firstday = new Date(curr.setDate(first)).toISOString();
    var lastday = new Date(curr.setDate(last)).toISOString();
    this.range = new FormGroup({
      start: new FormControl(firstday),
      end: new FormControl(lastday),
    });
    this.estoqueService.all(this.range.value['start'], this.range.value['end']).subscribe(
      estoque => {
        this.estoque = estoque;
        this.dataSource = new MatTableDataSource(this.estoque);
        this.dataSource.sort = this.sort;
        this.dataLoaded = true;
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.estoque.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nome':
          return compare(a.nome, b.nome, isAsc);
        case 'estoque':
          return compare(a.estoque, b.estoque, isAsc);
        default:
          return 0;
      }
    });
  }

  updateTable(): void {
    this.dataLoaded = false;
    this.estoqueService.all(this.range.value['start'].toISOString(), this.range.value['end'].toISOString()).subscribe(
      estoque => {
        this.estoque = estoque;
        this.dataSource = new MatTableDataSource(this.estoque);
        this.dataSource.sort = this.sort;
        this.dataLoaded = true;
      }
    );
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
