import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PointService} from './point.service';
import {IBGEUFResponse} from './IBGEUFResponse';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IBGECityResponse} from './IBGECityResponse';
import {Item} from './Item';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit, AfterViewInit {

  @ViewChild('dropZone', {read: ElementRef, static: false}) dropZone: ElementRef;
  @ViewChild('mapMarker', {read: ElementRef, static: false}) mapMarker: ElementRef;


  pointForm: FormGroup;

  ufs: Array<IBGEUFResponse>;
  cities: Array<IBGECityResponse>;
  selectedItems: Array<number> = [];
  selectedFile: File;
  latitude: number;
  longitude: number;

  items: Array<Item> = [
    {id: 1, title: 'Lâmpadas', image: 'assets/itens/lampadas.svg'},
    {id: 2, title: 'Pilhas e Baterias', image: 'assets/itens/baterias.svg'},
    {id: 3, title: 'Papéis e Papelão', image: 'assets/itens/papeis-papelao.svg'},
    {id: 4, title: 'Resíduos Eletrônicos', image: 'assets/itens/eletronicos.svg'},
    {id: 5, title: 'Resíduos Orgânicos', image: 'assets/itens/organicos.svg'},
    {id: 6, title: 'Óleo de Cozinha', image: 'assets/itens/oleo.svg'},
  ];

  constructor(private readonly  pointService: PointService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.pointForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      whatsapp: new FormControl('', [Validators.required]),
      uf: new FormControl('0', [Validators.required]),
      city: new FormControl('0', [Validators.required]),
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

    if (!this.selectedFile) {
      this.dropZone.nativeElement.focus();
    }
    // if (!this.latitude) {
    //   this.mapMarker.nativeElement.focus();
    // }

    if (this.pointForm.invalid) {
      return;
    }


    const formData: FormData = new FormData();

    for (const key of Object.keys(this.pointForm.controls)) {
      formData.append(key, this.pointForm.controls[key].value);
    }

    formData.append('latitude', String(this.latitude));
    formData.append('longitude', String(this.longitude));
    formData.append('items', this.selectedItems.join(','));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.pointService.savePoint(formData).subscribe((response) => console.log(response),
      (error) => console.log(error));
  };

  handleLatitude = (latitude: number): void => {
    this.latitude = latitude;
  };

  handleLongitude = (longitude: number): void => {
    this.longitude = longitude;
  };

}
