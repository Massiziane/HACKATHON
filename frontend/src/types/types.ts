

/*
	* Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
	* Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
	*/


import {API_URL} from '../config';

export interface User {
				id: string;
				email: string;
				password: string;
				firstName: string;
				lastName: string;
				role: string;
}

export interface Categorie {
				id: string;
				name: string;
}

export interface Formation {
				id: string;
				title: string;
				description: string;
}

export interface Cours {
				id: string;
				title: string;
				description: string;
				body: string;
}

export interface Question {
				id: string;
				text: string;
}

export interface Reponse {
				id: string;
				text: string;
				bonneReponse: boolean;
}