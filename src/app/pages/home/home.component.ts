import { Component } from '@angular/core';
import { Slider } from 'src/app/shared/models/slider.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  customerList : Slider[] = [
    {
      imageName: 'customer1',
      name: 'João Miguel',
      job: 'Assistente Financeiro',
      feedback: 'Comecei usar o aplicativo diariamente há mais de 6 meses e ele atende muito bem as necessidades. Excelente app, muito completo, vários recursos úteis e interessantes. Recomendo muito.'
    },
    {
      imageName: 'customer2',
      name: 'Diana Fernanda',
      job: 'Representante Comercial',
      feedback: 'Aplicativo muito competente, fácil de usar, bonito e organizado. Adoro a função de pesquisa por nome que mostra todos os resultados dentro de 1 ano ou mais em uma única lista.'
    },
    {
      imageName: 'customer3',
      name: 'Fernanda Lima',
      job: 'Empresária',
      feedback: 'O app é muito bom, simples e objetivo ideal para controle e planejamento pessoal. Estou gostando muito.'
    },
    {
      imageName: 'customer4',
      name: 'Pedro Souza',
      job: 'Investidor',
      feedback: 'Estou usando a alguns anos e recomendo! Impressionante que um app para gerenciamento de finanças seja tão completo e, ao mesmo tempo, tão intuitivo no uso.'
    },
  ]
}
