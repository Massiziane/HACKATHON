
export const MOCK_CATEGORIES = [
				{id: "dev", name: "Développement"},
				{id: "data", name: "Data"},
				{id: "design", name: "Design"},
				{id: "business", name: "Business"}
];

export const MOCK_PATHS = [
				{
								id: "js-zero-hero",
								title: "JavaScript de zéro à héros",
								description:
																"Parcours complet : fondamentaux, DOM, async, ES6+, et un projet final.",
								category: "dev",
								level: "débutant",
								durationHours: 18,
								image:
																"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
								audience: "Débutants en programmation",
								prerequisites: ["Savoir utiliser un ordinateur", "Motivation 😄"],
								modules: [
												{
																id: "fondamentaux",
																title: "Fondamentaux",
																lessons: [
																				{
																								id: "variables",
																								title: "Variables & Types",
																								content:
																																"Intro aux types, variables, opérateurs… (markdown plus tard).",
																								exercises: [
																												{id: "ex1", type: "QCM", title: "Types de base"},
																												{id: "ex2", type: "Code", title: "Manipuler des variables"}
																								],
																								quiz: {id: "q1", questionsCount: 5}
																				},
																				{
																								id: "conditions",
																								title: "Conditions & Boucles",
																								content: "If/else, switch, for/while, bonnes pratiques.",
																								exercises: [{id: "ex3", type: "Vrai/Faux", title: "Logique"}],
																								quiz: {id: "q2", questionsCount: 5}
																				}
																]
												},
												{
																id: "dom",
																title: "DOM",
																lessons: [
																				{
																								id: "selecteurs",
																								title: "Sélecteurs & Events",
																								content: "querySelector, addEventListener, etc.",
																								exercises: [{id: "ex4", type: "Association", title: "DOM API"}],
																								quiz: {id: "q3", questionsCount: 5}
																				}
																]
												}
								],
								rating: 4.7,
								reviewsCount: 1240
				},
				{
								id: "sql-bootcamp",
								title: "SQL Bootcamp (Analytics)",
								description:
																"Requêtes SQL, jointures, agrégations, window functions et mini-projet.",
								category: "data",
								level: "intermédiaire",
								durationHours: 12,
								image:
																"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
								audience: "Analystes & étudiants",
								prerequisites: ["Notions de tables", "Rigueur"],
								modules: [
												{
																id: "bases",
																title: "Bases SQL",
																lessons: [
																				{
																								id: "select",
																								title: "SELECT, WHERE, ORDER BY",
																								content: "Requêtes de base + exercices.",
																								exercises: [{id: "ex1", type: "Réponse courte", title: "Requête"}],
																								quiz: {id: "q1", questionsCount: 5}
																				}
																]
												}
								],
								rating: 4.5,
								reviewsCount: 380
				},
				{
								id: "ui-design",
								title: "UI Design Essentiel",
								description:
																"Hiérarchie visuelle, grilles, couleurs, composants, et étude de cas.",
								category: "design",
								level: "débutant",
								durationHours: 9,
								image:
																"https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=60",
								audience: "Créateurs & débutants",
								prerequisites: ["Aucun"],
								modules: [
												{
																id: "bases-ui",
																title: "Bases UI",
																lessons: [
																				{
																								id: "grilles",
																								title: "Grilles & Espacements",
																								content: "8pt grid, alignements, rythme visuel.",
																								exercises: [{id: "ex1", type: "Mise en ordre", title: "Layout"}],
																								quiz: {id: "q1", questionsCount: 5}
																				}
																]
												}
								],
								rating: 4.2,
								reviewsCount: 210
				}
];

export function labelCategory(catId) {
				return MOCK_CATEGORIES.find((c) => c.id === catId)?.name ?? catId;
}
