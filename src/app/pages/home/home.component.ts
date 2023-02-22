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
      bannerImage: 'task-dashboard.png',
      title: 'Controle seus investimentos',
      highlights: {
        highlightOne: 'Poder total para controlar todos os seus investimento',
        highlightTwo: 'Dashboard completa com os valores investidos',
        highlightThree: 'Gráficos com frudos de investimento por tipo',
        highlightFour: 'Fácil, rápido e gratuíto',
      }
    },
    {
      bannerImage: 'money.png',
      title: 'Controle suas despesas',
      highlights: {
        highlightOne: 'Gerenciamento total das suas despesas',
        highlightTwo: 'Controle dos cartões de crédito e débito',
        highlightThree: 'Centro de custos e despesas',
        highlightFour: 'Metas de Gastos',
      }
    },
    {
      bannerImage: 'calendar.png',
      title: 'Acompanhe seu dinheiro',
      highlights: {
        highlightOne: 'Objetivos financeiros claros e de fácil compreensão',
        highlightTwo: 'Gráficos com acompanhamento de despesas e receitas',
        highlightThree: 'Defina metas de despesas',
        highlightFour: 'Alcançe seus objetivos',
      }
    },
    {
      bannerImage: 'clock.png',
      title: 'Gerencie seu dinheiro',
      highlights: {
        highlightOne: 'Gerenciamento de passivos e ativos a qualquer momento',
        highlightTwo: 'Aplicativo de fácil acesso, prático, fácil e rápido',
        highlightThree: 'Atualizações automáticas e em real-time',
        highlightFour: 'Controle total do seu dinheiro',
      }
    }
  ]

  modalSelected!: Modal

  handleOpenModal(identifier: number){
    this.modalSelected = this.modalList[identifier]
    document.querySelector('#modal')?.classList.remove('hidden')
  }

}
