const Api = {

    /**
     * fetch XHR POST call to backend to check
     * if the provided username is available or not.
     *
     * @param {String} username
     * @returns true if the username is available for use, does NOT exist
     */
    checkUsernameIsAvailable: function checkUsernameIsAvailable (username) {
        return fetch(route('register.check_username'), {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content,
            },
            body: JSON.stringify({
                username,
            })
        })
        .then(res => res.json())
    },

    requestCompanyDetails: function requestCompanyDetails (world_slug, api_key, uuid) {
        if (!world_slug) {
            throw new Error('No world provided');
        } else if (!api_key) {
            throw new Error('noew api key provided');
        } else if (!uuid) {
            throw new Error('no Company UUID provided');
        }

        return fetch(route('company.request_details'), {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content
            },
            body: JSON.stringify({
                world_slug: world_slug,
                api_key: api_key,
                uuid: uuid,
            })
        })
        .then(res => res.json())
    },

    post: function post (url, data, options) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content,
            },
            body: JSON.stringify(data),
            ...options,
        })
        .then((res) => res.json());
    },

    patch: function post (url, data, options) {
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'X-CSRF-Token': document.head.querySelector("[name~=csrf-token][content]").content,
            },
            body: JSON.stringify(data),
            ...options,
        })
        .then((res) => res.json());
    }
}

export default Api
