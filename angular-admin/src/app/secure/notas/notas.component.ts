import { Component, OnInit, ViewChild } from '@angular/core';
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

  totalNotas: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Numero', 'Valor Total Nota', 'Criado em', 'Obs', 'Desconto', 'Acoes'];

  constructor(private notaService: NotaService) { }

  ngOnInit(): void {
    this.notaService.all().subscribe( 
      notas => {
        this.dataSource.data = notas;
        this.totalNotas = notas.length;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
