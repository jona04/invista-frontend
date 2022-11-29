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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saidaChapaService: SaidaChapaService,
    private chapaService: ChapaService,
    private categoriaEntradaService: CategoriaSaidaService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      chapa: '',
      quantidade: '',
      categoria: '',
      data: '',
      observacao: ''
    });

    this.id = this.route.snapshot.params['id'];
    this.saidaChapaService.get(this.id).subscribe(
      saida => {
        this.form.patchValue(saida);
      }
    );

    this.chapaService.all().subscribe(
      chapas => {
        this.chapaList = chapas;
      }
    );

    this.categoriaEntradaService.all().subscribe(
      categoriaEntradas => {
        this.categoriaList = categoriaEntradas;
      }
    );
  }

  submit(): void {
    this.saidaChapaService.create(this.form.getRawValue()).subscribe(
      (saida) => {
        this.router.navigate(['estoque/saida']);
      }
    );
  }
}
