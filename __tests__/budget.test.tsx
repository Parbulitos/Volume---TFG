import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Budget from '../pages/budget';
import { useRouter } from 'next/router';
import { useBudget } from '../hooks/useBudget';
import Swal from 'sweetalert2';

// Mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Mock useBudget hook
jest.mock('../hooks/useBudget', () => ({
    useBudget: jest.fn(),
}));

// Mock Swal
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Budget Component', () => {
        const mockPush = jest.fn();
    const mockGetBudgetInfo = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useBudget as jest.Mock).mockReturnValue({ getBudgetInfo: mockGetBudgetInfo });
        global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the component correctly', () => {
        render(<Budget />);
        expect(screen.getByText('Material')).toBeInTheDocument();
        expect(screen.getByText('Calidad')).toBeInTheDocument();
        expect(screen.getByText('Postprocesado')).toBeInTheDocument();
        expect(screen.getByText('Enviar')).toBeInTheDocument();
    });

    it('handles material selection on large screens', async () => {
        render(<Budget />);
        const button = screen.getByRole('button', { name: /PLA/i });
        fireEvent.click(button);
        await waitFor(() => {
            expect(button).toHaveClass('btn-secondary');
        });
    });

    it('handles material selection on small screens', async () => {
        render(<Budget />);
        const selects = screen.getAllByRole('combobox');
        const materialSelect = selects[0];
        fireEvent.change(materialSelect, { target: { value: 'PLA' } });
        await waitFor(() => {
            expect(materialSelect).toHaveValue('PLA');
        });
    });

    it('handles quality selection', async () => {
        render(<Budget />);
        const button = screen.getByRole('button', { name: /0.2/i });
        fireEvent.click(button);
        await waitFor(() => {
            expect(button).toHaveClass('btn-secondary');
        });
    });

    it('handles postprocessing selection', async () => {
        render(<Budget />);
        const button = screen.getByRole('button', { name: /Bajo/i });
        fireEvent.click(button);
        await waitFor(() => {
            expect(button).toHaveClass('btn-secondary');
        });
    });

    it('disables the form when no model is uploaded', () => {
        render(<Budget />);
        expect(screen.getByText('Enviar')).toBeDisabled();
    });

    it('enables the form when a model is uploaded and all selections are made', async () => {
        mockGetBudgetInfo.mockResolvedValue({
            stl: {
                volume: 100,
                weight: 200,
                boundingBox: [10, 20, 30],
            },
        });

        render(<Budget />);
        expect(screen.getByText('Enviar')).toBeDisabled();
        const file = new File(['file'], 'test.stl', { type: 'model/stl' });

        const dropzone = screen.getByTestId('dropzone');
        fireEvent.drop(dropzone, {
            file,
        });

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /PLA/i }));
            fireEvent.click(screen.getByRole('button', { name: /0.2/i }));
            fireEvent.click(screen.getByRole('button', { name: /Bajo/i }));
        });

        expect(screen.getByText('Enviar')).not.toBeDisabled();
    });

    it('calculates the price correctly and enables form correctly', async () => {
        mockGetBudgetInfo.mockResolvedValue({
            stl: {
                volume: 100,
                weight: 220,
                boundingBox: [10, 20, 30],
            },
        });

        render(<Budget />);
        expect(screen.getByText('Enviar')).toBeDisabled();
        const file = new File(['file'], 'test.stl', { type: 'model/stl' });

        const dataTransfer = {
            files: [file],
            items: [
                {
                    kind: 'file',
                    type: file.type,
                    getAsFile: () => file,
                },
            ],
            types: ['Files'],
        };

        const dropzone = screen.getByTestId('dropzone');
        fireEvent.drop(dropzone, {
            dataTransfer,
        });

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /PLA/i }));
        });

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /0.2/i }));
        });

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /Bajo/i }));
        });

        await waitFor(() => {
            expect(screen.getByTestId('price')).toHaveTextContent('Precio: 7.4 €');
        });
        expect(screen.getByText('Enviar')).not.toBeDisabled();
        fireEvent.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith({
                title: '¡Presupuesto enviado!',
                text: 'En breve nos pondremos en contacto contigo',
                icon: 'success',
            });
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('submits the form correctly', async () => {
        mockGetBudgetInfo.mockResolvedValue({
            stl: {
                volume: 100,
                weight: 200,
                boundingBox: [10, 20, 30],
            },
        });

        render(<Budget />);
        const file = new File(['(⌐□_□)'], 'test.stl', { type: 'model/stl' });

        const dataTransfer = {
            files: [file],
            items: [
                {
                    kind: 'file',
                    type: file.type,
                    getAsFile: () => file,
                },
            ],
            types: ['Files'],
        };

        const dropzone = screen.getByTestId('dropzone');
        fireEvent.drop(dropzone, {
            dataTransfer,
        });

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /PLA/i }));
            fireEvent.click(screen.getByRole('button', { name: /0.2/i }));
            fireEvent.click(screen.getByRole('button', { name: /Bajo/i }));
        });

        fireEvent.click(screen.getByText('Enviar'));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith({
                title: '¡Presupuesto enviado!',
                text: 'En breve nos pondremos en contacto contigo',
                icon: 'success',
            });
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
