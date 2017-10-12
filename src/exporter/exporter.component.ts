import { Component } from '@angular/core';
import { XMLReaderWriter } from './exporter.readerwriter';
import { JSONReaderWriter } from './exporter.readerwriter';
import { CityGML2GSJSON } from '../mapper/mapper.citygml2gsjson';
import { GSJSON2Threejs } from '../mapper/mapper.gsjson2threejs';

export class GSJSONExporter implements Exporter {
	reader:XMLReaderWriter;
	
	constructor(inputf:File) {
		if(inputf==undefined) {
			alert("Please select input file");
			return;
		}
		this.reader = new XMLReaderWriter();
		this.reader.readAsText(inputf);
	}

	export() {
		//Map CityGML to GSJSON and Write GSJSON to output file
		if(this.reader.result==null || this.reader.result==undefined) {
			alert("Please select input file");
			return;
		}
		var gsjson=new CityGML2GSJSON().map(this.reader.read());
		return JSONReaderWriter.write(gsjson);
	};
}

export class ThreejsExporter implements Exporter {
	reader:JSONReaderWriter;
	
	constructor(inputf:File) {
		if(inputf==undefined) {
			alert("Please select input file");
			return;
		}
		this.reader = new JSONReaderWriter();
		this.reader.readAsText(inputf);
	}

	export() {
		//Map CityGML to GSJSON and Write GSJSON to output file
		if(this.reader.result==null || this.reader.result==undefined) {
			alert("Please select input file");
			return;
		}
		var gsjson=new GSJSON2Threejs().map(this.reader.read());
		return JSONReaderWriter.write(gsjson);
	};
}

export interface Exporter {
	export();
}