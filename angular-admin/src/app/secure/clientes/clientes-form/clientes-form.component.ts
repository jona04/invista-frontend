import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  create: boolean;
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      rua: '',
      bairro: '',
      numero: null,
      cidade: '',
      estado: '',
      cep: ''
    })

    this.create = this.route.snapshot.data['create'];
    if (!this.create){
      this.id = this.route.snapshot.params['id'];
      this.clienteService.get(this.id).subscribe(
        cliente => {
          this.form.patchValue(cliente);
        }
      )
    }
  }

  submit(): void {
    const method = this.create 
      ? this.clienteService.create(this.form.getRawValue())
      : this.clienteService.update(this.id, this.form.getRawValue());
      
      method.subscribe(
      cliente => {
        this.router.navigate(['clientes']);
      }
    )
  }
}
