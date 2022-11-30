export interface CFentry {
	sys: {
		type: string;
		id: string;
		space: {
			type: string;
			id: string;
			linkType: string;
		};
		createdAt: string;
		updatedAt: string;
		revision: number;
	};
	fields?: any;
	metadata: any;
	toPlainObject: Function;
}

export interface CFEntryIndhold extends CFentry {
	fields: {
		title: string;
		slug: string;
		abstrakt: string | any;
		beskrivelse: any;
		media: any;
	};
}

export interface CFEntryProjekt extends CFentry {
	fields: {
		title: string;
		slug: string;
		abstrakt: string | any;
		beskrivelse: any;
		featuredImage: any;
	};
}

export interface CFEntryKalender extends CFentry {
	fields: {
		title: string;
		slug: string;
		abstrakt: string | any;
		beskrivelse: any;
		featuredImage: any;
		dato: string;
		kontaktPerson: any;
	};
}

export interface CFEntryNyheder extends CFentry {
	fields: {
		title: string;
		slug: string;
		abstrakt: string | any;
		indhold: any;
		banner: any;
	};
}

export interface CFEntryLanding extends CFentry {
	fields: {
		title: string;
		slug: string;
		abstrakt: string | any;
		forretningschef: any;
		mission: any;
		sider: any[];
	};
}
