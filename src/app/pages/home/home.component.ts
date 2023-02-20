import { Component } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Slider } from 'src/app/shared/models/slider.model';
import { Modal } from 'src/app/shared/models/modal.model';

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

  modalList: Modal[] = [
    {
      backImage: 'task-dashboard.png',
      title: 'Controle seus investimentos',
      textOne: 'Poder total para controlar todos os seus investimento',
      textTwo: 'Dashboard completa com os valores investidos',
      textThree: 'Gráficos com frudos de investimento por tipo',
      textFour: 'Fácil, rápido e gratuíto'
    },
    {
      backImage: 'money.png',
      title: 'Controle suas despesas',
      textOne: 'Gerenciamento total das suas despesas',
      textTwo: 'Controle dos cartões de crédito e débito',
      textThree: 'Centro de custos e despesas',
      textFour: 'Metas de Gastos'
    },
    {
      backImage: 'calendar.png',
      title: 'Acompanhe seu dinheiro',
      textOne: 'Objetivos financeiros claros e de fácil compreensão',
      textTwo: 'Gráficos com acompanhamento de despesas e receitas',
      textThree: 'Defina metas de despesas',
      textFour: 'Alcançe seus objetivos'
    },
    {
      backImage: 'clock.png',
      title: 'Gerencie seu dinheiro',
      textOne: 'Gerenciamento de passivos e ativos a qualquer momento',
      textTwo: 'Aplicativo de fácil acesso, prático, fácil e rápido',
      textThree: 'Atualizações automáticas e em real-time',
      textFour: 'Controle total do seu dinheiro'
    }
  ]

}
