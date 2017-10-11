import { Component } from '@angular/core';
import { AppArray } from '../app/app.array';
import { Mapper } from './mapper.component';

@Component({
  selector: 'app-root',
})
export class GSJSON2Threejs implements Mapper {

	constructor() {
    }

	map(gsjson:Document) {
		var threejs="";
		//TO DO for gsjson to threejs Translation
		return threejs;
	}
}