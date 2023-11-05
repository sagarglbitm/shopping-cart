


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import StoreDataInSessionStorage from './JsonSession';



// Mock the toast component
jest.mock('react-toastify', () => ({
  toast: jest.fn(),
  ToastContainer: jest.fn(() => null)
}));

describe('StoreDataInSessionStorage', () => {
  test('renders the component without errors', () => {
    render(<StoreDataInSessionStorage />);
    // Assert that the component renders without throwing any errors
  });

  test('displays user details correctly', async () => {
    // Mock the fetch API response
    const mockUsers = [
      {
        name: 'sagar',
        email: 'sagar.jha@hcl.com',
        password: 'abc123@A',
        mobile: 1234567890,
        dob: '2023-10-25',
        address: {
          street: '',
          city: 'Noida',
          state: 'Uttar Pradesh',
          zipCode: '201303',
          country: 'India'
        },
        id: 4
      }
    ];
    const mockDetails = { userId: 4 };

    // sessionStorage.setItem("userId", JSON.stringify(mockDetails));
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUsers),
      ok: true,
      status: 200
    } as unknown as Response);
    render(<StoreDataInSessionStorage />);

    // await waitFor(() => screen.getByText("Name : sagar"));

  
    const userDetails = screen.getAllByTestId("user-detailssss");
    userDetails.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
});



  test('displays product details correctly', async () => {
    const mockOrders = [
      {
        product_name: 'Product 1',
        image_url: 'https://example.com/product1.jpg',
        sizes: 'S',
        price: 10
      },
      {
        product_name: 'Product 2',
        image_url: 'https://example.com/product2.jpg',
        sizes: 'M',
        price: 20
      }
    ];
    const mockTotal = 30;
    sessionStorage.setItem('Cart', JSON.stringify(mockOrders));
    sessionStorage.setItem('TotalPrice', JSON.stringify(mockTotal));

    render(<StoreDataInSessionStorage />);

    // Wait for the product details to be displayed
    const product1Name = await screen.findByText('Product 1');
    const product2Name = await screen.findByText('Product 2');
    expect(product1Name).toBeInTheDocument();
    expect(product2Name).toBeInTheDocument();
  });

  test('handles payment click correctly and shows toast message', async () => {
    render(<StoreDataInSessionStorage />);

    // Simulate the payment button click
    const paymentButton = screen.getByText('Payment');
    fireEvent.click(paymentButton);

    // Wait for the toast message to be displayed
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith('Order Placed Successfully ✅');
    });
  });
});




