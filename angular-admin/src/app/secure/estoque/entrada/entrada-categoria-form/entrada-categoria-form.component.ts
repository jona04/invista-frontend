import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaEntradaService } from 'src/app/services/categoria-entrada.service';

@Component({
  selector: 'app-entrada-categoria-form',
  templateUrl: './entrada-categoria-form.component.html',
  styleUrls: ['./entrada-categoria-form.component.css']
})
export class EntradaCategoriaFormComponent implements OnInit {
  form: FormGroup;
  creating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaEntradaService: CategoriaEntradaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.creating = false;
    this.form = this.formBuilder.group({
      id: '',
      descricao: ''
    });
  }

  submit(): void {
    this.creating = true;
    this.categoriaEntradaService.create(this.form.getRawValue()).subscribe({
      next: (entrada) => {
        this.creating = false;
        this.router.navigate(['estoque/entrada/categoria/criar']);
      },
      error: (e) => {
        console.log("error", e);
        this.creating = false;
      }
    });
  }
}
