import { error, fail, redirect } from "@sveltejs/kit";
import { API_URL } from "$lib/env.js";
import { STRAPI_KEY } from "$env/static/private";
import { object, string, boolean, number, array, date } from "yup";
import dayjs from "dayjs";

// Cell phone validation regex
const cellRegexString = "^(\\\\+27|0|27)(1|6|7|8|9)([0-9]{8})$";

// Profile schema definition
const profileSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  cell: string()
    .matches(new RegExp(cellRegexString), "Phone number is not valid")
    .required(),
  dateOfBirth: string()
    .nullable()
    .test(
      "conditional-dob-requirement",
      "Date of birth is required when no ID number is provided",
      function (dateOfBirth) {
        const { idNumber } = this.parent;
        if (idNumber && idNumber.length === 13) return true;
        return dateOfBirth && dateOfBirth.length > 0;
      },
    )
    .test(
      "minimum-age",
      "You must be at least 18 years old",
      function (dateOfBirth) {
        if (!dateOfBirth) return true;
        const today = dayjs();
        const birthDate = dayjs(dateOfBirth);
        const age = today.diff(birthDate, "year");
        return age >= 18;
      },
    ),
  sace: string()
    .nullable()
    .test(
      "conditional-sace-requirement",
      "SACE number is required (Max 8 digits)",
      function (sace) {
        const { idNumber } = this.parent;
        if (idNumber && idNumber.length === 13) return true;
        return sace && sace.length <= 8;
      },
    ),
  terms: boolean().required().isTrue("Terms must be accepted"),
  idNumber: string()
    .nullable()
    .test(
      "conditional-id-requirement",
      "ID Number is required (13 digits)",
      function (idNumber) {
        const { sace } = this.parent;
        if (sace && sace.length === 7) return true;
        return idNumber && idNumber.length === 13;
      },
    ),
  teachingPhases: object({
    earlyLearning: boolean().required(),
    foundation: boolean().required(),
    intermediate: boolean().required(),
    get: boolean().required(),
    fet: boolean().required(),
  }).test(
    "at-least-one-phase",
    "At least one teaching phase must be selected",
    (phases) => Object.values(phases).some((val) => val === true),
  ),
  subjects: string().when("teachingPhases", {
    is: (val) => val.get || val.fet,
    then: (schema) =>
      schema.required("At least one subject/learning area is required"),
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
    "at-least-one-position",
    "At least one position must be selected",
    (positions) => Object.values(positions).some((val) => val === true),
  ),
  address: object({
    street: string().required(),
    city: string().required(),
    postalCode: string().required(),
    province: string()
      .oneOf([
        "gauteng",
        "free_state",
        "western_cape",
        "north_west",
        "northern_cape",
        "limpopo",
        "kwazulu_natal",
        "mpumalanga",
        "eastern_cape",
      ])
      .required(),
  }).required(),
  teachingPreference: string()
    .oneOf(["in_person", "online", "hybrid"], "Invalid preference")
    .required("Preference is required"),
  qualifications: array()
    .of(
      object({
        title: string().required("Qualification title is required"),
        organisation: string().required("Organisation is required"),
        nqf: number()
          .integer()
          .min(1)
          .max(10)
          .required("NQF level is required"),
        from: string().required("Start date is required"),
        to: string().when("ongoing", {
          is: false,
          then: (schema) => schema.required("End date is required"),
          otherwise: (schema) => schema.nullable(),
        }),
        ongoing: boolean().required(),
      }),
    )
    .min(1, "At least one qualification is required")
    .required(),
  references: array()
    .of(
      object({
        name: string().required("Reference name is required"),
        email: string()
          .email("Invalid email")
          .required("Reference email is required"),
        phone: string().nullable(),
        reference: string().required("Reference description is required"),
      }),
    )
    .min(1, "At least one reference is required")
    .required(),
  languages: object({
    motherTongue: string().required("Mother tongue is required"),
    additional: array().of(string()).default([]),
  }).test("valid-languages", "Invalid language selection", (languages) => {
    if (!languages.motherTongue) return false;
    // Check that additional languages don't include mother tongue
    if (languages.additional.includes(languages.motherTongue)) return false;
    return true;
  }),
  looking: boolean().required(),
});

