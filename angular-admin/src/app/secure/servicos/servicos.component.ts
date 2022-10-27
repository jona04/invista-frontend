import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

  totalServicos: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Nome', 'Valor Total Servico', 'Criado em', 'Acoes'];

  constructor(private servicoService: ServicoService) { }

  ngOnInit(): void {
    this.servicoService.all().subscribe( servicos => {
      console.log(servicos[0]);
      this.dataSource.data = servicos;
      this.totalServicos = servicos.length;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
