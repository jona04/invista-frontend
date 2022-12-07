import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataLoaded: boolean;
  range: any;
  totalServicos: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Nome', 'Quantidade', 'Valor Total Servico', 'Criado em', 'Acoes'];

  constructor(private servicoService: ServicoService) { }

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
    this.servicoService.allList(this.range.value['start'], this.range.value['end']).subscribe(
      servicos => {
        this.dataSource.data = servicos;
        this.totalServicos = servicos.length;
        this.dataLoaded = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateTable(): void {
    this.dataLoaded = false;
    this.servicoService.allList(this.range.value['start'].toISOString(), this.range.value['end'].toISOString()).subscribe(
      servicos => {
        this.dataSource.data = servicos;
        this.totalServicos = servicos.length;
        this.dataLoaded = true;
      }
    );
  }

  delete(id: number){
    if (confirm("Você tem certeza que deseja deletar?")){
      this.servicoService.delete(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter((servico: any) => servico.id !== id);
        }
      )
    }
  }
}
