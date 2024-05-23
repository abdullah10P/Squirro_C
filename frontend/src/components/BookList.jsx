
import React from 'react';

const BookList = ({ books, included }) => {
    const authorsMap = included.filter(item => item.type === 'authors').reduce((map, item) => {
        map[item.id] = item.attributes.fullName;
        return map;
    }, {});

    const storeBooks = books.map(book => {
        const bookData = included.find(inc => inc.type === 'books' && inc.id === book.id).attributes;
        const authorRelationship = included.find(inc => inc.type === 'books' && inc.id === book.id).relationships.author;
        const authorId = authorRelationship ? authorRelationship.data.id : null;
        const authorFullName = authorId ? authorsMap[authorId] : 'No author information available';
        return {
            ...bookData,
            author: authorFullName
        };
    });

    return (
        <div className="books">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" className="text-left">Best-selling books</th>
                    </tr>
                </thead>
                <tbody>
                    {storeBooks.length > 0 ? (
                        storeBooks.slice(0, 2).map((book, index) => (
                            <tr key={index}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
