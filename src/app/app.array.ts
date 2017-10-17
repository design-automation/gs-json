import { Component } from '@angular/core';

export class AppArray<T> {
	values:Array<T>;
	prefix:string;
	postfix:string;

	constructor(input:Array<T>) {
		this.values=input;
	}
	
	static create(pre,input,post) {
		var apparray=new AppArray(input)
		apparray.prefix=pre;
		apparray.postfix=post;
		return apparray;
	}

	push(input) {
		this.values.push(input);
	}
	pop() {
		return this.values.pop();
	}

    public toString = () : string => {
		return this.prefix+this.values.toString()+this.postfix;
    }

    public isEqual = (appArray:AppArray<T>) : boolean => {
    	return AppArray.areEqual(this.values, appArray.values);
  	}

  	public findIndex = (value:T) : number => {
  		var ind=this.values.findIndex(function(entry, index, arr){
  			return AppArray.areEqual(value, entry);
        });
  		return ind;
  	}

  	private static areEqual = (array, input) : boolean => {
    	if(array.length!=input.length) {
     	   	return false;
      	}
      	for(var i=0;i<array.length;i++) {
      	  	if(array[i]!=input[i]) {
      	   		return false;
     	  	}
    	}
      	return true;
  	}
}