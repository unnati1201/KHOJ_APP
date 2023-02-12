import { TAGS } from "./tagsData";
import { USERS } from "./users";

export const POSTS = [
    {
        imageURL:require('../assets/park.jpg'),
        tag: TAGS[0].tagName,
        likes: 6570,
        heading: 'Perfect picninc spot - Sunder Nursery',
        description: 'On a winter afternoon, under the sun sitting along with your friends and revisiting all old memories for all this whats better place than Sunder Nursery',
        location: 'Near Jor Bagh metro station',
        user: USERS[0].name,
        profile_photo: USERS[0].profileImage,
        comments: [
            {
                profileUrl:require('../assets/profile.png'),
                user:'thePriyanshu',
                comment: 'Amazing!!',
            },
            {
                profileUrl:require('../assets/profile.png'),
                user:'theUnnati',
                comment:'Cannot wait to try it out!',
            },
        ],
    },
    {
        imageURL:require('../assets/food.jpg'),
        tag: TAGS[1].tagName,
        likes: 8670,
        heading: 'The hidden gem of Chandni Chowk!',
        description: 'The best cuisine can be found in these small lanes of Chandni Chowk which are filled with such delicious delicacy',
        location: 'Near Chandni Chowk metro station',
        user: USERS[1].name,
        profile_photo: USERS[1].profileImage,
        comments: [
            {
                profileUrl:require('../assets/profile.png'),
                user:'thePriyanshu',
                comment: 'Amazing!!',
            },
            {
                profileUrl:require('../assets/profile.png'),
                user:'theUnnati',
                comment:'Cannot wait to try it out!',
            },
        ],
    },
]