export class Item {
    constructor (name, description, price, seller, sellerRef, status, imageRef, itemId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.seller = seller;
        this.sellerRef = sellerRef;
        this.status = status;
        this.imageRef = imageRef;
        this.itemId = itemId;
    }
}

// Firestore data converter
export const itemConverter = {
    toFirestore: (item) => {
        return {
            name: item.name,
            description: item.description,
            price: item.price,
            seller: item.seller,
            sellerRef: item.sellerRef,
            status: item.status,
            imageRef: item.imageRef,
            itemId: item.itemId
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.description, data.price, data.seller, data.sellerRef, data.status, data.imageRef, data.itemId);
    }
};
