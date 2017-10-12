import { Component } from '@angular/core';

export class AppArray {
	array:Array<any>;
	prefix:string;
	postfix:string;

	constructor(pre, input, post) {
		this.array=input;
		this.prefix=pre+"[";
		this.postfix="]"+post;
	}
	
	static create(input) {
		return new AppArray("", input, "");
	}

	push(input) {
		this.array.push(input);
	}
	pop() {
		return this.array.pop();
	}

    public toString = () : string => {
		return this.prefix+this.array.toString()+this.postfix;
    }

    public isEqual = (appArray:AppArray) : boolean => {
    	var input=appArray.array;
      	if(this.array.length!=input.length) {
     	   	return false;
      	}
      	for(var i=0;i<this.array.length;i++) {
      	  	if(this.array[i]!=input[i]) {
      	   		return false;
     	  	}
    	}
      	return true;
  	}
}