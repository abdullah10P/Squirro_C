import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookList from './BookList';
import { AUTHORS, BOOKS } from '../../constants';

const mockBooks = [
    { id: 1, name: 'Book 1', author: 'Author 1' },
    { id: 2, name: 'Book 2', author: 'Author 2' }
];

const mockIncluded = [
    { type: BOOKS, id: 1, attributes: { name: 'Book 1' }, relationships: { author: { data: { id: 1 } } } },
    { type: BOOKS, id: 2, attributes: { name: 'Book 2' }, relationships: { author: { data: { id: 2 } } } },
    { type: AUTHORS, id: 1, attributes: { fullName: 'Author 1' } },
    { type: AUTHORS, id: 2, attributes: { fullName: 'Author 2' } }
];

describe('BookList Component', () => {
    test('renders table with book names and authors', () => {
        const { getByText } = render(<BookList books={mockBooks} included={mockIncluded} />);
        
        expect(getByText('Best-selling books')).toBeInTheDocument();
        expect(getByText('Book 1')).toBeInTheDocument();
        expect(getByText('Author 1')).toBeInTheDocument();
        expect(getByText('Book 2')).toBeInTheDocument();
        expect(getByText('Author 2')).toBeInTheDocument();
    });

    test('displays "No data available" message when there are no books', () => {
        const { getByText } = render(<BookList books={[]} included={[]} />);
        expect(getByText('No data available')).toBeInTheDocument();
    });

    test('displays only the first two books', () => {
        const { queryByText } = render(<BookList books={mockBooks} included={mockIncluded} />);
        
        expect(queryByText('Book 3')).not.toBeInTheDocument();
        expect(queryByText('Author 3')).not.toBeInTheDocument();
    });
});
