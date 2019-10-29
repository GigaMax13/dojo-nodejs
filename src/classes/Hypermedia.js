export default class Hypermedia {
  #idAttribute;

  constructor(idAttribute = 'id') {
    this.#idAttribute = idAttribute;
  }

  generateLinks(req, data, relationships = []) {
    const requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    if (data && data.constructor === Array) {
      return this.#registerCollectionLink(requestUrl, data, relationships);
    }

    return this.#registerLink(requestUrl, data, relationships);
  }

  #registerCollectionLink = (href, data, relationships) => ({
    data: this.#registerLink(href, data, relationships),
    links: [
      {
        method: 'GET',
        rel: 'self',
        href,
      },
      {
        method: 'POST',
        rel: 'create',
        href,
      },
    ],
  });

  #registerLink = (url, data, relationships) => {
    if (data && data.constructor === Array) {
      return data.map((resource) => this.#resourceLinks({
        addResourceID: true,
        relationships,
        resource,
        url,
      }));
    }

    return {
      data: this.#resourceLinks({
        resource: data,
        relationships,
        url,
      }),
    };
  };

  #resourceLinks = ({
    addResourceID = false,
    relationships = [],
    resource,
    url,
  }) => {
    const {
      [this.#idAttribute]: id,
    } = resource;
    const href = addResourceID ? `${url}/${id}` : url;

    return {
      ...resource,
      links: [
        {
          method: 'GET',
          rel: 'self',
          href,
        },
        {
          method: 'PATCH',
          rel: 'update',
          href,
        },
        {
          method: 'DELETE',
          rel: 'remove',
          href,
        },
        ...relationships.map((relationship) => ({
          method: 'GET',
          rel: relationship,
          href: `${href}/${relationship}`,
        })),
      ],
    };
  };
}
