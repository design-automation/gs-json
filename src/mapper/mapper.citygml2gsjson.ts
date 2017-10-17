import { Component } from '@angular/core';
import { AppArray } from '../app/app.array';
import { Mapper } from './mapper.component';
import { GSJSON } from '../formatstructure/formatstructure.gsjson';
import { Metadata } from '../formatstructure/formatstructure.gsjson';
import { Skins } from '../formatstructure/formatstructure.gsjson';
import { Geometry } from '../formatstructure/formatstructure.gsjson';
import { Semantics } from '../formatstructure/formatstructure.gsjson';
import { Attribute } from '../formatstructure/formatstructure.gsjson';
import { Collection } from '../formatstructure/formatstructure.gsjson';

export class CityGML2GSJSON implements Mapper {
  positions:AppArray<Array<number>>;
  faces:AppArray<any>;
  points: Array<any>;
  
  constructor() {
    this.positions=new AppArray([]);
    this.faces=new AppArray([]);
    this.points=[];
  }

	map(citygml:any) {	
    this.mapBuildElement(citygml.getElementsByTagName("bldg:RoofSurface"));
    this.mapBuildElement(citygml.getElementsByTagName("bldg:WallSurface"));
    this.mapBuildElement(citygml.getElementsByTagName("bldg:FloorSurface"));
    var attrArray=new Array<Attribute>();
    attrArray.push(new Attribute("", "position", "points", this.points, this.positions.values));
    var data=new GSJSON(new Metadata("",0.1,"","",""),new Skins([],[],[]),new Geometry([],[]),new Semantics(attrArray,[]));
    return JSON.stringify(data);
  }

  mapBuildElement(features) {
    for (var i=0;i<features.length ;i++) {
      var feature=features[i];
      this.faces.push(new AppArray(this.mapSurface(feature, 203, undefined)));
      
      this.mapOpenings(feature.getElementsByTagName("bldg:Window"));
      this.mapOpenings(feature.getElementsByTagName("bldg:Door"));
    }
  }

  mapOpenings(openings) {
    for (var i=0;i<openings.length ;i++) {
      this.faces.push(new AppArray(this.mapSurface(openings[i], 203, undefined)));
    }
  }

  mapSurface(feature:Document, facetype:number, holefeatures:Array<Document>) {
    var face=[];
    face.push(facetype); 
    face.push(this.mapGeometry(feature));

    var holes=new AppArray([]);
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
      var polygon=new AppArray([]);
      polygon.push(0);
    
      var newpoints = surface[i].textContent.split(' ').map(function(item) {
        return parseFloat(item);
      });
      var polypoints=new AppArray([]);
      for (var j=0;j<newpoints.length-3 ;j=j+3) {
        var point = [newpoints[j],newpoints[j+1],newpoints[j+2]];
        var ind=this.positions.findIndex(point);
        if(ind<0) {
          this.positions.push(point);
          ind=this.positions.values.length-1;
        }
        this.points.push(ind);
        polypoints.push(ind);
      }    
      polygon.push(polypoints);
      fsurface.push(polygon);
    }
    return new AppArray(fsurface);
  }
}