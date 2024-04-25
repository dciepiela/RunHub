import {faker} from '@faker-js/faker'

const STATUS_AVAILABLE ={
    id: 1,
    name: "Available",
    color: "red-100"
}

const STATUS_CLOSED = {
    id: 2,
    name: "Closed",
    color: "red-300"
}

const STATUS_FUTURE ={
    id: 3,
    name: "Future",
    color: "red-400"
}

export function createRandomUser(){
    const randomStatusIndex = Math.floor(Math.random() * 3); // Random index from 0 to 2
    const statuses  = [STATUS_AVAILABLE, STATUS_CLOSED, STATUS_FUTURE];
    const status = statuses[randomStatusIndex];

// return{
//     // _id: faker.number.int(100),
//     profile: faker.image.avatar(),
//     status: status,
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//     age: faker.number.int(40),
//     visits: faker.number.int(1000),
//     progress: faker.number.int(100)
// };

return{
    place: faker.number.int(50),
    profile: faker.image.avatar(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    gender: faker.person.gender(),
    city: faker.location.city(),
    club: faker.animal.bear(),
    time: faker.date.anytime(),
    status: status
};
}


export const USERS = faker.helpers.multiple(createRandomUser, {count:30});

export const STATUSES = [
    STATUS_AVAILABLE, STATUS_CLOSED, STATUS_FUTURE
]


