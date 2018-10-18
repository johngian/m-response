import { staticAsset } from '@utils/urls'

export default class Api {
  constructor (token) {
    this.token = token
  }

  async fetch (path, options = {}, isPublic = false) {
    let headers = options.headers || {}
    if (!isPublic) {
      headers['Authorization'] = 'Bearer ' + this.token
    }
    options.headers = headers

    return fetch(path, options)
  }

  async getConfig () {
    return this.fetch(`/api/config/`, {}, true)
      .then(response => response.json())
  }

  async getHomeConfig () {
    return this.fetch(`/api/homepage/`)
      .then(response => response.json())
  }

  async getReview () {
    let response = await this.fetch(`/api/review/`)
    if (response.status === 200) {
      return response.json().then(json => {
        return {
          id: json.id,
          author: json.author_name,
          rating: json.review_rating,
          text: json.review_text,
          product: {
            name: json.application.name,
            package: json.application.package,
            version: json.application_version,
            image: staticAsset('media/firefox.png') // TODO
          },
          androidVersion: json.android_version,
          lastModified: new Date(json.last_modified)
        }
      })
    } else if (response.status === 404) {
      // No review assigned to this user
    } else if (response.status === 401) {
      // User is not logged in
    }
  }

  async submitResponse (reviewId, response) {
    const res = await this.fetch(`/api/response/create/${reviewId}/`, {
      method: 'POST',
      body: JSON.stringify({
        text: response
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.error(res.json())
    return { detail: 'Thank you for your effort and so making Mozilla better for all of us!' }
  }

  async skipReview (reviewId) {
    await this.fetch(`/api/review/skip/${reviewId}/`, { method: 'POST' })
  }
}
