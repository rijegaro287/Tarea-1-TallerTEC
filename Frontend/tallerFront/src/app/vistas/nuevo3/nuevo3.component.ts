import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ResponseI } from 'src/app/modelos/response.interface';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo3.component.html',
  styleUrls: ['./nuevo3.component.css']
})

// Componente para crear nuevas citas 
export class NuevoComponent3 implements OnInit {

  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiService) { }
    infoStat: boolean = false;
    infoText: any = "";

    nuevoForm = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    attendedClient: new FormControl(''),
    licensePlate: new FormControl(''),
    branchID: new FormControl(''),
    requiredService: new FormControl(''),
    mechanicId: new FormControl(''),
    assistantId: new FormControl(''),
    necessaryParts: new FormControl('')
  });

  ngOnInit(): void {

  }

  //Funcion: Agrega nueva cita a la base de datos
  //Entrada: form 
  postForm(form:any){

    let idN  = parseInt(form.id);
    let attID = parseInt(form.attendedClient);
    let branchN = parseInt(form.branchID);
    let requiredN = parseInt(form.requiredService);
    let mechN = parseInt(form.mechanicId);
    let assistN = parseInt(form.assistantId);
    let parts = form.necessaryParts.split(',').map(Number);

    console.log(parts);
    let peticion = {ID:idN, Date:form.date, Time:form.time, AttendedClientID:attID, LicensePlate:form.licensePlate,
      BranchID:branchN, RequiredService:requiredN, MechanicID:mechN, AssistantID:assistN, NecessaryParts:parts};

    console.log(peticion);

    this.api.postCita(peticion).subscribe(data=>{
      console.log(data);
      let dataResponse:ResponseI = data as ResponseI;
      console.log(dataResponse.status);
      if (dataResponse.status == "Ok"){
        this.infoStat = true;
        this.infoText = "Cita creada";
      }else{
        this.infoStat = true;
        this.infoText = "No se pudo crear";
      }
    })
  }

  //Funcion: Regresar a la ventana anterior 
  salir(){
    this.router.navigate(['dashboard']);
  }

}
