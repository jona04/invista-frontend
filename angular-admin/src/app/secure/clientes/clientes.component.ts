import { ClienteService } from './../../services/cliente.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number){
    if (confirm("Você tem certeza que deseja deletar?")){
      this.clienteService.delete(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter((cliente: any) => cliente.id !== id);
        }
      )
    }
  }
}
