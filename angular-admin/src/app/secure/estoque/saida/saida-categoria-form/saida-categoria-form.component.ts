import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaSaidaService } from 'src/app/services/categoria-saida.service';

@Component({
  selector: 'app-saida-categoria-form',
  templateUrl: './saida-categoria-form.component.html',
  styleUrls: ['./saida-categoria-form.component.css']
})
export class SaidaCategoriaFormComponent implements OnInit {
  form: FormGroup;
  creating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaSaidaService: CategoriaSaidaService,
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
    this.categoriaSaidaService.create(this.form.getRawValue()).subscribe({
      next: (saida) => {
        this.creating = false;
        this.router.navigate(['estoque/saida/categoria/criar']);
      },
      error: (e) => {
        console.log("error", e);
        this.creating = false;
      }
    });
  }
}
