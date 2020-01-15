import {seasons} from '../images/allImages';

export const seasonCards = [
  { id: 1, name:"spring", src: seasons["spring.png"], points: {
    spring: 4,
    summer: 3,
    winter: 2,
    autumn: 1,
    any: 2
  }},
  { id: 2, name:"summer", src: seasons["summer.png"], points: {
    summer: 4,
    spring: 3,
    autumn: 2,
    winter: 1,
    any: 2
  }},
  { id: 3, name:"autumn", src: seasons["autumn.png"], points: {
    autumn: 4,
    winter: 3,
    summer: 2,
    spring: 1,
    any: 2
  }},
  { id: 4, name:"winter", src: seasons["winter.png"], points: {
    winter: 4,
    autumn: 3,
    spring: 2,
    summer: 1,
    any: 2
  }}
]