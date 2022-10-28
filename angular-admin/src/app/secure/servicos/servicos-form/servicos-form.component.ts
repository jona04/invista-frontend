import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Chapa } from 'src/app/interfaces/chapa';
import { Cliente } from 'src/app/interfaces/cliente';
import { ChapaService } from 'src/app/services/chapa.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicoService } from 'src/app/services/servico.service';

@Component({
  selector: 'app-servicos-form',
  templateUrl: './servicos-form.component.html',
  styleUrls: ['./servicos-form.component.css']
})
export class ServicosFormComponent implements OnInit {

  form: FormGroup;
  id: number;
  create: boolean;
  chapaList: Chapa [];
  clienteList: Cliente [];

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private chapaService: ChapaService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) {
    
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      nome: '',
      quantidade: '',
      cliente: '',
      chapa: ''
    });

    this.create = this.route.snapshot.data['create'];
    if (!this.create){
      this.id = this.route.snapshot.params['id'];
      this.servicoService.get(this.id).subscribe(
        servico => {
          this.form.patchValue(servico);
        }
      );
    }

    this.chapaService.all().subscribe(
      chapas => {
        this.chapaList = chapas;
      }
    )

    this.clienteService.all().subscribe(
      clientes => {
        this.clienteList = clientes;
      }
    )
  }

  submit(): void {
    const method = this.create 
      ? this.servicoService.create(this.form.getRawValue())
      : this.servicoService.update(this.id, this.form.getRawValue());
      
      method.subscribe(
      servico => {
        this.router.navigate(['servicos']);
      }
    )
  }
}
