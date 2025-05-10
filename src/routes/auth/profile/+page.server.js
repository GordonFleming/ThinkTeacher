import { error, fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$lib/env.js';
import { strapiKey } from '$env/static/private';
import { object, string, boolean, number, array } from 'yup';
import dayjs from 'dayjs';

// Cell phone validation regex
const cellRegexString = "^(\\\\+27|0|27)(1|6|7|8|9)([0-9]{8})$";

// Profile schema definition
const profileSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    cell: string().matches(new RegExp(cellRegexString), "Phone number is not valid").required(),
    dateOfBirth: string().nullable().test(
        "conditional-dob-requirement",
        "Date of birth is required when no ID number is provided",
        function (dateOfBirth) {
            const { idNumber } = this.parent;
            if (idNumber && idNumber.length === 13) return true;
            return dateOfBirth && dateOfBirth.length > 0;
        }
    ).test(
        "minimum-age",
        "You must be at least 18 years old",
        function(dateOfBirth) {
            if (!dateOfBirth) return true;
            const today = dayjs();
            const birthDate = dayjs(dateOfBirth);
            const age = today.diff(birthDate, 'year');
            return age >= 18;
        }
    ),
    sace: string().nullable().test(
        "conditional-sace-requirement",
        "SACE number is required (7 digits)",
        function (sace) {
            const { idNumber } = this.parent;
            if (idNumber && idNumber.length === 13) return true;
            return sace && sace.length === 7;
        }
    ),
    terms: boolean().required().isTrue("Terms must be accepted"),
    idNumber: string().nullable().test(
        "conditional-id-requirement",
        "ID Number is required (13 digits)",
        function (idNumber) {
            const { sace } = this.parent;
            if (sace && sace.length === 7) return true;
            return idNumber && idNumber.length === 13;
        }
    ),
    teachingPhases: object({
        earlyLearning: boolean().required(),
        foundation: boolean().required(),
        intermediate: boolean().required(),
        get: boolean().required(),
        fet: boolean().required(),
    }).test(
        'at-least-one-phase',
        'At least one teaching phase must be selected',
        (phases) => Object.values(phases).some(val => val === true)
    ),
    subjects: string().when("teachingPhases", {
        is: (val) => val.get || val.fet,
        then: (schema) => schema.required("At least one subject/learning area is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    experience: number().integer().min(0).required(),
    position: object({
        intern: boolean().required(),
        locum: boolean().required(),
        full_time: boolean().required(),
        tutor: boolean().required(),
        mentor: boolean().required(),
    }).test(
        'at-least-one-position',
        'At least one position must be selected',
        (positions) => Object.values(positions).some(val => val === true)
    ),
    address: object({
        street: string().required(),
        city: string().required(),
        postalCode: string().required(),
        province: string().oneOf([
            "gauteng", "free_state", "western_cape", "north_west",
            "northern_cape", "limpopo", "kwazulu_natal", "mpumalanga", "eastern_cape"
        ]).required(),
    }).required(),
    teachingPreference: string().oneOf(["in_person", "online", "hybrid"], "Invalid preference").required("Preference is required"),
    qualifications: array().of(
        object({
            title: string().required("Qualification title is required"),
            organisation: string().required("Organisation is required"),
            nqf: number().integer().min(1).max(10).required("NQF level is required"),
            from: string().required("Start date is required"),
            to: string().when('ongoing', {
                is: false,
                then: schema => schema.required("End date is required"),
                otherwise: schema => schema.nullable(),
            }),
            ongoing: boolean().required(),
        })
    ).min(1, "At least one qualification is required").required(),
    references: string().required("Reference is required"),
    languages: object({
        motherTongue: string().required("Mother tongue is required"),
        additional: array().of(string()).default([])
    }).test(
        'valid-languages',
        'Invalid language selection',
        (languages) => {
            if (!languages.motherTongue) return false;
            // Check that additional languages don't include mother tongue
            if (languages.additional.includes(languages.motherTongue)) return false;
            return true;
        }
    ),
    looking: boolean().required(),
    ttCode: string().required(),
});

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, fetch }) => {
    if (!strapiKey) {
        throw error(500, "API key is not configured");
    }

    // TODO: Update below to get user ID from locals & make function work
    // Get user ID from locals
    // const userId = locals.user?.id;
    const userId = 99999;
    if (!userId) {
        throw error(401, "User not authenticated");
    }

    try {
        // Check if user already has a profile
        const response = await fetch(`${API_URL}/profiles?filters[user][id][$eq]=${userId}`, {
            headers: {
                'Authorization': `Bearer ${strapiKey}`
            }
        });

        if (!response.ok) {
            throw error(response.status, "Failed to check for existing profile");
        }

        const data = await response.json();
        
        // If user has a profile, redirect to update page
        if (data.data && data.data.length > 0) {
            throw redirect(303, '/auth/profile/update');
        }

        return {};
    } catch (err) {
        if (err.status === 303) {
            throw err;
        }
        throw error(500, "Failed to check for existing profile");
    }
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, fetch }) => {
        if (!strapiKey) {
            return fail(500, { message: "API key is not configured. Profile cannot be saved." });
        }

        const formData = await request.formData();

        const getBool = (key) => formData.has(key) && formData.get(key) !== 'false';

        // Get user ID from form data
        const userId = formData.get('userId');
        if (!userId) {
            return fail(400, { message: "User ID is required to create a profile." });
        }

        const val = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            cell: formData.get('cell'),
            dateOfBirth: formData.get('dateOfBirth') || null,
            sace: formData.get('sace') || null, 
            idNumber: formData.get('idNumber') || null,
            looking: getBool('looking'),
            teachingPhases: {
                earlyLearning: getBool('teachingPhases.earlyLearning'),
                foundation: getBool('teachingPhases.foundation'),
                intermediate: getBool('teachingPhases.intermediate'),
                get: getBool('teachingPhases.get'),
                fet: getBool('teachingPhases.fet'),
            },
            subjects: formData.get('subjects') || null,
            experience: formData.get('experience') ? parseInt(formData.get('experience'), 10) : 0,
            position: {
                intern: getBool('position.intern'),
                locum: getBool('position.locum'),
                full_time: getBool('position.full_time'),
                tutor: getBool('position.tutor'),
                mentor: getBool('position.mentor'),
            },
            address: {
                street: formData.get('address.street'),
                city: formData.get('address.city'),
                postalCode: formData.get('address.postalCode'),
                province: formData.get('address.province'),
            },
            teachingPreference: formData.get('teachingPreference'),
            qualifications: (() => {
                // Parse qualifications array from formData
                const quals = [];
                let idx = 0;
                while (formData.has(`qualifications[${idx}].title`)) {
                    const nqfValue = formData.get(`qualifications[${idx}].nqf`);
                    quals.push({
                        title: formData.get(`qualifications[${idx}].title`),
                        organisation: formData.get(`qualifications[${idx}].organisation`),
                        nqf: nqfValue ? parseInt(nqfValue, 10) : null,
                        from: formData.get(`qualifications[${idx}].from`),
                        to: formData.get(`qualifications[${idx}].to`),
                        ongoing: formData.get(`qualifications[${idx}].ongoing`) === 'on' || formData.get(`qualifications[${idx}].ongoing`) === 'true',
                    });
                    idx++;
                }
                return quals;
            })(),
            references: formData.get('references'),
            languages: {
                motherTongue: formData.get('languages.motherTongue'),
                additional: formData.getAll('languages.additional')
            },
            terms: getBool('terms'),
            ttCode: formData.get('ttCode'), 
            // Add the user field for Strapi to link the profile to the user
            user: userId
        };

        try {
            await profileSchema.validate(val, { abortEarly: false });
        } catch (validationError) {
            const errors = {};
            if (validationError.inner) {
                validationError.inner.forEach(err => {
                    const path = err.path.replace(/^val\./, '').replace(/\[(\d+)\]/g, '.$1');
                    errors[path] = err.message;
                });
            }
            return fail(400, { data: val, errors });
        }
        
        const dataPayload = { data: { ...val } };

        const method = 'POST';
        const url = `${API_URL}/profiles`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${strapiKey}`,
                },
                body: JSON.stringify(dataPayload),
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error("Strapi API Error:", responseData);
                let message = "Failed to save profile.";
                if (responseData.error?.message) {
                    message = responseData.error.message;
                } else if (typeof responseData.message === 'string') {
                    message = responseData.message;
                } else if (Array.isArray(responseData.message) && responseData.message.length > 0 && responseData.message[0].messages && responseData.message[0].messages.length > 0) {
                    message = responseData.message[0].messages[0].message; 
                }
                return fail(response.status, { 
                    message: message,
                    data: val, 
                    errors: responseData.error?.details?.errors 
                });
            }
            throw redirect(303, '/benefits');

        } catch (err) {
            if (err.status && err.location) { 
                throw err;
            }
            console.error("Exception saving profile:", err);
            return fail(500, { 
                message: err.message || "Server error saving profile.",
                data: val
            });
        }
    },
};
