export class User {
    constructor (fullName, college ) {
        this.fullName = fullName;
        this.college = college;
    }
    toString() {
        return this.fullName + ', ' + this.college;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            fullName: user.fullName,
            college: user.college
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.fullName, data.college);
    }
};
