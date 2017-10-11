import { Component } from '@angular/core';
import { Exporter } from '../exporter/exporter.component';
import { GSJSONExporter } from '../exporter/exporter.component';
import { ThreejsExporter } from '../exporter/exporter.component';

@Component({
  	selector: 'app-root',
  	styleUrls: ['./app.component.css'],
  	templateUrl: './app.component.html',
})
export class AppComponent {
  static exporter:Exporter;

  static selection:HTMLSelectElement;
  static input:HTMLElement;
  static translateBut:HTMLElement;

  static inputFile:File;

  static initForm(){
    AppComponent.selection=<HTMLSelectElement>document.getElementById("inputType");
    AppComponent.selection.add(new Option("CityGML To GSJSON","0"));
    AppComponent.selection.add(new Option("GSJSON To ThreeJS","1"));

    AppComponent.input=document.getElementById("inputf");
    AppComponent.translateBut=document.getElementById("translate")
  }

  static setListeners() {
    AppComponent.input.addEventListener("change", this.setExporter, false);
    AppComponent.translateBut.addEventListener("click", this.translate, false);
  }

  static setExporter(inputEvent) {
    AppComponent.inputFile=inputEvent.target.files[0];
    var filepatharray=AppComponent.inputFile.name.split(".");
    var ext=filepatharray[filepatharray.length-1];
    var opt=AppComponent.selection.value;
    
    if(opt=="1"){
      if(ext=="json") {
        AppComponent.exporter=new ThreejsExporter(AppComponent.inputFile);
      } else {
        alert("Select JSON file as input for this conversion.");
        AppComponent.inputFile=null;
      }
    } else {
      if(ext=="gml" || ext=="xml") {
        AppComponent.exporter=new GSJSONExporter(AppComponent.inputFile);
      } else {
        alert("Select gml or xml file as input for this conversion.");
        AppComponent.inputFile=null;
      }
    }

  }

  static translate(outputEvent) {
    if(AppComponent.inputFile==null) {
      alert("Select appropriate input for this conversion.");
      return;
    }
    var data = AppComponent.exporter.export();
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'data';
    a.innerHTML = 'Download File';
    a.click();
  }
}

var isloaded=false;

document.onmouseover=function() {
  if(isloaded) {
    return;
  }
  AppComponent.initForm();
  AppComponent.setListeners();
  isloaded=true;
}