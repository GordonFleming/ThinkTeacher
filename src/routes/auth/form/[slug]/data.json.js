// Possible future validation with yup here

export const formOpt = {
    business: {
        business_coaching: false,
        side_business: false,
        financial_health: false,
    },
    cars: {
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
        start_date: "",
        end_date: "",
        type_of_holiday: "",
        reason_for_travel: "",
        destination: "",
        south_african: true,
        how_many_under_18: 0,
        how_many_adults: 0,
        budget: 0
    },
    // Forms which just have message and default vals
    finance: {},
};