import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { NotaService } from 'src/app/services/nota.service';
import { Router } from '@angular/router';

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
  notaCtrl = new FormControl('');
  filteredNotas: Observable<string[]>;
  notas: string[] = [];
  allNotas: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('notaInput') notaInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private notaService: NotaService,
    private router: Router
  ){
    this.filteredNotas = this.notaCtrl.valueChanges.pipe(
      startWith(null),
      map((servico: string | null) => (servico ? this._filter(servico) : this.allNotas.slice())),
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      servico: '',
      desconto: '',
      obs: ''
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.notas.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.notaCtrl.setValue(null);
  }

  remove(nota: string): void {
    const index = this.notas.indexOf(nota);

    if (index >= 0) {
      this.notas.splice(index, 1);
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.notas.push(event.option.viewValue);
    this.notaInput.nativeElement.value = '';
    this.notaCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allNotas.filter(nota => nota.toLowerCase().includes(filterValue));
  }

  submit(): void {
    console.log(this.form.getRawValue(), this.notas);
    // const method = this.create 
    //   ? this.notaService.create(this.form.getRawValue())
    //   : this.notaService.update(this.id, this.form.getRawValue());
      
    //   method.subscribe(
    //   nota => {
    //     this.router.navigate(['notas']);
    //   }
    // )
  }
}
