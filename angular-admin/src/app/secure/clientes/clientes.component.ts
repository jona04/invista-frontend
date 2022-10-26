import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  totalClientes: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Nome', 'Email', 'Telefone', 'CPF', 'Rua', 'Bairro', 'Numero', 'Cidade', 'Estado', 'Cep', 'Acoes'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.all().subscribe(
      clientes => {
        this.dataSource.data = clientes;
        this.totalClientes = clientes.length;
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
