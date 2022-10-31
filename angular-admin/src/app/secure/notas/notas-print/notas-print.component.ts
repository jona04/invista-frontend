import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Nota } from 'src/app/interfaces/nota';
import { ClienteService } from 'src/app/services/cliente.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-notas-print',
  templateUrl: './notas-print.component.html',
  styleUrls: ['./notas-print.component.css']
})
export class NotasPrintComponent implements OnInit {

  id: number;
  nota: Nota;
  cliente: Cliente;
  month: any;
  day: any;
  year: any;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.notaService.getFull(this.id).subscribe(
      nota => {
        console.log("nota", nota);
        this.nota = nota;
        this.clienteService.get(this.nota.servico[0].cliente.id).subscribe(
          cliente => {
            this.cliente = cliente;
          }
        );
      }
    );

    this.month = new Date().getMonth();
    this.day = new Date().getDate();
    this.year = new Date().getFullYear();
  }

}
