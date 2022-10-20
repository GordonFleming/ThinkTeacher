import { error } from '@sveltejs/kit';
import { apiGraph } from '../../db'
import { prod } from "$lib/env.js";

let health_cat = 3,
	travel_cat = 2,
	course_cat = 5,
	wellbeing_cat = 4,
	finance_cat = 1,
	legal_cat = 9,
	books_cat = 6,
	cars_cat = 7,
	glasses_cat = 8,
	business_cat = 9;
if (prod === "true") {
	(health_cat = 2),
		(travel_cat = 1),
		(course_cat = 6),
		(wellbeing_cat = 3),
		(finance_cat = 5),
		(legal_cat = 4),
		(books_cat = 7),
		(cars_cat = 8),
		(glasses_cat = 9),
		(business_cat = 10);
}

export async function load() {
	const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchBenefits",
		query: `query fetchBenefits {     
                packages {
                    name,
                    description,
                    partner {
                        company_name,
                        description,
                        category{
                            id,
                        },
                        logo{
                            url
                        },
                        slug
                    },
                    details,
                    banner{
                        hash,
                        ext
                    }
                } 
            }`,
		variables: {},
	};

	const res = await apiGraph('POST', endpoint, graphqlQuery);

	let packages = [],
		travel = [],
		health = [],
		wellbeing = [],
		courses = [],
		finance = [],
		legal = [],
		books = [],
		cars = [],
		glasses = [],
		business = [];
	let source;

	if (res.ok) {
		const data = await res.json();
		packages = data.data.packages;

		function seperatePackages(item) {
			switch (parseInt(item.partner.category.id)) {
				case travel_cat:
					travel.push(item);
					break;
				case health_cat:
					health.push(item);
					break;
				case wellbeing_cat:
					wellbeing.push(item);
					source = wellbeing[0].details;
					break;
				case course_cat:
					courses.push(item);
					break;
				case finance_cat:
					finance.push(item);
					break;
				case legal_cat:
					legal.push(item);
					break;
				case books_cat:
					books.push(item);
					break;
				case cars_cat:
					cars.push(item);
					break;
				case glasses_cat:
					glasses.push(item);
					break;
				case business_cat:
					business.push(item);
					break;
				default:
					console.log("This belongs to nothing...");
			}
		}

		packages.forEach(seperatePackages);

		return {
			travel,
			health,
			wellbeing,
			courses,
			finance,
			legal,
			books,
			cars,
			glasses,
			business,
			source,
		};
	}

	throw error(res.status);
};