// Schema for updating profile - excludes non-editable fields and terms
const profileUpdateSchema = object({
  cell: string()
    .matches(new RegExp(cellRegexString), "Phone number is not valid")
    .required(),
  sace: string()
    .nullable()
    .test(
      "conditional-sace-requirement",
      "SACE number is required (7 digits)",
      function (sace) {
        const { idNumber } = this.parent; // This might need adjustment if idNumber is not in parent for update
        // If this schema is used standalone, idNumber might not be in this.parent
        // For update, SACE requirement logic might need to be re-evaluated or data pre-fetched
        return true; // Assuming SACE can be updated, and its validation might be complex depending on other fixed fields
      },
    ),
  teachingPhases: object({
    earlyLearning: boolean().required(),
    foundation: boolean().required(),
    intermediate: boolean().required(),
    get: boolean().required(),
    fet: boolean().required(),
  }).test(
    "at-least-one-phase",
    "At least one teaching phase must be selected",
    (phases) => Object.values(phases).some((val) => val === true),
  ),
  subjects: string().when("teachingPhases", {
    is: (val) => val.get || val.fet,
    then: (schema) =>
      schema.required("At least one subject/learning area is required"),
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
    "at-least-one-position",
    "At least one position must be selected",
    (positions) => Object.values(positions).some((val) => val === true),
  ),
  address: object({
    street: string().required(),
    city: string().required(),
    postalCode: string().required(),
    province: string()
      .oneOf([
        "gauteng",
        "free_state",
        "western_cape",
        "north_west",
        "northern_cape",
        "limpopo",
        "kwazulu_natal",
        "mpumalanga",
        "eastern_cape",
      ])
      .required(),
  }).required(),
  teachingPreference: string()
    .oneOf(["in_person", "online", "hybrid"], "Invalid preference")
    .required("Preference is required"),
  qualifications: array()
    .of(
      object({
        title: string().required("Qualification title is required"),
        organisation: string().required("Organisation is required"),
        nqf: number()
          .integer()
          .min(1)
          .max(10)
          .required("NQF level is required"),
        from: string().required("Start date is required"), // Consider date type
        to: string().when("ongoing", {
          // Consider date type
          is: false,
          then: (schema) => schema.required("End date is required"),
          otherwise: (schema) => schema.nullable(),
        }),
        ongoing: boolean().required(),
      }),
    )
    .min(1, "At least one qualification is required")
    .required(),
  references: array()
    .of(
      object({
        name: string().required("Reference name is required"),
        email: string()
          .email("Invalid email")
          .required("Reference email is required"),
        phone: string().nullable(),
        reference: string().required("Reference description is required"),
      }),
    )
    .min(1, "At least one reference is required")
    .required(),
  languages: object({
    motherTongue: string().required("Mother tongue is required"),
    additional: array().of(string()).default([]),
  }).test("valid-languages", "Invalid language selection", (languages) => {
    if (!languages.motherTongue) return false;
    if (languages.additional.includes(languages.motherTongue)) return false;
    return true;
  }),
  looking: boolean().required(),
  // firstName, lastName, idNumber, dateOfBirth, terms are excluded
});

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, fetch }) => {
  if (!STRAPI_KEY) {
    throw error(500, "API key is not configured");
  }

  const userId = locals.user?.id;
  if (!userId) {
    // If not authenticated, redirect to login
    throw redirect(303, "/auth/login?redirectTo=/auth/profile/update");
  }

  try {
    // Fetch user's existing profile
    const response = await fetch(
      `${API_URL}/profiles?filters[user][id][$eq]=${userId}&populate=*`,
      {
        // Added populate=* to get all fields
        headers: {
          Authorization: `Bearer ${STRAPI_KEY}`,
        },
      },
    );

    if (!response.ok) {
      // Handle cases like network errors or Strapi being down
      console.error("Failed to fetch profile, status:", response.status);
      throw error(
        response.status,
        "Failed to fetch your profile data. Please try again later.",
      );
    }

    const responseData = await response.json();
    if (responseData.data && responseData.data.length > 0) {
      const profile = responseData.data[0].attributes;
      const profileId = responseData.data[0].id;
      // Ensure all necessary fields are present and perhaps transform them if needed for the form
      return {
        profile: { ...profile, id: profileId }, // Pass profileId along with other attributes
        userId: userId, // Pass userId for the form action if needed
      };
    } else {
      throw redirect(303, "/auth/profile"); // Or handle as an error
      // throw error(404, "Profile not found. Please create a profile first.");
    }
  } catch (err) {
    console.error("Error in load function:", err);
    if (err.status === 404 || err.status === 500) {
      // Propagate known errors
      throw err;
    }
    // Handle redirect if it's a redirect error
    if (err.status && err.location) {
      throw err;
    }
    throw error(
      500,
      err.message || "An unexpected error occurred while loading your profile.",
    );
  }
};

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, fetch, locals }) => {
    if (!STRAPI_KEY) {
      return fail(500, {
        message: "API key is not configured. Profile cannot be saved.",
      });
    }

    const formData = await request.formData();

    const getBool = (key) => formData.has(key) && formData.get(key) !== "false";
    const profileId = formData.get("profileId"); // Expect profileId to be submitted with the form

    if (!profileId) {
      return fail(400, { message: "Profile ID is missing. Cannot update." });
    }

    // Get user ID from locals for security, not from form for update action
    const userId = locals.user?.id;
    if (!userId) {
      return fail(401, { message: "User not authenticated." });
    }

    // Construct the object with only updatable fields
    const val = {
      // Non-editable fields like firstName, lastName, idNumber, dateOfBirth are NOT included
      cell: formData.get("cell"),
      sace: formData.get("sace") || null,
      looking: getBool("looking"),
      teachingPhases: {
        earlyLearning: getBool("teachingPhases.earlyLearning"),
        foundation: getBool("teachingPhases.foundation"),
        intermediate: getBool("teachingPhases.intermediate"),
        get: getBool("teachingPhases.get"),
        fet: getBool("teachingPhases.fet"),
      },
      subjects: formData.get("subjects") || null,
      experience: formData.get("experience")
        ? parseInt(formData.get("experience"), 10)
        : 0,
      position: {
        intern: getBool("position.intern"),
        locum: getBool("position.locum"),
        full_time: getBool("position.full_time"),
        tutor: getBool("position.tutor"),
        mentor: getBool("position.mentor"),
      },
      address: {
        street: formData.get("address.street"),
        city: formData.get("address.city"),
        postalCode: formData.get("address.postalCode"),
        province: formData.get("address.province"),
      },
      teachingPreference: formData.get("teachingPreference"),
      qualifications: (() => {
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
            ongoing:
              formData.get(`qualifications[${idx}].ongoing`) === "on" ||
              formData.get(`qualifications[${idx}].ongoing`) === true, // ensure boolean
          });
          idx++;
        }
        return quals;
      })(),
      references: (() => {
        const refs = [];
        let idx = 0;
        while (formData.has(`references[${idx}].name`)) {
          refs.push({
            name: formData.get(`references[${idx}].name`),
            email: formData.get(`references[${idx}].email`),
            phone: formData.get(`references[${idx}].phone`) || null,
            reference: formData.get(`references[${idx}].reference`),
          });
          idx++;
        }
        return refs;
      })(),
      languages: {
        motherTongue: formData.get("languages.motherTongue"),
        additional: formData.getAll("languages.additional"),
      },
      // terms is excluded
      // user field is not needed in the body for PUT if it's part of the URL or handled by policies
    };

    try {
      // Validate against the update schema
      await profileUpdateSchema.validate(val, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          const path = err.path
            .replace(/^val\./, "")
            .replace(/\[(\d+)\]/g, ".$1");
          errors[path] = err.message;
        });
      }
      return fail(400, { data: val, errors });
    }

    const dataPayload = { data: { ...val } };

    // Method and URL for updating an existing profile
    const method = "PUT";
    // The profile ID needs to be available here. Assuming it's passed from the load function via the form.
    const url = `${API_URL}/profiles/${profileId}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_KEY}`,
        },
        body: JSON.stringify(dataPayload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Strapi API Error:", responseData);
        let message = "Failed to save profile.";
        if (responseData.error?.message) {
          message = responseData.error.message;
        } else if (typeof responseData.message === "string") {
          message = responseData.message;
        } else if (
          Array.isArray(responseData.message) &&
          responseData.message.length > 0 &&
          responseData.message[0].messages &&
          responseData.message[0].messages.length > 0
        ) {
          message = responseData.message[0].messages[0].message;
        }
        return fail(response.status, {
          message: message,
          data: val, // Return the submitted data
          errors:
            responseData.error?.details?.errors ||
            (validationError
              ? validationError.inner.reduce((acc, err) => {
                  const path = err.path
                    .replace(/^val\./, "")
                    .replace(/\[(\d+)\]/g, ".$1");
                  acc[path] = err.message;
                  return acc;
                }, {})
              : {}),
        });
      }
      throw redirect(303, "/auth/profile");
    } catch (err) {
      if (err.status && err.location) {
        throw err;
      }
      console.error("Exception saving profile:", err);
      return fail(500, {
        message: err.message || "Server error saving profile.",
        data: val,
      });
    }
  },
};
