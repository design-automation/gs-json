import { Component } from '@angular/core';
import { AppArray } from '../app/app.array';
import { Mapper } from './mapper.component';

export class GSJSON2Threejs implements Mapper {

	constructor() {
    }

	map(gsjson:any) {
		//TO DO for gsjson to threejs Translation
		return gsjson;
	}
}