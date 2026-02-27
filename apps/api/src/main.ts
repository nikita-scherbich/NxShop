import { User } from '@nxshop/shared';
import { config } from 'dotenv';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import { DBResponse } from './lib/models/db-response.model';
import { supabase } from './lib/supabase';
import { jwtExpiresIn } from './lib/utils/jwt-exiration.utils';

config({ path: 'apps/api/.env', debug: false });

const bcrypt = require('bcrypt');

const host = process.env.HOST ?? 'localqhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();
const UsersTable = 'users';

let refreshTokens = [];

// Middleware
app.use(express.json());
// CORS configuration for Angular app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Refresh Token
app.post('/api/token', async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const expiresIn = jwtExpiresIn();
    const accessToken = generateAccessToken(user, expiresIn);
    return res.status(200).json({
      accessToken,
      refreshToken,
      expiresAt: new Date(expiresIn),
      message: 'Token has been successfully refreshed.',
    });
  });
});

// Sign Up
app.post('/api/signup', async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({ message: 'Wrong payload' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      surname,
      email,
      password: hashedPassword,
    };

    const response: DBResponse = await supabase
      .from(UsersTable)
      .insert([newUser]);

    if (response.error) {
      return res.status(response.status).json({
        errorCode: response.error.code,
        message: response.error.message,
      });
    }

    return res
      .status(response.status)
      .json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error: ', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Wrong payload' });
    }

    const response: DBResponse<User> = await supabase.from(UsersTable).select();

    const user = response.data?.[0];

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    const isEmailEqual = email === user.email;

    if (!isPasswordEqual || !isEmailEqual) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    const expiresIn = jwtExpiresIn();
    const accessToken = generateAccessToken(user, expiresIn);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    return res.status(200).json({
      accessToken,
      refreshToken,
      expiresAt: new Date(expiresIn),
      message: 'User Successfully Logged In',
    });
  } catch (error) {
    console.error('Register Error: ', error);
    return res.status(500).json({ message: error.message });
  }
});

// GET users
app.get('/users', authenticateToken, async (req, res) => {
  const { data, error } = await supabase.from(UsersTable).select('*');

  if (error) {
    return res.status(500).json({ error });
  }
  res.status(200).json(data);
});

// Products endpoints
// app.get('/api/products', (req, res) => {
//   try {
//     const filter: ProductFilter = {};

//     if (req.query.category) {
//       filter.category = req.query.category as string;
//     }
//     if (req.query.minPrice) {
//       filter.minPrice = Number(req.query.minPrice);
//     }
//     if (req.query.maxPrice) {
//       filter.maxPrice = Number(req.query.maxPrice);
//     }
//     if (req.query.inStock !== undefined) {
//       filter.inStock = req.query.inStock === 'true';
//     }
//     if (req.query.searchTerm) {
//       filter.searchTerm = req.query.searchTerm as string;
//     }

//     // const page = req.query.page ? Number(req.query.page) : 1;
//     // const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 12;

//     // const result = productsService.getAllProducts(filter, page, pageSize);

//     // const response: ApiResponse<PaginatedResponse<Product>> = {
//     //   data: result,
//     //   success: true,
//     // };

//     // res.json(response);
//   } catch (error) {
//     const response: ApiResponse<null> = {
//       data: null,
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//     res.status(500).json(response);
//   }
// });

// app.get('/api/products/:id', (req, res) => {
//   try {
//     // const product = productsService.getProductById(req.params.id);
//     // if (!product) {
//     //   const response: ApiResponse<null> = {
//     //     data: null,
//     //     success: false,
//     //     error: 'Product not found',
//     //   };
//     //   return res.status(404).json(response);
//     // }
//     // const response: ApiResponse<Product> = {
//     //   data: product,
//     //   success: true,
//     // };
//     // res.json(response);
//   } catch (error) {
//     const response: ApiResponse<null> = {
//       data: null,
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//     res.status(500).json(response);
//   }
// });

// app.get('/api/products-metadata/categories', (req, res) => {
//   try {
//     // const categories = productsService.getCategories();
//     // const response: ApiResponse<string[]> = {
//     //   data: categories,
//     //   success: true,
//     // };
//     // res.json(response);
//   } catch (error) {
//     const response: ApiResponse<null> = {
//       data: null,
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//     res.status(500).json(response);
//   }
// });

// app.get('/api/products-metadata/price-range', (req, res) => {
//   try {
//     // const priceRange = productsService.getPriceRange();
//     // const response: ApiResponse<{ min: number; max: number }> = {
//     //   data: priceRange,
//     //   success: true,
//     // };
//     // res.json(response);
//   } catch (error) {
//     const response: ApiResponse<null> = {
//       data: null,
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//     res.status(500).json(response);
//   }
// });

app.delete('/api/logout', (req, res) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

function generateAccessToken(user: User, expiresIn: number) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}
