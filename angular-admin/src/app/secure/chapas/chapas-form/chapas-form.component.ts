import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapaService } from 'src/app/services/chapa.service';

@Component({
  selector: 'app-chapas-form',
  templateUrl: './chapas-form.component.html',
  styleUrls: ['./chapas-form.component.css']
})
export class ChapasFormComponent implements OnInit {

  create: boolean;
  form: FormGroup;
  id: number;
  creating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private chapaService: ChapaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.creating = false;
    this.form = this.formBuilder.group({
      nome: '',
      valor: '',
      estoque: '',
      marca: '',
      obs: ''
    });

    this.create = this.route.snapshot.data['create'];
    if (!this.create){
      this.id = this.route.snapshot.params['id'];
      if (this.id) {
        this.chapaService.get(this.id).subscribe(
          chapa => {
            this.form.patchValue(chapa);
          }
        );
      }
    };
  }

  submit(): void {
    this.creating = true;

    if (this.create) {
      this.form.controls['estoque'].setValue(0);
    }

    const method = this.create
      ? this.chapaService.create(this.form.getRawValue())
      : this.chapaService.update(this.id, this.form.getRawValue());

      method.subscribe({
        next: (chapa) => {
          this.creating = false;
          this.router.navigate(['chapas']);
        },
        error: (e) => {
          console.log("error", e);
          this.creating = false;
        }
      });
  }
}
