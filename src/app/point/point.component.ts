import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PointService} from './point.service';
import {IBGEUFResponse} from './IBGEUFResponse';
import {FormControl, FormGroup} from '@angular/forms';
import {IBGECityResponse} from './IBGECityResponse';
import {Item} from './Item';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit, AfterViewInit {

  pointForm: FormGroup;

  ufs: Array<IBGEUFResponse>;
  cities: Array<IBGECityResponse>;
  selectedItems: Array<number> = [];
  selectedFile: File;

  items: Array<Item> = [
    {id: 1, title: 'Lâmpadas', image: 'assets/itens/lampadas.svg'},
    {id: 2, title: 'Pilhas e Baterias', image: 'assets/itens/baterias.svg'},
    {id: 3, title: 'Papéis e Papelão', image: 'assets/itens/papeis-papelao.svg'},
    {id: 4, title: 'Resíduos Eletrônicos', image: 'assets/itens/eletronicos.svg'},
    {id: 5, title: 'Resíduos Orgânicos', image: 'assets/itens/organicos.svg'},
    {id: 6, title: 'Óleo de Cozinha', image: 'assets/itens/oleo.svg'},
  ];

  constructor(private readonly  pointService: PointService) {
  }

  ngOnInit(): void {

    this.pointForm = new FormGroup({
      name: new FormControl('0', []),
      email: new FormControl('0', []),
      whatsapp: new FormControl('0', []),
      uf: new FormControl('0', []),
      city: new FormControl('0', []),
    });

    this.pointService.getIBGEUfs().subscribe((ufs: Array<IBGEUFResponse>) => {
      this.ufs = ufs;
    });


  }

  ngAfterViewInit(): void {
    const key = 'uf';
    this.pointForm.controls[key].valueChanges.subscribe(this.getCities);
  }

  getCities = (uf: string): void => {
    this.pointService.getIBGECitys(uf).subscribe((cities: Array<IBGECityResponse>) => {
      this.cities = cities;
    });
  };


  handleSelectItem = (id: number) => {
    const alreadySelected = this.selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
    } else {
      this.selectedItems = [...this.selectedItems, id];
    }
  };

  includesItem = (item: number): boolean => {
    return this.selectedItems.includes(item);
  };

  onFileUpload = (file: File): void => {
    this.selectedFile = file;
  };

  onSubmit = (): void => {
    const formData = new FormData();

    for (const key of Object.keys(this.pointForm.controls)) {

      formData.append(key, this.pointForm.controls[key].value);
    }

  };

}
