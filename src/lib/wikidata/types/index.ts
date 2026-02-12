export enum WikiDataTag {
	// Works

	InstanceOf = 'wdt:P31', // instance of
	Genre = 'wdt:P136', // genre
	PublicationDate = 'wdt:P577', // publication date
	OpenLibraryID = 'wdt:P648', // Open Library ID
	Author = 'wdt:P50', // Author
	Isbn13 = 'wdt:P212', // ISBN-13
	Isbn10 = 'wdt:P957', // ISBN-10
	Title = 'wdt:P1476', // title
	EditionOf = 'wdt:P629', // edition or translation of
	Publisher = 'wdt:P123', // publisher
	Collection = 'wdt:P195', // collection
	NumberOfPages = 'wdt:P1104', // number of pages
	GoodreadsEditionID = 'wdt:P2969', // Goodreads version/edition ID
	Series = 'wdt:P179', // series

	// Identifiers / authority files

	Isni = 'wdt:P213', // International Standard Name Identifier
	Viaf = 'wdt:P214', // Virtual International Authority File
	Gnd = 'wdt:P227', // international authority file identifier

	// Person metadata

	DateOfBirth = 'wdt:P569', // date of birth
	DateOfDeath = 'wdt:P570', // date of death
	OfficialWebsite = 'wdt:P856', // official website
	Occupation = 'wdt:P106', // occupation
	Award = 'wdt:P166' // award received
}
