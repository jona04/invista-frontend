import { CategoriaEntradaService } from './../../../../services/categoria-entrada.service';
import { EntradaChapaService } from './../../../../services/entrada.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapa } from 'src/app/interfaces/chapa';
import { ChapaService } from 'src/app/services/chapa.service';

@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.css']
})
export class EntradaFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  chapaList: Chapa [];
  categoriaList: any [];
  creating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entradaChapaService: EntradaChapaService,
    private chapaService: ChapaService,
    private categoriaEntradaService: CategoriaEntradaService
  ) { }

  ngOnInit(): void {
    this.creating = false;
    this.form = this.formBuilder.group({
      id: '',
      chapa: '',
      quantidade: '',
      categoria: '',
      data: '',
      marca: '',
      valor_unitario: '',
      observacao: ''
    });

    this.id = this.route.snapshot.params['id'];
    this.entradaChapaService.get(this.id).subscribe(
      entrada => {
        this.form.patchValue(entrada);
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
    this.creating = true;
    this.entradaChapaService.create(this.form.getRawValue()).subscribe({
      next: (entrada) => {
        this.creating = false;
        this.router.navigate(['estoque/entrada']);
      },
      error: (e) => {
        console.log("error", e);
        this.creating = false;
      }
    });
  }
}
