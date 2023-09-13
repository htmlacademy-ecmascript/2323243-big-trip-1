export default class DestinationsModel {

  #destinations = null;
  #service = null;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.destinations;
    console.log(this.#destinations);
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    const result = this.#destinations
      .find((destination) => destination.id === id);
    if (!result) {
      return {
        'id': 'dcb8b539-a2d3-4452-bc84-d130907b920d',
        'description': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
        'name': 'Paris',
        'pictures': [
          {
            'src': 'https://loremflickr.com/248/152?random=20.jpg',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            'src': 'https://loremflickr.com/248/152?random=60.jpg',
            'description': 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.'
          },
          {
            'src': 'https://loremflickr.com/248/152?random=86.jpg',
            'description': 'Aliquam id orci ut lectus varius viverra.'
          },
          {
            'src': 'https://loremflickr.com/248/152?random=27.jpg',
            'description': 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
          },
          {
            'src': 'https://loremflickr.com/248/152?random=80.jpg',
            'description': 'Cras aliquet varius magna, non porta ligula feugiat eget.'
          }
        ]
      };
    }
    return result;
  }
}
