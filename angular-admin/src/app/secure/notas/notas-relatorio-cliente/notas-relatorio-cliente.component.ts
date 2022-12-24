import { LocalStorageService } from './../../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas-relatorio-cliente',
  templateUrl: './notas-relatorio-cliente.component.html',
  styleUrls: ['./notas-relatorio-cliente.component.css']
})
export class NotasRelatorioClienteComponent implements OnInit {

  dataLoaded: boolean;

  constructor(
    private LocalStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    console.log(this.LocalStorageService.get('notas-cliente-relatorio'));
  }

}
