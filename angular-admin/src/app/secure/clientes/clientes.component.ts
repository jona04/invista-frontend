import { ClienteService } from './../../services/cliente.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filterValue: string;
  allClientes: Cliente [] = [];
  dataLoaded: boolean;
  totalClientes: number;
  dataSource = new MatTableDataSource();
  columns = ['ID', 'Nome', 'Email', 'Telefone', 'CPF', 'Rua', 'Bairro', 'Numero', 'Cidade', 'Estado', 'Cep', 'Acoes'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.clienteService.all().subscribe(
      clientes => {
        this.allClientes = clientes;
        this.dataSource.data = clientes;
        this.totalClientes = clientes.length;
        this.dataLoaded = true;
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
          this.allClientes = this.allClientes.filter((cliente: any) => cliente.id !== id);
          this.dataSource.data = this.allClientes;
        }
      )
    }
  }

  onKeyFilter(event?: any): void {
    this.dataSource.data = this.allClientes.filter((servico: any) => 
      servico.nome.toLowerCase().includes(this.filterValue.toLowerCase())
    );
    this.totalClientes = this.dataSource.data.length;
  }

  cleanFilterValue(): void {
    this.filterValue = '';
    this.dataSource.data = this.allClientes;
    this.totalClientes = this.dataSource.data.length;
  }
}
