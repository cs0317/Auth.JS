///<reference path='mscorlib.ts'/>
class CST_MSG extends NObject
{
	SymT: string = "";
	SignedBy: string = "";
	constructor()
	{
		super();
	}
}
class Debug extends NObject
{
	static reached(): void
	{
		Contract.Assert(false);
	}
	constructor()
	{
		super();
	}
}
interface Nondet_Base
{
	Int(): number;
	String(): string;
	Bool(): boolean;
}
