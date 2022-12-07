import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataLoaded: boolean;
  range: any;
  totalNotas: number;
  dataSource = new MatTableDataSource();
  columns = ['Numero', 'Valor Total Nota', 'Criado em', 'Obs', 'Desconto', 'Acoes'];

  constructor(private notaService: NotaService) { }

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
    this.notaService.allList(this.range.value['start'], this.range.value['end']).subscribe(
      notas => {
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
        this.dataSource.data = notas;
        this.totalNotas = notas.length;
        this.dataLoaded = true;
      }
    );
  }

  delete(id: number){
    if (confirm("Você tem certeza que deseja deletar?")){
      this.notaService.delete(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter((nota: any) => nota.id !== id);
        }
      )
    }
  }
}
