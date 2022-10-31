import { Servico } from './../../../interfaces/servico';
import { ServicoService } from './../../../services/servico.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { NotaService } from 'src/app/services/nota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas-form',
  templateUrl: './notas-form.component.html',
  styleUrls: ['./notas-form.component.css']
})
export class NotasFormComponent implements OnInit {

  form: FormGroup;
  id: number;
  create: boolean;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  servicoCtrl = new FormControl();
  filteredServicos: Observable<Servico[]>;
  servicos: Servico[] = [];
  allServicos: Servico[] = [];

  servicoList: Servico[] = [];

  @ViewChild('servicoInput') servicoInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private notaService: NotaService,
    private servicoService: ServicoService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      servico: '',
      desconto: '0',
      obs: ''
    });
    this.create = this.route.snapshot.data['create'];

    if (!this.create){
      this.id = this.route.snapshot.params['id'];
      this.notaService.getFull(this.id).subscribe(
        nota => {
          this.form.patchValue(nota);
          const servicos_aux: number[] = [];
          nota.servico.forEach(
            servico => {
              servicos_aux.push(servico.id);
              this.servicos.push(servico);
            }
          );
          this.form.controls['servico'].patchValue(servicos_aux);

          this.servicoService.allList().subscribe(
            servicos => {
              this.allServicos = servicos.slice(0,50);
              this.filteredServicos = this.servicoCtrl.valueChanges.pipe(
                startWith(null),
                map((fruit: Servico | null) => (fruit ? this._filter(fruit) : this.allServicos.slice())),
              );
            }
          );
        }
      );
    }else{
      this.servicoService.allList().subscribe(
        servicos => {
          this.allServicos = servicos.slice(0,50);
          this.filteredServicos = this.servicoCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: Servico | null) => (fruit ? this._filter(fruit) : this.allServicos.slice())),
          );
        }
      );
    }
  }

  add(event: MatChipInputEvent): void {
    console.log("event", event);
    // const input = event.input;
    // const value = event.value;

    // const value: Servico =  event;
    // // Add our fruit
    // if (value) {
    //   this.fruits.push(value);
    // }

    // // Clear the input value
    // event.chipInput!.clear();

    // this.fruitCtrl.setValue(null);
  }

  remove(fruit: Servico): void {
    const index = this.servicos.indexOf(fruit);

    if (index >= 0) {
      this.servicos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.servicos.push(event.option.value);
    this.servicoInput.nativeElement.value = '';
    this.servicoCtrl.setValue(null);
  }

  private _filter(value: Servico): Servico[] {
    const filterValue = value.nome.toLowerCase();
    return this.allServicos.filter(servico => servico.nome.toLowerCase().includes(filterValue));
  }

  submit(): void {
    console.log(this.form.getRawValue(),this.servicos,this.servicoCtrl);
    const servicoIds: number[] = [];
    this.servicos.forEach(
      servico => {
        servicoIds.push(servico.id);
      }
    )
    this.form.controls['servico'].patchValue(servicoIds);
    console.log(this.form.getRawValue());
    console.log("this.create",this.create);
    const method = this.create
      ? this.notaService.create(this.form.getRawValue())
      : this.notaService.update(this.id, this.form.getRawValue());

      method.subscribe(
      nota => {
        this.router.navigate(['notas']);
      }
    )
  }
}
