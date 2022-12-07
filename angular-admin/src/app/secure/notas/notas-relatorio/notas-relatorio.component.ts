import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NotaService } from 'src/app/services/nota.service';
import { ShowMenuService } from 'src/app/services/show-menu.service';
import { SecureComponent } from '../../secure.component';

@Component({
  selector: 'app-notas-relatorio',
  templateUrl: './notas-relatorio.component.html',
  styleUrls: ['./notas-relatorio.component.css']
})
export class NotasRelatorioComponent implements OnInit {

  dataLoaded: boolean;
  dataSource = new MatTableDataSource();
  start: string;
  end: string;
  columns: any = [];

  @Input()
  public secureComponet!: SecureComponent;

  constructor(
    private route: ActivatedRoute,
    private notaService: NotaService,
    private showMenuService: ShowMenuService
  ) { }

  ngOnInit(): void {
    this.dataLoaded = false;
  //   this.showMenuService.showMenu = false;
    this.start = this.route.snapshot.params['start'];
    this.end = this.route.snapshot.params['end'];
    this.notaService.relatorio(this.start, this.end).subscribe(
      result => {
        this.columns = ['chapa'].concat(result.columns);
        this.columns.push('total')
        this.dataSource = result.data;
        this.dataLoaded = true;
      }
    );
  }

}
