///<reference path='mscorlib.ts'/>
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
				xmlNode3.set_InnerText(current.Value);
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
