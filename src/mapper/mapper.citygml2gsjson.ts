import { Component } from '@angular/core';
import { AppArray } from '../app/app.array';
import { Mapper } from './mapper.component';

@Component({
  selector: 'app-root',
})
export class CityGML2GSJSON implements Mapper {
  allpoints:Array<AppArray>;
  faces:Array<any>;

  constructor() {
    this.allpoints=new Array<AppArray>();
    this.faces=[];
  }

	map(citygml:Document) {	
    this.mapBuildElement(citygml.getElementsByTagName("bldg:RoofSurface"));
    this.mapBuildElement(citygml.getElementsByTagName("bldg:WallSurface"));
    this.mapBuildElement(citygml.getElementsByTagName("bldg:FloorSurface"));
   
    var points="\n\t\t\t["+this.allpoints.toString()+"\n\t\t\t]";
    var transMatrix="\n\t\t\t[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]";
    var pointset="\n\t\"pointsets\": [\n\t\t["+points+","+transMatrix+"\n\t\t]\n\t]";
    var entityData="\n\t\"entities\": [\n\t\t["+this.faces.toString()+"\n\t\t]\n\t]";    
    return "\"geometry\": {"+pointset+","+entityData+"\n}";
  }

  mapBuildElement(features) {
    for (var i=0;i<features.length ;i++) {
      var feature=features[i];
      this.faces.push(new AppArray("\n\t\t\t\t",this.mapSurface(feature, 203, undefined),""));
      
      this.mapOpenings(feature.getElementsByTagName("bldg:Window"));
      this.mapOpenings(feature.getElementsByTagName("bldg:Door"));
    }
  }

  mapOpenings(openings) {
    for (var i=0;i<openings.length ;i++) {
      this.faces.push(new AppArray("\n\t\t\t\t",this.mapSurface(openings[i], 203, undefined),""));
    }
  }

  mapSurface(feature:Document, facetype:number, holefeatures:Array<Document>) {
    var face=[];
    face.push(facetype); 
    face.push(this.mapGeometry(feature));

    var holes=AppArray.create([]);
    if(holefeatures!=undefined) {  
      for (var i=0;i<holefeatures.length ;i++) {
        holes.push(this.mapGeometry(holefeatures[i]));
      }
    }
    face.push(holes);
    return face;
  }

  mapGeometry(feature:Document) {
    var surface=feature.getElementsByTagName("gml:posList");
    var fsurface=[];
    for (var i=0;i<surface.length ;i++)
    { 
      var polygon=AppArray.create([]);
      polygon.push(0);
    
      var newpoints = surface[i].textContent.split(' ').map(function(item) {
        return parseFloat(item);
      });
      var polypoints=AppArray.create([]);
      for (var j=0;j<newpoints.length-3 ;j=j+3) {
        var point = new AppArray("\n\t\t\t\t",[newpoints[j],newpoints[j+1],newpoints[j+2]],"");
        var ind=this.allpoints.findIndex(function(entry, index, arr){
          return entry.isEqual(point);
        });

        if(ind<0) {
          this.allpoints.push(point);
          ind=this.allpoints.length-1;
        }
        polypoints.push(ind);
      }    
      polygon.push(polypoints);
      fsurface.push(polygon);
    }
    return AppArray.create(fsurface);
  }
}