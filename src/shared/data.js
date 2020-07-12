import { format } from 'date-fns';

import { inputDateFormat } from './constants';

export const allHeroes = [
  {
    id: 3,
    firstName: 'Tapiwa',
    lastName: 'lason',
    description: 'fire fighter',
    capeCounter: 1,
    capeColor: 'blue',
    originDate: format(new Date(2000, 5, 1), inputDateFormat),
    power: 'Strength',
    active: true,
  },
  {
    id: 20,
    firstName: 'John',
    lastName: 'Stockton',
    description: 'the cat whisperer',
    capeCounter: 4,
    capeColor: 'blue',
    originDate: format(new Date(2010, 7, 11), inputDateFormat),
    power: 'Speed',
    active: true,
  },
  {
    id: 30,
    firstName: 'Karl',
    lastName: 'Malone',
    description: 'pen wielder',
    capeCounter: 0,
    capeColor: 'red',
    originDate: format(new Date(2007, 2, 8), inputDateFormat),
    power: 'Strength',
    active: false,
  },
  {
    id: 40,
    firstName: 'Larry',
    lastName: 'Bird',
    description: 'arc trooper',
    capeCounter: 2,
    capeColor: 'green',
    originDate: format(new Date(2020, 4, 4), inputDateFormat),
    power: 'Invisibility',
    active: true,
  },
];
