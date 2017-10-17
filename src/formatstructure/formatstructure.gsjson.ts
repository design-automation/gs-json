import { Component } from '@angular/core';

export class GSJSON {
  metadata:Metadata;
  skins:Skins;
  geometry:Geometry;
  semantics:Semantics;

  constructor(metadata:Metadata, skins:Skins, geometry:Geometry, semantics:Semantics) {
    this.metadata=metadata;
    this.skins=skins;
    this.geometry=geometry;
    this.semantics=semantics;
  }
}

export class Metadata { 
  filetype:string;
  version: number;
  schema:string;
  crs: string;
  location: string;

  constructor(filetype:string,version: number, schema:string, crs: string,location: string) {
    this.filetype=filetype;
    this.version=version;
    this.schema=schema;
    this.crs=crs;
    this.location=location;
  }
}

export class Skins { 
  images:Array<any>;
  textures: Array<any>;
  materials:Array<any>;

  constructor(images:Array<any>, textures: Array<any>, materials:Array<any>) {
    this.images=images;
    this.textures=textures;
    this.materials=materials;
  }
}

export class Geometry {
  counts:Array<number>;
  entities: Array<Array<any>>;

  constructor(counts:Array<number>,entities: Array<Array<any>>) {
    this.counts=counts;
    this.entities=entities;
  }
}

export class Semantics {
    attributes:Array<Attribute>;
    collections:Array<Collection>;

    constructor(attributes:Array<Attribute>,collections:Array<Collection>) {
      this.attributes=attributes;
      this.collections=collections;
    }
}

export class Attribute {
    uuid:string;
    name:string;
    topology:string;
    map:Array<number>;
    values:Array<any>;
    constructor(uuid:string,name:string,topology:string,map:Array<number>,values:Array<any>) {
      this.uuid=uuid;
      this.name=name;
      this.topology=topology;
      this.map=map;
      this.values=values;
    }
}

export class Collection {
    uuid:string;
    name:string;
    topology:string;
    entities:Array<number>;
    properties:any;
    constructor(uuid:string,name:string,topology:string,properties:any) {
      this.uuid=uuid;
      this.name=name;
      this.topology=topology;
      this.properties=properties;
    }
}