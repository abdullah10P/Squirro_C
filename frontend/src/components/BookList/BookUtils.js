import { AUTHORS } from "../../utils/constants";
import { BOOKS } from "../../utils/constants";
import { NO_AUTHOR_INFORMATION,NO_NAME } from "../../utils/constants";

export const getAuthorsMap = (included) => {
    return included.filter(item => item.type === AUTHORS).reduce((map, item) => {
        map[item.id] = item.attributes.fullName;
        return map;
    }, {});
};


export const getStoreBooks = (books, included, authorsMap) => {
    return books.map(book => {
        const foundBook = included.find(inc => inc.type === BOOKS && inc.id === book.id);

        if (!foundBook) {
            console.error(`Book with ID ${book.id} not found in included data.`);
            return null;
        }
        
        const bookData = foundBook.attributes;
        const authorRelationship = foundBook.relationships.author;
        const authorId = authorRelationship ? authorRelationship.data.id : null;
        const authorFullName = authorId ? authorsMap[authorId] : { NO_AUTHOR_INFORMATION };
        return {
            id: book.id,
            name: bookData ? bookData.name : NO_NAME,
            author: authorFullName || NO_AUTHOR_INFORMATION,
        };
    }).filter(book => book !== null);
};
