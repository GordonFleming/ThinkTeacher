// Possible future validation with yup here
export const formOpt = {
    business: {
        business_coaching: false,
        side_business: false,
        financial_health: false,
    },
    cars: {
        nearest_kia_dealer: "",
        cell: "",
        car_options: [
            'picanto',
            'rio',
            'pegas',
            'sonet',
            'seltos',
            'sportage',
            'sorento',
            'carnival',
            'picanto_runner',
        ]
    },
    medical_aid: {
        place_of_residence: "",
        chronic: false,
        medical_aid: false,
        gapcover: false,
        number_of_dependants: 0,
        medical_scheme: [
            'students',
            'entry_level_options',
            'basic_hospital_plans',
            'better_hospital_plans',
            'hospital_plan_plus_savings',
            'comprehensive',
            'smart_plans',
            'gapcover',
        ]
    },
    wellbeing: {
        life_coaching: false,
        bereavement: false,
        nutrition: false,
        wellbeing: false,
    },
    courses: {
        interested_in: "",
        register_myself: true,
        province: "",
        education_phase: "",
        workplace: ""
    },
    travel: {
        start_date: "date",
        end_date: "date",
        type_of_holiday: "",
        // [
        //     "Beach",
        //     "Bush",
        //     "Ski",
        //     "Mountains",
        //     "City",
        //     "Adventure",
        //     "Conference",
        //     "Sports Tours",
        //     "Other"
        // ],
        reason_for_travel: [
            "Leisure",
            "Business",
            "Sport"
        ],
        destination: [
            "Domestic",
            "International",
            "Africa"
        ],
        south_african: true,
        how_many_under_18: 0,
        how_many_adults: 0,
        budget: [
            "Budget",
            "Standard",
            "Luxury"
        ]
    },
    courses: {
        education_phase: "",
        workplace: "",
        province: "",
        for_myself: true,
        field_of_interest: ""
    },
    legal: {
        field_of_interest: ""
    },
    finance: {
        extraFinInfo : {
            files: [
                {
                    name: "Tax Season",
                    url: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/24609_Tax_Season_2023_01_31_59ca7a2b21.pdf?updated_at=2023-02-13T11:23:40.174Z"
                },
                {
                    name: "Tax Infographic",
                    url: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/24609_Tax_Infographic_2023_01_31_401605fab4.pdf?updated_at=2023-02-13T11:23:39.980Z"
                },
            ],
        },
    },
    healthy_living: {
        extraNourishInfo : {
            files: [
                {
                    name: "Promotions",
                    url: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Nourish_Ways_Promos_2023_TT_9f3b6f9f02.pdf?updated_at=2023-02-17T08:13:04.545Z"
                },
                {
                    name: "Pricing",
                    url: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Nourish_Ways_Pricing_2023_TT_0ee281ae53.pdf?updated_at=2023-02-17T08:13:04.149Z"
                },
            ],
        }
    },
    // Forms which just have message and default vals
    jobs: {},
};