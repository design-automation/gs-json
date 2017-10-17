import { Component } from '@angular/core';

export class JSONReaderWriter extends FileReader {
	read() {
		return JSON.parse(this.result);
	};

	static write(jsonObj) {
		return "text/json;charset=utf-8," + encodeURIComponent(jsonObj);
	};
}

export class XMLReaderWriter extends FileReader {
	read() {
		var arr;		
		var xmlDoc=(new DOMParser()).parseFromString(this.result,"text/xml");
		arr=xmlDoc.getElementsByTagName("gml:posList");
		return xmlDoc;
	};
	write(xmlObj) {
		return "text/xml;charset=utf-8," + xmlObj;
	};
}