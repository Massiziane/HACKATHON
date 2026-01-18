
/*
	* Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
	* Click nbfs://nbhost/SystemFileSystem/Templates/Other/TypeScriptDataObjectTemplate.ts to edit this template
	*/

import {API_URL} from "../config"
import type {User, Categorie, Formation, Cours, Question, Reponse} from "../types/types";

export const createStudent = async (student: Omit<User, 'id' | "createdAt">): Promise<User> => {
				const res = await fetch(`${API_URL}/etudiants`, {
								method: 'POST',
								headers: {
												"Content-Type": "Application/json"
								},
								body: JSON.stringify(student)
				});

				if (!res.ok) {
								throw new Error('Server Connection Failed')
				}

				const data = await res.json();
				return data.student;
}

export const listEtudiant = async (): Promise<Student[]> => {
				const res = await fetch(`${API_URL}/etudiants`);

				if (!res.ok) {
								throw new Error('Server Connection Failed')
				}

				const resultat = await res.json();
				return resultat.data;
};


export const createClub = async (club: {name: string, description: string, presidentId: number}): Promise<Club> => {
				const res = await fetch(`${API_URL}/clubs`, {
								method: 'POST',
								headers: {
												"Content-Type": "Application/json"
								},
								body: JSON.stringify(club)
				});

				if (!res.ok) {
								throw new Error('Server Connection Failed')
				}


};