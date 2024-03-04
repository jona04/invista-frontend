import { NotaService } from 'src/app/services/nota.service';
import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas-relatorio-cliente',
  templateUrl: './notas-relatorio-cliente.component.html',
  styleUrls: ['./notas-relatorio-cliente.component.css']
})
export class NotasRelatorioClienteComponent implements OnInit {

  dataLoaded: boolean;
  notasRelatorioCliente: any = [];
  notasRelatorioClienteFull: any = [];
  totalNotasRelatorio: number = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private notaService: NotaService
  ) { }

  ngOnInit(): void {
    this.totalNotasRelatorio = 0;
    this.dataLoaded = false;
    this.notasRelatorioCliente = this.localStorageService.get('notas-cliente-relatorio');

    this.notasRelatorioCliente.forEach(
      (nota: any) => {
        this.notaService.getFull(nota.id).subscribe(
          notaFull => {
            this.notasRelatorioClienteFull.push(notaFull);
            console.log(this.notasRelatorioClienteFull);
            this.totalNotasRelatorio = this.totalNotasRelatorio + notaFull.valor_total_nota
            this.dataLoaded = true;
          }
        );
      }
    );

    console.log(this.notasRelatorioCliente);

  }

}
