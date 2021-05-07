import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
	render() {
		return (
	 		<Html lang="en">
				<title>Sweetstop | Home</title>
				<Head>
					<meta name="description" content="Sweetstop! We use traditional recipes combined with an exciting flavour to serve something extraordinary..." />
					<link rel="preload" href="/fonts/Briberra.woff2" as="font" type="font/woff2" />
					<link rel="preload" href="/fonts/Quicksand.woff2" as="font" type="font/woff2" />
				</Head>
				<body>
					<Main></Main>
					<NextScript></NextScript>
				</body>
			</Html>
		)
	}
}
  

export default MyDocument
