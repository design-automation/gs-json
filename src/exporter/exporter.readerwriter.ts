import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
})

export class JSONReaderWriter extends FileReader {
	read() {
		var arr;
		var jsontxt = JSON.parse(this.result);
		return jsontxt
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