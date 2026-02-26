import express from 'express';
import { ApiResponse, ProductFilter } from '@nxshop/shared/models';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

// Middleware
app.use(express.json());

// CORS configuration for Angular app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Added Authorization header
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Mock Authentication Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Basic mock validation
  if (email === 'user@example.com' && password === 'password123') {
    const mockJwtToken = 'mock_jwt_token_for_' + email;
    res.json({ token: mockJwtToken, email: email, message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;

  // Basic mock validation
  if (email && password) {
    // In a real app, you'd save the user and hash the password
    res.status(201).json({ message: 'User registered successfully!' });
  } else {
    res.status(400).json({ message: 'Email and password are required' });
  }
});


// Products endpoints
app.get('/api/products', (req, res) => {
  try {
    const filter: ProductFilter = {};

    if (req.query.category) {
      filter.category = req.query.category as string;
    }
    if (req.query.minPrice) {
      filter.minPrice = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      filter.maxPrice = Number(req.query.maxPrice);
    }
    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === 'true';
    }
    if (req.query.searchTerm) {
      filter.searchTerm = req.query.searchTerm as string;
    }

    // const page = req.query.page ? Number(req.query.page) : 1;
    // const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 12;

    // const result = productsService.getAllProducts(filter, page, pageSize);

    // const response: ApiResponse<PaginatedResponse<Product>> = {
    //   data: result,
    //   success: true,
    // };

    // res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    // const product = productsService.getProductById(req.params.id);

    // if (!product) {
    //   const response: ApiResponse<null> = {
    //     data: null,
    //     success: false,
    //     error: 'Product not found',
    //   };
    //   return res.status(404).json(response);
    // }

    // const response: ApiResponse<Product> = {
    //   data: product,
    //   success: true,
    // };

    // res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

app.get('/api/products-metadata/categories', (req, res) => {
  try {
    // const categories = productsService.getCategories();
    // const response: ApiResponse<string[]> = {
    //   data: categories,
    //   success: true,
    // };
    // res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

app.get('/api/products-metadata/price-range', (req, res) => {
  try {
    // const priceRange = productsService.getPriceRange();
    // const response: ApiResponse<{ min: number; max: number }> = {
    //   data: priceRange,
    //   success: true,
    // };
    // res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    res.status(500).json(response);
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
