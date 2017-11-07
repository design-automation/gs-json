export class Math{

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

}