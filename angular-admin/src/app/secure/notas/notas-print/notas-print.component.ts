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
  created_at: string = '';

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.notaService.getFull(this.id).subscribe(
      nota => {
        this.nota = nota;
        this.clienteService.get(this.nota.servico[0].cliente.id).subscribe(
          cliente => {
            this.cliente = cliente;
          }
        );
        this.created_at = this.nota.created_at;
      }
    );
  }

}
