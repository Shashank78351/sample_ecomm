const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 80;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const JWT_SECRET ="ks@#2024";

app.get('/', (req, res)=>{
    res.status(200).json({message:"success"})
})

// User registration
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
 
// User login
app.post('/login', (req, res) => {
    const { username,email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
 
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
 
        // if (!match) {
        //     return res.status(401).json({ message: 'Invalid email or password' });
        // }
 
        const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});
app.get('/products', (req, res) => {
  const { search, category, priceCondition, priceValue } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  let queryParams = [];

  if (search) {
      query += ' AND productName LIKE ?';
      queryParams.push(`%${search}%`);
  }

  if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
  }

  if (priceCondition && priceValue) {
      switch (priceCondition) {
          case 'under':
              query += ' AND productPrice < ?';
              queryParams.push(priceValue);
              break;
          case 'lessThan':
              query += ' AND productPrice <= ?';
              queryParams.push(priceValue);
              break;
          case 'moreThan':
              query += ' AND productPrice > ?';
              queryParams.push(priceValue);
              break;
          default:
              break;
      }
  }

  db.query(query, queryParams, (error, rows) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: 'Server error' });
      }

      res.status(200).json(rows);
  });
});

app.get('/productsById/:productId', (req, res) => {
  const productId = req.params.productId;
   
    db.query('SELECT productId, productName, productPrice,productImage FROM products WHERE productId = ?', [productId], (error, rows) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ message: 'Server error' });
      }
   
      if (rows.length > 0) {
        res.json(rows[0]); 
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    });
  });
  app.get('/addToCart/:productId', (req, res) => {
    const productId = req.params.productId;
 
    db.query('SELECT productName, productPrice, productImage FROM products WHERE productId = ?', [productId], (error, rows) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ message: 'Server error' });
        }
 
        if (rows.length > 0) {
            const { productName, productPrice,productImage } = rows[0];
 
            // Check if the product already exists in the cart
            db.query('SELECT * FROM cart WHERE name = ? AND price = ? AND image=?', [productName, productPrice,productImage], (err, cartRows) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
 
                if (cartRows.length > 0) {
                    // Product already exists in cart, increment quantity
                    db.query('UPDATE cart SET quantity = quantity + 1 WHERE name = ? AND price = ? AND image = ?', [productName, productPrice, productImage], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Database query error:', updateErr);
                            return res.status(500).json({ message: 'Server error' });
                        }
                        res.status(200).json({ message: 'Quantity updated in cart' });
                    });
                } else {
                    // Product does not exist in cart, insert with quantity = 1
                    db.query('INSERT INTO cart (name, price,image,quantity) VALUES (?, ?, ?, 1)', [productName, productPrice,productImage], (insertErr, insertResult) => {
                        if (insertErr) {
                            console.error('Database query error:', insertErr);
                            return res.status(500).json({ message: 'Server error' });
                        }
                        res.status(200).json({ message: 'Product added to cart' });
                    });
                }
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});
 app.get('/fetchCartItems', (req,res)=>{
  db.query('SELECT cartId,name, price,quantity,image FROM cart', (error,rows)=>{
    if(error){
      console.error('Database query error', error);
      return res.status(500).json({message:'Server error'});
    }
    res.status(200).json(rows);
  });
 });

 // Remove item from cart
app.delete('/removeFromCart/:cartId', (req, res) => {
  const cartId = req.params.cartId;

  db.query('DELETE FROM cart WHERE cartId = ?', [cartId], (error, result) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: 'Server error' });
      }

      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Item removed from cart successfully' });
      } else {
          res.status(404).json({ message: 'Item not found in cart' });
      }
  });
});
app.post('/confirmOrder', (req, res) => {
    
    const username=req.body.username;
    const email=req.body.email;
    // const { items } = req.body;
    
  db.query('SELECT * FROM cart', (error, cartItems) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ message: 'Server error' });
      }

      if (cartItems.length === 0) {
          return res.status(400).json({ message: 'Cart is empty' });
      }

      const orderId = new Date().getTime(); // Generate a unique order ID
    
      // Insert each cart item into the orders table
      cartItems.forEach(item => {
        const totalPrice=item.price * item.quantity;
          db.query('INSERT INTO orders (orderId, name, price, quantity,totalPrice,email,username,image) VALUES (?, ?, ?,?, ?, ?, ?,?)',
[orderId, item.name, item.price, item.quantity,totalPrice,email,username,item.image], (err, result) => {
              if (err) {
                  console.error('Insert order query error:', err);
              }
          });
      });

      // Clear the cart after confirming the order
      db.query('DELETE FROM cart', (err, result) => {
          if (err) {
              console.error('Clear cart query error:', err);
              return res.status(500).json({ message: 'Server error' });
          }

          res.status(200).json({ message: 'Order confirmed successfully', orderId: orderId });
      });
  });
});

app.get('/orders', (req, res) => {
    const email = req.query.email; // Get the email from query parameters
     
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
     
        db.query('SELECT * FROM orders WHERE email = ?', [email], (error, orders) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ message: 'Server error' });
            }
     
            res.status(200).json(orders);
        });
    });
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);

});
