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
class Message extends CST_MSG
{
	value: number = 0;
	largestParty: string = null;
	certified: boolean = false;
	init(): void
	{
		VProgramGenerator.Assertion_cs = Resources.Assertion;
		VProgramGenerator.Program_cs = Resources.Program;
	}
	static parse(msg: Message, request: HttpRequest): boolean
	{
		msg.SymT = request.get_QueryString().get_Item("SymT");
		msg.SignedBy = request.get_QueryString().get_Item("SignedBy");
		if (request.get_QueryString().get_Item("value") !== null)
		{
			msg.value = NNumber.Parse(request.get_QueryString().get_Item("Value"));
		}
		msg.largestParty = request.get_QueryString().get_Item("LargestParty");
		var result: boolean;
		if ((msg.SignedBy === null || msg.SignedBy.length === 0) && !Message.SignatureValid(request))
		{
			Message.generateErrorResponse();
			result = false;
		}
		else
		{
			result = true;
		}
		return result;
	}
	static respond(msg: Message, response: HttpResponse): void
	{
		var dictionary: Dictionary<string, string> = new Dictionary<string, string>();
		dictionary.Add("SymT", msg.SymT);
		dictionary.Add("SignedBy", msg.SignedBy);
		dictionary.Add("LargestParty", msg.largestParty);
		dictionary.Add("Value", NNumber.ToString(msg.value));
		dictionary.Add("Certified", NBoolean.ToString(msg.certified));
		var xmlDocument: XmlDocument = HTTPComm.GenerateXML(dictionary);
		response.set_StatusCode(200);
		response.set_ContentType("text/xml");
		response.set_ContentEncoding(Encoding.UTF8);
		xmlDocument.Save(response.get_Output());
	}
	static generateErrorResponse(): void
	{
	}
	static SignatureValid(request: HttpRequest): boolean
	{
		return true;
	}
	constructor()
	{
		super();
	}
}
class Resources extends NObject
{
	private static resourceMan: ResourceManager = null;
	private static resourceCulture: CultureInfo = null;
	static get ResourceManager(): ResourceManager
	{
		if (NObject.ReferenceEquals(Resources.resourceMan, null))
		{
			var resourceManager: ResourceManager = new ResourceManager("Message.Properties.Resources", new Type("Resources").Assembly);
			Resources.resourceMan = resourceManager;
		}
		return Resources.resourceMan;
	}
	static set Culture(value: CultureInfo)
	{
		Resources.resourceCulture = value;
	}
	static get Culture(): CultureInfo
	{
		return Resources.resourceCulture;
	}
	static get Assertion(): string
	{
		return Resources.ResourceManager.GetString("Assertion", Resources.resourceCulture);
	}
	static get Program(): string
	{
		return Resources.ResourceManager.GetString("Program", Resources.resourceCulture);
	}
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
class HTTPComm extends NObject
{
	static HttpPost(url: string, post: string): string
	{
		var httpWebResponse: HttpWebResponse = HTTPComm.HttpReq(url, post, "POST");
		var streamReader: StreamReader = new StreamReader(httpWebResponse.GetResponseStream());
		return streamReader.ReadToEnd();
	}
	static HttpGet(url: string): string
	{
		var httpWebResponse: HttpWebResponse = HTTPComm.HttpReq(url, "", "GET");
		var streamReader: StreamReader = new StreamReader(httpWebResponse.GetResponseStream());
		return streamReader.ReadToEnd();
	}
	static HttpReq(url: string, post: string, method: string): HttpWebResponse
	{
		var httpWebRequest: HttpWebRequest = <HttpWebRequest>WebRequest.Create(url);
		httpWebRequest.KeepAlive = false;
		httpWebRequest.Method = method;
		if (method === "POST")
		{
			var bytes: number[] = Encoding.ASCII.GetBytes(post);
			httpWebRequest.ContentType = "application/x-www-form-urlencoded";
			httpWebRequest.ContentLength = <number>bytes.length;
			var requestStream: Stream = httpWebRequest.GetRequestStream();
			requestStream.Write(bytes, 0, bytes.length);
			requestStream.Close();
		}
		return <HttpWebResponse>httpWebRequest.GetResponse();
	}
	static GenerateXML(msgDict: Dictionary<string, string>): XmlDocument
	{
		var xmlDocument: XmlDocument = new XmlDocument();
		var xmlNode: XmlNode = xmlDocument.CreateXmlDeclaration("1.0", "UTF-8", null);
		var xmlNode2: XmlNode = xmlDocument.CreateElement("Message");
		xmlDocument.AppendChild(xmlNode2);
		var enumerator: Dictionary_Enumerator<string, string> = msgDict.GetEnumerator();
		try
		{
			while (enumerator.MoveNext())
			{
				var current: KeyValuePair<string, string> = enumerator.Current;
				var xmlNode3: XmlNode = xmlDocument.CreateElement(current.Key);
				xmlNode3.InnerText = current.Value;
				xmlNode2.AppendChild(xmlNode3);
			}
		}
		finally
		{
			(<IDisposable>enumerator).Dispose();
		}
		return xmlDocument;
	}
	constructor()
	{
		super();
	}
}
