import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Nota } from 'src/app/interfaces/nota';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  allNotas: Nota [] = [];
  filterValue: string;
  dataLoaded: boolean;
  range: any;
  totalNotas: number;
  dataSource = new MatTableDataSource();
  columns = ['Numero', 'Cliente', 'Valor Total Nota', 'Criado em', 'Obs', 'Acoes'];

  constructor(
    private notaService: NotaService,
    private localSorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    var curr = new Date; // get current date
    var last = curr.getMonth(); //current month
    var first = last - 1;
    var firstday = new Date(curr.setMonth(first)).toISOString();
    var lastday = new Date(curr.setMonth(last)).toISOString();
    this.range = new FormGroup({
      start: new FormControl(firstday),
      end: new FormControl(lastday),
    });
    this.notaService.allList(this.range.value['start'], this.range.value['end']).subscribe(
      notas => {
        this.allNotas = notas;
        this.dataSource.data = notas;
        this.totalNotas = notas.length;
        this.dataLoaded = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateTable(): void {
    this.dataLoaded = false;
    this.range.controls.start.patchValue(this.range.value['start'].toISOString());
    this.range.controls.end.patchValue(this.range.value['end'].toISOString());
    this.notaService.allList(this.range.value['start'], this.range.value['end']).subscribe(
      notas => {
        this.allNotas = notas;
        this.dataSource.data = notas;
        this.totalNotas = notas.length;
        this.dataLoaded = true;
      }
    );
  }

  delete(id: number){
    if (confirm("Você tem certeza que deseja deletar?")){
      this.notaService.delete(id).subscribe({
        next: () => {
          this.allNotas = this.allNotas.filter((nota: any) => nota.id !== id);
          this.dataSource.data = this.allNotas;
        },
        error: (e) => {
          confirm("Error: " + e?.error?.detail);
        }
      });
    }
  }

  onKeyFilter(event?: any): void {
    this.dataSource.data = this.allNotas.filter((nota: any) =>
      nota.cliente_nome.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      nota.numero.toString().includes(this.filterValue)
    );
    this.totalNotas = this.dataSource.data.length;
  }

  cleanFilterValue(): void {
    this.filterValue = '';
    this.dataSource.data = this.allNotas;
    this.totalNotas = this.dataSource.data.length;
  }

  relatorioNotaCliente(): void {
    this.localSorageService.set('notas-cliente-relatorio', this.dataSource.data);
    window.open('notas/relatorio-cliente', '_blank');
  }

  printNota(id: number): void {
    window.open(`notas/${id}/print`, '_blank');
  }

  relatorioChapasData(): void {
    window.open(`notas/relatorio/${this.range.value['start']}/${this.range.value['end']}`, '_blank');
  }
}
