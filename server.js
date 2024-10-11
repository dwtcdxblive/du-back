// Backend (Express)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

let coffeeOrders = []; // Store the coffee orders

// Utility function to validate order structure
const validateOrder = (order) => {
  return (
    typeof order.orderNumber === 'string' &&
    order.orderNumber.trim() !== '' &&
    typeof order.product === 'string' &&
    order.product.trim() !== '' &&
    (typeof order.milkOption === 'string' || order.milkOption === null) &&
    (typeof order.teaFlavor === 'string' || order.teaFlavor === null) &&
    (order.status === 'pending' || order.status === 'served')
  );
};

// POST API to receive coffee order
app.post('/order-coffee', (req, res) => {
  const { product, milkOption, teaFlavor, orderNumber } = req.body;

  // Create a new order with details
  const newOrder = {
    orderNumber,
    product,
    milkOption: milkOption || null,
    teaFlavor: teaFlavor || null,
    status: 'pending', // Initial status
  };

  // Validate the new order structure
  if (validateOrder(newOrder)) {
    coffeeOrders.push(newOrder); // Add coffee order to the list
    res
      .status(200)
      .send({ message: 'Coffee order received!', order: newOrder });
  } else {
    res.status(400).send({ message: 'Invalid order format.' });
  }
});

// GET API to retrieve coffee orders
app.get('/get-orders', (req, res) => {
  // Return all orders (pending and served)
  res.status(200).send(coffeeOrders);
});

// PUT API to mark an order as served
app.put('/serve-order/:orderNumber', (req, res) => {
  const { orderNumber } = req.params;

  // Find the order by orderNumber
  const orderIndex = coffeeOrders.findIndex(
    (order) => order.orderNumber === orderNumber
  );
  if (orderIndex !== -1) {
    // Mark the order as served
    coffeeOrders[orderIndex].status = 'served';
    res
      .status(200)
      .send({
        message: 'Order marked as served.',
        order: coffeeOrders[orderIndex],
      });
  } else {
    res.status(404).send({ message: 'Order not found.' });
  }
});

// GET API to get pending orders only
app.get('/get-pending-orders', (req, res) => {
  // Filter and return only pending orders
  const pendingOrders = coffeeOrders.filter(
    (order) => order.status === 'pending'
  );
  res.status(200).send(pendingOrders);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
