// Refer for documentation syntax: http://typedoc.org/guides/doccomments/

export class Math{

	/**
	 * @param a  First number to be added 
	 * @param b  Second number to be added 
	 * @returns  Sum of the two numbers
	 */
	static add(a: number, b:number): number{
		return a+b;
	}

	static subtract(a:number, b:number): number{
		return a - b;
	}

	static multiply(a: number, b:number): number{
		return a*b;
	}

	static factorial(a:number): number{
		if(a == 1)
			return 1; 
		else
			return this.factorial(a-1)*a;
	}

	/**
	 * @param value  Comment for parameter ´value´.
	 * @returns      Comment for special return value.
	 */
	static print(a: any): void{
		console.log(a);
	}

}