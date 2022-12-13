import { CategoriaSaidaService } from './../../../../services/categoria-saida.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapa } from 'src/app/interfaces/chapa';
import { ChapaService } from 'src/app/services/chapa.service';
import { SaidaChapaService } from 'src/app/services/saida.service';

@Component({
  selector: 'app-saida-form',
  templateUrl: './saida-form.component.html',
  styleUrls: ['./saida-form.component.css']
})
export class SaidaFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  chapaList: Chapa [];
  categoriaList: any [];
  creating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private saidaChapaService: SaidaChapaService,
    private chapaService: ChapaService,
    private categoriaSaidaService: CategoriaSaidaService
  ) { }

  ngOnInit(): void {
    this.creating = false;
    this.form = this.formBuilder.group({
      id: '',
      chapa: '',
      quantidade: '',
      categoria: '',
      data: '',
      observacao: ''
    });

    this.chapaService.all().subscribe(
      chapas => {
        this.chapaList = chapas;
      }
    );

    this.getCategoriaSaida();
  }

  submit(): void {
    this.creating = true;
    this.saidaChapaService.create(this.form.getRawValue()).subscribe({
      next: (saida) => {
        this.creating = false;
        this.router.navigate(['estoque/saida']);
      },
      error: (e) => {
        console.log("error", e);
        this.creating = false;
      }
    });
  }

  redirectToCreateCategoria(): void {
    window.open('estoque/saida/categoria/criar', '_blank');
  }

  getCategoriaSaida(): void {
    this.categoriaList = [];
    this.categoriaSaidaService.all().subscribe(
      categoriaSaida => {
        this.categoriaList = categoriaSaida;
      }
    );
  }
}
