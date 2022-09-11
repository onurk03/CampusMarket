export class User {
    constructor(uid, fullName, college) {
        this.uid = uid;
        this.fullName = fullName;
        this.college = college;
    }
    toString() {
        return this.uid + ', ' + this.fullName + ', ' + this.college;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            uid: user.uid,
            fullName: user.fullName,
            college: user.college
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.uid, data.fullName, data.college);
    }
};
